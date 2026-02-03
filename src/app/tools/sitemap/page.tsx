"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, FileText, Trash2, Download, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type SitemapUrl = {
    loc: string
    priority: string
    changefreq: string
}

export default function SitemapPage() {
    const { toast } = useToast()
    const [domain, setDomain] = useState("")
    const [urls, setUrls] = useState<SitemapUrl[]>([
        { loc: "/", priority: "1.0", changefreq: "daily" }
    ])

    const addUrl = () => {
        setUrls([...urls, { loc: "", priority: "0.8", changefreq: "weekly" }])
    }

    const removeUrl = (index: number) => {
        setUrls(urls.filter((_, i) => i !== index))
    }

    const updateUrl = (index: number, field: keyof SitemapUrl, value: string) => {
        const newUrls = [...urls]
        newUrls[index][field] = value
        setUrls(newUrls)
    }

    const generateSitemap = (): string => {
        const baseUrl = domain || "https://example.com"

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

        urls.forEach(url => {
            if (url.loc) {
                xml += '  <url>\n'
                xml += `    <loc>${baseUrl}${url.loc.startsWith('/') ? url.loc : '/' + url.loc}</loc>\n`
                xml += `    <priority>${url.priority}</priority>\n`
                xml += `    <changefreq>${url.changefreq}</changefreq>\n`
                xml += '  </url>\n'
            }
        })

        xml += '</urlset>'
        return xml
    }

    const sitemap = generateSitemap()

    const copySitemap = () => {
        navigator.clipboard.writeText(sitemap)
        toast({
            title: "✅ Copied!",
            description: "Sitemap XML copied to clipboard",
        })
    }

    const downloadSitemap = () => {
        const blob = new Blob([sitemap], { type: 'application/xml' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'sitemap.xml'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
            title: "✅ Downloaded!",
            description: "sitemap.xml file downloaded",
        })
    }

    const clearAll = () => {
        setDomain("")
        setUrls([{ loc: "/", priority: "1.0", changefreq: "daily" }])
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
                        <FileText className="h-8 w-8 text-[#FDB532]" />
                        XML Sitemap Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Create XML sitemaps to help search engines crawl your website
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>URLs Configuration</CardTitle>
                            <CardDescription>Add your website URLs</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                            {/* Domain */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Domain</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* URLs */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Pages</label>
                                {urls.map((url, index) => (
                                    <div key={index} className="p-3 bg-muted/30 rounded-md space-y-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="/about"
                                                value={url.loc}
                                                onChange={(e) => updateUrl(index, 'loc', e.target.value)}
                                                className="flex h-8 flex-1 rounded-md border border-input bg-background px-2 py-1 text-sm"
                                            />
                                            {urls.length > 1 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeUrl(index)}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <select
                                                value={url.priority}
                                                onChange={(e) => updateUrl(index, 'priority', e.target.value)}
                                                className="flex h-8 rounded-md border border-input bg-background px-2 text-xs"
                                            >
                                                <option value="1.0">Priority: 1.0</option>
                                                <option value="0.9">Priority: 0.9</option>
                                                <option value="0.8">Priority: 0.8</option>
                                                <option value="0.7">Priority: 0.7</option>
                                                <option value="0.5">Priority: 0.5</option>
                                            </select>
                                            <select
                                                value={url.changefreq}
                                                onChange={(e) => updateUrl(index, 'changefreq', e.target.value)}
                                                className="flex h-8 rounded-md border border-input bg-background px-2 text-xs"
                                            >
                                                <option value="always">Always</option>
                                                <option value="hourly">Hourly</option>
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="yearly">Yearly</option>
                                                <option value="never">Never</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addUrl}
                                    className="w-full gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add URL
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Output */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated Sitemap</CardTitle>
                                    <CardDescription>{urls.filter(u => u.loc).length} URLs</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copySitemap} className="gap-2">
                                        <Copy className="h-4 w-4" />
                                        Copy
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={downloadSitemap} className="gap-2">
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
                                <pre className="text-xs bg-muted/50 p-4 rounded-md font-mono whitespace-pre-wrap">
                                    {sitemap}
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
                            <li>• Upload sitemap.xml to your website's root directory</li>
                            <li>• Submit sitemap URL to Google Search Console and Bing Webmaster Tools</li>
                            <li>• Priority: 1.0 = highest importance, 0.5 = medium, 0.1 = lowest</li>
                            <li>• Changefreq: How often the page content changes (daily, weekly, etc.)</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
