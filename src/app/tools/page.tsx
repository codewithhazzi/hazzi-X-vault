import Link from "next/link"
import { AppLayout } from "@/components/app-layout"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    CreditCard,
    Search,
    MessageSquare,
    Wrench,
    FileText,
    Image as ImageIcon,
    Share2,
    ShoppingCart
} from "lucide-react"

const proTools = {
    title: "Pro Tools",
    icon: CreditCard,
    pricing: "$1.99/mo",
    count: 11,
    tools: [
        { name: "BIN Generator", description: "Generate from BIN", isNew: false, href: "/tools/bin-generator" },
        { name: "Card Formatter", description: "Format card numbers", isNew: true, href: "/tools/card-formatter" },
        { name: "Card Validator", description: "Luhn algorithm check", isNew: true, href: "/tools/card-validator" },
        { name: "Live Checker", description: "Check card status", isNew: true, href: "/tools/live-checker" },
        { name: "Student ID", description: "Student ID cards", isNew: false, href: "#" },
        { name: "Driver License", description: "Driver licenses", isNew: true, href: "#" },
        { name: "Employee ID", description: "Corporate IDs", isNew: true, href: "#" },
        { name: "Press ID", description: "Media credentials", isNew: true, href: "#" },
        { name: "Membership Card", description: "Club memberships", isNew: true, href: "#" },
        { name: "Visitor Pass", description: "Guest passes", isNew: true, href: "#" },
        { name: "Vaulted Student Slip", description: "South Asia fee slips", isNew: true, href: "#" },
    ]
}

const toolCategories = [
    {
        title: "SEO Tools",
        icon: Search,
        count: 9,
        tools: [
            { name: "Meta Tags", description: "Generate meta tags", isNew: true, href: "/tools/meta-tags" },
            { name: "Keyword Density", description: "Analyze keywords", isNew: true, href: "/tools/keyword-density" },
            { name: "Slug Generator", description: "URL-friendly slugs", isNew: true, href: "/tools/slug-generator" },
            { name: "Robots.txt", description: "Generate robots.txt", isNew: true, href: "/tools/robots-txt" },
            { name: "Sitemap", description: "XML sitemap creator", isNew: true, href: "/tools/sitemap" },
            { name: "Open Graph", description: "OG tags generator", isNew: true, href: "/tools/open-graph" },
            { name: "Schema Markup", description: "JSON-LD generator", isNew: true, href: "/tools/schema-markup" },
            { name: "Word Counter", description: "Count words & chars", isNew: true },
            { name: "Text Spinner", description: "Rewrite content", isNew: true },
        ]
    },
    {
        title: "Telegram/Discord",
        icon: MessageSquare,
        count: 5,
        tools: [
            { name: "Webhook Sender", description: "Discord webhooks", isNew: true },
            { name: "Invite Generator", description: "Discord invites", isNew: true },
            { name: "Timestamp", description: "Discord timestamps", isNew: true },
            { name: "Embed Builder", description: "Discord embeds", isNew: true },
            { name: "DM Templates", description: "Mass DM templates", isNew: true },
        ]
    },
    {
        title: "Utility Tools",
        icon: Wrench,
        count: 14,
        tools: [
            { name: "Fake Address", description: "Random addresses", isNew: false },
            { name: "Short URL", description: "Shorten links", isNew: false },
            { name: "Temp Mail", description: "Disposable email", isNew: false },
            { name: "Password Gen", description: "Strong passwords", isNew: false },
            { name: "QR Generator", description: "Create QR codes", isNew: true },
            { name: "Hash Generator", description: "MD5, SHA hashes", isNew: true },
            { name: "Lorem Ipsum", description: "Placeholder text", isNew: true },
            { name: "Base64", description: "Encode/decode", isNew: true },
            { name: "JSON Formatter", description: "Beautify JSON", isNew: true },
            { name: "Color Picker", description: "Color converter", isNew: true },
            { name: "UUID Generator", description: "Generate UUIDs", isNew: true },
            { name: "Timestamp", description: "Unix converter", isNew: true },
            { name: "IP Tools", description: "IP address info", isNew: true },
            { name: "Text Case", description: "Case converter", isNew: true },
        ]
    },
    {
        title: "Document Tools",
        icon: FileText,
        count: 5,
        tools: [
            { name: "Resume Builder", description: "Create resumes", isNew: true },
            { name: "Invoice Generator", description: "Business invoices", isNew: true },
            { name: "Certificate", description: "Certificates", isNew: true },
            { name: "Letter Generator", description: "Formal letters", isNew: true },
            { name: "Agreement", description: "Contracts", isNew: true },
        ]
    },
    {
        title: "Image Tools",
        icon: ImageIcon,
        count: 5,
        tools: [
            { name: "Compressor", description: "Compress images", isNew: true },
            { name: "Resizer", description: "Resize images", isNew: true },
            { name: "Watermark", description: "Add watermarks", isNew: true },
            { name: "Image to Base64", description: "Convert to Base64", isNew: true },
            { name: "Screenshot", description: "Beautify screenshots", isNew: true },
        ]
    },
    {
        title: "Social Tools",
        icon: Share2,
        count: 6,
        tools: [
            { name: "Fake Tweet", description: "Generate tweets", isNew: true },
            { name: "Username Gen", description: "Username ideas", isNew: true },
            { name: "Bio Generator", description: "Social bios", isNew: true },
            { name: "Instagram Post", description: "Fake IG posts", isNew: true },
            { name: "Hashtag Gen", description: "Generate hashtags", isNew: true },
            { name: "Social Proof", description: "Proof screenshots", isNew: true },
        ]
    },
    {
        title: "Catalogue",
        icon: ShoppingCart,
        count: 1,
        tools: [
            { name: "My Store", description: "View catalogue", isNew: true },
        ]
    },
]

export default function AllToolsPage() {
    return (
        <AppLayout>
            <div className="p-6 space-y-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Page Header */}
                    <div>
                        <h1 className="text-4xl font-bold mb-2">All Tools</h1>
                        <p className="text-muted-foreground">
                            Browse our complete collection of 60+ premium tools
                        </p>
                    </div>

                    {/* Pro Tools Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <proTools.icon className="h-6 w-6" />
                            <h2 className="text-2xl font-bold">{proTools.title}</h2>
                            <Badge variant="secondary">{proTools.pricing}</Badge>
                            <Badge variant="outline">{proTools.count} tools</Badge>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {proTools.tools.map((tool) => (
                                <Link key={tool.name} href={tool.href}>
                                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">{tool.name}</CardTitle>
                                                {tool.isNew && (
                                                    <Badge variant="secondary">NEW</Badge>
                                                )}
                                            </div>
                                            <CardDescription>{tool.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Other Categories */}
                    {toolCategories.map((category) => (
                        <div key={category.title} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <category.icon className="h-6 w-6" />
                                <h2 className="text-2xl font-bold">{category.title}</h2>
                                <Badge variant="outline">{category.count} tools</Badge>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {category.tools.map((tool) => (
                                    tool.href ? (
                                        <Link key={tool.name} href={tool.href}>
                                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                                <CardHeader>
                                                    <div className="flex items-start justify-between">
                                                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                                                        {tool.isNew && (
                                                            <Badge variant="secondary">NEW</Badge>
                                                        )}
                                                    </div>
                                                    <CardDescription>{tool.description}</CardDescription>
                                                </CardHeader>
                                            </Card>
                                        </Link>
                                    ) : (
                                        <Card key={tool.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                                                    {tool.isNew && (
                                                        <Badge variant="secondary">NEW</Badge>
                                                    )}
                                                </div>
                                                <CardDescription>{tool.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}
