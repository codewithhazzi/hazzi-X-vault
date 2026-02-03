"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Link2, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SlugGeneratorPage() {
    const { toast } = useToast()
    const [input, setInput] = useState("")
    const [separator, setSeparator] = useState("-")
    const [lowercase, setLowercase] = useState(true)
    const [removeSpecial, setRemoveSpecial] = useState(true)

    const generateSlug = (text: string): string => {
        let slug = text

        // Convert to lowercase if enabled
        if (lowercase) {
            slug = slug.toLowerCase()
        }

        // Remove special characters if enabled
        if (removeSpecial) {
            // Keep only alphanumeric, spaces, and some special chars
            slug = slug.replace(/[^\w\s-]/g, '')
        }

        // Replace spaces with separator
        slug = slug.replace(/\s+/g, separator)

        // Replace multiple separators with single separator
        const separatorRegex = new RegExp(`${separator}+`, 'g')
        slug = slug.replace(separatorRegex, separator)

        // Remove separator from start and end
        const trimRegex = new RegExp(`^${separator}+|${separator}+$`, 'g')
        slug = slug.replace(trimRegex, '')

        return slug
    }

    const slug = generateSlug(input)

    const copySlug = () => {
        if (!slug) {
            toast({
                title: "❌ Error",
                description: "No slug to copy",
                variant: "destructive",
            })
            return
        }

        navigator.clipboard.writeText(slug)
        toast({
            title: "✅ Copied!",
            description: "Slug copied to clipboard",
        })
    }

    const clearAll = () => {
        setInput("")
        toast({
            title: "🗑️ Cleared",
            description: "Input has been cleared",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Link2 className="h-8 w-8 text-[#FDB532]" />
                        Slug Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Convert text into SEO-friendly URL slugs
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Input Text</CardTitle>
                            <CardDescription>Enter text to convert to slug</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Text Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Text</label>
                                <textarea
                                    placeholder="How to Create Amazing Blog Posts"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                />
                            </div>

                            {/* Options */}
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Separator</label>
                                    <select
                                        value={separator}
                                        onChange={(e) => setSeparator(e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <option value="-">Hyphen (-)</option>
                                        <option value="_">Underscore (_)</option>
                                        <option value=".">Dot (.)</option>
                                    </select>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="lowercase"
                                        checked={lowercase}
                                        onChange={(e) => setLowercase(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <label htmlFor="lowercase" className="text-sm font-medium">
                                        Convert to lowercase
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="removeSpecial"
                                        checked={removeSpecial}
                                        onChange={(e) => setRemoveSpecial(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <label htmlFor="removeSpecial" className="text-sm font-medium">
                                        Remove special characters
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2">
                                <Button onClick={copySlug} className="flex-1 gap-2" size="lg">
                                    <Copy className="h-4 w-4" />
                                    Copy Slug
                                </Button>
                                <Button onClick={clearAll} variant="outline" size="lg">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Output */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated Slug</CardTitle>
                                    <CardDescription>
                                        {slug ? `${slug.length} characters` : 'No slug generated'}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            {!slug ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Link2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No slug yet</p>
                                    <p className="text-sm">Enter text to generate slug</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Generated Slug */}
                                    <div className="p-4 bg-muted/50 rounded-md">
                                        <p className="text-xs text-muted-foreground mb-2">Generated Slug:</p>
                                        <code className="text-lg font-mono break-all">{slug}</code>
                                    </div>

                                    {/* Preview URL */}
                                    <div className="p-4 bg-muted/30 rounded-md">
                                        <p className="text-xs text-muted-foreground mb-2">Preview URL:</p>
                                        <code className="text-sm text-[#FDB532] break-all">
                                            https://example.com/{slug}
                                        </code>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="p-3 bg-muted/30 rounded-md">
                                            <p className="text-muted-foreground">Length</p>
                                            <p className="text-lg font-semibold">{slug.length}</p>
                                        </div>
                                        <div className="p-3 bg-muted/30 rounded-md">
                                            <p className="text-muted-foreground">Words</p>
                                            <p className="text-lg font-semibold">{slug.split(separator).length}</p>
                                        </div>
                                    </div>
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
                            <li>• URL slugs should be lowercase for better SEO</li>
                            <li>• Hyphens (-) are preferred over underscores for word separation</li>
                            <li>• Keep slugs concise, descriptive, and keyword-rich</li>
                            <li>• Avoid special characters and spaces in URLs</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
