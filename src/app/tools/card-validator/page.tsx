"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CreditCard, CheckCircle2, XCircle, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ValidationResult = {
    card: string
    isValid: boolean
}

export default function CardValidatorPage() {
    const { toast } = useToast()
    const [input, setInput] = useState("")
    const [results, setResults] = useState<ValidationResult[]>([])

    // Luhn algorithm
    const luhnCheck = (cardNumber: string): boolean => {
        const digits = cardNumber.replace(/\D/g, '')
        if (digits.length < 13 || digits.length > 19) return false

        let sum = 0
        let isEven = false

        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits[i])

            if (isEven) {
                digit *= 2
                if (digit > 9) digit -= 9
            }

            sum += digit
            isEven = !isEven
        }

        return sum % 10 === 0
    }

    const validateCards = () => {
        if (!input.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter card numbers to validate",
                variant: "destructive",
            })
            return
        }

        const lines = input.trim().split('\n')
        const validated: ValidationResult[] = []

        for (const line of lines) {
            if (!line.trim()) continue

            // Extract just the card number (first 13-19 digits)
            const cleaned = line.replace(/\s/g, '')
            const cardMatch = cleaned.match(/\d{13,19}/)

            if (!cardMatch) continue

            const cardNumber = cardMatch[0]
            const isValid = luhnCheck(cardNumber)

            // Format with spaces for display
            const formatted = cardNumber.match(/.{1,4}/g)?.join(' ') || cardNumber

            validated.push({
                card: formatted,
                isValid
            })
        }

        if (validated.length === 0) {
            toast({
                title: "❌ Error",
                description: "No valid card numbers found",
                variant: "destructive",
            })
            return
        }

        setResults(validated)
        const validCount = validated.filter(r => r.isValid).length
        toast({
            title: "✅ Validation Complete",
            description: `${validCount} of ${validated.length} cards are valid`,
        })
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast({
            title: "✅ Copied!",
            description: "Card copied to clipboard",
        })
    }

    const copyAll = () => {
        const allText = results.map(r => r.card).join('\n')
        navigator.clipboard.writeText(allText)
        toast({
            title: "✅ Copied All!",
            description: `${results.length} cards copied to clipboard`,
        })
    }

    const clearAll = () => {
        setResults([])
        setInput("")
        toast({
            title: "🗑️ Cleared",
            description: "All data has been cleared",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <CreditCard className="h-8 w-8 text-[#FDB532]" />
                        Card Validator
                    </h1>
                    <p className="text-muted-foreground">
                        Validate credit card numbers using the Luhn algorithm
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Input</CardTitle>
                            <CardDescription>Paste card numbers to validate</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {/* Input Textarea */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Card Numbers</label>
                                <textarea
                                    placeholder="5123456789012346&#10;4111111111111111&#10;1234567890123456"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex min-h-[180px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                />
                                <p className="text-xs text-muted-foreground">
                                    One card per line
                                </p>
                            </div>

                            {/* Validate Button */}
                            <Button onClick={validateCards} className="w-full gap-2" size="lg">
                                <CheckCircle2 className="h-4 w-4" />
                                Validate Cards
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Validation Results</CardTitle>
                                    <CardDescription>{results.length} cards checked</CardDescription>
                                </div>
                                {results.length > 0 && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={copyAll} className="gap-2">
                                            <Copy className="h-4 w-4" />
                                            Copy All
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={clearAll} className="gap-2">
                                            <Trash2 className="h-4 w-4" />
                                            Clear
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            {results.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No cards validated yet</p>
                                    <p className="text-sm">Paste cards and click Validate</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[240px] overflow-y-auto">
                                    {results.map((result, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors"
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                {result.isValid ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                                )}
                                                <code className="text-sm font-mono">{result.card}</code>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyToClipboard(result.card)}
                                                className="h-8"
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Info Card */}
                <Card className="bg-muted/30">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">ℹ️ Information</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Validates card numbers using Luhn algorithm (mod 10)</li>
                            <li>• Checks mathematical validity, not actual card existence</li>
                            <li>• Green checkmark = Valid, Red X = Invalid</li>
                            <li>• Accepts 13-19 digit card numbers</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
