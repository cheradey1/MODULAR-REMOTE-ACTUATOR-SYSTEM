import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ModelViewerProps {
  modelPath: string;
  title?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, title = 'Model' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    sceneRef.current = scene;

    // Camera
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 150);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(100, 100, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ff88, 0.6);
    pointLight.position.set(-100, -100, 100);
    scene.add(pointLight);

    // Load model based on file type
    const loadModel = async () => {
      try {
        if (modelPath.endsWith('.fbx')) {
          console.warn('FBX не підтримується. Спробуйте конвертувати в GLB або STL');
          showErrorMessage('FBX формат потребує додаткового налаштування. Будь ласка конвертуйте модель в GLB або STL формат.');
        } else if (modelPath.endsWith('.stl')) {
          await loadSTL();
        }
      } catch (error) {
        console.error('Error loading model:', error);
        showErrorMessage('Помилка при завантаженні моделі');
      }
    };

    const showErrorMessage = (message: string) => {
      if (!containerRef.current) return;
      const errorDiv = document.createElement('div');
      errorDiv.className = 'flex items-center justify-center h-full text-center text-white/60 text-sm font-mono p-6';
      errorDiv.innerHTML = `<div><p>⚠️ ${message}</p><p style="margin-top: 1rem; font-size: 0.8em; color: rgba(255,255,255,0.4);">Конвертуйте FBX → GLB через Blender або Online конвертер</p></div>`;
      containerRef.current.appendChild(errorDiv);
    };

    // Load STL
    const loadSTL = async () => {
      try {
        const response = await fetch(modelPath);
        const geometry = await parseSTL(await response.arrayBuffer());
        
        geometry.computeBoundingBox();
        geometry.center();
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhongMaterial({
          color: 0x00ff88,
          emissive: 0x00aa44,
          shininess: 30,
          wireframe: false,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const group = new THREE.Group();
        group.add(mesh);
        scene.add(group);
        modelRef.current = group;

        fitCameraToObject(camera, group);
      } catch (error) {
        console.error('Error loading STL:', error);
      }
    };

    const fitCameraToObject = (camera: THREE.PerspectiveCamera, object: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 1.5;
      camera.position.z = cameraZ;
      camera.lookAt(object.position);
    };

    // Simple orbit controls with mouse
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotation = { x: 0, y: 0 };
    let zoom = 1;

    renderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener('mousemove', (e) => {
      if (isDragging && modelRef.current) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        rotation.y += deltaX * 0.01;
        rotation.x += deltaY * 0.01;

        modelRef.current.rotation.y = rotation.y;
        modelRef.current.rotation.x = rotation.x;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    renderer.domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });

    renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      zoom *= e.deltaY > 0 ? 0.95 : 1.05;
      zoom = Math.max(0.5, Math.min(3, zoom));
      camera.position.z = 225 / zoom;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    loadModel();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', () => {});
      renderer.domElement.removeEventListener('mousemove', () => {});
      renderer.domElement.removeEventListener('mouseup', () => {});
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 text-white/60 text-sm font-mono">
        <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-sm rounded text-brand-primary">
          🖱️ Крути: перетяги | 🔍 Zoom: колесо миші
        </span>
      </div>
    </div>
  );
};

// STL Parser
function parseSTL(arrayBuffer: ArrayBuffer): THREE.BufferGeometry {
  const view = new DataView(arrayBuffer);
  const isASCII = isASCIISTL(arrayBuffer);

  if (isASCII) {
    return parseASCIISTL(new TextDecoder().decode(arrayBuffer));
  } else {
    return parseBinarySTL(view);
  }
}

function isASCIISTL(arrayBuffer: ArrayBuffer): boolean {
  const view = new Uint8Array(arrayBuffer);
  const header = new TextDecoder().decode(view.slice(0, 5));
  return header === 'solid';
}

function parseBinarySTL(view: DataView): THREE.BufferGeometry {
  const faces = view.getUint32(80, true);
  const geometry = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const normals: number[] = [];

  let offset = 84;
  for (let i = 0; i < faces; i++) {
    const nx = view.getFloat32(offset, true);
    offset += 4;
    const ny = view.getFloat32(offset, true);
    offset += 4;
    const nz = view.getFloat32(offset, true);
    offset += 4;

    for (let j = 0; j < 3; j++) {
      vertices.push(view.getFloat32(offset, true));
      offset += 4;
      vertices.push(view.getFloat32(offset, true));
      offset += 4;
      vertices.push(view.getFloat32(offset, true));
      offset += 4;

      normals.push(nx, ny, nz);
    }

    offset += 2; // attribute byte count
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));

  return geometry;
}

function parseASCIISTL(data: string): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const normals: number[] = [];

  const vertexPattern = /vertex\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)/g;
  const normalPattern = /facet\s+normal\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)/g;

  let normalMatch;
  let vertexMatch;
  let currentNormal = [0, 0, 0];

  while ((normalMatch = normalPattern.exec(data)) !== null) {
    currentNormal = [parseFloat(normalMatch[1]), parseFloat(normalMatch[3]), parseFloat(normalMatch[5])];

    const facetData = data.substring(normalMatch.index, data.indexOf('endfacet', normalMatch.index));
    vertexPattern.lastIndex = 0;

    while ((vertexMatch = vertexPattern.exec(facetData)) !== null) {
      vertices.push(parseFloat(vertexMatch[1]), parseFloat(vertexMatch[3]), parseFloat(vertexMatch[5]));
      normals.push(currentNormal[0], currentNormal[1], currentNormal[2]);
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));

  return geometry;
}

export default ModelViewer;
