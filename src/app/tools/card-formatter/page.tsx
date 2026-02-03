"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CreditCard, Wand2, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CardFormatterPage() {
    const { toast } = useToast()
    const [input, setInput] = useState("")
    const [formatType, setFormatType] = useState("pipe") // pipe, space, comma, colon, pretty
    const [results, setResults] = useState<string[]>([])

    const formatCards = () => {
        if (!input.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter card data to format",
                variant: "destructive",
            })
            return
        }

        const lines = input.trim().split('\n')
        const formatted: string[] = []

        for (const line of lines) {
            if (!line.trim()) continue

            // Remove all existing separators and spaces
            const cleaned = line.replace(/[|,:\/\s]/g, '')

            // Extract card number (first 16 digits)
            const cardMatch = cleaned.match(/\d{13,19}/)
            if (!cardMatch) continue

            const cardNumber = cardMatch[0].slice(0, 16)
            const remaining = cleaned.slice(cardNumber.length)

            let formattedCard = ""
            let separator = ""
            let useSpacing = false

            // Determine separator and spacing based on format type
            switch (formatType) {
                case "pipe":
                    separator = "|"
                    useSpacing = false
                    break
                case "space":
                    separator = " "
                    useSpacing = false
                    break
                case "comma":
                    separator = ","
                    useSpacing = false
                    break
                case "colon":
                    separator = ":"
                    useSpacing = false
                    break
                case "pretty":
                    separator = " | "
                    useSpacing = true
                    break
            }

            // Format card number with spaces if enabled
            formattedCard = useSpacing
                ? cardNumber.match(/.{1,4}/g)?.join(' ') || cardNumber
                : cardNumber

            // Extract expiry (MM/YY or MMYY)
            const expiryMatch = remaining.match(/(\d{2})[\/.\/]?(\d{2})/)
            if (expiryMatch) {
                formattedCard += `${separator}${expiryMatch[1]}/${expiryMatch[2]}`

                // Extract CVV (3-4 digits after expiry)
                const afterExpiry = remaining.slice(expiryMatch.index! + expiryMatch[0].length)
                const cvvMatch = afterExpiry.match(/\d{3,4}/)
                if (cvvMatch) {
                    formattedCard += `${separator}${cvvMatch[0]}`
                }
            }

            formatted.push(formattedCard)
        }

        if (formatted.length === 0) {
            toast({
                title: "❌ Error",
                description: "No valid card data found",
                variant: "destructive",
            })
            return
        }

        setResults(formatted)
        toast({
            title: "✅ Success",
            description: `Formatted ${formatted.length} cards successfully!`,
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
                        Card Formatter
                    </h1>
                    <p className="text-muted-foreground">
                        Format and clean up card numbers with custom separators and spacing
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Input</CardTitle>
                            <CardDescription>Paste your raw card data</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {/* Input Textarea */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Card Data</label>
                                <textarea
                                    placeholder="5123456789012346|12/25|123&#10;4111111111111111 01 27 456"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                />
                                <p className="text-xs text-muted-foreground">
                                    One card per line, any format
                                </p>
                            </div>

                            {/* Format Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Format Type</label>
                                <select
                                    value={formatType}
                                    onChange={(e) => setFormatType(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="pipe">Pipe Separated (|)</option>
                                    <option value="space">Space Separated</option>
                                    <option value="comma">Comma Separated (,)</option>
                                    <option value="colon">Colon Separated (:)</option>
                                    <option value="pretty">Pretty Formatted</option>
                                </select>
                            </div>

                            {/* Format Button */}
                            <Button onClick={formatCards} className="w-full gap-2" size="lg">
                                <Wand2 className="h-4 w-4" />
                                Format Cards
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Formatted Cards</CardTitle>
                                    <CardDescription>{results.length} cards formatted</CardDescription>
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
                                    <p>No cards formatted yet</p>
                                    <p className="text-sm">Paste cards and click Format</p>
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
                            <li>• Supports various input formats with any separator</li>
                            <li>• Automatically detects card number, expiry, and CVV</li>
                            <li>• Customize output format with spacing and separators</li>
                            <li>• Batch format multiple cards at once</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
