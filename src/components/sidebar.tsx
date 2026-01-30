"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    LayoutDashboard,
    Wrench,
    Crown,
    Flame,
    Gem,
    Vault,
    Trophy,
    DollarSign,
    Heart,
    Settings,
    Search,
    MessageSquare,
    FileText,
    Image,
    Share2,
    BookOpen,
    ChevronDown,
} from "lucide-react"

const mainNavItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "All Tools", href: "/tools", icon: Wrench },
]

const proToolsItems = [
    { title: "BIN Generator", href: "/pro-tools/bin-generator" },
    { title: "Card Formatter", href: "/pro-tools/card-formatter" },
    { title: "Card Validator", href: "/pro-tools/card-validator" },
    { title: "Live Checker", href: "/pro-tools/live-checker" },
    { title: "Student ID", href: "/pro-tools/student-id" },
    { title: "Driver License", href: "/pro-tools/driver-license" },
    { title: "Employee ID", href: "/pro-tools/employee-id" },
    { title: "Press ID", href: "/pro-tools/press-id" },
    { title: "Membership Card", href: "/pro-tools/membership-card" },
    { title: "Visitor Pass", href: "/pro-tools/visitor-pass" },
    { title: "Vaulted Student Slip", href: "/pro-tools/vaulted-student-slip" },
]

const bottomNavItems = [
    {
        title: "Catalogue",
        href: "/catalogue",
        icon: Flame,
        badge: { text: "HOT", variant: "destructive" as const }
    },
    {
        title: "VIP Benefits",
        href: "/vip-benefits",
        icon: Gem,
        badge: { text: "VIP", variant: "secondary" as const }
    },
    { title: "The Vault", href: "/vault", icon: Vault },
    { title: "VIP Success Stories", href: "/success-stories", icon: Trophy },
    {
        title: "VIP Pricing",
        href: "/pricing",
        icon: DollarSign,
        badge: { text: "$35", variant: "outline" as const }
    },
    {
        title: "Donate",
        href: "/donate",
        icon: Heart,
        badge: { text: "♥", variant: "default" as const }
    },
    { title: "Settings", href: "/settings", icon: Settings },
]

const categories = [
    {
        title: "SEO Tools",
        icon: Search,
        count: 9,
        items: [
            { title: "Meta Tags", href: "/seo/meta-tags" },
            { title: "Keyword Density", href: "/seo/keyword-density" },
            { title: "Slug Generator", href: "/seo/slug-generator" },
            { title: "Robots.txt", href: "/seo/robots-txt" },
            { title: "Sitemap", href: "/seo/sitemap" },
            { title: "Open Graph", href: "/seo/open-graph" },
            { title: "Schema Markup", href: "/seo/schema-markup" },
            { title: "Word Counter", href: "/seo/word-counter" },
            { title: "Text Spinner", href: "/seo/text-spinner" },
        ]
    },
    {
        title: "Telegram/Discord",
        icon: MessageSquare,
        count: 5,
        items: [
            { title: "Webhook Sender", href: "/telegram-discord/webhook-sender" },
            { title: "Invite Generator", href: "/telegram-discord/invite-generator" },
            { title: "Timestamp", href: "/telegram-discord/timestamp" },
            { title: "Embed Builder", href: "/telegram-discord/embed-builder" },
            { title: "DM Templates", href: "/telegram-discord/dm-templates" },
        ]
    },
    {
        title: "Utility Tools",
        icon: Wrench,
        count: 14,
        items: [
            { title: "Fake Address", href: "/utility/fake-address" },
            { title: "Short URL", href: "/utility/short-url" },
            { title: "Temp Mail", href: "/utility/temp-mail" },
            { title: "Password Gen", href: "/utility/password-gen" },
            { title: "QR Generator", href: "/utility/qr-generator" },
            { title: "Hash Generator", href: "/utility/hash-generator" },
            { title: "Lorem Ipsum", href: "/utility/lorem-ipsum" },
            { title: "Base64", href: "/utility/base64" },
            { title: "JSON Formatter", href: "/utility/json-formatter" },
            { title: "Color Picker", href: "/utility/color-picker" },
            { title: "UUID Generator", href: "/utility/uuid-generator" },
            { title: "Timestamp", href: "/utility/timestamp" },
            { title: "IP Tools", href: "/utility/ip-tools" },
            { title: "Text Case", href: "/utility/text-case" },
        ]
    },
    {
        title: "Document Tools",
        icon: FileText,
        count: 5,
        items: [
            { title: "Resume Builder", href: "/document/resume-builder" },
            { title: "Invoice Generator", href: "/document/invoice-generator" },
            { title: "Certificate", href: "/document/certificate" },
            { title: "Letter Generator", href: "/document/letter-generator" },
            { title: "Agreement", href: "/document/agreement" },
        ]
    },
    {
        title: "Image Tools",
        icon: Image,
        count: 5,
        items: [
            { title: "Compressor", href: "/image/compressor" },
            { title: "Resizer", href: "/image/resizer" },
            { title: "Watermark", href: "/image/watermark" },
            { title: "Image to Base64", href: "/image/image-to-base64" },
            { title: "Screenshot", href: "/image/screenshot" },
        ]
    },
    {
        title: "Social Tools",
        icon: Share2,
        count: 6,
        items: [
            { title: "Fake Tweet", href: "/social/fake-tweet" },
            { title: "Username Gen", href: "/social/username-gen" },
            { title: "Bio Generator", href: "/social/bio-generator" },
            { title: "Instagram Post", href: "/social/instagram-post" },
            { title: "Hashtag Gen", href: "/social/hashtag-gen" },
            { title: "Social Proof", href: "/social/social-proof" },
        ]
    },
    {
        title: "Catalogue",
        icon: BookOpen,
        count: 1,
        items: [
            { title: "My Store", href: "/catalogue/my-store" },
        ]
    },
]

export function Sidebar() {
    const [openProTools, setOpenProTools] = useState(false)
    const [openCategories, setOpenCategories] = useState<string[]>([])

    const toggleCategory = (categoryTitle: string) => {
        setOpenCategories(prev =>
            prev.includes(categoryTitle)
                ? prev.filter(c => c !== categoryTitle)
                : [...prev, categoryTitle]
        )
    }

    return (
        <div className="flex h-full flex-col bg-background">
            <ScrollArea className="flex-1 px-3">
                <div className="space-y-1 py-4">
                    {/* Main nav items */}
                    {mainNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                "hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span className="flex-1">{item.title}</span>
                        </Link>
                    ))}

                    {/* Pro Tools with dropdown */}
                    <Collapsible open={openProTools} onOpenChange={setOpenProTools}>
                        <CollapsibleTrigger className="w-full">
                            <div
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    "hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <Crown className="h-4 w-4" />
                                <span className="flex-1 text-left">Pro Tools</span>
                                <ChevronDown className={cn(
                                    "h-4 w-4 transition-transform",
                                    openProTools && "rotate-180"
                                )} />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1">
                            {proToolsItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 pl-10 text-sm transition-colors",
                                        "hover:bg-accent hover:text-accent-foreground"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>

                    {/* Bottom nav items */}
                    {bottomNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                "hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span className="flex-1">{item.title}</span>
                            {item.badge && (
                                <Badge variant={item.badge.variant} className="ml-auto">
                                    {item.badge.text}
                                </Badge>
                            )}
                        </Link>
                    ))}
                </div>

                <Separator className="my-4" />

                {/* Categories Section */}
                <div className="space-y-1 pb-4">
                    <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground">
                        Categories
                    </h3>
                    <div className="mt-2 space-y-1">
                        {categories.map((category) => (
                            <Collapsible
                                key={category.title}
                                open={openCategories.includes(category.title)}
                                onOpenChange={() => toggleCategory(category.title)}
                            >
                                <CollapsibleTrigger className="w-full">
                                    <div
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                            "hover:bg-accent hover:text-accent-foreground"
                                        )}
                                    >
                                        <category.icon className="h-4 w-4" />
                                        <span className="flex-1 text-left">{category.title}</span>
                                        <span className="text-xs text-muted-foreground mr-1">
                                            {category.count}
                                        </span>
                                        <ChevronDown className={cn(
                                            "h-4 w-4 transition-transform",
                                            openCategories.includes(category.title) && "rotate-180"
                                        )} />
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="space-y-1">
                                    {category.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 pl-10 text-sm transition-colors",
                                                "hover:bg-accent hover:text-accent-foreground"
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
