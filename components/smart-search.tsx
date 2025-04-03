"use client"

import type React from "react"

import { useState } from "react"
import { useFeatureFlag } from "./feature-flag-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X, Calendar, Tag, ArrowDownRight, ArrowUpRight } from "lucide-react"

interface SmartSearchProps {
  forceMvp?: boolean
  forceFinal?: boolean
}

export default function SmartSearch({ forceMvp, forceFinal }: SmartSearchProps) {
  const smartSearchEnabled = useFeatureFlag("smartSearch")
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Determine which version to show based on props and feature flag
  const showEnhancedVersion = forceFinal || (!forceMvp && smartSearchEnabled)

  // Sample transaction data
  const transactions = [
    { id: 1, name: "Grocery Store", amount: -82.45, date: "Apr 15, 2025", category: "Food" },
    { id: 2, name: "Salary Deposit", amount: 2750.0, date: "Apr 14, 2025", category: "Income" },
    { id: 3, name: "Electric Bill", amount: -94.2, date: "Apr 13, 2025", category: "Utilities" },
    { id: 4, name: "Restaurant", amount: -65.3, date: "Apr 12, 2025", category: "Food" },
    { id: 5, name: "Gas Station", amount: -45.0, date: "Apr 10, 2025", category: "Transportation" },
  ]

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (showEnhancedVersion && value.length > 1) {
      // Simulate AI-powered suggestions
      const possibleSuggestions = [
        "grocery",
        "food",
        "restaurant",
        "utilities",
        "transportation",
        "income",
        "salary",
        "bill",
        "deposit",
        "april",
        "2025",
      ]

      const filtered = possibleSuggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))

      setSuggestions(filtered.slice(0, 3))
    } else {
      setSuggestions([])
    }
  }

  // Filter transactions based on search term
  const filteredTransactions =
    searchTerm.length > 0
      ? transactions.filter(
          (t) =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.date.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : transactions

  // MVP Version - Basic search
  if (!showEnhancedVersion) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Transaction Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mr-2"
            />
            <Button>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {filteredTransactions.map((transaction) => (
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

            {filteredTransactions.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">No transactions found</div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Enhanced Version - AI-powered smart search
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Smart Transaction Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <div className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by merchant, category, date..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-9 pr-4"
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-2.5"
                  onClick={() => {
                    setSearchTerm("")
                    setSuggestions([])
                  }}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button className="ml-2">Search</Button>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                  onClick={() => {
                    setSearchTerm(suggestion)
                    setSuggestions([])
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" size="sm" className="flex items-center text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            This Month
          </Button>
          <Button variant="outline" size="sm" className="flex items-center text-xs">
            <Tag className="h-3 w-3 mr-1" />
            Food
          </Button>
          <Button variant="outline" size="sm" className="flex items-center text-xs">
            <Tag className="h-3 w-3 mr-1" />
            Utilities
          </Button>
          <Button variant="outline" size="sm" className="flex items-center text-xs">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            Expenses
          </Button>
          <Button variant="outline" size="sm" className="flex items-center text-xs">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            Income
          </Button>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
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
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {transaction.date}
                    <span className="mx-1">•</span>
                    <Tag className="h-3 w-3 mr-1" />
                    {transaction.category}
                  </div>
                </div>
              </div>
              <div className={transaction.amount > 0 ? "text-green-600 font-medium" : "font-medium"}>
                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          ))}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>No transactions found matching "{searchTerm}"</p>
              <p className="text-sm">Try searching for a merchant, category, or date</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

