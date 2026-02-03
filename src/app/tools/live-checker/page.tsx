"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CreditCard, CheckCircle2, XCircle, HelpCircle, Trash2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type CheckResult = {
    card: string
    code: number // 0: Die, 1: Live, 2: Unknown
    status: string
    message: string
    bank?: string
    type?: string
    category?: string
    brand?: string
    country?: {
        name: string
        code: string
        emoji: string
    }
}

export default function LiveCheckerPage() {
    const { toast } = useToast()
    const [input, setInput] = useState("")
    const [results, setResults] = useState<CheckResult[]>([])
    const [checking, setChecking] = useState(false)

    const checkCards = async () => {
        if (!input.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter card data to check",
                variant: "destructive",
            })
            return
        }

        const lines = input.trim().split('\n').filter(line => line.trim())

        if (lines.length === 0) {
            toast({
                title: "❌ Error",
                description: "No valid card data found",
                variant: "destructive",
            })
            return
        }

        setChecking(true)
        const checked: CheckResult[] = []

        for (const line of lines) {
            try {
                const response = await fetch('https://api.chkr.cc/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data: line.trim() })
                })

                const result = await response.json()

                checked.push({
                    card: line.trim(),
                    code: result.code,
                    status: result.status,
                    message: result.message,
                    bank: result.card?.bank,
                    type: result.card?.type,
                    category: result.card?.category,
                    brand: result.card?.brand,
                    country: result.card?.country
                })
            } catch (error) {
                checked.push({
                    card: line.trim(),
                    code: 2,
                    status: "Error",
                    message: "Failed to check card"
                })
            }
        }

        setResults(checked)
        setChecking(false)

        const liveCount = checked.filter(r => r.code === 1).length
        toast({
            title: "✅ Check Complete",
            description: `${liveCount} of ${checked.length} cards are live`,
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

    const copyLive = () => {
        const liveCards = results.filter(r => r.code === 1).map(r => r.card).join('\n')
        navigator.clipboard.writeText(liveCards)
        const count = results.filter(r => r.code === 1).length
        toast({
            title: "✅ Copied Live Cards!",
            description: `${count} live cards copied to clipboard`,
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

    const getStatusIcon = (code: number) => {
        switch (code) {
            case 1:
                return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
            case 0:
                return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            default:
                return <HelpCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
        }
    }

    const liveCount = results.filter(r => r.code === 1).length
    const dieCount = results.filter(r => r.code === 0).length

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <CreditCard className="h-8 w-8 text-[#FDB532]" />
                        Live Checker
                    </h1>
                    <p className="text-muted-foreground">
                        Check card status using live validation API
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Input</CardTitle>
                            <CardDescription>Format: card|month|year|cvv</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {/* Input Textarea */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Card Data</label>
                                <textarea
                                    placeholder="4242424242424242|12|2025|123&#10;5123456789012346|01|2026|456"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex min-h-[180px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                />
                                <p className="text-xs text-muted-foreground">
                                    One card per line
                                </p>
                            </div>

                            {/* Check Button */}
                            <Button
                                onClick={checkCards}
                                className="w-full gap-2"
                                size="lg"
                                disabled={checking}
                            >
                                {checking ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Checking...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="h-4 w-4" />
                                        Check Cards
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Check Results</CardTitle>
                                    <CardDescription>
                                        {results.length > 0 && (
                                            <span className="flex gap-3">
                                                <span className="text-green-500">Live: {liveCount}</span>
                                                <span className="text-red-500">Die: {dieCount}</span>
                                            </span>
                                        )}
                                        {results.length === 0 && "No cards checked"}
                                    </CardDescription>
                                </div>
                                {results.length > 0 && (
                                    <div className="flex gap-2">
                                        {liveCount > 0 && (
                                            <Button variant="outline" size="sm" onClick={copyLive} className="gap-2">
                                                <Copy className="h-4 w-4" />
                                                Live
                                            </Button>
                                        )}
                                        <Button variant="outline" size="sm" onClick={copyAll} className="gap-2">
                                            <Copy className="h-4 w-4" />
                                            All
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={clearAll} className="gap-2">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            {results.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No cards checked yet</p>
                                    <p className="text-sm">Paste cards and click Check</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[240px] overflow-y-auto">
                                    {results.map((result, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-col gap-2 p-3 rounded-md transition-colors ${result.code === 1
                                                    ? 'bg-green-500/10 border border-green-500/20'
                                                    : result.code === 0
                                                        ? 'bg-red-500/10 border border-red-500/20'
                                                        : 'bg-yellow-500/10 border border-yellow-500/20'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 flex-1">
                                                    {getStatusIcon(result.code)}
                                                    <div className="flex-1 min-w-0">
                                                        <code className="text-sm font-mono block truncate">{result.card}</code>
                                                        <p className="text-xs text-muted-foreground">{result.message}</p>
                                                    </div>
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
                                            {result.bank && (
                                                <div className="text-xs text-muted-foreground pl-8">
                                                    {result.country?.emoji} {result.bank} • {result.type?.toUpperCase()} • {result.category}
                                                </div>
                                            )}
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
                            <li>• Format: card|month|year|cvv (e.g., 4242424242424242|12|2025|123)</li>
                            <li>• Green = Live (code: 1), Red = Die (code: 0), Yellow = Unknown (code: 2)</li>
                            <li>• Shows bank, card type, and country information from API</li>
                            <li>• Real-time validation using chkr.cc payment gateway</li>
                            <li>• API rate limits may apply for excessive requests</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
