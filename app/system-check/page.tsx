"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function SystemCheck() {
  const [cameraReady, setCameraReady] = useState(false)
  const [microphoneReady, setMicrophoneReady] = useState(false)

  useEffect(() => {
    // Check camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setCameraReady(true))
      .catch(() => setCameraReady(false))

    // Check microphone
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setMicrophoneReady(true))
      .catch(() => setMicrophoneReady(false))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-blue-600 mb-4">System Check</h1>
        <p className="text-xl text-gray-600 mb-8">Let's make sure your system is ready for the exam.</p>
        <div className="space-y-4 mb-8">
          <div className={`text-lg ${cameraReady ? "text-green-500" : "text-red-500"}`}>
            Camera: {cameraReady ? "Ready" : "Not detected"}
          </div>
          <div className={`text-lg ${microphoneReady ? "text-green-500" : "text-red-500"}`}>
            Microphone: {microphoneReady ? "Ready" : "Not detected"}
          </div>
        </div>
        {cameraReady && microphoneReady ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
            <Link
              href="/exam"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Start Exam
            </Link>
          </motion.div>
        ) : (
          <p className="text-red-500">Please ensure your camera and microphone are connected and allowed.</p>
        )}
      </motion.div>
    </div>
  )
}

