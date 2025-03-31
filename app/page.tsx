"use client"

import { useState } from "react"
import { FeatureFlagProvider } from "@/components/feature-flag-provider"
import HeroSection from "@/components/hero-section"
import DashboardOverview from "@/components/dashboard-overview"
import VirtualCardWidget from "@/components/virtual-card-widget"
import SmartSearch from "@/components/smart-search"
import SupportChatWidget from "@/components/support-chat-widget"
import FeatureFlagPanel from "@/components/feature-flag-panel"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [showPanel, setShowPanel] = useState(false)

  return (
    <FeatureFlagProvider>
      <main className="min-h-screen flex flex-col">
        <header className="border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Feature Flag Demo</h1>
          <Button variant={showPanel ? "secondary" : "default"} onClick={() => setShowPanel(!showPanel)}>
            {showPanel ? "Hide" : "Show"} Feature Flag Panel
          </Button>
        </header>

        {showPanel && (
          <div className="border-b bg-muted/50">
            <FeatureFlagPanel />
          </div>
        )}

        <div className="flex-1 p-4 md:p-8">
          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="demo">Demo</TabsTrigger>
              <TabsTrigger value="comparison">Side-by-Side Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="space-y-8">
              <div className="max-w-5xl mx-auto">
                <Tabs defaultValue="hero">
                  <TabsList className="w-full justify-start mb-6">
                    <TabsTrigger value="hero">🦸‍♂️ Hero</TabsTrigger>
                    <TabsTrigger value="dashboard">📈 Dashboard</TabsTrigger>
                    <TabsTrigger value="virtualcard">💳 Virtual Card</TabsTrigger>
                    <TabsTrigger value="search">🔍 Smart Search</TabsTrigger>
                    <TabsTrigger value="chat">💬 Support Chat</TabsTrigger>
                  </TabsList>

                  <TabsContent value="hero" className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg mb-4">
                      <h2 className="text-xl font-bold mb-2">Hero Component</h2>
                      <p className="text-muted-foreground">
                        Demonstrates MVP-first launch strategy. Toggle the <code>hero_v2</code> flag to switch between
                        simple and enhanced versions.
                      </p>
                    </div>
                    <HeroSection />
                  </TabsContent>

                  <TabsContent value="dashboard" className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg mb-4">
                      <h2 className="text-xl font-bold mb-2">Dashboard Overview</h2>
                      <p className="text-muted-foreground">
                        Demonstrates gradual rollout strategy. Set <code>dashboard_v2</code> to percentage rollout to
                        simulate staged release.
                      </p>
                    </div>
                    <DashboardOverview />
                  </TabsContent>

                  <TabsContent value="virtualcard" className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg mb-4">
                      <h2 className="text-xl font-bold mb-2">Virtual Card Widget</h2>
                      <p className="text-muted-foreground">
                        Demonstrates user segmentation. Set <code>showVirtualCard</code> to user segment and switch
                        between user types to see the difference.
                      </p>
                    </div>
                    <div className="max-w-md mx-auto">
                      <VirtualCardWidget />
                    </div>
                    <div className="text-center text-muted-foreground text-sm mt-4">
                      {/* This message only shows if the virtual card is not visible */}
                      <div id="no-card-message" className="p-8 border rounded-lg">
                        Virtual card is only available to premium users. Change your user segment in the Feature Flag
                        Panel to "Premium" to see it.
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="search" className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg mb-4">
                      <h2 className="text-xl font-bold mb-2">Smart Search</h2>
                      <p className="text-muted-foreground">
                        Demonstrates A/B testing. Set <code>smartSearch</code> to 50% rollout to randomly assign users
                        to either version.
                      </p>
                    </div>
                    <SmartSearch />
                  </TabsContent>

                  <TabsContent value="chat" className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg mb-4">
                      <h2 className="text-xl font-bold mb-2">Support Chat Widget</h2>
                      <p className="text-muted-foreground">
                        Demonstrates kill switch functionality. Toggle <code>supportChat</code> on/off to switch between
                        email and live chat support.
                      </p>
                    </div>
                    <div className="h-96 border rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">
                          Click the chat/mail icon in the bottom right corner to open the support widget
                        </p>
                      </div>
                      <SupportChatWidget />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-8">
              <h2 className="text-2xl font-bold mb-4">Hero Component</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">MVP Version</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <HeroSection forceMvp={true} />
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">Final Version</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <HeroSection forceFinal={true} />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8">Dashboard Overview</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">MVP Version</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <DashboardOverview forceMvp={true} />
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">Final Version</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <DashboardOverview forceFinal={true} />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8">Virtual Card Widget</h2>
              <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">Premium Users Only</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <VirtualCardWidget forceShow={true} />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8">Transaction Search</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">MVP Version</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <SmartSearch forceMvp={true} />
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">Final Version</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <SmartSearch forceFinal={true} />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8">Support Chat</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">MVP Version</h3>
                  <div className="border rounded-lg overflow-hidden p-4 h-96 relative">
                    <SupportChatWidget forceMvp={true} />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-muted-foreground">Click the mail icon in the bottom right</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">Final Version</h3>
                  <div className="border rounded-lg overflow-hidden p-4 h-96 relative">
                    <SupportChatWidget forceFinal={true} />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-muted-foreground">Click the chat icon in the bottom right</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          Feature Flag Demo App - Demonstrating MVP to Final Version Evolution
        </footer>
      </main>

      <SupportChatWidget />
    </FeatureFlagProvider>
  )
}

