"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Link2, RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ShortenedURL = {
    original: string
    short: string
    code: string
}

export default function URLShortenerPage() {
    const { toast } = useToast()
    const [url, setUrl] = useState("")
    const [customCode, setCustomCode] = useState("")
    const [shortenedURLs, setShortenedURLs] = useState<ShortenedURL[]>([])
    const [loading, setLoading] = useState(false)

    const isValidURL = (urlString: string) => {
        try {
            new URL(urlString)
            return true
        } catch {
            return false
        }
    }

    const shortenURL = async () => {
        if (!url.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter a URL",
                variant: "destructive",
            })
            return
        }

        if (!isValidURL(url)) {
            toast({
                title: "❌ Invalid URL",
                description: "Please enter a valid URL (including http:// or https://)",
                variant: "destructive",
            })
            return
        }

        const apiKey = process.env.NEXT_PUBLIC_SPOO_API_KEY
        if (!apiKey || apiKey === "spoo_YOUR_API_KEY_HERE") {
            toast({
                title: "❌ API Key Missing",
                description: "Please add your spoo.me API key to .env.local",
                variant: "destructive",
            })
            return
        }

        setLoading(true)

        try {
            const response = await fetch('https://spoo.me/api/v1/shorten', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    long_url: url,
                    ...(customCode.trim() && { alias: customCode.trim() })
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to shorten URL')
            }

            const newEntry: ShortenedURL = {
                original: url,
                short: data.short_url,
                code: data.short_code || customCode.trim()
            }

            setShortenedURLs([newEntry, ...shortenedURLs])
            setUrl("")
            setCustomCode("")

            toast({
                title: "✅ Shortened!",
                description: "URL shortened successfully",
            })
        } catch (error: any) {
            toast({
                title: "❌ Error",
                description: error.message || "Failed to shorten URL. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const copyURL = (shortURL: string) => {
        navigator.clipboard.writeText(shortURL)
        toast({
            title: "✅ Copied!",
            description: "Short URL copied to clipboard",
        })
    }

    const clearAll = () => {
        setShortenedURLs([])
        setUrl("")
        setCustomCode("")
        toast({
            title: "🗑️ Cleared",
            description: "All URLs cleared",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Link2 className="h-8 w-8 text-[#FDB532]" />
                        URL Shortener
                    </h1>
                    <p className="text-muted-foreground">
                        Create short, memorable links from long URLs
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Shorten URL</CardTitle>
                            <CardDescription>Enter URL to shorten</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* URL Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Long URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/very/long/url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && shortenURL()}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Custom Code (Optional) */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Custom Code (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="my-custom-link"
                                    value={customCode}
                                    onChange={(e) => setCustomCode(e.target.value)}
                                    className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Leave empty for random code
                                </p>
                            </div>

                            {/* Shorten Button */}
                            <Button onClick={shortenURL} className="w-full gap-2" size="lg" disabled={loading}>
                                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                {loading ? 'Shortening...' : 'Shorten URL'}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Shortened URLs</CardTitle>
                                    <CardDescription>
                                        {shortenedURLs.length > 0 ? `${shortenedURLs.length} URL${shortenedURLs.length > 1 ? 's' : ''}` : 'No URLs'}
                                    </CardDescription>
                                </div>
                                {shortenedURLs.length > 0 && (
                                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {shortenedURLs.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <Link2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No shortened URLs</p>
                                        <p className="text-sm">Start shortening links</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[260px] overflow-y-auto">
                                    {shortenedURLs.map((item, index) => (
                                        <div key={index} className="p-2 bg-muted/50 rounded-md space-y-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-muted-foreground">Short URL</p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyURL(item.short)}
                                                    className="h-6 px-2"
                                                >
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <p className="text-sm font-mono font-semibold text-[#FDB532] break-all">
                                                {item.short}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate" title={item.original}>
                                                {item.original}
                                            </p>
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
                            <li>• Powered by spoo.me - real URL shortening service</li>
                            <li>• Custom aliases let you create memorable short links</li>
                            <li>• Add your API key to .env.local to start using</li>
                            <li>• Get your free API key at https://spoo.me</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
