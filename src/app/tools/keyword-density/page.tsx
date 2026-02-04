"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Search, Trash2, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type KeywordData = {
    word: string
    count: number
    density: number
}

export default function KeywordDensityPage() {
    const { toast } = useToast()
    const [text, setText] = useState("")
    const [minWordLength, setMinWordLength] = useState(3)
    const [excludeStopWords, setExcludeStopWords] = useState(true)
    const [results, setResults] = useState<KeywordData[]>([])
    const [totalWords, setTotalWords] = useState(0)

    const stopWords = [
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
        'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
        'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
        'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
        'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
        'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
        'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
        'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
    ]

    const analyzeText = () => {
        if (!text.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter text to analyze",
                variant: "destructive",
            })
            return
        }

        // Clean and split text into words
        const words = text
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length >= minWordLength)
            .filter(word => !excludeStopWords || !stopWords.includes(word))

        const total = words.length

        // Count word frequency
        const wordCount: { [key: string]: number } = {}
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1
        })

        // Calculate density and sort
        const keywordData: KeywordData[] = Object.entries(wordCount)
            .map(([word, count]) => ({
                word,
                count,
                density: (count / total) * 100
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 50) // Top 50 keywords

        setResults(keywordData)
        setTotalWords(total)

        toast({
            title: "✅ Analysis Complete",
            description: `Found ${keywordData.length} unique keywords from ${total} words`,
        })
    }

    const copyResults = () => {
        const data = results.map(r => `${r.word}: ${r.count} (${r.density.toFixed(2)}%)`).join('\n')
        navigator.clipboard.writeText(data)
        toast({
            title: "✅ Copied!",
            description: "Keyword data copied to clipboard",
        })
    }

    const clearAll = () => {
        setText("")
        setResults([])
        setTotalWords(0)
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
                        <TrendingUp className="h-8 w-8 text-[#FDB532]" />
                        Keyword Density Analyzer
                    </h1>
                    <p className="text-muted-foreground">
                        Analyze text content and discover keyword frequency for SEO optimization
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Text Input</CardTitle>
                            <CardDescription>Paste your content to analyze</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Text Area */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Content</label>
                                <textarea
                                    placeholder="Paste your article or content here..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                />
                            </div>

                            {/* Options */}
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium">Min Word Length: {minWordLength}</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={minWordLength}
                                        onChange={(e) => setMinWordLength(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="stopWords"
                                        checked={excludeStopWords}
                                        onChange={(e) => setExcludeStopWords(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <label htmlFor="stopWords" className="text-xs font-medium">
                                        Exclude common stop words
                                    </label>
                                </div>
                            </div>

                            {/* Analyze Button */}
                            <Button onClick={analyzeText} className="w-full gap-2" size="lg">
                                <Search className="h-4 w-4" />
                                Analyze Keywords
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Keyword Results</CardTitle>
                                    <CardDescription>
                                        {results.length > 0 ? `${results.length} keywords • ${totalWords} words` : 'No analysis yet'}
                                    </CardDescription>
                                </div>
                                {results.length > 0 && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={copyResults} className="gap-2">
                                            <Copy className="h-4 w-4" />
                                            Copy
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
                                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No analysis yet</p>
                                    <p className="text-sm">Paste text and click Analyze</p>
                                </div>
                            ) : (
                                <div className="max-h-[240px] overflow-y-auto">
                                    <table className="w-full text-sm">
                                        <thead className="sticky top-0 bg-background border-b">
                                            <tr>
                                                <th className="text-left p-2">Keyword</th>
                                                <th className="text-right p-2">Count</th>
                                                <th className="text-right p-2">Density</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.map((result, index) => (
                                                <tr key={index} className="border-b hover:bg-muted/50">
                                                    <td className="p-2 font-mono">{result.word}</td>
                                                    <td className="p-2 text-right">{result.count}</td>
                                                    <td className="p-2 text-right">
                                                        <span className="text-[#FDB532]">{result.density.toFixed(2)}%</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
                            <li>• Keyword density = (Keyword count / Total words) × 100</li>
                            <li>• Ideal keyword density for SEO is typically 0.5% - 2.5%</li>
                            <li>• Stop words are common words like "the", "and", "is" that don't add SEO value</li>
                            <li>• Results show top 50 most frequent keywords</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
