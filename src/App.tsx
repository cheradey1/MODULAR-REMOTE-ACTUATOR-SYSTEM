/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Cpu, 
  Battery, 
  Zap, 
  Box, 
  ChevronRight, 
  Download, 
  Play, 
  Layers, 
  Link as LinkIcon,
  Shield,
  Wrench,
  Activity
} from 'lucide-react';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-2"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        className="text-sm font-mono uppercase tracking-[0.3em]"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '100px' }}
      viewport={{ once: true }}
      className="h-1 bg-brand-primary mt-4"
    />
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
    className="glass-card p-6 transition-colors group"
  >
    <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
      <Icon className="text-brand-primary w-6 h-6" />
    </div>
    <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
    <p className="text-white/60 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const SystemStatus = () => (
  <div className="flex items-center gap-4 text-[10px] font-mono text-brand-primary/60">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
      <span>SYSTEM ONLINE</span>
    </div>
    <div className="hidden sm:flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/30" />
      <span>LATENCY: 24MS</span>
    </div>
    <div className="hidden sm:flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/30" />
      <span>UPTIME: 99.9%</span>
    </div>
  </div>
);

const YouTubeBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <video
      className="absolute inset-0 w-full h-full object-cover opacity-60"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="./images/background.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-brand-bg/40" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg/30 to-brand-bg" />
  </div>
);

const DemoVideo = ({ title, url, type = 'video' }: { title: string, url: string, type?: 'video' | 'youtube' }) => (
  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group h-full">
    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 bg-brand-primary/80 text-black text-[10px] font-bold rounded-full">
      <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
      {title}
    </div>
    {type === 'youtube' ? (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${url}?rel=0&modestbranding=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      />
    ) : (
      <video 
        className="w-full h-full object-cover"
        controls
        playsInline
        poster="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop"
      >
        <source src={url} type="video/mp4" />
      </video>
    )}
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen tech-grid selection:bg-brand-primary selection:text-black">
      <YouTubeBackground />
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-bg/80 backdrop-blur-lg border-b border-white/10 py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center">
              <Settings className="text-black w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter">MODULAR ACTUATOR</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-widest text-white/60">
            <a href="#features" className="hover:text-brand-primary transition-colors">Особливості</a>
            <a href="#architecture" className="hover:text-brand-primary transition-colors">Архітектура</a>
            <a href="#demo" className="hover:text-brand-primary transition-colors">Демо</a>
            <a href="#roadmap" className="hover:text-brand-primary transition-colors">Шлях запуску</a>
            <a href="#models" className="hover:text-brand-primary transition-colors">3D Моделі</a>
          </div>
          <a 
            href="mailto:andriy.liashkevich@gmail.com?subject=Order: Modular Remote Actuator Kit"
            className="bg-brand-primary text-black px-6 py-2 rounded font-bold text-sm hover:bg-white transition-colors"
          >
            ЗАМОВИТИ
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <YouTubeBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono rounded">
                v1.0.4 REMOTE ACTUATION PLATFORM
              </span>
              <SystemStatus />
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tighter mb-2 leading-[0.9]">
              MODULAR REMOTE <br />
              <span className="text-brand-primary glow-text">ACTUATOR SYSTEM</span>
            </h1>
            
            <div className="mb-6">
              <span className="text-2xl md:text-3xl font-display font-bold text-white">
                Modular Remote Actuator Kit — <span className="text-brand-primary">$120</span>
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8 relative group hidden"
            >
              <div className="absolute -inset-1 bg-brand-primary/20 blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <img 
                src="./images/hero.jpg" 
                alt="Drone Production Workshop" 
                className="relative rounded-xl border border-white/10 w-full max-w-2xl h-48 object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/40 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                FACILITY_LOC: UNIT_07 // PRODUCTION_FLOOR
              </div>
            </motion.div>

            <p className="max-w-2xl text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
              Fully assembled and tested modular actuation system with integrated motor, battery mount, and structural frame. Ready to deploy in drone, robotics, and automation applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:andriy.liashkevich@gmail.com?subject=Order: Modular Remote Actuator Kit"
                className="bg-brand-primary text-black px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors"
              >
                ЗАМОВИТИ ЗАРАЗ
              </a>
              <a href="#demo" className="border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                <Play className="w-5 h-5 fill-current" /> ДИВИТИСЯ ДЕМО
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </motion.div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="CORE CAPABILITIES">КЛЮЧОВІ ОСОБЛИВОСТІ</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Box} 
            title="Модульні балки" 
            description="Квадратні пластикові балки з монтажними отворами по всьому периметру для максимальної гнучкості."
          />
          <FeatureCard 
            icon={Wrench} 
            title="Регульована збірка" 
            description="Металеві стрижні з різьбою дозволяють точно налаштовувати розміри та конфігурацію системи."
          />
          <FeatureCard 
            icon={Cpu} 
            title="Змінне кріплення" 
            description="Універсальне кріплення для двигуна, яке легко замінити під ваші потреби."
          />
          <FeatureCard 
            icon={Activity} 
            title="Кулачковий механізм" 
            description="Овальний кулачок перетворює обертання двигуна в точний лінійний рух натискання."
          />
          <FeatureCard 
            icon={Zap} 
            title="Кабель-менеджмент" 
            description="Інтегровані шляхи для проводки забезпечують чистоту та безпеку кабелів."
          />
          <FeatureCard 
            icon={Battery} 
            title="Живлення дронів" 
            description="Спеціальне кріплення для акумуляторів, сумісне з поширеними батареями для дронів."
          />
        </div>
      </section>

      {/* Video Demo Section */}
      <section id="demo" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="SYSTEM IN ACTION">ДЕМОНСТРАЦІЯ РОБОТИ</SectionTitle>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <DemoVideo 
                title="ОГЛЯД СИСТЕМИ" 
                url="1E02iO8UoOk" 
                type="youtube" 
              />
            </div>
            <DemoVideo 
              title="ТЕСТУВАННЯ МЕХАНІЗМУ" 
              url="CUe4MlYnYHY" 
              type="youtube" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8">
              <h4 className="text-brand-primary font-mono text-xs mb-4">01. СТРУКТУРНА РАМА</h4>
              <p className="text-sm text-white/60">Виготовлена з переробленого пластику, забезпечує міцність та екологічність.</p>
            </div>
            <div className="glass-card p-8">
              <h4 className="text-brand-primary font-mono text-xs mb-4">02. МОДУЛЬ АКТУАЦІЇ</h4>
              <p className="text-sm text-white/60">Двигун постійного струму та 3D-друкований тримач для швидкої заміни.</p>
            </div>
            <div className="glass-card p-8">
              <h4 className="text-brand-primary font-mono text-xs mb-4">03. МОДУЛЬ ЖИВЛЕННЯ</h4>
              <p className="text-sm text-white/60">Гнучке розміщення батареї завдяки модульному інтерфейсу кріплення.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center">
          <SectionTitle subtitle="SYSTEM ARCHITECTURE">АРХІТЕКТУРА СИСТЕМИ</SectionTitle>
          
          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-brand-primary/20 blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <img 
                src="./images/hero.jpg" 
                alt="System Architecture" 
                className="relative rounded-xl border border-white/10 w-full object-cover shadow-2xl hover:brightness-110 transition-all duration-700"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-brand-primary/20 blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <img 
                src="./images/Detali1.png" 
                alt="System Details 1" 
                className="relative rounded-xl border border-white/10 w-full object-cover shadow-2xl hover:brightness-110 transition-all duration-700"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group md:col-span-2"
            >
              <div className="absolute -inset-1 bg-brand-primary/20 blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <img 
                src="./images/Detali2.png" 
                alt="System Details 2" 
                className="relative rounded-xl border border-white/10 w-full object-cover shadow-2xl hover:brightness-110 transition-all duration-700"
              />
            </motion.div>
          </div>

          {/* Text Description */}
          <div className="space-y-8 text-left max-w-2xl">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center text-brand-primary font-bold">1</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Structural Frame</h4>
                <p className="text-white/60">Основа системи, що складається з балок та стрижнів, які формують жорсткий каркас.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center text-brand-primary font-bold">2</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Actuation Module</h4>
                <p className="text-white/60">Серце пристрою: двигун та кулачок, що виконують механічну роботу.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center text-brand-primary font-bold">3</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Power Module</h4>
                <p className="text-white/60">Система енергозабезпечення з інтегрованою проводкою та кріпленням батареї.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Models Section */}
      <section id="models" className="py-24 bg-brand-primary text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-5xl font-display font-black tracking-tighter mb-4">3D МОДЕЛІ</h2>
              <p className="max-w-md font-medium opacity-80">Всі деталі доступні для друку. Завантажте STL файли та зберіть свій актуатор самостійно.</p>
            </div>
            <a 
              href="/models/all_models.zip" 
              className="bg-black text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-colors"
            >
              <Download className="w-5 h-5" /> ЗАВАНТАЖИТИ ВСЕ (.ZIP)
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['frame_beam.stl', 'motor_mount.stl', 'battery_mount.stl', 'cam.stl'].map((file) => (
              <a 
                key={file} 
                href={`/models/${file}`}
                download
                className="bg-black/5 border border-black/10 p-6 rounded-xl flex justify-between items-center group hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5" />
                  <span className="font-mono text-sm font-bold">{file}</span>
                </div>
                <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Strategy Section */}
      <section id="roadmap" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-display font-black tracking-tighter mb-4"
            >
              ШЛЯХ ДО УСПІХУ
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-white/60 max-w-3xl mx-auto"
            >
              Не заводом ми почнемо, а перевіркою попиту. Реальна стратегія стартапу, яка працює.
            </motion.p>
          </div>

          {/* Four Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                stage: "ЕТАП 1",
                emoji: "🚀",
                cost: "€300",
                timeline: "Місяць 1-2",
                title: "MVP + Перевірка",
                points: [
                  "1× 3D принтер",
                  "Надрукуй 20-50 шт",
                  "Тестуй продукт",
                  "Продавай на OLX/Etsy"
                ],
                goal: "10-50 продажів = Попит ✓"
              },
              {
                stage: "ЕТАП 2",
                emoji: "📱",
                cost: "€500-3k",
                timeline: "Місяць 3-4",
                title: "Маркетинг & Спільнота",
                points: [
                  "TikTok / YouTube",
                  "Reddit / Telegram",
                  "Discord сервер",
                  "Зворотний зв'язок"
                ],
                goal: "100-500 продажів"
              },
              {
                stage: "ЕТАП 3",
                emoji: "🏭",
                cost: "€3k-10k",
                timeline: "Місяць 5-8",
                title: "Масштаб без Заводу",
                points: [
                  "Замовити в Китаї",
                  "Аутсорсинг виробництва",
                  "Без вложення в станки",
                  "1000+ комплектів"
                ],
                goal: "Прибуток 20-30%"
              },
              {
                stage: "ЕТАП 4",
                emoji: "🏢",
                cost: "€50k+",
                timeline: "Місяць 12+",
                title: "Свій Завод",
                points: [
                  "Тільки якщо попит stабільний",
                  "Екструдер + ін'єкція",
                  "Або інвестор",
                  "Масштаб без меж"
                ],
                goal: "Міжнародна експансія"
              }
            ].map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 border border-brand-primary/20 hover:border-brand-primary/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-brand-primary font-bold">{stage.stage}</span>
                  <span className="text-3xl">{stage.emoji}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-1">{stage.title}</h3>
                <div className="mb-4 space-y-1">
                  <div className="text-2xl font-bold text-brand-primary">{stage.cost}</div>
                  <div className="text-xs text-white/40 font-mono">{stage.timeline}</div>
                </div>
                <ul className="space-y-2 mb-6">
                  {stage.points.map((point, i) => (
                    <li key={i} className="text-sm text-white/60 flex gap-2">
                      <span className="text-brand-primary flex-shrink-0">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-white/50 font-mono">{stage.goal}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Applications */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="USE CASES">СФЕРИ ЗАСТОСУВАННЯ</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-10 flex gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Settings className="w-8 h-8 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4">Дистанційне керування</h4>
              <p className="text-white/60">Активація фізичних елементів керування на відстані без втручання в електроніку пристрою.</p>
            </div>
          </div>
          <div className="glass-card p-10 flex gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Play className="w-8 h-8 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4">Автоматизація на дронах</h4>
              <p className="text-white/60">Легка та надійна система для виконання механічних дій під час польоту.</p>
            </div>
          </div>
          <div className="glass-card p-10 flex gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Cpu className="w-8 h-8 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4">Прототипування робототехніки</h4>
              <p className="text-white/60">Швидке створення механічних інтерфейсів для нових робототехнічних проектів.</p>
            </div>
          </div>
          <div className="glass-card p-10 flex gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4">Промислове тестування</h4>
              <p className="text-white/60">Автоматизоване тестування кнопок та перемикачів на виробничих лініях.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-primary rounded flex items-center justify-center">
              <Settings className="text-black w-4 h-4" />
            </div>
            <span className="font-display font-bold tracking-tighter">MODULAR ACTUATOR</span>
          </div>
          
          <div className="flex items-center gap-8 text-xs font-mono text-white/40">
            <span>© 2026 МОДУЛЬНА СИСТЕМА ДИСТАНЦІЙНОГО КЕРУВАННЯ</span>
            <a href="mailto:andriy.liashkevich@gmail.com" className="hover:text-brand-primary transition-colors">
              andriy.liashkevich@gmail.com
            </a>
            <span className="flex items-center gap-2"><Shield className="w-3 h-3" /> ЛІЦЕНЗІЯ MIT</span>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
              <LinkIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
