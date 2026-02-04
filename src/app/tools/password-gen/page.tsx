"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Key, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PasswordGenPage() {
    const { toast } = useToast()
    const [password, setPassword] = useState("")
    const [length, setLength] = useState(16)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)

    const generatePassword = () => {
        let charset = ""
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
        if (includeNumbers) charset += "0123456789"
        if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

        if (charset === "") {
            toast({
                title: "❌ Error",
                description: "Select at least one character type",
                variant: "destructive",
            })
            return
        }

        let newPassword = ""
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
        }

        setPassword(newPassword)
        toast({
            title: "✅ Generated!",
            description: "Password created successfully",
        })
    }

    const copyPassword = () => {
        if (!password) return
        navigator.clipboard.writeText(password)
        toast({
            title: "✅ Copied!",
            description: "Password copied to clipboard",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Key className="h-8 w-8 text-[#FDB532]" />
                        Password Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate strong, random passwords
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Generator */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Options</CardTitle>
                            <CardDescription>Customize your password</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Length Slider */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Length: {length}</label>
                                <input
                                    type="range"
                                    min="8"
                                    max="64"
                                    value={length}
                                    onChange={(e) => setLength(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Character Types */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Include:</label>
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="uppercase"
                                            checked={includeUppercase}
                                            onChange={(e) => setIncludeUppercase(e.target.checked)}
                                            className="h-4 w-4 rounded"
                                        />
                                        <label htmlFor="uppercase" className="text-xs">Uppercase (A-Z)</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="lowercase"
                                            checked={includeLowercase}
                                            onChange={(e) => setIncludeLowercase(e.target.checked)}
                                            className="h-4 w-4 rounded"
                                        />
                                        <label htmlFor="lowercase" className="text-xs">Lowercase (a-z)</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="numbers"
                                            checked={includeNumbers}
                                            onChange={(e) => setIncludeNumbers(e.target.checked)}
                                            className="h-4 w-4 rounded"
                                        />
                                        <label htmlFor="numbers" className="text-xs">Numbers (0-9)</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="symbols"
                                            checked={includeSymbols}
                                            onChange={(e) => setIncludeSymbols(e.target.checked)}
                                            className="h-4 w-4 rounded"
                                        />
                                        <label htmlFor="symbols" className="text-xs">Symbols (!@#$...)</label>
                                    </div>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <Button onClick={generatePassword} className="w-full gap-2" size="lg">
                                <RefreshCw className="h-4 w-4" />
                                Generate Password
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Result */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Generated Password</CardTitle>
                            <CardDescription>Your secure password</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            {!password ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No password generated</p>
                                        <p className="text-sm">Click generate to create</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="p-3 bg-muted/50 rounded-md">
                                        <p className="text-sm font-mono font-semibold break-all">{password}</p>
                                    </div>
                                    <Button onClick={copyPassword} variant="outline" className="w-full gap-2">
                                        <Copy className="h-4 w-4" />
                                        Copy Password
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Info Card */}
                <Card className="bg-muted/30">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">ℹ️ Security Tips</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Use at least 12-16 characters for strong passwords</li>
                            <li>• Enable all character types for maximum security</li>
                            <li>• Never reuse passwords across different accounts</li>
                            <li>• Use a password manager to store passwords securely</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
