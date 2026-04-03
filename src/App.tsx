/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  Activity,
  Volume2,
  Volume,
  Pause,
  Heart,
  Copy,
  Check
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
      <source src={`${import.meta.env.BASE_URL}images/background.mp4`} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-brand-bg/40" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg/30 to-brand-bg" />
  </div>
);

const BrandLogo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="fixed bottom-8 right-80 z-30 hidden md:block"
  >
    <img
      src={`${import.meta.env.BASE_URL}images/logo.png`}
      alt="Modular Remote Actuator System"
      className="h-20 w-auto opacity-90 hover:opacity-100 transition-opacity"
    />
  </motion.div>
);

const DonateButtons = () => {
  const [copied, setCopied] = useState(false);
  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);

  const developerCard = '4149497533883320';
  const developerName = 'Liashkevich Nadia';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
    >
      <AnimatePresence>
        {showDeveloperInfo && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-brand-bg/90 backdrop-blur-lg border border-red-500/30 rounded-lg p-4 min-w-64 text-sm"
          >
            <p className="text-white/60 mb-2">❤️ Карта розробника:</p>
            <div className="bg-black/50 p-3 rounded gap-2 flex items-center justify-between mb-3">
              <code className="text-red-500 font-mono text-xs">{developerCard}</code>
              <button
                onClick={() => copyToClipboard(developerCard)}
                className="hover:bg-red-500/20 p-1 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-white/60" />
                )}
              </button>
            </div>
            <p className="text-white/50 text-xs mb-1">Ім'я:</p>
            <p className="text-white text-xs mb-3">{developerName}</p>
            <p className="text-white/40 text-xs">💰 Ваш донат підтримує розробку та експерименти</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопка донату розробнику */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDeveloperInfo(!showDeveloperInfo)}
        className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors group relative"
        title="Донат розробнику"
      >
        <Heart className="w-5 h-5" />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded-full border border-red-500/40"
        />
      </motion.button>

      {/* Кнопка донату проекту - посилання на Privat24 */}
      <motion.a
        href="https://www.privat24.ua/send/j2l2d"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary hover:bg-brand-primary/20 transition-colors group relative"
        title="Донат проекту - Privat24"
      >
        <Zap className="w-5 h-5" />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded-full border border-brand-primary/40"
        />
      </motion.a>
    </motion.div>
  );
};

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}images/background-music.mp3`}
        loop
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-4"
      >
        <AnimatePresence>
          {showVolumeControl && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 120 }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-3 bg-brand-bg/80 backdrop-blur-lg border border-white/10 px-4 py-3 rounded-full"
            >
              <Volume className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-brand-primary"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlayPause}
          onMouseEnter={() => setShowVolumeControl(true)}
          onMouseLeave={() => setShowVolumeControl(false)}
          className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary hover:bg-brand-primary/20 transition-colors group relative"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
          <motion.div
            animate={isPlaying ? { opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full border border-brand-primary/60"
          />
        </motion.button>
      </motion.div>
    </>
  );
};

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
      <BackgroundMusic />
      <DonateButtons />
      <BrandLogo />
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
            <a href="#about" className="hover:text-brand-primary transition-colors">Про проект</a>
            <a href="#features" className="hover:text-brand-primary transition-colors">Можливості</a>
            <a href="#demo" className="hover:text-brand-primary transition-colors">Демо</a>
            <a href="#usecases" className="hover:text-brand-primary transition-colors">Застосування</a>
            <a href="#roadmap" className="hover:text-brand-primary transition-colors">Стан розробки</a>
            <a href="#risks" className="hover:text-brand-primary transition-colors">Чесність</a>
          </div>
          <a 
            href="mailto:andriy.liashkevich@gmail.com?subject=Спільнокошт MRA - Інформація"
            className="bg-brand-primary text-black px-6 py-2 rounded font-bold text-sm hover:bg-white transition-colors"
          >
            КОНТАКТИ
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono rounded">
                R&D ЕТАП • СПІЛЬНОКОШТ準ПОДІЯ
              </span>
              <SystemStatus />
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tighter mb-2 leading-[0.9]">
              MODULAR REMOTE <br />
              <span className="text-brand-primary glow-text">ACTUATOR SYSTEM</span>
            </h1>
            
            <div className="mb-6">
              <span className="text-2xl md:text-3xl font-display font-bold text-white">
                Майбутнє модульної автоматизації: <span className="text-brand-primary">від ідеї до першого прототипу</span>
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
                src={`${import.meta.env.BASE_URL}images/hero.jpg`} 
                alt="Drone Production Workshop" 
                className="relative rounded-xl border border-white/10 w-full max-w-2xl h-48 object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/40 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                FACILITY_LOC: UNIT_07 // PRODUCTION_FLOOR
              </div>
            </motion.div>

            <p className="max-w-2xl text-lg md:text-xl text-white/60 mb-10 leading-relaxed">
              Ми розробляємо універсальну систему дистанційної активації для дронів та робототехніки. Зараз ми на етапі R&D (досліджень та розробки) і готуємо запуск першої передсерійної партії. Кожен внесок наближає нас до реальності.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#about"
                className="bg-brand-primary text-black px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors"
              >
                📖 ДІЗНАТИСЬ БІЛЬШЕ
              </a>
              <a href="mailto:andriy.liashkevich@gmail.com?subject=MRA Спільнокошт - Інформація" className="border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                <Play className="w-5 h-5 fill-current" /> КОНТАКТИ
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

      {/* About Project Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6 bg-white/5">
        <div className="max-w-4xl">
          <SectionTitle subtitle="STATUS: R&D">ВІД КОНЦЕПТУ ДО РЕАЛЬНОСТІ</SectionTitle>
          <div className="space-y-6 text-white/70 mb-12">
            <p className="text-xl leading-relaxed">
              <span className="text-brand-primary font-bold">Modular Remote Actuator</span> — це не просто залізо. Це гнучка екосистема, що дозволяє автоматизувати фізичні процеси там, де неможливо втрутитися в електроніку.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6">
              <h4 className="text-brand-primary font-mono text-xs mb-2">STATUS</h4>
              <p className="text-xl font-bold">Прототипування</p>
              <p className="text-sm text-white/50 mt-2">Підбір постачальників, тестування механіки</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-brand-primary font-mono text-xs mb-2">МЕТА</h4>
              <p className="text-xl font-bold">Збір коштів</p>
              <p className="text-sm text-white/50 mt-2">На першу партію комплектуючих та польові експерименти</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-brand-primary font-mono text-xs mb-2">ТЕРМІНИ</h4>
              <p className="text-xl font-bold">3-4 місяці</p>
              <p className="text-sm text-white/50 mt-2">Готовність першої партії з моменту збору</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="TECHNICAL CAPABILITIES">МОЖЛИВОСТІ СИСТЕМИ</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Box} 
            title="Модульна архітектура" 
            description="Квадратні балки з переробленого пластику — міцність, яку ми вдосконалюємо з кожним ітераційним друком."
          />
          <FeatureCard 
            icon={Wrench} 
            title="Точне налаштування" 
            description="Метричні різьбові стрижні адаптуються під будь-які габарити вашого пристрою."
          />
          <FeatureCard 
            icon={Cpu} 
            title="Смарт-механіка" 
            description="Кулачковий механізм власної розробки перетворює обертання на чисту силу натискання."
          />
          <FeatureCard 
            icon={Activity} 
            title="Енергонезалежність" 
            description="Інтегроване кріплення під стандартні акумулятори дронів (Lipo 2S-6S через BEC)."
          />
          <FeatureCard 
            icon={Zap} 
            title="Мініатюризація" 
            description="Вага модуля мінімізована для збереження льотних характеристик вашого БПЛА."
          />
          <FeatureCard 
            icon={Battery} 
            title="Швидкість розробки" 
            description="Модульний дизайн прискорює прототипування нових механічних інтерфейсів."
          />
        </div>
      </section>

      {/* Video Demo Section */}
      <section id="demo" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="PROOF OF CONCEPT">ДЕМОНСТРАЦІЯ РОБОТИ</SectionTitle>
          
          <div className="mb-12">
            <div className="glass-card p-8 border-l-4 border-brand-primary">
              <p className="text-white/70 mb-4">
                <span className="text-brand-primary font-bold">Випробувальний стенд:</span> Калібрування точності натискання на масо-габаритних макетах при використанні системи стабілізації камери.
              </p>
              <p className="text-sm text-white/50">
                Це гарантує, що наша система працює з максимальною точністю, навіть у складних умовах реальних операцій.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8">
              <h4 className="text-brand-primary font-mono text-xs mb-4">01. МЕХАНІЧНА БАЗА</h4>
              <p className="text-sm text-white/60">Модульна архітектура със квадратними балками та метричними стрижнями позволяє швидко прототипувати нові конфігурації.</p>
            </div>
            <div className="glass-card p-8">
              <h4 className="text-brand-primary font-mono text-xs mb-4">02. АКТУАЦІЙНИЙ МОДУЛЬ</h4>
              <p className="text-sm text-white/60">Беззліночний двигун 720KV + кулачковий механізм для перетворення обертання на точне лінійне натискання.</p>
            </div>
            <div className="glass-card p-8">
              <h4 className="text-brand-primary font-mono text-xs mb-4">03. ЕЛЕКТРОНІКА</h4>
              <p className="text-sm text-white/60">ESC контролер з PWM управлінням та можливістю інтеграції з системами автопілота.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center">
          <SectionTitle subtitle="TECHNICAL STACK">АРХІТЕКТУРА СИСТЕМИ</SectionTitle>
          
          {/* Text Description */}
          <div className="space-y-8 text-left max-w-2xl w-full">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center text-brand-primary font-bold">1</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Механічна база</h4>
                <p className="text-white/60">Модульна система із квадратних поліаміду балок (30x30x250mm) та нержавіючих різьбових стрижнів М8 для регульованої довжини конструкції.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center text-brand-primary font-bold">2</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Актуаційний модуль</h4>
                <p className="text-white/60">720KV BLDC двигун + ESC контролер + кулачковий механізм (овальний кулачок 3D-друкований з Nylon CF) для перетворення обертання на лінійне натискання до 150N.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-brand-primary flex items-center justify-center text-brand-primary font-bold">3</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Системи управління</h4>
                <p className="text-white/60">PWM управління (1000-2000µs) з можливістю інтеграції з BEC контролерами дронів або автономними мікроконтролерами (Arduino/STM32).</p>
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
              href={`${import.meta.env.BASE_URL}models/all_models.zip`} 
              className="bg-black text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-colors"
            >
              <Download className="w-5 h-5" /> ЗАВАНТАЖИТИ ВСЕ (.ZIP)
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['frame_beam.stl', 'motor_mount.stl', 'battery_mount.stl', 'cam.stl'].map((file) => (
              <a 
                key={file} 
                href={`${import.meta.env.BASE_URL}models/${file}`}
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

      {/* Development Roadmap Section */}
      <section id="roadmap" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-display font-black tracking-tighter mb-4"
            >
              ПЛАН РОЗВИТКУ
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-white/60 max-w-3xl mx-auto"
            >
              Прозрачная дорожная карта від прототипу до комерційного запуску.
            </motion.p>
          </div>

          {/* Development Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                stage: "ФАЗА 1",
                emoji: "🔬",
                timeline: "Май-Июнь 2026",
                title: "Фінальне тестування",
                points: [
                  "Інтеграція з БПЛА",
                  "Стресс-тести навантажень",
                  "Оптимізація маси",
                  "Вибір компонентів"
                ],
                goal: "Готовість до Crowdfunding"
              },
              {
                stage: "ФАЗА 2",
                emoji: "💰",
                timeline: "Липень-Серпень 2026",
                title: "Спільнокошт",
                points: [
                  "Запуск кампанії",
                  "Комунікація з інвесторами",
                  "Предзамовлення 50-100 шт",
                  "Зворотній зв'язок"
                ],
                goal: "Мета: €5-10k"
              },
              {
                stage: "ФАЗА 3",
                emoji: "🏭",
                timeline: "Вересень-Листопад",
                title: "Серійне виробництво",
                points: [
                  "Замовлення компонентів",
                  "Контракт з виробником",
                  "Логістичні розрахунки",
                  "Монтаж та тестування"
                ],
                goal: "Перша партія готова"
              },
              {
                stage: "ФАЗА 4",
                emoji: "📦",
                timeline: "Грудень 2026",
                title: "Доставка & Поддержка",
                points: [
                  "Прямі поставки бекерам",
                  "Технічна поддержка",
                  "Документація на укр/англ",
                  "Сбор фідбеку"
                ],
                goal: "Задоволені клієнти"
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

      {/* Use Cases */}
      <section id="usecases" className="py-24 max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="REAL WORLD APPLICATIONS">СФЕРИ ЗАСТОСУВАННЯ</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-10 flex gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Settings className="w-8 h-8 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4">Remote Control 2.0</h4>
              <p className="text-white/60">Натискання кнопок, перемикання тумблерів або скидання корисного навантаження без паяльника.</p>
            </div>
          </div>
          <div className="glass-card p-10 flex gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Play className="w-8 h-8 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4">Drone Mission Ready</h4>
              <p className="text-white/60">Вага модуля мінімізована для збереження льотних характеристик вашого БПЛА.</p>
            </div>
          </div>
          <div className="glass-card p-10 flex gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Cpu className="w-8 h-8 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4">R&D Лабораторія</h4>
              <p className="text-white/60">Швидке створення механічних інтерфейсів для ваших власних винаходів.</p>
            </div>
          </div>
          <div className="glass-card p-10 flex gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Activity className="w-8 h-8 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4">Industrial Testing</h4>
              <p className="text-white/60">Можливість запрограмувати точні механічні дії для автоматизованих тестів.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Honesty & Risks Section */}
      <section id="risks" className="py-24 bg-brand-primary/5">
        <div className="max-w-4xl mx-auto px-6">
          <SectionTitle subtitle="TRUST THROUGH TRANSPARENCY">ЧЕСНИЙ СТАРТАП</SectionTitle>
          <p className="text-xl text-white/70 mb-12 leading-relaxed">
            Ми <span className="text-brand-primary font-bold">не обіцяємо відправку завтра</span>. Ми обіцяємо розвиток технології разом з вами.
          </p>
          
          <div className="space-y-8">
            <div className="glass-card p-8 border-l-4 border-brand-primary">
              <h4 className="text-xl font-bold mb-2 text-brand-primary">📦 Логістика</h4>
              <p className="text-white/60">
                Основні компоненти (мотори, контролери) замовляються у перевірених партнерів у Китаї та ЄС. 
                <span className="block mt-2 font-mono text-sm text-brand-primary">Орієнтовний час: 45-60 днів</span>
              </p>
            </div>
            
            <div className="glass-card p-8 border-l-4 border-brand-primary">
              <h4 className="text-xl font-bold mb-2 text-brand-primary">🖨️ Виробництво</h4>
              <p className="text-white/60">
                Ми використовуємо 3D-друк промислового рівня (Nylon/CF) для перших партій, щоб забезпечити максимальну стійкість. 
                <span className="block mt-2 font-mono text-sm text-brand-primary">Стандартна толерантність: ±0.2mm</span>
              </p>
            </div>
            
            <div className="glass-card p-8 border-l-4 border-brand-primary">
              <h4 className="text-xl font-bold mb-2 text-brand-primary">🧪 Випробування</h4>
              <p className="text-white/60">
                Кожен внесок наближає нас до реальних тестів з навантаженням на БПЛА та стабілізаторами. 
                <span className="block mt-2 font-mono text-sm text-brand-primary">Результати публікуватимуться в оновленнях</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-brand-primary rounded flex items-center justify-center">
                  <Settings className="text-black w-4 h-4" />
                </div>
                <span className="font-display font-bold tracking-tighter">MODULAR ACTUATOR</span>
              </div>
              <p className="text-sm text-white/50">R&D Спільнокошт • 2026</p>
            </div>
            
            <div>
              <h4 className="font-mono text-xs text-brand-primary font-bold mb-4 uppercase">Контакти</h4>
              <p className="text-sm text-white/60 mb-2">Маєте пропозиції або змахи на партнерство?</p>
              <a href="mailto:andriy.liashkevich@gmail.com" className="text-brand-primary hover:text-white transition-colors font-mono text-sm">
                andriy.liashkevich@gmail.com
              </a>
            </div>
            
            <div>
              <h4 className="font-mono text-xs text-brand-primary font-bold mb-4 uppercase">Локація</h4>
              <p className="text-sm text-white/60">Львів, Україна</p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/40">
            <span>© 2026 MODULAR REMOTE ACTUATOR SYSTEM</span>
            <span className="flex items-center gap-2"><Shield className="w-3 h-3" /> MIT LICENSE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
