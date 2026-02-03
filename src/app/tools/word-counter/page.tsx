"use client"

import { useState, useMemo } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, FileText, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WordCounterPage() {
    const { toast } = useToast()
    const [text, setText] = useState("")

    const stats = useMemo(() => {
        const trimmedText = text.trim()

        // Words
        const words = trimmedText ? trimmedText.split(/\s+/).filter(w => w.length > 0).length : 0

        // Characters
        const characters = text.length
        const charactersNoSpaces = text.replace(/\s/g, '').length

        // Sentences
        const sentences = trimmedText ? trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0

        // Paragraphs
        const paragraphs = trimmedText ? trimmedText.split(/\n\n+/).filter(p => p.trim().length > 0).length : 0

        // Reading time (average 200 words per minute)
        const readingTime = Math.ceil(words / 200)

        return {
            words,
            characters,
            charactersNoSpaces,
            sentences,
            paragraphs,
            readingTime
        }
    }, [text])

    const copyText = () => {
        if (!text) {
            toast({
                title: "❌ Error",
                description: "No text to copy",
                variant: "destructive",
            })
            return
        }

        navigator.clipboard.writeText(text)
        toast({
            title: "✅ Copied!",
            description: "Text copied to clipboard",
        })
    }

    const clearAll = () => {
        setText("")
        toast({
            title: "🗑️ Cleared",
            description: "Text has been cleared",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FileText className="h-8 w-8 text-[#FDB532]" />
                        Word Counter
                    </h1>
                    <p className="text-muted-foreground">
                        Count words, characters, sentences and analyze your text
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Text Input</CardTitle>
                                    <CardDescription>Paste or type your text</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copyText} className="gap-2">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <textarea
                                placeholder="Start typing or paste your text here..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="flex min-h-[270px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                            />
                        </CardContent>
                    </Card>

                    {/* Stats */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Statistics</CardTitle>
                            <CardDescription>Real-time text analysis</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-muted/50 rounded-md">
                                    <p className="text-sm text-muted-foreground">Words</p>
                                    <p className="text-3xl font-bold text-[#FDB532]">{stats.words}</p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-md">
                                    <p className="text-sm text-muted-foreground">Characters</p>
                                    <p className="text-3xl font-bold text-[#FDB532]">{stats.characters}</p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-md">
                                    <p className="text-sm text-muted-foreground">No Spaces</p>
                                    <p className="text-3xl font-bold">{stats.charactersNoSpaces}</p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-md">
                                    <p className="text-sm text-muted-foreground">Sentences</p>
                                    <p className="text-3xl font-bold">{stats.sentences}</p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-md">
                                    <p className="text-sm text-muted-foreground">Paragraphs</p>
                                    <p className="text-3xl font-bold">{stats.paragraphs}</p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-md">
                                    <p className="text-sm text-muted-foreground">Reading Time</p>
                                    <p className="text-3xl font-bold">{stats.readingTime} min</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Info Card */}
                <Card className="bg-muted/30">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">ℹ️ Information</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Words are counted by splitting on whitespace</li>
                            <li>• Reading time is calculated at 200 words per minute (average reading speed)</li>
                            <li>• All statistics update in real-time as you type</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
