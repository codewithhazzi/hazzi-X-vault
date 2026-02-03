"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Tag, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MetaTagsPage() {
    const { toast } = useToast()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [image, setImage] = useState("")
    const [siteName, setSiteName] = useState("")
    const [twitterHandle, setTwitterHandle] = useState("")
    const [keywords, setKeywords] = useState("")

    const generateTags = () => {
        if (!title || !description) {
            toast({
                title: "❌ Error",
                description: "Title and Description are required",
                variant: "destructive",
            })
            return
        }

        toast({
            title: "✅ Generated!",
            description: "Meta tags generated successfully",
        })
    }

    const metaTags = `<!-- Primary Meta Tags -->
<title>${title || 'Your Title Here'}</title>
<meta name="title" content="${title || 'Your Title Here'}">
<meta name="description" content="${description || 'Your description here'}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
${url ? `<meta property="og:url" content="${url}">` : ''}
<meta property="og:title" content="${title || 'Your Title Here'}">
<meta property="og:description" content="${description || 'Your description here'}">
${image ? `<meta property="og:image" content="${image}">` : ''}
${siteName ? `<meta property="og:site_name" content="${siteName}">` : ''}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
${url ? `<meta property="twitter:url" content="${url}">` : ''}
<meta property="twitter:title" content="${title || 'Your Title Here'}">
<meta property="twitter:description" content="${description || 'Your description here'}">
${image ? `<meta property="twitter:image" content="${image}">` : ''}
${twitterHandle ? `<meta name="twitter:site" content="${twitterHandle}">` : ''}`

    const copyTags = () => {
        navigator.clipboard.writeText(metaTags)
        toast({
            title: "✅ Copied!",
            description: "Meta tags copied to clipboard",
        })
    }

    const clearAll = () => {
        setTitle("")
        setDescription("")
        setUrl("")
        setImage("")
        setSiteName("")
        setTwitterHandle("")
        setKeywords("")
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
                        <Tag className="h-8 w-8 text-[#FDB532]" />
                        Meta Tags Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate SEO and social media meta tags for your website
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Website Information</CardTitle>
                            <CardDescription>Enter your site details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title *</label>
                                <input
                                    type="text"
                                    placeholder="Your Website Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description *</label>
                                <textarea
                                    placeholder="Brief description of your website"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                />
                            </div>

                            {/* URL */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">URL</label>
                                <input
                                    type="url"
                                    placeholder="https://yourwebsite.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Image */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image URL</label>
                                <input
                                    type="url"
                                    placeholder="https://yourwebsite.com/image.jpg"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Site Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Site Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Site Name"
                                    value={siteName}
                                    onChange={(e) => setSiteName(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Twitter Handle */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Twitter Handle</label>
                                <input
                                    type="text"
                                    placeholder="@yourhandle"
                                    value={twitterHandle}
                                    onChange={(e) => setTwitterHandle(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Keywords */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Keywords</label>
                                <input
                                    type="text"
                                    placeholder="keyword1, keyword2, keyword3"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Generated Tags */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated Meta Tags</CardTitle>
                                    <CardDescription>Copy these tags to your HTML</CardDescription>
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
                        <CardContent className="flex-1 flex flex-col">
                            <div className="flex-1 max-h-[240px] overflow-y-auto">
                                <pre className="text-xs bg-muted/50 p-4 rounded-md overflow-x-auto">
                                    <code>{metaTags}</code>
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
                            <li>• Generates HTML meta tags for SEO optimization</li>
                            <li>• Includes Open Graph tags for Facebook/LinkedIn sharing</li>
                            <li>• Includes Twitter Card tags for Twitter sharing</li>
                            <li>• Copy and paste the generated tags into your HTML &lt;head&gt; section</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
