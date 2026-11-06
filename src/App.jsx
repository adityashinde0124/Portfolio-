import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const GITHUB_USER = 'adityashinde0124';
const RESUME_HREF = '/Aditya_Shinde_Resume.html';

const IconGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22 2H2v20h20V2Z" />
  </svg>
);

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.7" d="M4 6.5h16v11H4v-11Z" />
    <path stroke="currentColor" strokeWidth="1.7" d="m5 7 7 6 7-6" />
  </svg>
);

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" d="M7 3.8h3.2l1.1 2.8-1.7 1.2a12.6 12.6 0 0 0 6.6 6.6l1.2-1.7 2.8 1.1V17c0 1.2-1 2.2-2.2 2.2C8.9 19.2 4.8 15.1 4.8 6A2.2 2.2 0 0 1 7 3.8Z" />
  </svg>
);

const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.7" d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.8 12 21 12 21Z" />
    <circle cx="12" cy="10.8" r="2.1" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.8" d="M14 5h5v5M19 5l-9 9" />
    <path stroke="currentColor" strokeWidth="1.8" d="M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />
  </svg>
);

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.8" d="M12 4v12m0 0 4-4m-4 4-4-4M5 19h14" />
  </svg>
);

const SectionHeader = ({ index, title, kicker }) => (
  <div className="section-header">
    <p className="section-index">{index}</p>
    <div>
      {kicker && <p className="section-kicker">{kicker}</p>}
      <h2>{title}</h2>
      <div className="underline"></div>
    </div>
  </div>
);

const useReveal = (deps = []) => {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal:not(.visible), .section-header:not(.in-view)');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((el) => el.classList.add(el.classList.contains('section-header') ? 'in-view' : 'visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.classList.contains('section-header') ? 'in-view' : 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
};

const PageLoader = () => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), 1450);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <div className={`page-loader ${done ? 'page-loader--done' : ''}`} aria-hidden="true">
      <div className="loader-mark">AS<span>.</span></div>
      <div className="loader-track"><span /></div>
      <p>INITIALIZING PORTFOLIO <b>/// 2026</b></p>
    </div>
  );
};

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <div className="scroll-progress"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>;
};

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(media.matches && !reduce.matches);
    sync();
    media.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
    return () => {
      media.removeEventListener('change', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return undefined;
    }

    document.body.classList.add('has-custom-cursor');
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let frame = 0;

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
    };

    const onOver = (event) => {
      const interactive = event.target.closest('a, button, .project-card, .tag');
      ringRef.current?.classList.toggle('is-hover', Boolean(interactive));
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};


const CursorTrail = () => {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return undefined;
    const colors = ['#ff365d', '#ffb347', '#56d9ff', '#b78cff', '#ffffff'];
    let last = 0; let colorIndex = 0;
    const onMove = (event) => {
      const now = performance.now();
      if (now - last < 42) return;
      last = now;
      const particle = document.createElement('span');
      particle.className = 'cursor-trail-particle';
      particle.style.left = `${event.clientX}px`;
      particle.style.top = `${event.clientY}px`;
      particle.style.setProperty('--particle-color', colors[colorIndex % colors.length]);
      particle.style.setProperty('--particle-rotate', `${(Math.random() * 70) - 35}deg`);
      document.body.appendChild(particle); colorIndex += 1;
      window.setTimeout(() => particle.remove(), 760);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return null;
};

const SignalTicker = () => {
  const items = ['FULL STACK DEVELOPMENT', 'CYBERSECURITY', 'IOT SYSTEMS', 'CLOUD & DEPLOYMENT', 'BUILD • SECURE • SHIP'];
  return <div className="signal-ticker" aria-label="Areas of expertise"><div className="signal-ticker-track">{[0, 1].map((copy) => <div className="signal-ticker-group" key={copy} aria-hidden={copy === 1}>{items.map((item) => <span className="signal-ticker-item" key={`${copy}-${item}`}><i />{item}</span>)}</div>)}</div></div>;
};

const MetricsStrip = () => <div className="metrics-strip container" aria-label="Portfolio highlights"><div className="metric-cell"><strong>09</strong><span>FEATURED PROJECTS</span></div><div className="metric-cell"><strong>06</strong><span>TECH DOMAINS</span></div><div className="metric-cell"><strong>24/7</strong><span>BUILDER MINDSET</span></div><div className="metric-cell"><strong>∞</strong><span>ALWAYS LEARNING</span></div></div>;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    const ids = ['home', 'about', 'skills', 'projects', 'experience', 'github', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const links = [
    ['home', 'Home'],
    ['about', 'About'],
    ['skills', 'Skills'],
    ['projects', 'Projects'],
    ['experience', 'Experience'],
    ['github', 'GitHub'],
    ['contact', 'Contact'],
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${menuOpen ? 'open' : ''}`}>
      <div className="nav-content">
        <a href="#home" className="logo" onClick={closeMenu}>
          Aditya<span>.</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : ''}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <a href={RESUME_HREF} className="nav-resume" download onClick={closeMenu}>
            Resume
          </a>
        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <div className={`hamburger ${menuOpen ? 'active' : ''}`}></div>
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const roles = [
    'Full Stack Developer',
    'MERN Stack',
    'IoT Developer',
    'Cyber Enthusiast',
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2800);

    return () => window.clearInterval(id);
  }, [roles.length]);

  return (
    <section id="home" className="hero">
      <div className="hero-wordmark" aria-hidden="true">
        <span>P</span><span>O</span><span>R</span><span>T</span><span>F</span><span>O</span><span>L</span><span>I</span><span>O</span>
      </div>
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true"></div>

      <div className="hero-layout">
        {/* LEFT SIDE - YOUR PHOTO */}
        <div className="hero-photo-section hero-in">
          <div className="hero-photo-frame">
            <img
              src="/profile.jpeg"
              alt="Aditya Shinde"
              className="hero-photo"
            />
          </div>

          <div className="photo-caption">
            <span className="status-dot"></span>
            Available for opportunities
          </div>
        </div>

        {/* RIGHT SIDE - ALL YOUR CONTENT */}
        <div className="hero-content">
          <p className="welcome-text hero-in"><span className="live-signal-dot" /> Welcome to My Portfolio <span className="hero-build-label">SYSTEM ONLINE / 2026</span></p>

          <p className="greeting hero-in delay-1">
            Hi, I'm
          </p>

          <h1 className="name-title hero-in delay-2">
            Aditya Shinde
          </h1>

          <p className="role-live hero-in delay-3" aria-live="polite">
            <span
              key={roles[roleIndex]}
              className="role-word"
            >
              {roles[roleIndex]}
            </span>
          </p>

          <h2 className="role hero-in delay-4">
            Full Stack Developer | MERN Stack | IoT Developer | Cyber Enthusiast
          </h2>

          <p className="hero-desc hero-in delay-5">
            I build scalable web applications, smart IoT systems, and secure
            backend solutions.
          </p>

          <div className="btn-group hero-in delay-6">
            <a href="#projects" className="btn btn-primary">
              View my work
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>

            <a href={RESUME_HREF} className="btn btn-outline" download>
              <IconDownload /> Resume
            </a>

            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <IconGitHub /> GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/aditya-shinde-b1b4542b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <IconLinkedIn /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionHeader index="01" title="About Me" />
        <div className="about-content box-card reveal">
          <p>
            I am a passionate <strong>Full Stack Developer</strong> with strong skills in MERN Stack development, backend systems, IoT solutions, and cybersecurity fundamentals. I enjoy building real-world projects that solve practical problems and improve user experience.
          </p>
          <p>
            My expertise includes developing scalable web applications using React.js, Node.js, Express.js, MongoDB, and Django, along with creating secure backend systems using REST APIs, JWT Authentication, and Database Management. I also work on IoT-based projects using Arduino, ESP32, GSM modules, Bluetooth modules, sensors, and automation systems.
          </p>
          <p>
            I have built multiple projects including real-time chat applications, attendance tracker systems, college management platforms, SGU Bus Management System, Smart Restaurant Ordering System, IoT-based Smart Irrigation System, AI-Based Smile and Drowsiness Detection System, Bluetooth-controlled vehicles, and crop health monitoring systems.
          </p>
          <p>
            I am highly interested in problem-solving, system design, cloud technologies, and cybersecurity. I continuously focus on improving my technical skills and learning modern technologies that help me grow as a professional software developer.
          </p>
          <p className="goal">
            My goal is to become a highly skilled Software Engineer specializing in Full Stack Development, Cloud Computing, Cybersecurity, and IoT-based smart solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    { title: "💻 Programming Languages", skills: ["C++", "JavaScript", "Python", "C", "HTML5", "CSS3"] },
    { title: "🌐 Web Development", skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Authentication", "Socket.IO", "Tailwind CSS", "Bootstrap"] },
    { title: "⚙ Backend Development", skills: ["Django", "Django REST Framework (DRF)", "MySQL", "MongoDB", "API Integration", "Authentication & Authorization"] },
    { title: "🔌 IoT & Embedded Systems", skills: ["Arduino", "ESP32", "IoT System Design", "Sensor Integration", "Relay Modules", "GSM Module (SIM800L)", "Bluetooth Modules", "Motor Driver Integration"] },
    { title: "☁ Cloud & Dev Tools", skills: ["Git", "GitHub", "Postman", "VS Code", "Linux Basics", "Nginx", "AWS Basics"] },
    { title: "🔐 Cybersecurity & Networking", skills: ["Networking Fundamentals", "Basic Linux Security", "Web Security Basics", "Authentication Systems", "Cybersecurity Fundamentals"] },
    { title: "🧠 Soft Skills", skills: ["Problem Solving", "Team Collaboration", "Project Management", "Communication", "Fast Learning", "Debugging"] }
  ];

  return (
    <section id="skills" className="skills section alter-bg">
      <div className="container">
        <SectionHeader index="02" title="Skills" />
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-card box-card reveal" style={{ '--delay': `${idx * 60}ms` }}>
              <h3>{category.title}</h3>
              <div className="tags">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projectList = [
    {
      title: "MERN Real-Time Chat Application",
      description: "Private messaging, group chat, authentication, online status, real-time messaging using Socket.IO, secure backend, and modern responsive UI.",
      tags: ["MongoDB", "Express", "React", "Node.js", "Socket.IO"],
      github: "https://github.com/adityashinde0124/ChatApp",
    },
    {
      title: "College Management System",
      description: "Student management, faculty management, authentication system, attendance tracking, admin dashboard, and secure backend operations.",
      tags: ["React", "Express.js", "MongoDB"],
      github: "https://github.com"
    },
    {
      title: "Attendance Tracker Website",
      description: "Attendance marking every 2 hours, attendance storage, backend integration, student monitoring, and dashboard functionality.",
      tags: ["MERN Stack", "Backend Integration"],
      github: "https://github.com"
    },
    {
      title: "Smart Restaurant Ordering System",
      description: "Digital menu management, order placement, admin controls, table management, and restaurant workflow optimization.",
      tags: ["Django", "React", "MySQL"],
      github: "https://github.com/adityashinde0124/Smart-Restaurant-Ordering"
    },
    {
      title: "IoT Based Smart Irrigation System",
      description: "Smart farming solution using ESP32, soil moisture sensors, water pump automation, relay modules, and real-time monitoring for efficient water usage.",
      tags: ["ESP32", "IoT", "Sensors"],
      github: "https://github.com"
    },
    {
      title: "IoT Crop Health Monitoring System",
      description: "ESP32-based monitoring system using sensors like DHT11 for temperature and humidity monitoring with automation support.",
      tags: ["ESP32", "DHT11", "Automation"],
      github: "https://github.com"
    },
    {
      title: "SGU Bus Management System",
      description: "A smart transport management platform for students to track bus routes, bus timings, driver details, and improve daily transportation efficiency.",
      tags: ["React", "Node.js"],
      github: "https://github.com/adityashinde0124/SGU_bus"
    },
    {
      title: "Bluetooth Controlled Car / Boat",
      description: "Arduino and ESP32-based wireless control system using Bluetooth modules, motor drivers, and motors for remote movement.",
      tags: ["Arduino", "Bluetooth", "Motor Drivers"],
      github: "https://github.com"
    },
    {
      title: "AI-Based Smile and Drowsiness Detection System",
      description: "An AI-powered monitoring system that detects smile expressions and drowsiness using computer vision and machine learning techniques for smart surveillance and driver safety applications.",
      tags: ["AI", "Computer Vision", "Machine Learning"],
      github: "https://github.com"
    }
  ];

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <SectionHeader index="03" title="Projects" />
        <div className="projects-grid">
          {projectList.map((project, idx) => (
            <article
              key={idx}
              className="project-card box-card reveal"
              style={{ '--delay': `${(idx % 3) * 80}ms` }}
              onPointerMove={(event) => {
                if (event.pointerType !== 'mouse') return;
                const rect = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
                event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 7}deg`);
                event.currentTarget.style.setProperty('--glow-x', `${x * 100}%`);
                event.currentTarget.style.setProperty('--glow-y', `${y * 100}%`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty('--tilt-x', '0deg');
                event.currentTarget.style.setProperty('--tilt-y', '0deg');
                event.currentTarget.style.setProperty('--glow-x', '50%');
                event.currentTarget.style.setProperty('--glow-y', '50%');
              }}
            >
              <div className="project-info">
                <span className="project-num">{String(idx + 1).padStart(2, '0')}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag small-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <IconGitHub /> Code
                    </a>
                  )}
                  {project.demo && project.demo !== '#' && (
                    <a href={project.demo} target={project.demo.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">
                      <IconExternal /> Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const items = [
    {
      kind: 'Education',
      title: 'Sanjay Ghodawat University (SGU)',
      meta: 'Kolhapur, Maharashtra',
      copy: 'Academic studies and campus systems work, including the SGU Bus Management System for student transport tracking, timings, and daily operations.',
    },
    {
      kind: 'Internship',
      title: 'Smart Restaurant Ordering System',
      meta: 'Wisdom Sprout and Scalefull Technologies',
      copy: 'Internship project covering digital menu management, order placement, admin controls, table management, and restaurant workflow optimization.',
    },
    {
      kind: 'Experience',
      title: 'Academic Projects',
      meta: 'Full-stack, IoT, and AI systems',
      copy: 'Worked on multiple real-world academic and personal development projects involving MERN Stack, Django, IoT systems, AI systems, and automation solutions.',
    },
    {
      kind: 'Experience',
      title: 'Personal Projects',
      meta: 'Independent product work',
      copy: 'Built full-stack applications, IoT automation systems, AI-based detection systems, management platforms, and real-time communication systems focused on solving practical problems.',
    },

        {
      kind: 'Experience',
      title: 'Hackathon Participation',
      meta: 'Innovation challenges',
      copy: 'Participated in project development challenges and hackathons focused on innovation, problem-solving, and real-world technical solutions.',
    },
  ];

  return (
    <section id="experience" className="experience section alter-bg">
      <div className="container">
        <SectionHeader index="04" title="Education & Experience" kicker="Timeline" />
        <div className="timeline">
          {items.map((item, idx) => (
            <article key={item.title} className="timeline-item reveal" style={{ '--delay': `${idx * 70}ms` }}>
              <span className="timeline-kind">{item.kind}</span>
              <h3>{item.title}</h3>
              <p className="timeline-meta">{item.meta}</p>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const GitHubActivity = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then((res) => {
        if (!res.ok) throw new Error('profile');
        return res.json();
      }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`).then((res) => {
        if (!res.ok) throw new Error('repos');
        return res.json();
      }),
    ])
      .then(([user, list]) => {
        if (cancelled) return;
        setProfile(user);
        setRepos(Array.isArray(list) ? list : []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useReveal([profile, repos, error]);

  return (
    <section id="github" className="github section">
      <div className="container">
        <SectionHeader index="05" title="GitHub & Credentials" />
        <div className="github-layout">
          <div className="github-panel box-card reveal">
            <div className="github-head">
              <h3>GitHub activity</h3>
              <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer">
                @{GITHUB_USER} <IconExternal />
              </a>
            </div>
            {profile && (
              <div className="github-stats">
                <div><strong>{profile.public_repos}</strong><span>Public repos</span></div>
                <div><strong>{profile.followers}</strong><span>Followers</span></div>
                <div><strong>{profile.following}</strong><span>Following</span></div>
              </div>
            )}
            {error && (
              <p className="github-fallback">
                Live stats could not be loaded. Visit{' '}
                <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer">
                  github.com/{GITHUB_USER}
                </a>
                .
              </p>
            )}
            <div className="contrib-wrap">
              <img
                className="contrib-graph"
                src={`https://ghchart.rshah.org/8b7cff/${GITHUB_USER}`}
                alt={`GitHub contribution graph for ${GITHUB_USER}`}
                loading="lazy"
              />
            </div>
            <ul className="repo-list">
              {repos.map((repo) => (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                  <p>{repo.description || 'Public repository'}</p>
                  {repo.language && <span className="tag small-tag">{repo.language}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="creds-col">
            <div className="box-card reveal">
              <h3>Certifications & study</h3>
              <p className="creds-note">
                Formal certificate files are not listed here yet. These credentials reflect documented internship work and the study areas already described in this portfolio.
              </p>
              <ul className="cred-list">
                <li>
                  <span>Internship project</span>
                  <strong>Wisdom Sprout and Scalefull Technologies</strong>
                  <p>Smart Restaurant Ordering System</p>
                </li>
                <li>
                  <span>Academic credential</span>
                  <strong>Sanjay Ghodawat University (SGU)</strong>
                  <p>Campus systems and academic project work</p>
                </li>
                <li>
                  <span>Study focus</span>
                  <strong>Cybersecurity fundamentals</strong>
                  <p>Networking, authentication systems, and web security basics</p>
                </li>
                <li>
                  <span>Study focus</span>
                  <strong>AWS basics & Linux</strong>
                  <p>Cloud, Nginx, and development tooling from the skills section</p>
                </li>
              </ul>
            </div>

            <div className="box-card resume-card reveal">
              <h3>Resume</h3>
              <p>A concise resume built from the same education, experience, skills, and project content on this site.</p>
              <a className="btn btn-primary" href={RESUME_HREF} download>
                <IconDownload /> Download resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="contact section alter-bg">
      <div className="container">
        <SectionHeader index="06" title="Contact Info" />
        <div className="contact-box box-card reveal">
          <p className="contact-desc">
            Feel free to reach out to me for any work, collaboration, or suggestions. I am always open to discussing new projects and opportunities.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <span className="icon"><IconMail /></span>
              <a href="mailto:adityaanilshinde01@gmail.com">adityaanilshinde01@gmail.com</a>
            </div>
            <div className="contact-item">
              <span className="icon"><IconPhone /></span>
              <a href="tel:+919172864650">+91 9172864650</a>
            </div>
            <div className="contact-item">
              <span className="icon"><IconPin /></span>
              <span>Kolhapur, Maharashtra, India</span>
            </div>
            <div className="contact-item">
              <span className="icon"><IconLinkedIn /></span>
              <a href="https://www.linkedin.com/in/aditya-shinde-b1b4542b2/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="contact-item">
              <span className="icon"><IconGitHub /></span>
              <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <p>&copy; {new Date().getFullYear()} Aditya Shinde. All Rights Reserved.</p>
  </footer>
);

export default function App() {
  useReveal([]);

  return (
    <div className="app-container">
      <PageLoader />
      <ScrollProgress />
      <div className="aurora" aria-hidden="true" />
      <div className="ambient-grain" aria-hidden="true" />
      <CustomCursor />
      <CursorTrail />
      <Navbar />
      <Hero />
      <SignalTicker />
      <MetricsStrip />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <GitHubActivity />
      <Contact />
      <Footer />
    </div>
  );
}