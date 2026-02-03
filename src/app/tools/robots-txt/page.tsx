"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, FileText, Trash2, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RobotsTxtPage() {
    const { toast } = useToast()
    const [sitemap, setSitemap] = useState("")
    const [userAgent, setUserAgent] = useState("*")
    const [disallow, setDisallow] = useState("")
    const [allow, setAllow] = useState("")
    const [preset, setPreset] = useState("custom")

    const presets = {
        allowAll: {
            name: "Allow All Bots",
            content: "User-agent: *\nDisallow:"
        },
        blockAll: {
            name: "Block All Bots",
            content: "User-agent: *\nDisallow: /"
        },
        wordpress: {
            name: "WordPress Standard",
            content: "User-agent: *\nDisallow: /wp-admin/\nDisallow: /wp-includes/\nAllow: /wp-admin/admin-ajax.php"
        },
        ecommerce: {
            name: "E-commerce",
            content: "User-agent: *\nDisallow: /cart/\nDisallow: /checkout/\nDisallow: /account/\nDisallow: /admin/"
        }
    }

    const generateRobotsTxt = (): string => {
        if (preset !== "custom") {
            let content = presets[preset as keyof typeof presets].content
            if (sitemap) {
                content += `\n\nSitemap: ${sitemap}`
            }
            return content
        }

        let robotsTxt = `User-agent: ${userAgent || '*'}\n`

        if (disallow) {
            const disallowPaths = disallow.split('\n').filter(p => p.trim())
            disallowPaths.forEach(path => {
                robotsTxt += `Disallow: ${path.trim()}\n`
            })
        } else {
            robotsTxt += `Disallow:\n`
        }

        if (allow) {
            const allowPaths = allow.split('\n').filter(p => p.trim())
            allowPaths.forEach(path => {
                robotsTxt += `Allow: ${path.trim()}\n`
            })
        }

        if (sitemap) {
            robotsTxt += `\nSitemap: ${sitemap}`
        }

        return robotsTxt
    }

    const robotsTxt = generateRobotsTxt()

    const copyRobotsTxt = () => {
        navigator.clipboard.writeText(robotsTxt)
        toast({
            title: "✅ Copied!",
            description: "Robots.txt copied to clipboard",
        })
    }

    const downloadRobotsTxt = () => {
        const blob = new Blob([robotsTxt], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'robots.txt'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
            title: "✅ Downloaded!",
            description: "robots.txt file downloaded",
        })
    }

    const clearAll = () => {
        setSitemap("")
        setUserAgent("*")
        setDisallow("")
        setAllow("")
        setPreset("custom")
        toast({
            title: "🗑️ Cleared",
            description: "All fields have been cleared",
        })
    }

    const applyPreset = (presetKey: string) => {
        setPreset(presetKey)
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FileText className="h-8 w-8 text-[#FDB532]" />
                        Robots.txt Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate robots.txt file to control search engine crawlers
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Configuration</CardTitle>
                            <CardDescription>Configure your robots.txt rules</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                            {/* Presets */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Quick Presets</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant={preset === "allowAll" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => applyPreset("allowAll")}
                                    >
                                        Allow All
                                    </Button>
                                    <Button
                                        variant={preset === "blockAll" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => applyPreset("blockAll")}
                                    >
                                        Block All
                                    </Button>
                                    <Button
                                        variant={preset === "wordpress" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => applyPreset("wordpress")}
                                    >
                                        WordPress
                                    </Button>
                                    <Button
                                        variant={preset === "ecommerce" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => applyPreset("ecommerce")}
                                    >
                                        E-commerce
                                    </Button>
                                </div>
                            </div>

                            {preset === "custom" && (
                                <>
                                    {/* User Agent */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">User-agent</label>
                                        <input
                                            type="text"
                                            placeholder="* (all bots)"
                                            value={userAgent}
                                            onChange={(e) => setUserAgent(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>

                                    {/* Disallow */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Disallow Paths</label>
                                        <textarea
                                            placeholder="/admin/&#10;/private/&#10;/temp/"
                                            value={disallow}
                                            onChange={(e) => setDisallow(e.target.value)}
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                        />
                                        <p className="text-xs text-muted-foreground">One path per line</p>
                                    </div>

                                    {/* Allow */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Allow Paths (Optional)</label>
                                        <textarea
                                            placeholder="/public/&#10;/assets/"
                                            value={allow}
                                            onChange={(e) => setAllow(e.target.value)}
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Sitemap */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Sitemap URL (Optional)</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/sitemap.xml"
                                    value={sitemap}
                                    onChange={(e) => setSitemap(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Output */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated robots.txt</CardTitle>
                                    <CardDescription>Ready to download</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copyRobotsTxt} className="gap-2">
                                        <Copy className="h-4 w-4" />
                                        Copy
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={downloadRobotsTxt} className="gap-2">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <div className="flex-1 max-h-[240px] overflow-y-auto">
                                <pre className="text-sm bg-muted/50 p-4 rounded-md font-mono whitespace-pre-wrap">
                                    {robotsTxt}
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
                            <li>• Place robots.txt in your website's root directory (e.g., https://example.com/robots.txt)</li>
                            <li>• User-agent: * applies rules to all search engine bots</li>
                            <li>• Disallow: / blocks all pages, Disallow: blocks nothing (allows all)</li>
                            <li>• Include sitemap URL to help search engines find your content</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
