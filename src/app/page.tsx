"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Globe, Gauge, Smartphone, Search, Mail, Github, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      // Calculate scroll progress safely
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setScrollProgress(progress)
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    
    // Initial calculation
    handleScroll()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }} />
      </div>

      {/* Spotlight Effect */}
      <div 
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none blur-[150px] opacity-20 dark:opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          transition: 'left 0.3s ease, top 0.3s ease'
        }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border z-50 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-xl font-bold relative"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10">Szymon</span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 rounded-lg -z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
            <div className="flex gap-6 items-center">
              {["About", "Skills", "Projects", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-muted-foreground transition-colors relative group hidden sm:block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(item.toLowerCase())
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <motion.a
                href="mailto:szymonpiekarz09@gmail.com"
                className="transition-colors hover:text-black dark:hover:text-white"
                aria-label="Email"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com/Stivik-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-black dark:hover:text-white"
                aria-label="GitHub Profile"
                whileHover={{ scale: 1.15, rotate: 360, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => {
                  e.preventDefault()
                  window.open('https://github.com/Stivik-ai', '_blank', 'noopener,noreferrer')
                }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
        
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-black/50 via-black to-black/50 dark:from-white/50 dark:via-white dark:to-white/50"
          style={{
            width: `${scrollProgress}%`
          }}
        />
      </motion.nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border mb-6 bg-secondary/50 backdrop-blur-sm shadow-md"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Available for Freelance</span>
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Szymon</span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-r from-black/20 via-black/40 to-black/20 dark:from-white/20 dark:via-white/40 dark:to-white/20"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              16-year-old Web Developer from Poland
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              I create high-performance websites with exceptional optimization,
              responsive design, and SEO best practices. Let's build something amazing together.
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" asChild className="group shadow-lg">
                  <Link href="/hire">
                    Hire Me
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="shadow-md"
                >
                  <a 
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('projects')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    View Projects
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-center">Skills & Services</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Specialized in building modern, fast, and search-optimized websites
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Code2,
                title: "Programming",
                description: "Languages I work with",
                items: ["C#", "JavaScript", "HTML & CSS"]
              },
              {
                icon: Globe,
                title: "Web Development",
                description: "Building modern websites",
                items: ["Custom Websites", "E-commerce", "Landing Pages"]
              },
              {
                icon: Gauge,
                title: "Optimization",
                description: "Fast & efficient sites",
                items: ["Performance Tuning", "Code Minification", "Asset Optimization"]
              },
              {
                icon: Smartphone,
                title: "Responsive Design",
                description: "Works on all devices",
                items: ["Mobile-First", "Cross-Browser", "Adaptive Layouts"]
              },
              {
                icon: Search,
                title: "SEO Optimization",
                description: "Get found on Google",
                items: ["Meta Tags", "Schema Markup", "Speed Optimization"]
              },
              {
                icon: Mail,
                title: "Custom Solutions",
                description: "Tailored to your needs",
                items: ["API Integration", "CMS Setup", "Maintenance"]
              }
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)" }}
              >
                <Card className="h-full border-2 hover:border-foreground/20 transition-all duration-300 shadow-md hover:shadow-xl group">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 rounded-full bg-secondary border-2 border-foreground/10 flex items-center justify-center mb-4 group-hover:border-foreground/30 transition-all shadow-sm"
                      whileHover={{ 
                        scale: 1.15,
                        backgroundColor: "rgba(0,0,0,0.05)",
                        boxShadow: "0 8px 16px -4px rgba(0,0,0,0.1)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <skill.icon className="w-8 h-8 group-hover:text-black dark:group-hover:text-white transition-colors" />
                    </motion.div>
                    <CardTitle>{skill.title}</CardTitle>
                    <CardDescription>{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {skill.items.map((item, i) => (
                        <motion.li
                          key={item}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 bg-foreground rounded-full" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-center">Featured Projects</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              A showcase of websites I've built with focus on performance and user experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "E-Commerce Platform",
                description: "Modern online store with cart system",
                tags: ["HTML", "CSS", "JS", "SEO"]
              },
              {
                icon: Code2,
                title: "Business Website",
                description: "Corporate site with CMS integration",
                tags: ["C#", "HTML", "Responsive"]
              },
              {
                icon: Gauge,
                title: "Landing Page",
                description: "High-converting product landing page",
                tags: ["JS", "CSS", "Fast"]
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 group overflow-hidden border-2 hover:border-foreground/20 shadow-md">
                  <CardHeader>
                    <motion.div
                      className="w-full h-48 bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden shadow-inner"
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        whileHover={{ 
                          scale: 1.15,
                          filter: "brightness(0.8)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <project.icon className="w-16 h-16 text-muted-foreground relative z-10" />
                      </motion.div>
                    </motion.div>
                    <CardTitle className="group-hover:translate-x-2 transition-transform">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          className="px-2 py-1 bg-secondary text-xs rounded hover:bg-foreground hover:text-background transition-colors cursor-default shadow-sm"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 25px -8px rgba(0,0,0,0.2)" }} 
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="outline" className="w-full group/btn shadow-sm" asChild>
                        <Link href="/hire">
                          Contact for Details
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Need a website that's fast, responsive, and SEO-optimized?
              I'm available for freelance projects and collaborations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 50px -15px rgba(0,0,0,0.2)" }}
          >
            <div className="bg-card rounded-xl border-2 hover:border-foreground/20 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-center gap-2 text-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Get in touch:</span>
                </motion.div>
                <p className="text-muted-foreground">
                  Available for website development, optimization, and SEO services
                </p>
                <motion.a
                  href="mailto:szymonpiekarz09@gmail.com"
                  className="text-lg font-medium hover:underline inline-block"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  szymonpiekarz09@gmail.com
                </motion.a>
                <div className="pt-4 flex gap-4 justify-center flex-wrap">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button size="lg" className="min-w-[200px] group shadow-lg" asChild>
                      <Link href="/hire">
                        Contact Me
                        <Mail className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="shadow-md"
                      onClick={() => window.open('https://github.com/Stivik-ai', '_blank', 'noopener,noreferrer')}
                    >
                      <Github className="w-5 h-5 mr-2" />
                      View GitHub
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-sm text-muted-foreground">
              © 2025 Szymon. Web Developer from Poland.
            </div>
            <div className="flex gap-6 text-sm items-center">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-foreground transition-colors cursor-pointer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(item.toLowerCase())
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                onClick={() => window.open('https://github.com/Stivik-ai', '_blank', 'noopener,noreferrer')}
                className="hover:text-foreground transition-colors"
                aria-label="GitHub Profile"
                whileHover={{ scale: 1.2, rotate: 360, y: -2 }}
                transition={{ duration: 0.4 }}
              >
                <Github className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}