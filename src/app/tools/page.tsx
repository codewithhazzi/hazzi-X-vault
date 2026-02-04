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
        count: 4,
        tools: [
            { name: "Webhook Sender", description: "Discord webhooks", isNew: true },
            { name: "Invite Generator", description: "Discord invites", isNew: true },
            { name: "Timestamp", description: "Discord timestamps", isNew: true },
            { name: "Embed Builder", description: "Discord embeds", isNew: true },
        ]
    },
    {
        title: "Utility Tools",
        icon: Wrench,
        count: 5,
        tools: [
            { name: "Fake Address", description: "Random addresses", isNew: false, href: "/tools/fake-address" },
            { name: "Short URL", description: "Shorten links", isNew: false, href: "/tools/url-shortener" },
            { name: "Temp Mail", description: "Disposable email", isNew: false, href: "/tools/temp-mail" },
            { name: "Password Gen", description: "Strong passwords", isNew: false, href: "/tools/password-gen" },
            { name: "QR Generator", description: "Create QR codes", isNew: true, href: "/tools/qr-generator" },
        ]
    },

    {
        title: "Image Tools",
        icon: ImageIcon,
        count: 2,
        tools: [
            { name: "Compressor", description: "Compress images", isNew: true, href: "/tools/image-compressor" },
            { name: "Resizer", description: "Resize images", isNew: true, href: "/tools/image-resizer" },
        ]
    },
    {
        title: "Social Tools",
        icon: Share2,
        count: 3,
        tools: [
            { name: "Username Gen", description: "Username ideas", isNew: true, href: "/tools/username-gen" },
            { name: "Bio Generator", description: "Social bios", isNew: true, href: "/tools/bio-generator" },
            { name: "Hashtag Gen", description: "Generate hashtags", isNew: true },
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
