"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Github, ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import type { ContactFormInput } from "@/lib/schemas"

interface FormState {
  isLoading: boolean
  error: string | null
  success: boolean
  fieldErrors: Record<string, string[]> | null
}

export default function HirePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    error: null,
    success: false,
    fieldErrors: null
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ isLoading: true, error: null, success: false, fieldErrors: null })

    const payload: ContactFormInput = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const json = await response.json()

      if (!response.ok) {
        if (json.errors) {
          setFormState({
            isLoading: false,
            error: json.message,
            success: false,
            fieldErrors: json.errors
          })
        } else {
          setFormState({
            isLoading: false,
            error: json.message || "Failed to send message",
            success: false,
            fieldErrors: null
          })
        }
        return
      }

      setFormState({
        isLoading: false,
        error: null,
        success: true,
        fieldErrors: null
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, success: false }))
      }, 5000)
    } catch (err) {
      setFormState({
        isLoading: false,
        error: "Network error. Please try again.",
        success: false,
        fieldErrors: null
      })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border z-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/" className="flex items-center gap-2 text-lg font-bold hover:text-muted-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Portfolio
              </Link>
            </motion.div>
            <div className="flex gap-4 items-center">
              <motion.a
                href="mailto:szymonpiekarz09@gmail.com"
                className="hover:text-muted-foreground transition-colors"
                aria-label="Email"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com/Stivik-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-foreground transition-colors"
                aria-label="GitHub Profile"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Let's Work Together</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Fill out the form below or reach out directly via email or phone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Send Me a Message</CardTitle>
                  <CardDescription>I'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Success Message */}
                  {formState.success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Message sent successfully!</p>
                        <p className="text-sm mt-1">I'll get back to you as soon as possible.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {formState.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{formState.error}</p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={formState.isLoading}
                        required
                        className={formState.fieldErrors?.name ? "border-red-500" : ""}
                      />
                      {formState.fieldErrors?.name && (
                        <p className="text-red-600 dark:text-red-400 text-sm">
                          {formState.fieldErrors.name[0]}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={formState.isLoading}
                        required
                        className={formState.fieldErrors?.email ? "border-red-500" : ""}
                      />
                      {formState.fieldErrors?.email && (
                        <p className="text-red-600 dark:text-red-400 text-sm">
                          {formState.fieldErrors.email[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Project inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        disabled={formState.isLoading}
                        required
                        className={formState.fieldErrors?.subject ? "border-red-500" : ""}
                      />
                      {formState.fieldErrors?.subject && (
                        <p className="text-red-600 dark:text-red-400 text-sm">
                          {formState.fieldErrors.subject[0]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        disabled={formState.isLoading}
                        required
                        className={formState.fieldErrors?.message ? "border-red-500" : ""}
                      />
                      {formState.fieldErrors?.message && (
                        <p className="text-red-600 dark:text-red-400 text-sm">
                          {formState.fieldErrors.message[0]}
                        </p>
                      )}
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        type="submit" 
                        className="w-full group" 
                        disabled={formState.isLoading}
                      >
                        {formState.isLoading ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Email Card */}
              <Card className="border-2 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-3 bg-secondary rounded-lg"
                      whileHover={{ rotate: 10 }}
                    >
                      <Mail className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg">Email</CardTitle>
                      <CardDescription>Drop me a line anytime</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.a
                    href="mailto:szymonpiekarz09@gmail.com"
                    className="text-sm font-medium hover:underline break-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    szymonpiekarz09@gmail.com
                  </motion.a>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card className="border-2 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-3 bg-secondary rounded-lg"
                      whileHover={{ rotate: 10 }}
                    >
                      <Phone className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg">Phone</CardTitle>
                      <CardDescription>Call me directly</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.a
                    href="tel:+48535048108"
                    className="text-sm font-medium hover:underline"
                    whileHover={{ scale: 1.02 }}
                  >
                    +48 535 048 108
                  </motion.a>
                </CardContent>
              </Card>

              {/* GitHub Card */}
              <Card className="border-2 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-3 bg-secondary rounded-lg"
                      whileHover={{ rotate: 10 }}
                    >
                      <Github className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg">GitHub</CardTitle>
                      <CardDescription>Check out my code</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.a
                    href="https://github.com/Stivik-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline"
                    whileHover={{ scale: 1.02 }}
                  >
                    github.com/Stivik-ai
                  </motion.a>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="border-2 bg-secondary/30">
                <CardHeader>
                  <CardTitle className="text-lg">Why Work With Me?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full mt-1.5" />
                      <span>Fast, optimized websites with excellent performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full mt-1.5" />
                      <span>SEO-optimized to help you rank higher on Google</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full mt-1.5" />
                      <span>Responsive design that works on all devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full mt-1.5" />
                      <span>Clean, maintainable code following best practices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}