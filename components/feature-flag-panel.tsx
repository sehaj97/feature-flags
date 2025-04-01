"use client"
import { useFeatureFlagContext, type UserSegment, type RolloutStrategy } from "./feature-flag-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function FeatureFlagPanel() {
  const { flags, updateFlag, currentUserSegment, setCurrentUserSegment } = useFeatureFlagContext()

  // Group flags by category
  const heroFlags = ["hero_v2"]
  const dashboardFlags = ["dashboard_v2"]
  const virtualCardFlags = ["showVirtualCard"]
  const searchFlags = ["smartSearch"]
  const supportFlags = ["supportChat"]

  // Render a single feature flag card
  const renderFeatureFlag = (flagName: string) => {
    const flag = flags[flagName]
    if (!flag) return null

    return (
      <Card key={flag.name}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{flag.name}</CardTitle>
            <Switch
              checked={flag.rolloutStrategy === "on"}
              onCheckedChange={(checked) => {
                updateFlag(flag.name, {
                  rolloutStrategy: checked ? "on" : "off",
                })
              }}
            />
          </div>
          <CardDescription>{flag.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Rollout Strategy</Label>
              <RadioGroup
                value={flag.rolloutStrategy}
                onValueChange={(value) => {
                  updateFlag(flag.name, {
                    rolloutStrategy: value as RolloutStrategy,
                  })
                }}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="off" id={`${flag.name}-off`} />
                  <Label htmlFor={`${flag.name}-off`}>Off for everyone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="on" id={`${flag.name}-on`} />
                  <Label htmlFor={`${flag.name}-on`}>On for everyone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id={`${flag.name}-percentage`} />
                  <Label htmlFor={`${flag.name}-percentage`}>Percentage rollout</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="userSegment" id={`${flag.name}-segment`} />
                  <Label htmlFor={`${flag.name}-segment`}>User segment</Label>
                </div>
              </RadioGroup>
            </div>

            {flag.rolloutStrategy === "percentage" && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Rollout Percentage</Label>
                  <span className="text-sm">{flag.rolloutPercentage}%</span>
                </div>
                <Slider
                  value={[flag.rolloutPercentage]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => {
                    updateFlag(flag.name, { rolloutPercentage: value[0] })
                  }}
                />
              </div>
            )}

            {flag.rolloutStrategy === "userSegment" && (
              <div className="space-y-2">
                <Label className="mb-2 block">Available for:</Label>
                <div className="space-y-2">
                  {["premium", "beta", "guest"].map((segment) => (
                    <div key={segment} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${flag.name}-${segment}`}
                        checked={flag.userSegments.includes(segment as UserSegment)}
                        onCheckedChange={(checked) => {
                          const newSegments = checked
                            ? [...flag.userSegments, segment as UserSegment]
                            : flag.userSegments.filter((s) => s !== segment)

                          updateFlag(flag.name, { userSegments: newSegments })
                        }}
                      />
                      <Label htmlFor={`${flag.name}-${segment}`}>{segment}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Tabs defaultValue="flags">
        <TabsList className="mb-4">
          <TabsTrigger value="flags">Feature Flags</TabsTrigger>
          <TabsTrigger value="user">User Simulation</TabsTrigger>
        </TabsList>

        <TabsContent value="flags">
          <Tabs defaultValue="hero">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="hero">🦸‍♂️ Hero</TabsTrigger>
              <TabsTrigger value="dashboard">📈 Dashboard</TabsTrigger>
              <TabsTrigger value="virtualcard">💳 Virtual Card</TabsTrigger>
              <TabsTrigger value="search">🔍 Smart Search</TabsTrigger>
              <TabsTrigger value="chat">💬 Support Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="hero">
              <div className="grid gap-4">{heroFlags.map((flagName) => renderFeatureFlag(flagName))}</div>
            </TabsContent>

            <TabsContent value="dashboard">
              <div className="grid gap-4">{dashboardFlags.map((flagName) => renderFeatureFlag(flagName))}</div>
            </TabsContent>

            <TabsContent value="virtualcard">
              <div className="grid gap-4">{virtualCardFlags.map((flagName) => renderFeatureFlag(flagName))}</div>
            </TabsContent>

            <TabsContent value="search">
              <div className="grid gap-4">{searchFlags.map((flagName) => renderFeatureFlag(flagName))}</div>
            </TabsContent>

            <TabsContent value="chat">
              <div className="grid gap-4">{supportFlags.map((flagName) => renderFeatureFlag(flagName))}</div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User Segment Simulation</CardTitle>
              <CardDescription>Simulate different user types to see how feature flags behave</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="user-segment">Current User Segment</Label>
                  <Select
                    value={currentUserSegment}
                    onValueChange={(value) => setCurrentUserSegment(value as UserSegment)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select user segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="guest">Guest User</SelectItem>
                      <SelectItem value="beta">Beta User</SelectItem>
                      <SelectItem value="premium">Premium User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>This simulates different user types to test segment-based feature flags.</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Guest users typically see minimal features</li>
                    <li>Beta users get early access to new features</li>
                    <li>Premium users get all premium features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

