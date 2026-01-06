import React from 'react';
import { useState, useEffect } from 'react';
import {
  Github,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Code,
  Shield,
  Database,
  Globe,
  ChevronRight,
  ExternalLink,
  Award,
  Languages,
  Download,
  X,
  Zap,
  ChevronLeft,
  Maximize2
} from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState('');

  const projects = [
    {
      id: 1,
      title: 'Web-Based Store & Admin System',
      description: 'Custom web-based store system with customer features and comprehensive admin panel featuring product management, POS module, order management, dashboard, sales reports, and inventory monitoring.',
      detailedDescription: 'Full-featured e-commerce platform with modern web technologies. Includes customer-facing store, comprehensive admin dashboard, real-time inventory management, advanced analytics, and integrated POS system for omnichannel retail operations.',
      icon: Code,
      technologies: ['React', 'Node.js', 'Supabase', 'Tailwind CSS'],
      features: [
        'Responsive e-commerce storefront',
        'Comprehensive admin dashboard',
        'Real-time inventory management',
        'Integrated POS system',
        'Advanced sales analytics and reporting',
        'Multi-channel order management'
      ],
      screenshots: [
        '/screenshots/pict 1.png',
        '/screenshots/pict 2.png',
        '/screenshots/pict 3.png',
        '/screenshots/pict 4.png',
        '/screenshots/pict 5.png'
      ],
      githubUrl: 'https://github.com/benedictusrangga/toko',
      liveUrl: null
    },
    {
      id: 2,
      title: 'United Heater Company Website',
      description: 'Full-stack web development for PT Usaha Saudara Mandiri (United Heater). Built complete company website with admin dashboard, RESTful APIs, and responsive design.',
      detailedDescription: 'Comprehensive company website development including Company Profile, Articles, About Us, Order Tracking, Contact, and Job Vacancy pages. Features admin dashboard with full CRUD functionality, RESTful APIs deployed on Google Cloud Platform, and responsive design optimized for all devices.',
      icon: Globe,
      technologies: ['Node.js', 'React', 'SQL Server', 'Google Cloud Platform', 'HTML/CSS', 'JavaScript','php'],
      features: [
        'Complete company website with multiple pages',
        'Admin dashboard with full CRUD functionality',
        'RESTful APIs deployed on Google Cloud Run',
        'SQL Server database integration',
        'Responsive design for all devices',
        'Order tracking system',
        'Content management system',
        'Performance optimization and testing'
      ],
      screenshots: [
        '/screenshots/uh1.png',
        '/screenshots/uh.png',
        '/screenshots/uh2.png',
        '/screenshots/uh3.png'
      ],
      githubUrl: null,
      liveUrl: 'https://unitedheater.co.id'
    },
    {
      id: 3,
      title: 'Campus Management Mobile App',
      description: 'Multi-feature mobile application to support academic and campus operations. Emphasized user-friendly interface and efficient feature navigation.',
      detailedDescription: 'Comprehensive campus management system for students and faculty featuring bus schedules, campus news, and communication tools. Designed with focus on user experience and accessibility.',
      icon: GraduationCap,
      technologies: ['Java', 'Android SDK', 'Firebase', 'REST API', 'Material Design'],
      features: [
        'Bus Schedule Information',
        'Campus multiple Website Access from app',
        'Attendance monitoring system',
        'Campus news and announcements',
        'Direct messaging between users'
      ],
      screenshots: [
        '/screenshots/campusconnect.png',
      ],
      githubUrl: 'https://github.com/benedictusrangga/CampusConnect',
      liveUrl: null
    },
    {
      id: 4,
      title: 'VPN & Malware Detection System',
      description: 'Security-focused desktop application using C#. Implemented VPN, malware detection, and security risk management modules with cryptographic hashing for malware identification.',
      detailedDescription: 'Advanced cybersecurity desktop application combining VPN functionality with real-time malware detection. Features custom VPN protocols,scan file/folder from malware , and security risk management based on allegro framework.',
      icon: Shield,
      technologies: ['C#', '.NET Framework', 'WPF', 'OpenVPN', 'Windows API'],
      features: [
        'Secure VPN connection with multiple protocols',
        'Real-time malware scanning and detection',
        'Cryptographic hash verification',
        'Security threat reporting dashboard',
        'Security risk management '
      ],
      screenshots: [
        '/screenshots/vpn.png',
      ],
      githubUrl: 'https://github.com/benedictusrangga/vpn-malware-detection',
      liveUrl: null
    },
    {
      id: 5,
      title: 'Fullstack Ticket Booking System',
      description: 'Transaction-based booking system using Java with object-oriented architecture. Implemented structured business logic and database integration with scalability and maintainable code principles.',
      detailedDescription: 'A comprehensive ticket booking system built with Java featuring complete transaction management, user authentication, seat selection, payment processing, and admin dashboard. The system implements clean architecture principles with proper separation of concerns and robust error handling.',
      icon: Database,
      technologies: ['Java', 'MySQL', 'Swing GUI', 'JDBC', 'Maven'],
      features: [
        'User registration and authentication',
        'Real-time seat availability',
        'Secure payment processing',
        'Booking history and management',
        'Admin dashboard for system management',
        'Report generation and analytics'
      ],
      screenshots: [],
      githubUrl: 'https://github.com/benedictusrangga/movie-ticket-booking-system',
      liveUrl: null
    },
    {
      id: 6,
      title: 'Mobile E-Commerce Application',
      description: 'Android-based e-commerce application using Java. Implemented product listing, transaction flow, and user interaction features with focus on usability.',
      detailedDescription: 'Modern Android e-commerce application with intuitive user interface, secure payment integration, real-time inventory management, and comprehensive order tracking system. Built with modern Android development practices and Material Design guidelines.',
      icon: Globe,
      technologies: ['Java', 'Android SDK', 'SQLite', 'Retrofit', 'Material Design'],
      features: [
        'Product catalog with search and filters',
        'Shopping cart and wishlist functionality',
        'Secure user authentication',
        'Multiple payment methods integration',
        'Order tracking and history',
        'Push notifications for order updates'
      ],
      screenshots: [],
      githubUrl: 'https://github.com/benedictusrangga/ecommerce',
      liveUrl: null
    }
  ];

  const openModal = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const openFullscreen = (imageSrc: string) => {
    setFullscreenImage(imageSrc);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setFullscreenImage('');
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          closeFullscreen();
        } else if (isModalOpen) {
          closeModal();
        }
      }
      if (isModalOpen && selectedProject) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, isFullscreen, selectedProject]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-cyan-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              BR
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-cyan-400 transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                  <img
                    src="/profile-photo.png"
                    alt="Benedictus Rangga Aryo Saputro"
                    className="w-full h-full object-cover object-center scale-110"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 animate-pulse"></div>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Benedictus Rangga Aryo Saputro
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Fullstack Developer | Cyber Security Specialist
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
                <a href="mailto:benedictus.rangga9@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all hover:scale-105">
                  <Mail className="w-5 h-5" />
                  <span>benedictus.rangga9@gmail.com</span>
                </a>
                <a href="tel:085138981803" className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all hover:scale-105">
                  <Phone className="w-5 h-5" />
                  <span>0851-3898-1803</span>
                </a>
                <a href="https://github.com/benedictusrangga" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all hover:scale-105">
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              </div>
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
              >
                Explore My Work
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-cyan-400" />
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-cyan-400">President University</h4>
                  <p className="text-gray-300">Bachelor of Informatics (Cyber Security)</p>
                  <p className="text-gray-400">2022 – 2025 | GPA: 3.59 / 4.00</p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-yellow-400">
                    <Award className="w-4 h-4" />
                    <span>70% Jababeka Scholarship Awardee</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all">
              <h3 className="text-2xl font-bold mb-4">Professional Summary</h3>
              <p className="text-gray-300 leading-relaxed">
                Bachelor of Informatics graduate with a concentration in Cyber Security from President University.
                Experienced in fullstack web development, API development, database integration, and security-oriented applications.
                Proven ability to build responsive web systems, develop RESTful APIs, and support IT operations in a professional environment.
                Strong interest in web development, cybersecurity, and security compliance & audit, with excellent teamwork, adaptability, and problem-solving skills.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Languages className="w-8 h-8 text-cyan-400" />
                Languages
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Indonesian</span>
                  <span className="text-cyan-400 font-semibold">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">English</span>
                  <span className="text-cyan-400 font-semibold">Advanced</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all">
              <h3 className="text-2xl font-bold mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                {['Teamwork', 'Problem Solving', 'Adaptability', 'Communication Skills', 'Ability to Work Under Pressure'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-all">
                  <Briefcase className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">Digital Marketing & Fullstack Web Developer</h3>
                  <p className="text-xl text-gray-300 mb-2">PT Usaha Saudara Mandiri (United Heater)</p>
                  <p className="text-gray-400 mb-4">Oct 2024 – Feb 2025</p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex gap-2">
                      <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Developed and maintained the company website (unitedheater.co.id) including Company Profile, Articles, About Us, Order Tracking, Contact, and Job Vacancy pages</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Designed and implemented an admin dashboard with full CRUD functionality for content and data management</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Built RESTful APIs using Node.js deployed on Google Cloud Platform (Cloud Run) integrated with SQL Server</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Ensured responsive design across desktop, tablet, and mobile devices</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Conducted website testing, troubleshooting, deployment, and performance optimization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-all">
                  <Briefcase className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">IT Support</h3>
                  <p className="text-xl text-gray-300 mb-2">PT Cahaya Jakarta</p>
                  <p className="text-gray-400 mb-4">Feb 2025 – Apr 2025</p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex gap-2">
                      <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Provided IT support and technical assistance for internal users, including hardware, software, and network troubleshooting</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Installed, configured, and maintained operating systems, applications, and office software</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Assisted in basic network monitoring and device configuration</span>
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Supported daily IT operations to ensure system reliability and smooth business processes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Selected Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="project-card bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all group cursor-pointer"
              >
                <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-4 group-hover:bg-cyan-500/20 transition-all">
                  <project.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-cyan-400">{project.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-300">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-500/10 border border-gray-500/30 rounded text-xs text-gray-400">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-center text-cyan-400 text-sm font-medium">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="https://drive.google.com/file/d/1mgwBg9VtlDJmzMZVMr2VK3bzV_7KhSxm/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
            >
              <Download className="w-5 h-5" />
              View Full Portfolio
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-cyan-400" />
                Programming & Web
              </h3>
              <div className="flex flex-wrap gap-3">
                {['HTML', 'CSS', 'JavaScript', 'Node.js', 'PHP', 'Java', 'C#', 'C++'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-cyan-400" />
                Cyber Security
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Digital Forensics', 'Network Security', 'Ethical Hacking', 'Security Risk Management'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-cyan-400" />
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-3">
                {['GitHub', 'Google Cloud Platform', 'Visual Studio Code', 'Visual Studio 2022', 'Android Studio', 'NetBeans', 'Wireshark', 'FTK Imager', 'PhotoRec', 'ExifTool', 'Meta Ads'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-cyan-400" />
                Productivity
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Google Workspace', 'Microsoft Office', 'Canva'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="mailto:benedictus.rangga9@gmail.com"
              className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all hover:transform hover:scale-105 group"
            >
              <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-400 text-sm break-all">benedictus.rangga9@gmail.com</p>
            </a>
            <a
              href="tel:085138981803"
              className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all hover:transform hover:scale-105 group"
            >
              <Phone className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-400 text-sm">0851-3898-1803</p>
            </a>
            <a
              href="https://github.com/benedictusrangga"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/40 transition-all hover:transform hover:scale-105 group"
            >
              <Github className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">GitHub</h3>
              <p className="text-gray-400 text-sm">@benedictusrangga</p>
            </a>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-backdrop-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="modal-content relative bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-cyan-500/20 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg">
                  <selectedProject.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400">{selectedProject.title}</h2>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Screenshots Slider */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Screenshots
                </h3>
                {selectedProject.screenshots.length > 0 ? (
                  <>
                    <div className="mb-2 text-sm text-gray-400">
                      {currentImageIndex + 1}/{selectedProject.screenshots.length}
                    </div>
                    <div className="relative">
                      <div className="relative h-64 sm:h-80 lg:h-96 bg-slate-800 rounded-lg overflow-hidden">
                        <img
                          src={selectedProject.screenshots[currentImageIndex]}
                          alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                          className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => openFullscreen(selectedProject.screenshots[currentImageIndex])}
                        />
                        <button
                          onClick={() => openFullscreen(selectedProject.screenshots[currentImageIndex])}
                          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                        >
                          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </button>
                      </div>
                      
                      {selectedProject.screenshots.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                          >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </button>
                        </>
                      )}
                    </div>
                    
                    {/* Thumbnail Navigation */}
                    {selectedProject.screenshots.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                        {selectedProject.screenshots.map((screenshot: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded border-2 overflow-hidden transition-all ${
                              index === currentImageIndex 
                                ? 'border-cyan-400 ring-2 ring-cyan-400/50' 
                                : 'border-gray-600 hover:border-gray-400'
                            }`}
                          >
                            <img
                              src={screenshot}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-64 sm:h-80 lg:h-96 bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                    <div className="text-center text-gray-400">
                      <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No Screenshots Available</p>
                      <p className="text-sm">Screenshots will be added soon</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Project Overview</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {selectedProject.detailedDescription}
                  </p>

                  {/* Technologies */}
                  <h4 className="text-lg font-semibold mb-3 text-cyan-400">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-cyan-400">Key Features</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedProject.features.map((feature: string, index: number) => (
                      <li key={index} className="flex gap-2 text-gray-300">
                        <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-cyan-500/20">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 hover:bg-slate-700 transition-all"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Source Code</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    <Globe className="w-5 h-5" />
                    <span>View Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-full max-h-full">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-cyan-500/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Benedictus Rangga Aryo Saputro. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Fullstack Developer | Cyber Security Specialist
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
