import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Eye, Users, ShoppingCart, Sparkles, Command, Star, Clock, ArrowRight } from "lucide-react"

export default function Dashboard() {
    const stats = [
        { label: "Tools Available", value: "60+", icon: Sparkles },
        { label: "Page Views", value: "49,740", icon: Eye },
        { label: "Visitors (7 Days)", value: "5,880", icon: TrendingUp },
        { label: "Registered Users", value: "3,163", icon: Users },
        { label: "Catalogue Items", value: "7", icon: ShoppingCart },
    ]

    const newTools = [
        { title: "Card Formatter", description: "Format card numbers", isNew: true },
        { title: "Card Validator", description: "Luhn algorithm check", isNew: true },
        { title: "Live Checker", description: "Check card status", isNew: true },
        { title: "Driver License", description: "Driver licenses", isNew: true },
    ]

    const recentlyUsed = [
        { title: "Webhook Sender", description: "Discord webhooks", isNew: true },
        { title: "Social Proof", description: "Proof screenshots", isNew: true },
        { title: "BIN Generator", description: "Generate from BIN", isNew: false },
    ]

    return (
        <AppLayout>
            <div className="p-6 space-y-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Welcome to</p>
                            <h1 className="text-4xl font-bold tracking-tight">
                                <span className="text-[#FDB532]">Hazzi</span>
                                <span className="text-white"> X </span>
                                <span className="text-[#FDB532]">Vault</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">Your Ultimate Toolkit</p>
                        </div>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Your ultimate toolkit for digital operations. Access 60+ premium tools at your fingertips.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        {stats.map((stat) => (
                            <Card key={stat.label}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.label}
                                    </CardTitle>
                                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search tools..."
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                        <Command className="h-3 w-3" />K
                                    </kbd>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* New Tools Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">New Tools</h2>
                            <Button variant="ghost" className="gap-2">
                                View All
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {newTools.map((tool) => (
                                <Card key={tool.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg">{tool.title}</CardTitle>
                                            {tool.isNew && (
                                                <Badge variant="secondary">NEW</Badge>
                                            )}
                                        </div>
                                        <CardDescription>{tool.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Favorites Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Favorites</h2>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Star className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">
                                        Star tools to add them to favorites
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recently Used Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Recently Used</h2>
                            <Button variant="ghost" className="gap-2">
                                View All
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {recentlyUsed.map((tool) => (
                                <Card key={tool.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg">{tool.title}</CardTitle>
                                            {tool.isNew && (
                                                <Badge variant="secondary">NEW</Badge>
                                            )}
                                        </div>
                                        <CardDescription>{tool.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="gap-2">
                            <Sparkles className="h-4 w-4" />
                            Browse All 60+ Tools
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Browse Catalogue
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
