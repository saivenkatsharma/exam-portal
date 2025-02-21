"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import Slider from 'react-slick'
import { Code2, Brain, Cloud, Shield, Bot, Terminal, Database, Globe } from 'lucide-react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Footer from '@/app/components/layout/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const domains = [
  {
    title: "Full Stack Development",
    Icon: Code2,
    description: "Build scalable web applications using modern frameworks and architectures",
    techs: ["React", "Node.js", "TypeScript", "GraphQL"],
    details: "Master microservices, RESTful APIs, and database optimization",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Cloud Architecture",
    Icon: Cloud,
    description: "Design and implement cloud-native solutions",
    techs: ["AWS", "Azure", "Kubernetes", "Terraform"],
    details: "Learn infrastructure as code and cloud security best practices",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Cybersecurity",
    Icon: Shield,
    description: "Implement robust security measures and threat detection",
    techs: ["Penetration Testing", "SIEM", "Zero Trust", "Encryption"],
    details: "Master security protocols and vulnerability assessment",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI & Machine Learning",
    Icon: Brain,
    description: "Build intelligent systems and predictive models",
    techs: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
    details: "Implement deep learning and neural networks",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "DevOps & SRE",
    Icon: Bot,
    description: "Automate deployment pipelines and maintain reliability",
    techs: ["CI/CD", "Docker", "Prometheus", "ELK Stack"],
    details: "Implement monitoring and automated scaling solutions",
    image: "https://images.unsplash.com/photo-1667372393619-49a642932b14?auto=format&fit=crop&q=80&w=800"
  }
]

const techStack = [
  {
    category: "Frontend",
    Icon: Globe,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"]
  },
  {
    category: "Backend",
    Icon: Terminal,
    technologies: ["Node.js", "Python", "Java", "Go", "Microservices"]
  },
  {
    category: "Database",
    Icon: Database,
    technologies: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "GraphQL"]
  }
]

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=2070",
    title: "Advanced Technical Assessment",
    description: "Evaluate your skills in cutting-edge technologies"
  },
  {
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=2070",
    title: "Real-World Challenges",
    description: "Solve industry-standard programming problems"
  },
  {
    image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&q=80&w=2070",
    title: "Secure Testing Environment",
    description: "Take exams in a controlled and monitored setting"
  },
  {
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070",
    title: "Professional Development",
    description: "Advance your career in technology"
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    title: "Comprehensive Analytics",
    description: "Track your progress with detailed insights"
  }
]

export default function LandingPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
    pauseOnHover: false
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Hero Section with Carousel */}
      <div className="relative h-screen">
        <Slider {...sliderSettings} className="h-full">
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative h-screen">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-xl sm:text-2xl md:text-3xl mb-8"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                      <Link
                        href="/login/student"
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                      >
                        Student Login
                      </Link>
                      <Link
                        href="/login/invigilator"
                        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105"
                      >
                        Invigilator Login
                      </Link>
                      <Link
                        href="/register"
                        className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                      >
                        Student Register
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tech Stack Section */}
        <motion.div
          className="mt-20"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <stack.Icon className="h-6 w-6 text-blue-500" />
                  <h3 className="ml-2 text-xl font-semibold">{stack.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Domains Section */}
        <motion.div
          className="mt-20"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Specialized Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={domain.image}
                    alt={domain.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <domain.Icon className="h-6 w-6 text-blue-500" />
                    <h3 className="ml-2 text-xl font-semibold">{domain.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{domain.description}</p>
                  <p className="text-gray-500 text-sm mb-4">{domain.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {domain.techs.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Prove Your Expertise?</h2>
          <p className="text-gray-600 mb-8">
            Join leading developers in validating their technical proficiency
          </p>
          <Link
            href="/register"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

