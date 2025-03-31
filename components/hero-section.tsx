"use client"

import { useState, useEffect } from "react"
import { useFeatureFlag } from "./feature-flag-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  forceMvp?: boolean
  forceFinal?: boolean
}

export default function HeroSection({ forceMvp, forceFinal }: HeroSectionProps) {
  const heroV2Enabled = useFeatureFlag("hero_v2")
  const [isAnimating, setIsAnimating] = useState(false)

  // Determine which version to show based on props and feature flag
  const showEnhancedVersion = forceFinal || (!forceMvp && heroV2Enabled)

  // Animation effect for the enhanced version
  useEffect(() => {
    if (showEnhancedVersion) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [showEnhancedVersion])

  // MVP Version - Simple and minimal
  if (!showEnhancedVersion) {
    return (
      <div className="py-12 px-4 text-center bg-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="mb-6 max-w-md mx-auto text-muted-foreground">The fastest way to build your next project.</p>
        <Button>Get Started</Button>
      </div>
    )
  }

  // Enhanced Version - Rich media and animations
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-violet-500 to-purple-500 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 ${isAnimating ? "animate-fadeIn" : ""}`}>
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Introducing our new platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Build Faster, <br />
              <span className="text-yellow-300">Launch Sooner</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 max-w-md">
              Our platform helps teams ship MVPs quickly and iterate safely with powerful feature flags.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-white/90">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
          </div>

          <div className={`relative ${isAnimating ? "animate-slideIn" : ""}`}>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Platform Dashboard"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
            </div>

            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-purple-900 font-bold px-4 py-2 rounded-lg shadow-lg transform rotate-3">
              New Features!
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-900/50 to-transparent" />
    </div>
  )
}

