"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Code, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SchemaMarkupPage() {
    const { toast } = useToast()
    const [schemaType, setSchemaType] = useState("Article")

    // Article fields
    const [headline, setHeadline] = useState("")
    const [author, setAuthor] = useState("")
    const [datePublished, setDatePublished] = useState("")
    const [image, setImage] = useState("")

    // Product fields
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [currency, setCurrency] = useState("USD")
    const [availability, setAvailability] = useState("InStock")

    // Organization fields
    const [orgName, setOrgName] = useState("")
    const [orgUrl, setOrgUrl] = useState("")
    const [orgLogo, setOrgLogo] = useState("")

    const generateSchema = (): string => {
        let schema: any = {
            "@context": "https://schema.org",
            "@type": schemaType
        }

        if (schemaType === "Article") {
            schema = {
                ...schema,
                headline: headline || "Article Headline",
                author: {
                    "@type": "Person",
                    name: author || "Author Name"
                },
                datePublished: datePublished || new Date().toISOString().split('T')[0],
                image: image || "https://example.com/image.jpg"
            }
        } else if (schemaType === "Product") {
            schema = {
                ...schema,
                name: productName || "Product Name",
                image: image || "https://example.com/product.jpg",
                offers: {
                    "@type": "Offer",
                    price: price || "99.99",
                    priceCurrency: currency,
                    availability: `https://schema.org/${availability}`
                }
            }
        } else if (schemaType === "Organization") {
            schema = {
                ...schema,
                name: orgName || "Organization Name",
                url: orgUrl || "https://example.com",
                logo: orgLogo || "https://example.com/logo.png"
            }
        }

        return JSON.stringify(schema, null, 2)
    }

    const schemaMarkup = generateSchema()

    const copySchema = () => {
        navigator.clipboard.writeText(`<script type="application/ld+json">\n${schemaMarkup}\n</script>`)
        toast({
            title: "✅ Copied!",
            description: "Schema markup copied with script tags",
        })
    }

    const clearAll = () => {
        setHeadline("")
        setAuthor("")
        setDatePublished("")
        setImage("")
        setProductName("")
        setPrice("")
        setOrgName("")
        setOrgUrl("")
        setOrgLogo("")
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
                        <Code className="h-8 w-8 text-[#FDB532]" />
                        Schema Markup Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate JSON-LD structured data for better SEO
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Schema Configuration</CardTitle>
                            <CardDescription>Configure your structured data</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                            {/* Schema Type */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Schema Type</label>
                                <select
                                    value={schemaType}
                                    onChange={(e) => setSchemaType(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="Article">Article</option>
                                    <option value="Product">Product</option>
                                    <option value="Organization">Organization</option>
                                </select>
                            </div>

                            {/* Article Fields */}
                            {schemaType === "Article" && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Headline</label>
                                        <input
                                            type="text"
                                            placeholder="Article Headline"
                                            value={headline}
                                            onChange={(e) => setHeadline(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Author</label>
                                        <input
                                            type="text"
                                            placeholder="Author Name"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Date Published</label>
                                        <input
                                            type="date"
                                            value={datePublished}
                                            onChange={(e) => setDatePublished(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Image URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com/image.jpg"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Product Fields */}
                            {schemaType === "Product" && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Product Name</label>
                                        <input
                                            type="text"
                                            placeholder="Product Name"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Image URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com/product.jpg"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium">Price</label>
                                            <input
                                                type="number"
                                                placeholder="99.99"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium">Currency</label>
                                            <select
                                                value={currency}
                                                onChange={(e) => setCurrency(e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            >
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                                <option value="GBP">GBP</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Availability</label>
                                        <select
                                            value={availability}
                                            onChange={(e) => setAvailability(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="InStock">In Stock</option>
                                            <option value="OutOfStock">Out of Stock</option>
                                            <option value="PreOrder">Pre Order</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* Organization Fields */}
                            {schemaType === "Organization" && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Organization Name</label>
                                        <input
                                            type="text"
                                            placeholder="Organization Name"
                                            value={orgName}
                                            onChange={(e) => setOrgName(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com"
                                            value={orgUrl}
                                            onChange={(e) => setOrgUrl(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Logo URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com/logo.png"
                                            value={orgLogo}
                                            onChange={(e) => setOrgLogo(e.target.value)}
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Output */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated Schema</CardTitle>
                                    <CardDescription>JSON-LD format</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copySchema} className="gap-2">
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
                                <pre className="text-xs bg-muted/50 p-4 rounded-md font-mono whitespace-pre-wrap">
                                    {schemaMarkup}
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
                            <li>• Schema markup helps search engines understand your content better</li>
                            <li>• Place the generated script in your HTML &lt;head&gt; or &lt;body&gt; section</li>
                            <li>• Use Google's Rich Results Test to validate your schema</li>
                            <li>• Different schema types enhance different search result features</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
