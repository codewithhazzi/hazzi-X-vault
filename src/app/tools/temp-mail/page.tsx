"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Mail, RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Email = {
    id: string
    from: string
    subject: string
    date: string
    body: string
}

export default function TempMailPage() {
    const { toast } = useToast()
    const [email, setEmail] = useState("")
    const [emails, setEmails] = useState<Email[]>([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const domains = ['junkstopper.info', 'cloudns.asia', 'somosnaturales.com', 'cloudns.cc']

    const generateRandomEmail = () => {
        const username = 'user' + Math.random().toString(36).substring(2, 10)
        const domain = domains[Math.floor(Math.random() * domains.length)]
        const newEmail = `${username}@${domain}`
        setEmail(newEmail)
        setEmails([])

        toast({
            title: "✅ Generated!",
            description: "Email address created",
        })
    }

    const checkInbox = async () => {
        if (!email.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter or generate an email address",
                variant: "destructive",
            })
            return
        }

        setRefreshing(true)
        try {
            const response = await fetch(`/api/tempmail?email=${encodeURIComponent(email)}`)

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch emails')
            }

            // Ensure data is an array
            const emailsData = Array.isArray(data) ? data : []

            // Transform API response
            const formattedEmails: Email[] = emailsData.map((mail: any) => ({
                id: mail.id || Math.random().toString(),
                from: mail.from || 'Unknown',
                subject: mail.subject || '(No Subject)',
                date: mail.created_at || new Date().toISOString(),
                body: mail.body_text || mail.body_html || '(No Content)'
            }))

            setEmails(formattedEmails)

            toast({
                title: "✅ Refreshed!",
                description: `Found ${formattedEmails.length} email(s)`,
            })
        } catch (error: any) {
            toast({
                title: "❌ Error",
                description: error.message || "Failed to check inbox",
                variant: "destructive",
            })
        } finally {
            setRefreshing(false)
        }
    }

    const copyEmail = () => {
        if (!email) return
        navigator.clipboard.writeText(email)
        toast({
            title: "✅ Copied!",
            description: "Email address copied to clipboard",
        })
    }

    const clearAll = () => {
        setEmail("")
        setEmails([])
        toast({
            title: "🗑️ Cleared",
            description: "All data cleared",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Mail className="h-8 w-8 text-[#FDB532]" />
                        Temporary Email
                    </h1>
                    <p className="text-muted-foreground">
                        Generate disposable email addresses for temporary use
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Generator */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Email Generator</CardTitle>
                            <CardDescription>Create or enter email</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Email Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="user@junkstopper.info"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button onClick={generateRandomEmail} variant="outline" className="flex-1 gap-2" size="sm">
                                    <RefreshCw className="h-4 w-4" />
                                    Generate
                                </Button>
                                <Button onClick={checkInbox} className="flex-1 gap-2" size="sm" disabled={refreshing}>
                                    <Mail className={`h-4 w-4 ${refreshing ? 'animate-pulse' : ''}`} />
                                    {refreshing ? 'Checking...' : 'Check Inbox'}
                                </Button>
                            </div>

                            {/* Email Display */}
                            {email && (
                                <div className="space-y-2">
                                    <div className="p-3 bg-muted/50 rounded-md">
                                        <p className="text-xs text-muted-foreground mb-1">Your Email:</p>
                                        <p className="text-sm font-mono font-semibold break-all">{email}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button onClick={copyEmail} variant="outline" className="flex-1 gap-2 h-8 text-xs">
                                            <Copy className="h-3 w-3" />
                                            Copy Email
                                        </Button>
                                        <Button variant="outline" onClick={clearAll} className="gap-2 h-8" size="sm">
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <div className="p-2 bg-[#FDB532]/10 rounded-md">
                                        <p className="text-xs text-[#FDB532]">
                                            📧 {emails.length} email(s) in inbox
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Inbox */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Inbox</CardTitle>
                            <CardDescription>
                                {emails.length > 0 ? `${emails.length} message${emails.length > 1 ? 's' : ''}` : 'No messages'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {!email ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No email set</p>
                                        <p className="text-sm">Generate or enter an email</p>
                                    </div>
                                </div>
                            ) : emails.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>Inbox is empty</p>
                                        <p className="text-sm">Click "Check Inbox" to refresh</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[260px] overflow-y-auto">
                                    {emails.map((mail) => (
                                        <div key={mail.id} className="p-2 bg-muted/50 rounded-md space-y-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-muted-foreground">From: {mail.from}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(mail.date).toLocaleTimeString()}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold">{mail.subject}</p>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {mail.body}
                                            </p>
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
                        <h3 className="font-semibold mb-2">ℹ️ Information</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• You can enter your own email or generate a random one</li>
                            <li>• Supported domains: junkstopper.info, cloudns.asia, somosnaturales.com, cloudns.cc</li>
                            <li>• Click "Check Inbox" to see if any emails have arrived</li>
                            <li>• Do not use for important or sensitive communications</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
