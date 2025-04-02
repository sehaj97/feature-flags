"use client"

import { useFeatureFlag } from "./feature-flag-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, ArrowDownRight, DollarSign, PieChart, CreditCard, Clock } from "lucide-react"

interface DashboardOverviewProps {
  forceMvp?: boolean
  forceFinal?: boolean
}

export default function DashboardOverview({ forceMvp, forceFinal }: DashboardOverviewProps) {
  const dashboardV2Enabled = useFeatureFlag("dashboard_v2")

  // Determine which version to show based on props and feature flag
  const showEnhancedVersion = forceFinal || (!forceMvp && dashboardV2Enabled)

  // Sample transaction data
  const transactions = [
    { id: 1, name: "Grocery Store", amount: -82.45, date: "Today" },
    { id: 2, name: "Salary Deposit", amount: 2750.0, date: "Yesterday" },
    { id: 3, name: "Electric Bill", amount: -94.2, date: "2 days ago" },
  ]

  // MVP Version - Simple balance and transactions
  if (!showEnhancedVersion) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$4,251.78</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <div className="font-medium">{transaction.name}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                  <div className={transaction.amount > 0 ? "text-green-600" : ""}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Enhanced Version - Rich dashboard with budget, investments, and charts
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              Account Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Current Balance</div>
                <div className="text-3xl font-bold">$4,251.78</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+12.5% from last month</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Monthly Spending</div>
                <div className="text-3xl font-bold">$1,842.32</div>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>-5.2% from last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2 bg-primary/10 rounded-lg text-center text-sm hover:bg-primary/20 transition-colors">
                Send Money
              </button>
              <button className="p-2 bg-primary/10 rounded-lg text-center text-sm hover:bg-primary/20 transition-colors">
                Pay Bills
              </button>
              <button className="p-2 bg-primary/10 rounded-lg text-center text-sm hover:bg-primary/20 transition-colors">
                Top Up
              </button>
              <button className="p-2 bg-primary/10 rounded-lg text-center text-sm hover:bg-primary/20 transition-colors">
                Investments
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-primary" />
              Budget Breakdown
            </CardTitle>
            <CardDescription>Monthly spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Housing</span>
                  <span className="text-sm font-medium">$950 / $1000</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Food</span>
                  <span className="text-sm font-medium">$420 / $500</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Transportation</span>
                  <span className="text-sm font-medium">$180 / $300</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Entertainment</span>
                  <span className="text-sm font-medium">$210 / $200</span>
                </div>
                <Progress value={105} className="h-2 bg-red-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        transaction.amount > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={transaction.amount > 0 ? "text-green-600 font-medium" : "font-medium"}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
              <button className="text-sm text-primary hover:underline w-full text-center pt-2">
                View all transactions
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

