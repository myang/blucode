import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Code, 
  Cpu, 
  Bot, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Mail, 
  Linkedin, 
  Github,
  Globe,
  MessageSquare
} from 'lucide-react';

// --- Components ---

const Logo = () => {
  const [imgError, setImgError] = useState(false);
  
  // REPLACE THIS URL with your raw GitHub image URL (e.g., https://raw.githubusercontent.com/myang/repo/main/logo.png)
  const userLogoUrl = ""; 

  if (userLogoUrl && !imgError) {
    return (
      <img 
        src={userLogoUrl} 
        alt="Blucode Logo" 
        className="h-10 w-auto object-contain" 
        onError={() => setImgError(true)}
      />
    );
  }

  // Fallback logo if image is missing or fails to load
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
        <Code className="text-white w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
      </div>
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
        blucode<span className="text-blue-400">.fi</span>
      </span>
    </div>
  );
};

const NavLink = ({ href, children, mobile, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className={`
      text-sm font-medium transition-colors duration-200
      ${mobile 
        ? 'block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md' 
        : 'text-slate-300 hover:text-blue-400 hover:scale-105 transform'
      }
    `}
  >
    {children}
  </a>
);

const SectionTitle = ({ subtitle, title, align = 'center' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-blue-500/20">
      {subtitle}
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
      {title}
    </h2>
    <div className={`h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}></div>
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, benefits }) => (
  <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-slate-700/50 to-slate-800/50 hover:from-blue-600 hover:to-cyan-400 transition-all duration-500">
    <div className="relative h-full bg-slate-900 rounded-xl p-6 md:p-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24" />
      </div>
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
          {description}
        </p>

        <ul className="space-y-2">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Button = ({ children, primary, icon: Icon, className = '', ...props }) => (
  <button 
    className={`
      inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
      ${primary 
        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40' 
        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
      }
      ${className}
    `}
    {...props}
  >
    {children}
    {Icon && <Icon className="w-4 h-4" />}
  </button>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* --- Navigation --- */}
      <nav 
        className={`
          fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent
          ${isScrolled || mobileMenuOpen ? 'bg-slate-900/90 backdrop-blur-md border-slate-800 py-3' : 'bg-transparent py-5'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#" className="flex-shrink-0">
              <Logo />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#approach">Approach</NavLink>
              <NavLink href="#about">About</NavLink>
              <Button primary onClick={() => (window.location.href = '#contact')}>
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-fade-in-down">
            <div className="px-2 pt-2 pb-6 space-y-1">
              <NavLink mobile href="#services" onClick={() => setMobileMenuOpen(false)}>Services</NavLink>
              <NavLink mobile href="#approach" onClick={() => setMobileMenuOpen(false)}>Approach</NavLink>
              <NavLink mobile href="#about" onClick={() => setMobileMenuOpen(false)}>About</NavLink>
              <div className="px-4 pt-4">
                <Button primary className="w-full" onClick={() => { window.location.href='#contact'; setMobileMenuOpen(false); }}>
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8 animate-fade-in-up">
            <Zap className="w-4 h-4 fill-blue-500 text-blue-500" />
            <span>Next-Generation AI Consulting</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Tailored <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Agentic AI</span><br />
            Solutions for Business
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            We bridge the gap between cutting-edge LLMs and real-world business value. Blucode builds autonomous, tailored AI agents that work for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button primary icon={ArrowRight} onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}>
              Start Your Transformation
            </Button>
            <Button icon={Github} onClick={() => window.open('https://github.com/myang', '_blank')}>
              View Our Work
            </Button>
          </div>

          {/* Tech Stack Strip */}
          <div className="mt-20 pt-10 border-t border-slate-800">
            <p className="text-sm text-slate-500 mb-6 font-medium">POWERED BY THE LATEST MODELS</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['OpenAI', 'Anthropic', 'Google DeepMind', 'Meta Llama', 'Mistral AI'].map((tech) => (
                <span key={tech} className="text-lg font-bold text-slate-300 flex items-center gap-2">
                  <Cpu className="w-5 h-5" /> {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-20 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle 
            subtitle="Our Expertise" 
            title="Comprehensive AI Solutions" 
          />

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={Bot}
              title="Agentic AI Development"
              description="We build autonomous agents capable of planning, reasoning, and executing complex workflows without constant human supervision."
              benefits={["Autonomous Workflow Execution", "Multi-Agent Orchestration", "Self-Correcting Logic"]}
            />
            <ServiceCard 
              icon={Brain}
              title="Strategic Consulting"
              description="Navigating the AI landscape is complex. We help you identify high-impact use cases and select the right models for your specific needs."
              benefits={["Feasibility Studies", "Model Selection Strategy", "ROI Analysis"]}
            />
            <ServiceCard 
              icon={Code}
              title="Custom Integration"
              description="Seamlessly integrate powerful LLMs into your existing software ecosystem. We handle the API complexities, security, and prompt engineering."
              benefits={["Secure API Integration", "Legacy System Bridging", "Custom Fine-Tuning"]}
            />
          </div>
        </div>
      </section>

      {/* --- Approach / Methodology --- */}
      <section id="approach" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle 
                subtitle="Our Philosophy" 
                title="Model Agnostic. Results Driven." 
                align="left"
              />
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                The AI landscape changes weekly. We don't lock you into a single vendor. Instead, we architect solutions that utilize the <span className="text-blue-400 font-semibold">most suitable and latest LLMs</span> for your specific task.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Analysis First", desc: "We dissect your problem before writing a single line of code." },
                  { title: "Rapid Prototyping", desc: "See agent behaviors in days, not months." },
                  { title: "Scalable Architecture", desc: "Built to handle enterprise loads and future model upgrades." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-blue-400 font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Abstract Visual Representation of Agents */}
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 shadow-2xl">
                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl"></div>
                
                {/* Visual Logic Node Graph Mockup */}
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg border border-blue-500/30 text-sm font-mono flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> User Intent
                    </div>
                  </div>
                  <div className="h-8 border-l-2 border-dashed border-slate-700 mx-auto w-0"></div>
                  <div className="flex justify-center gap-4">
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-600 shadow-lg w-full">
                      <div className="flex items-center gap-2 mb-2 text-cyan-400 font-mono text-xs uppercase tracking-wide">
                        <Bot className="w-4 h-4" /> Orchestrator Agent
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                        <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 pt-4">
                     <div className="border-t-2 border-dashed border-slate-700 relative pt-4">
                        <div className="absolute -top-[1px] -left-[1px] w-2 h-2 bg-slate-500 rounded-full"></div>
                        <div className="p-3 bg-slate-800/50 rounded border border-slate-700/50">
                          <div className="text-xs text-slate-400 font-mono mb-1">Researcher Agent</div>
                          <div className="text-xs text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Data Fetched</div>
                        </div>
                     </div>
                     <div className="border-t-2 border-dashed border-slate-700 relative pt-4">
                        <div className="absolute -top-[1px] -right-[1px] w-2 h-2 bg-slate-500 rounded-full"></div>
                         <div className="p-3 bg-slate-800/50 rounded border border-slate-700/50">
                          <div className="text-xs text-slate-400 font-mono mb-1">Coder Agent</div>
                          <div className="text-xs text-blue-400 flex items-center gap-1">Generating...</div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- About Brief --- */}
      <section id="about" className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Globe className="w-12 h-12 text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">About Blucode.fi</h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            Based in Finland, serving the global market. Blucode.fi is a premier consultancy dedicated to the practical application of Artificial General Intelligence technologies. We believe that the future of software is agentic—where code doesn't just execute instructions, but understands goals.
          </p>
          <div className="flex justify-center gap-6">
             <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-500">Tailored Solutions</div>
             </div>
             <div className="w-px bg-slate-700"></div>
             <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-500">System Uptime</div>
             </div>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-800">
            <SectionTitle title="Let's Build the Future" subtitle="Get in Touch" />
            
            <p className="text-center text-slate-400 mb-10">
              Ready to deploy agentic AI in your business? Tell us about your project.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all" placeholder="john@company.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Project Details</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all" placeholder="I need an AI agent that can..."></textarea>
              </div>

              <div className="text-center">
                <Button primary className="w-full md:w-auto min-w-[200px]" icon={Mail}>
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                Empowering businesses with intelligent, agentic AI solutions tailored for the modern era.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://github.com/myang" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:contact@blucode.fi" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 text-center">
            <p className="text-slate-500 text-sm">
              &copy; {currentYear} Blucode.fi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
