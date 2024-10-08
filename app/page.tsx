"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Box, Sparkles, BookOpen, Video, Check, Loader, ChevronDown, Play } from "lucide-react"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, error] = useState(false);
  // If you need the error state, use it or comment it out
  // const [error, setError] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // If you need the error state, use it or comment it out
    // setError("");

    if (!email) {
      // If you need the error state, use it or comment it out
      // setError("Please enter your email address.");
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setIsSubmitted(true)
    } catch (error) {
      // If you need the error state, use it or comment it out
      // setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-[#4169E1]" />,
      title: "AI Slide Generation",
      description: "Create professional slides with the power of AI. Our advanced algorithms analyze your content and generate visually appealing slides that engage your students.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#4169E1]" />,
      title: "Turn Books into Slides",
      description: "Easily convert book content into engaging presentations. Simply upload a PDF or provide a book's ISBN, and CourseCubes will create a comprehensive slide deck.",
    },
    {
      icon: <Video className="h-6 w-6 text-[#4169E1]" />,
      title: "Create Vertical Videos",
      description: "Generate vertical video content for modern platforms like TikTok and Instagram Reels. Transform your lessons into bite-sized, engaging video content for the mobile generation.",
    },
  ]

  const faqs = [
    {
      question: "How does CourseCubes work?",
      answer: "CourseCubes uses advanced AI algorithms to analyze your content and generate professional slideshows. Simply input your lesson material, and our system will create engaging slides tailored to your needs.",
    },
    {
      question: "Is CourseCubes suitable for all subjects?",
      answer: "Yes! CourseCubes is designed to work across a wide range of subjects, from humanities to sciences. Our AI adapts to different content types and teaching styles.",
    },
    {
      question: "Can I customize the generated slides?",
      answer: "While CourseCubes creates initial slides, you have full control to edit, rearrange, and customize the content to fit your specific teaching needs.",
    },
    {
      question: "How much does CourseCubes cost?",
      answer: "Pricing details will be announced closer to launch. By joining our waitlist, you'll be among the first to know about our pricing plans and any special offers for early adopters.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <Box className="mx-auto h-20 w-20 text-[#4169E1]" />
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl md:text-6xl">CourseCubes</h1>
        <p className="mt-4 text-xl text-gray-300">
          AI-powered slideshow generation for teachers
        </p>
        <div className="mt-8 flex justify-center">
          <div className="aspect-video w-full max-w-3xl rounded-lg overflow-hidden relative">
            {!isVideoPlaying ? (
              <div 
                className="absolute inset-0 bg-gray-800 flex items-center justify-center cursor-pointer"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="w-16 h-16 text-[#4169E1]" />
                <span className="sr-only">Play demo video</span>
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/6r38949jGOo?autoplay=1"
                title="CourseCubes Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
        <Button className="mt-8 bg-[#4169E1] text-white hover:bg-[#3a5ecc]" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
          Join the Waitlist
        </Button>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 text-black">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Revolutionize Your Teaching</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="rounded-lg bg-gray-100 p-6 text-center shadow-md">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#4169E1] text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="bg-[#4169E1] py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Join the Waitlist</h2>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              <div className="mb-4">
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-md border-gray-300 bg-white text-black shadow-sm focus:border-white focus:ring-white"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="mb-4 text-sm text-red-200">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <Check className="mx-auto h-12 w-12 text-white" />
              <h3 className="mt-2 text-xl font-semibold">
                You're on the list!
              </h3>
              <p className="mt-2 text-gray-200">
                We&apos;ll notify you when we&apos;re ready to launch.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 text-black">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="flex items-center justify-between text-lg font-semibold">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 text-center text-gray-400">
        <p>&copy; 2024 CourseCubes. All rights reserved.</p>
      </footer>
    </div>
  )
}