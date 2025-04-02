"use client"

import { useEffect } from "react"
import { useFeatureFlag } from "./feature-flag-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, CreditCard, ChevronRight } from "lucide-react"

interface VirtualCardWidgetProps {
  forceShow?: boolean
}

export default function VirtualCardWidget({ forceShow }: VirtualCardWidgetProps) {
  const showVirtualCard = useFeatureFlag("showVirtualCard")

  // Use useEffect to manipulate DOM after hydration
  useEffect(() => {
    const noCardMessage = document.getElementById("no-card-message")
    if (noCardMessage) {
      if (!forceShow && !showVirtualCard) {
        noCardMessage.style.display = "block"
      } else {
        noCardMessage.style.display = "none"
      }
    }
  }, [forceShow, showVirtualCard])

  if (!forceShow && !showVirtualCard) {
    return null
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm opacity-80">Virtual Card</div>
            <div className="text-xl font-bold mt-1">Premium Access</div>
          </div>
          <CreditCard className="h-6 w-6" />
        </div>

        <div className="mb-6">
          <div className="text-sm opacity-80 mb-1">Card Number</div>
          <div className="flex items-center space-x-2">
            <div className="font-mono">•••• •••• •••• 4289</div>
            <Lock className="h-4 w-4" />
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <div className="text-sm opacity-80 mb-1">Expiry</div>
            <div>05/25</div>
          </div>
          <div>
            <div className="text-sm opacity-80 mb-1">CVV</div>
            <div>•••</div>
          </div>
          <div>
            <div className="text-sm opacity-80 mb-1">Balance</div>
            <div>$2,500.00</div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-muted-foreground">Virtual card for online purchases</div>
            <div className="text-sm text-primary">Premium members only</div>
          </div>
          <Button variant="ghost" size="sm" className="flex items-center">
            Manage
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

