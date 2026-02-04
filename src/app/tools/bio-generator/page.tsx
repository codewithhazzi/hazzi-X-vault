"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Sparkles, RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BioGeneratorPage() {
    const { toast } = useToast()
    const [keyword, setKeyword] = useState("")
    const [interest, setInterest] = useState("")
    const [style, setStyle] = useState("cool")
    const [bios, setBios] = useState<string[]>([])

    const bioTemplates = {
        cool: [
            "🎯 {keyword} enthusiast | {interest} addict",
            "✨ Living my best life | {keyword} vibes only",
            "🔥 {keyword} lover | Dream chaser | {interest}",
            "💫 {keyword} 24/7 | Vibe: {interest}",
            "⚡ Passionate about {keyword} | {interest} is my therapy",
            "🌟 {keyword} | Making moves | {interest} enthusiast"
        ],
        professional: [
            "💼 {keyword} Professional | Passionate about {interest}",
            "🎓 Specialized in {keyword} | {interest} Expert",
            "📊 {keyword} Specialist | {interest} Consultant",
            "🚀 {keyword} Innovator | Leading in {interest}",
            "💡 {keyword} Expert | Focused on {interest}",
            "🏆 Award-winning {keyword} | {interest} Professional"
        ],
        funny: [
            "😂 Professional {keyword} procrastinator | {interest} is my side hustle",
            "🤪 {keyword} addict | If you don't like {interest}, we can't be friends",
            "😎 99% {keyword}, 1% {interest}, 100% awesome",
            "🙃 I put the 'pro' in {keyword} | {interest} is my superpower",
            "🤓 {keyword} nerd by day | {interest} enthusiast by night",
            "😜 Living for {keyword} | Powered by {interest} and caffeine"
        ],
        minimal: [
            "{keyword} | {interest}",
            "✨ {keyword} • {interest}",
            "{keyword} enthusiast",
            "Just your average {keyword} lover",
            "{interest} • {keyword} • Life",
            "Making {keyword} great | {interest}"
        ],
        motivational: [
            "💪 Grinding in {keyword} | {interest} is my fuel",
            "🎯 Chasing dreams through {keyword} | {interest} journey",
            "🔥 Never give up on {keyword} | {interest} mindset",
            "⚡ Building my empire with {keyword} | {interest} hustle",
            "🌟 Success through {keyword} | {interest} motivation",
            "✨ Dream big in {keyword} | {interest} believer"
        ]
    }

    const generateBios = () => {
        if (!keyword.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter a keyword",
                variant: "destructive",
            })
            return
        }

        const styleType = style as keyof typeof bioTemplates
        const templates = bioTemplates[styleType]
        const k = keyword.trim()
        const i = interest.trim() || "vibes"

        const generated = templates.map(template =>
            template.replace(/{keyword}/g, k).replace(/{interest}/g, i)
        )

        setBios(generated)
        toast({
            title: "✅ Generated!",
            description: `Created ${generated.length} bio suggestions`,
        })
    }

    const copyBio = (bio: string) => {
        navigator.clipboard.writeText(bio)
        toast({
            title: "✅ Copied!",
            description: "Bio copied to clipboard",
        })
    }

    const clearAll = () => {
        setKeyword("")
        setInterest("")
        setBios([])
        toast({
            title: "🗑️ Cleared",
            description: "All data has been cleared",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Sparkles className="h-8 w-8 text-[#FDB532]" />
                        Bio Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate creative bios for Instagram, Twitter, TikTok & more
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>Enter your details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Keyword Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Main Keyword</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Developer, Artist, Gamer"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Interest Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Interest/Passion (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Coffee, Travel, Music"
                                    value={interest}
                                    onChange={(e) => setInterest(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Style Selection */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Vibe</label>
                                <div className="grid grid-cols-3 gap-1.5">
                                    <Button
                                        variant={style === "cool" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStyle("cool")}
                                        className="h-8 text-xs"
                                    >
                                        😎 Cool
                                    </Button>
                                    <Button
                                        variant={style === "professional" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStyle("professional")}
                                        className="h-8 text-xs"
                                    >
                                        💼 Pro
                                    </Button>
                                    <Button
                                        variant={style === "funny" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStyle("funny")}
                                        className="h-8 text-xs"
                                    >
                                        😂 Funny
                                    </Button>
                                    <Button
                                        variant={style === "minimal" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStyle("minimal")}
                                        className="h-8 text-xs"
                                    >
                                        ✨ Minimal
                                    </Button>
                                    <Button
                                        variant={style === "motivational" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStyle("motivational")}
                                        className="h-8 text-xs col-span-2"
                                    >
                                        💪 Motivational
                                    </Button>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <Button onClick={generateBios} className="w-full gap-2 mt-2" size="lg">
                                <RefreshCw className="h-4 w-4" />
                                Generate Bios
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated Bios</CardTitle>
                                    <CardDescription>
                                        {bios.length > 0 ? `${bios.length} suggestions` : 'No bios yet'}
                                    </CardDescription>
                                </div>
                                {bios.length > 0 && (
                                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {bios.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No bios yet</p>
                                        <p className="text-sm">Enter keyword and generate</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="max-h-[260px] overflow-y-auto space-y-2">
                                    {bios.map((bio, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start justify-between p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors gap-2"
                                        >
                                            <span className="text-sm flex-1">{bio}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyBio(bio)}
                                                className="gap-2 shrink-0"
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Info Card */}
                <Card className="bg-muted/30">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">ℹ️ Tips</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Keep your keyword concise (1-2 words work best)</li>
                            <li>• Add an interest/passion for more personalized bios</li>
                            <li>• Mix and match parts from different bios to create your own</li>
                            <li>• Instagram bios: 150 characters max | Twitter: 160 characters</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
