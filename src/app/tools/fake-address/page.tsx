"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, MapPin, RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Address = {
    street: string
    city: string
    state: string
    zip: string
    country: string
    phone: string
}

export default function FakeAddressPage() {
    const { toast } = useToast()
    const [address, setAddress] = useState<Address | null>(null)

    const streets = ["Main St", "Oak Ave", "Maple Dr", "Park Rd", "Washington Blvd", "Lake View", "Hill St", "Cedar Ln", "Elm St", "Pine Ave"]
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin"]
    const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "FL", "OH", "NC", "GA"]
    const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany"]

    const generateAddress = () => {
        const streetNum = Math.floor(Math.random() * 9999) + 1
        const street = streets[Math.floor(Math.random() * streets.length)]
        const city = cities[Math.floor(Math.random() * cities.length)]
        const state = states[Math.floor(Math.random() * states.length)]
        const zip = String(Math.floor(Math.random() * 90000) + 10000)
        const country = countries[Math.floor(Math.random() * countries.length)]

        const areaCode = Math.floor(Math.random() * 900) + 100
        const prefix = Math.floor(Math.random() * 900) + 100
        const lineNum = Math.floor(Math.random() * 9000) + 1000
        const phone = `(${areaCode}) ${prefix}-${lineNum}`

        const newAddress: Address = {
            street: `${streetNum} ${street}`,
            city,
            state,
            zip,
            country,
            phone
        }

        setAddress(newAddress)
        toast({
            title: "✅ Generated!",
            description: "Random address generated successfully",
        })
    }

    const copyField = (field: string, value: string) => {
        navigator.clipboard.writeText(value)
        toast({
            title: "✅ Copied!",
            description: `${field} copied to clipboard`,
        })
    }

    const copyAll = () => {
        if (!address) return
        const fullAddress = `${address.street}\n${address.city}, ${address.state} ${address.zip}\n${address.country}\nPhone: ${address.phone}`
        navigator.clipboard.writeText(fullAddress)
        toast({
            title: "✅ Copied!",
            description: "Full address copied to clipboard",
        })
    }

    const clearAll = () => {
        setAddress(null)
        toast({
            title: "🗑️ Cleared",
            description: "Address cleared",
        })
    }

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <MapPin className="h-8 w-8 text-[#FDB532]" />
                        Fake Address Generator
                    </h1>
                    <p className="text-muted-foreground">
                        Generate random fake addresses for testing purposes
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Generator */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Generator</CardTitle>
                            <CardDescription>Create random address</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Generate Button */}
                            <Button onClick={generateAddress} className="w-full gap-2" size="lg">
                                <RefreshCw className="h-4 w-4" />
                                Generate Random Address
                            </Button>

                            {/* Preview */}
                            {address && (
                                <div className="space-y-1">
                                    <div className="p-3 bg-muted/50 rounded-md">
                                        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                                        <p className="text-sm font-medium">{address.street}</p>
                                        <p className="text-sm">{address.city}, {address.state} {address.zip}</p>
                                        <p className="text-sm">{address.country}</p>
                                        <p className="text-sm">Phone: {address.phone}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={copyAll} variant="outline" className="flex-1 gap-2 h-8 text-xs">
                                            <Copy className="h-3 w-3" />
                                            Copy All
                                        </Button>
                                        <Button variant="outline" onClick={clearAll} className="gap-2 h-8" size="sm">
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {!address && (
                                <div className="text-center py-12 text-muted-foreground">
                                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No address generated</p>
                                    <p className="text-sm">Click generate to create</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Details */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Address Details</CardTitle>
                            <CardDescription>Individual fields</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {!address ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No address yet</p>
                                        <p className="text-sm">Generate an address to see details</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[260px] overflow-y-auto">
                                    {/* Street */}
                                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground">Street</p>
                                            <p className="text-sm font-medium">{address.street}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyField("Street", address.street)}
                                            className="h-8"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    {/* City */}
                                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground">City</p>
                                            <p className="text-sm font-medium">{address.city}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyField("City", address.city)}
                                            className="h-8"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    {/* State */}
                                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground">State</p>
                                            <p className="text-sm font-medium">{address.state}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyField("State", address.state)}
                                            className="h-8"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    {/* ZIP */}
                                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground">ZIP Code</p>
                                            <p className="text-sm font-medium">{address.zip}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyField("ZIP", address.zip)}
                                            className="h-8"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    {/* Country */}
                                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground">Country</p>
                                            <p className="text-sm font-medium">{address.country}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyField("Country", address.country)}
                                            className="h-8"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground">Phone</p>
                                            <p className="text-sm font-medium">{address.phone}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyField("Phone", address.phone)}
                                            className="h-8"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Info Card */}
                <Card className="bg-muted/30">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">ℹ️ Disclaimer</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• These addresses are randomly generated and fictional</li>
                            <li>• Use only for testing, development, or educational purposes</li>
                            <li>• Do not use for fraud, deception, or illegal activities</li>
                            <li>• Phone numbers are random and may not be valid</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
