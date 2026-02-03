"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Share2, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function OpenGraphPage() {
    const { toast } = useToast()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [siteName, setSiteName] = useState("")
    const [type, setType] = useState("website")

    const generateOGTags = (): string => {
        let tags = `<!-- Open Graph / Facebook -->\n`
        tags += `<meta property="og:type" content="${type}">\n`
        if (url) tags += `<meta property="og:url" content="${url}">\n`
        tags += `<meta property="og:title" content="${title || 'Your Title Here'}">\n`
        tags += `<meta property="og:description" content="${description || 'Your description here'}">\n`
        if (image) tags += `<meta property="og:image" content="${image}">\n`
        if (siteName) tags += `<meta property="og:site_name" content="${siteName}">\n`

        return tags
    }

    const ogTags = generateOGTags()

    const copyTags = () => {
        navigator.clipboard.writeText(ogTags)
        toast({
            title: "✅ Copied!",
            description: "Open Graph tags copied to clipboard",
        })
    }

    const clearAll = () => {
        setTitle("")
        setDescription("")
        setImage("")
        setUrl("")
        setSiteName("")
        setType("website")
        toast({
            title: "🗑️ Cleared",
            description: "All fields have been cleared",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Share2 className="h-8 w-8 text-[#FDB532]" />
                        Open Graph Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate Open Graph meta tags for beautiful social media sharing
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Content Information</CardTitle>
                            <CardDescription>Enter your page details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                            {/* Title */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    placeholder="Your Page Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    placeholder="Brief description of your page"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                />
                            </div>

                            {/* Image */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Image URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                                <p className="text-xs text-muted-foreground">Recommended: 1200x630px</p>
                            </div>

                            {/* URL */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Page URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/page"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Site Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Site Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Website Name"
                                    value={siteName}
                                    onChange={(e) => setSiteName(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Type */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="website">Website</option>
                                    <option value="article">Article</option>
                                    <option value="product">Product</option>
                                    <option value="profile">Profile</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Output */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated Tags</CardTitle>
                                    <CardDescription>Ready to use</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copyTags} className="gap-2">
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
                        <CardContent className="flex-1 flex flex-col space-y-4">
                            {/* Preview Card */}
                            {(title || description || image) && (
                                <div className="border rounded-md overflow-hidden bg-muted/30">
                                    {image && (
                                        <div className="w-full h-32 bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                            <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
                                                e.currentTarget.style.display = 'none'
                                                e.currentTarget.parentElement!.innerText = 'Image Preview'
                                            }} />
                                        </div>
                                    )}
                                    <div className="p-3">
                                        {url && <p className="text-xs text-muted-foreground mb-1">{url}</p>}
                                        <p className="font-semibold text-sm line-clamp-1">{title || 'Your Title Here'}</p>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{description || 'Your description here'}</p>
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            <div className="flex-1 max-h-[160px] overflow-y-auto">
                                <pre className="text-xs bg-muted/50 p-3 rounded-md font-mono whitespace-pre-wrap">
                                    {ogTags}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Info Card */}
                <Card className="bg-muted/30">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">ℹ️ Information</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Open Graph tags control how your content appears when shared on Facebook, LinkedIn, etc.</li>
                            <li>• Image should be at least 1200x630px for best results</li>
                            <li>• Title should be 60-90 characters, description 155-200 characters</li>
                            <li>• Place these tags in your HTML &lt;head&gt; section</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
