"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, QrCode, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import QRCodeLib from "qrcode"

export default function QRCodeGenPage() {
    const { toast } = useToast()
    const [text, setText] = useState("")
    const [qrCode, setQrCode] = useState("")

    const generateQR = async () => {
        if (!text.trim()) {
            toast({
                title: "❌ Error",
                description: "Please enter text or URL",
                variant: "destructive",
            })
            return
        }

        try {
            const qrDataUrl = await QRCodeLib.toDataURL(text, {
                width: 200,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            })
            setQrCode(qrDataUrl)
            toast({
                title: "✅ Generated!",
                description: "QR Code created successfully",
            })
        } catch (error) {
            toast({
                title: "❌ Error",
                description: "Failed to generate QR code",
                variant: "destructive",
            })
        }
    }

    const downloadQR = () => {
        if (!qrCode) return
        const link = document.createElement('a')
        link.href = qrCode
        link.download = 'qrcode.png'
        link.click()
        toast({
            title: "✅ Downloaded!",
            description: "QR Code saved as qrcode.png",
        })
    }

    const clearAll = () => {
        setText("")
        setQrCode("")
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
                        <QrCode className="h-8 w-8 text-[#FDB532]" />
                        QR Code Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Create QR codes from text or URLs
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Input</CardTitle>
                            <CardDescription>Enter text or URL</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Text Input */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Text or URL</label>
                                <textarea
                                    placeholder="Enter text, URL, or data..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                                />
                            </div>

                            {/* Generate Button */}
                            <Button onClick={generateQR} className="w-full gap-2" size="lg">
                                <QrCode className="h-4 w-4" />
                                Generate QR Code
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Result */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>QR Code</CardTitle>
                                    <CardDescription>Generated QR code</CardDescription>
                                </div>
                                {qrCode && (
                                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col items-center justify-center">
                            {!qrCode ? (
                                <div className="text-center text-muted-foreground">
                                    <QrCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No QR code generated</p>
                                    <p className="text-sm">Enter text and click generate</p>
                                </div>
                            ) : (
                                <div className="space-y-2 w-full">
                                    <div className="flex justify-center p-2 bg-white rounded-md">
                                        <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                                    </div>
                                    <Button onClick={downloadQR} variant="outline" className="w-full gap-2 h-8 text-xs">
                                        <Download className="h-4 w-4" />
                                        Download PNG
                                    </Button>
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
                            <li>• QR codes can store text, URLs, contact info, and more</li>
                            <li>• Scan with any smartphone camera or QR code reader app</li>
                            <li>• Keep text short for better scanning reliability</li>
                            <li>• Download as PNG for use in documents or websites</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
