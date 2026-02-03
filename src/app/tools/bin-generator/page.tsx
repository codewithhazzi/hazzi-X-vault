"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CreditCard, RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BinGeneratorPage() {
    const { toast } = useToast()
    const [bin, setBin] = useState("")
    const [quantity, setQuantity] = useState(10)
    const [includeCvv, setIncludeCvv] = useState(true)
    const [includeExpiry, setIncludeExpiry] = useState(true)
    const [results, setResults] = useState<string[]>([])

    // Luhn algorithm to calculate check digit
    const luhnCheck = (num: string): string => {
        const arr = num.split('').reverse()
        let sum = 0

        for (let i = 0; i < arr.length; i++) {
            let digit = parseInt(arr[i])
            if (i % 2 === 1) {
                digit *= 2
                if (digit > 9) digit -= 9
            }
            sum += digit
        }

        const checkDigit = (10 - (sum % 10)) % 10
        return num + checkDigit
    }

    const generateRandomDigits = (length: number): string => {
        let result = ''
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10)
        }
        return result
    }

    const generateExpiry = (): string => {
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
        const year = String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).slice(-2)
        return `${month}/${year}`
    }

    const generateCvv = (): string => {
        return String(Math.floor(Math.random() * 900) + 100)
    }

    const generateCards = () => {
        if (!bin || bin.length < 4) {
            toast({
                title: "❌ Error",
                description: "Please enter at least 4 digits for BIN",
                variant: "destructive",
            })
            return
        }

        const generated: string[] = []

        for (let i = 0; i < quantity; i++) {
            // Generate 16-digit card (BIN + random + check digit)
            const remaining = 15 - bin.length // 15 because we'll add 1 check digit
            const randomPart = generateRandomDigits(remaining)
            const cardNumber = luhnCheck(bin + randomPart)

            let result = cardNumber.match(/.{1,4}/g)?.join(' ') || cardNumber

            if (includeExpiry) {
                result += ` | ${generateExpiry()}`
            }

            if (includeCvv) {
                result += ` | ${generateCvv()}`
            }

            generated.push(result)
        }

        setResults(generated)
        toast({
            title: "✅ Success",
            description: `Generated ${generated.length} cards successfully!`,
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
        const allText = results.join('\n')
        navigator.clipboard.writeText(allText)
        toast({
            title: "✅ Copied All!",
            description: `${results.length} cards copied to clipboard`,
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <CreditCard className="h-8 w-8 text-[#FDB532]" />
                        BIN Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate valid credit card numbers from BIN (Bank Identification Number)
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration</CardTitle>
                            <CardDescription>Enter BIN and select options</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* BIN Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">BIN (4-16 digits)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 424242"
                                    value={bin}
                                    onChange={(e) => setBin(e.target.value.replace(/\D/g, '').slice(0, 16))}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Enter the first 4-16 digits of the card
                                </p>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Options */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="expiry"
                                        checked={includeExpiry}
                                        onChange={(e) => setIncludeExpiry(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <label htmlFor="expiry" className="text-sm font-medium">
                                        Include Expiry Date
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="cvv"
                                        checked={includeCvv}
                                        onChange={(e) => setIncludeCvv(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <label htmlFor="cvv" className="text-sm font-medium">
                                        Include CVV
                                    </label>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <Button onClick={generateCards} className="w-full gap-2" size="lg">
                                <RefreshCw className="h-4 w-4" />
                                Generate Cards
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated Cards</CardTitle>
                                    <CardDescription>{results.length} cards generated</CardDescription>
                                </div>
                                {results.length > 0 && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={copyAll} className="gap-2">
                                            <Copy className="h-4 w-4" />
                                            Copy All
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => {
                                            setResults([])
                                            setBin("")
                                            toast({
                                                title: "🗑️ Cleared",
                                                description: "All generated cards have been cleared",
                                            })
                                        }} className="gap-2">
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
                                    <p>No cards generated yet</p>
                                    <p className="text-sm">Enter BIN and click Generate</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[240px] overflow-y-auto">
                                    {results.map((card, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors"
                                        >
                                            <code className="text-sm font-mono">{card}</code>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyToClipboard(card)}
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
                            <li>• Generated cards are valid according to Luhn algorithm</li>
                            <li>• These are test cards for development purposes only</li>
                            <li>• Do not use for actual transactions</li>
                            <li>• BIN identifies the card issuer (bank)</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
