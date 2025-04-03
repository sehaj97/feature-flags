"use client"

import { useState } from "react"
import { useFeatureFlag } from "./feature-flag-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X, Mail, User, Bot } from "lucide-react"

interface SupportChatWidgetProps {
  forceMvp?: boolean
  forceFinal?: boolean
}

export default function SupportChatWidget({ forceMvp, forceFinal }: SupportChatWidgetProps) {
  const supportChatEnabled = useFeatureFlag("supportChat")
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Hi there! How can I help you today?", sender: "bot" },
  ])

  // Determine which version to show based on props and feature flag
  const showEnhancedVersion = forceFinal || (!forceMvp && supportChatEnabled)

  // Handle sending a message
  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: message, sender: "user" }])
    setMessage("")

    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! Our support team will get back to you shortly. Is there anything else I can help with?",
          sender: "bot",
        },
      ])
    }, 1000)
  }

  // MVP Version - Email-only support
  if (!showEnhancedVersion) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button className="rounded-full h-12 w-12 shadow-lg" onClick={() => setIsOpen(!isOpen)}>
          <Mail className="h-5 w-5" />
        </Button>

        {isOpen && (
          <Card className="absolute bottom-16 right-0 w-80 shadow-xl">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Contact Support</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need help? Send us an email and we'll get back to you as soon as possible.
              </p>
              <Button className="w-full" onClick={() => (window.location.href = "mailto:support@example.com")}>
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // Enhanced Version - Live chat support
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button className="rounded-full h-12 w-12 shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        <MessageSquare className="h-5 w-5" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 shadow-xl">
          <CardHeader className="pb-2 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                Live Support
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 h-80 overflow-y-auto">
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center ml-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

