"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, BookOpen, Trophy, Users, Brain, Cloud, Shield, Robot } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const domains = [
  {
    title: "Full Stack Development",
    Icon: Code2,
    description: "Master modern web development from frontend to backend",
    techs: ["React", "Node.js", "TypeScript", "MongoDB"]
  },
  {
    title: "Cloud Computing",
    Icon: Cloud,
    description: "Build and deploy scalable cloud solutions",
    techs: ["AWS", "Azure", "Docker", "Kubernetes"]
  },
  {
    title: "Cybersecurity",
    Icon: Shield,
    description: "Protect systems and data from security threats",
    techs: ["Network Security", "Cryptography", "Ethical Hacking", "Security+"]
  },
  {
    title: "AI & Machine Learning",
    Icon: Brain,
    description: "Develop intelligent systems and algorithms",
    techs: ["Python", "TensorFlow", "PyTorch", "Data Science"]
  },
  {
    title: "DevOps",
    Icon: Robot,
    description: "Streamline development and operations",
    techs: ["CI/CD", "Jenkins", "Terraform", "Ansible"]
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
              Master Modern Software Engineering
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive assessments across the entire software industry spectrum. 
              Prove your expertise in multiple domains.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['React', 'Node.js', 'Python', 'AWS', 'DevOps', 'Security'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 bg-blue-900/30 rounded-full text-blue-300"
                >
                  {tech}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/login"
                  className="px-8 py-4 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Assessment
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/teacher/login"
                  className="px-8 py-4 bg-purple-600 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Teacher Portal
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Domains Section */}
      <div className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Technology Domains</h2>
            <p className="text-gray-400 text-lg">
              Comprehensive assessments across multiple technology domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 backdrop-blur-sm"
              >
                <domain.Icon className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{domain.title}</h3>
                <p className="text-gray-400 mb-4">{domain.description}</p>
                <div className="flex flex-wrap gap-2">
                  {domain.techs.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-900/30 rounded-full text-sm text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-blue-900/20 to-purple-900/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1000+", label: "Assessments" },
              { number: "50+", label: "Technology Tracks" },
              { number: "10000+", label: "Students" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl font-bold mb-8">Ready to Prove Your Skills?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of software professionals who have validated their expertise through our platform.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

