"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, User, RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UsernameGeneratorPage() {
    const { toast } = useToast()
    const [keyword, setKeyword] = useState("")
    const [style, setStyle] = useState("cool")
    const [usernames, setUsernames] = useState<string[]>([])

    const adjectives = {
        cool: ['Epic', 'Legendary', 'Ultimate', 'Supreme', 'Elite', 'Dark', 'Shadow', 'Mystic', 'Cyber', 'Neon'],
        gaming: ['Pro', 'Savage', 'Lethal', 'Toxic', 'Demon', 'Beast', 'Wild', 'Apex', 'Alpha', 'Omega'],
        professional: ['Expert', 'Master', 'Chief', 'Prime', 'Senior', 'Lead', 'Smart', 'Clever', 'Swift', 'Bright'],
        cute: ['Sweet', 'Tiny', 'Little', 'Happy', 'Sunny', 'Lovely', 'Soft', 'Fluffy', 'Cozy', 'Dreamy']
    }

    const suffixes = {
        cool: ['X', 'Z', 'Strike', 'Wave', 'Storm', 'Blaze', 'Frost', 'Nova', 'Void', 'Pulse'],
        gaming: ['YT', 'TTV', 'Live', 'GG', 'OG', 'OP', 'Clutch', 'Ace', 'God', 'King'],
        professional: ['Official', 'Studio', 'Labs', 'Works', 'Co', 'Inc', 'Pro', 'Expert', 'Tech', 'Digital'],
        cute: ['Bean', 'Star', 'Moon', 'Heart', 'Smile', 'Love', 'Angel', 'Bunny', 'Kitty', 'Cloud']
    }

    const numbers = ['123', '456', '777', '999', '69', '420', '13', '21', '88', '']

    const generateUsernames = () => {
        if (!keyword.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter a keyword",
                variant: "destructive",
            })
            return
        }

        const baseKeyword = keyword.trim()
        const styleType = style as keyof typeof adjectives
        const generated: string[] = []

        // Generate 12 variations
        for (let i = 0; i < 12; i++) {
            const adjList = adjectives[styleType]
            const suffList = suffixes[styleType]
            const randomAdj = adjList[Math.floor(Math.random() * adjList.length)]
            const randomSuff = suffList[Math.floor(Math.random() * suffList.length)]
            const randomNum = numbers[Math.floor(Math.random() * numbers.length)]

            let username = ''
            const pattern = Math.floor(Math.random() * 6)

            switch (pattern) {
                case 0: username = `${randomAdj}${baseKeyword}${randomNum}`; break
                case 1: username = `${baseKeyword}${randomSuff}${randomNum}`; break
                case 2: username = `${randomAdj}${baseKeyword}${randomSuff}`; break
                case 3: username = `${baseKeyword}${randomNum}${randomSuff}`; break
                case 4: username = `${randomAdj}_${baseKeyword}`; break
                case 5: username = `${baseKeyword}_${randomSuff}${randomNum}`; break
            }

            // Avoid duplicates
            if (!generated.includes(username)) {
                generated.push(username)
            }
        }

        setUsernames(generated)
        toast({
            title: "✅ Generated!",
            description: `Created ${generated.length} username suggestions`,
        })
    }

    const copyUsername = (username: string) => {
        navigator.clipboard.writeText(username)
        toast({
            title: "✅ Copied!",
            description: `${username} copied to clipboard`,
        })
    }

    const clearAll = () => {
        setKeyword("")
        setUsernames([])
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
                        <User className="h-8 w-8 text-[#FDB532]" />
                        Username Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate creative username ideas for social media & gaming
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>Enter your keyword and style</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {/* Keyword Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Keyword / Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Wolf, Shadow, Alex"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Style Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Style</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant={style === "cool" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStyle("cool")}
                                    >
                                        😎 Cool
                                    </Button>
                                    <Button
                                        variant={style === "gaming" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStyle("gaming")}
                                    >
                                        🎮 Gaming
                                    </Button>
                                    <Button
                                        variant={style === "professional" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStyle("professional")}
                                    >
                                        💼 Professional
                                    </Button>
                                    <Button
                                        variant={style === "cute" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setStyle("cute")}
                                    >
                                        🌸 Cute
                                    </Button>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <Button onClick={generateUsernames} className="w-full gap-2" size="lg">
                                <RefreshCw className="h-4 w-4" />
                                Generate Usernames
                            </Button>

                            {/* Preview */}
                            <div className="p-4 bg-muted/30 rounded-md">
                                <p className="text-xs text-muted-foreground mb-2">Example Preview:</p>
                                <p className="text-sm font-mono">
                                    {keyword ? `${adjectives[style as keyof typeof adjectives][0]}${keyword}123` : 'EpicWolf123'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Generated Usernames</CardTitle>
                                    <CardDescription>
                                        {usernames.length > 0 ? `${usernames.length} suggestions` : 'No usernames yet'}
                                    </CardDescription>
                                </div>
                                {usernames.length > 0 && (
                                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {usernames.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No usernames yet</p>
                                        <p className="text-sm">Enter keyword and generate</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="max-h-[260px] overflow-y-auto space-y-2">
                                    {usernames.map((username, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors"
                                        >
                                            <span className="font-mono text-sm">{username}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyUsername(username)}
                                                className="gap-2"
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
                            <li>• Use short keywords for better results (3-8 characters)</li>
                            <li>• Click generate multiple times for more variations</li>
                            <li>• Gaming style includes popular streaming suffixes (TTV, YT)</li>
                            <li>• Professional style is great for business accounts</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
