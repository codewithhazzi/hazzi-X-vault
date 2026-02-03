"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TextSpinnerPage() {
    const { toast } = useToast()
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [intensity, setIntensity] = useState(50)

    // Simple synonym dictionary
    const synonyms: { [key: string]: string[] } = {
        'good': ['great', 'excellent', 'nice', 'wonderful', 'fine'],
        'bad': ['poor', 'terrible', 'awful', 'horrible', 'negative'],
        'big': ['large', 'huge', 'enormous', 'massive', 'giant'],
        'small': ['tiny', 'little', 'mini', 'compact', 'petite'],
        'happy': ['joyful', 'cheerful', 'pleased', 'delighted', 'glad'],
        'sad': ['unhappy', 'sorrowful', 'miserable', 'gloomy', 'depressed'],
        'fast': ['quick', 'rapid', 'swift', 'speedy', 'hasty'],
        'slow': ['sluggish', 'gradual', 'leisurely', 'unhurried', 'delayed'],
        'new': ['fresh', 'recent', 'modern', 'latest', 'novel'],
        'old': ['ancient', 'aged', 'elderly', 'vintage', 'antique'],
        'important': ['crucial', 'vital', 'essential', 'significant', 'critical'],
        'easy': ['simple', 'straightforward', 'effortless', 'uncomplicated', 'basic'],
        'hard': ['difficult', 'challenging', 'tough', 'complex', 'demanding'],
        'beautiful': ['gorgeous', 'stunning', 'attractive', 'lovely', 'pretty'],
        'help': ['assist', 'aid', 'support', 'facilitate', 'contribute'],
        'make': ['create', 'produce', 'build', 'construct', 'generate'],
        'use': ['utilize', 'employ', 'apply', 'implement', 'leverage'],
        'get': ['obtain', 'acquire', 'receive', 'gain', 'secure'],
        'know': ['understand', 'comprehend', 'realize', 'recognize', 'grasp'],
        'think': ['believe', 'consider', 'suppose', 'assume', 'reckon'],
    }

    const spinText = () => {
        if (!input.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter text to spin",
                variant: "destructive",
            })
            return
        }

        const words = input.split(/\s+/)
        const threshold = intensity / 100

        const spunWords = words.map(word => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '')

            // Check if we should replace this word
            if (Math.random() < threshold && synonyms[cleanWord]) {
                const syns = synonyms[cleanWord]
                const randomSyn = syns[Math.floor(Math.random() * syns.length)]

                // Preserve original capitalization
                if (word[0] === word[0].toUpperCase()) {
                    return randomSyn.charAt(0).toUpperCase() + randomSyn.slice(1)
                }
                return randomSyn
            }

            return word
        })

        setOutput(spunWords.join(' '))

        toast({
            title: "✅ Text Spun!",
            description: "Content has been rewritten",
        })
    }

    const copyOutput = () => {
        if (!output) {
            toast({
                title: "❌ Error",
                description: "No spun text to copy",
                variant: "destructive",
            })
            return
        }

        navigator.clipboard.writeText(output)
        toast({
            title: "✅ Copied!",
            description: "Spun text copied to clipboard",
        })
    }

    const clearAll = () => {
        setInput("")
        setOutput("")
        toast({
            title: "🗑️ Cleared",
            description: "All text has been cleared",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <RefreshCw className="h-8 w-8 text-[#FDB532]" />
                        Text Spinner
                    </h1>
                    <p className="text-muted-foreground">
                        Rewrite content by replacing words with synonyms
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Original Text</CardTitle>
                            <CardDescription>Enter text to spin</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <textarea
                                placeholder="Enter your text here..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex min-h-[180px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Spin Intensity: {intensity}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={intensity}
                                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                                    className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Higher intensity = more words replaced
                                </p>
                            </div>

                            <Button onClick={spinText} className="w-full gap-2" size="lg">
                                <RefreshCw className="h-4 w-4" />
                                Spin Text
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Output */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Spun Text</CardTitle>
                                    <CardDescription>Rewritten content</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copyOutput} className="gap-2">
                                        <Copy className="h-4 w-4" />
                                        Copy
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {!output ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No spun text yet</p>
                                        <p className="text-sm">Enter text and click Spin</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 bg-muted/50 rounded-md min-h-[270px]">
                                    <p className="text-sm whitespace-pre-wrap">{output}</p>
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
                            <li>• Text spinner replaces words with synonyms to create unique content</li>
                            <li>• Adjust spin intensity to control how many words are replaced</li>
                            <li>• Click "Spin Text" multiple times to generate different variations</li>
                            <li>• Always review spun content for accuracy and readability</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
