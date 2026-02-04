"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, Trash2, Maximize2, Lock, Unlock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ImageResizerPage() {
    const { toast } = useToast()
    const [originalImage, setOriginalImage] = useState<string | null>(null)
    const [resizedImage, setResizedImage] = useState<string | null>(null)
    const [originalWidth, setOriginalWidth] = useState(0)
    const [originalHeight, setOriginalHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [aspectRatioLocked, setAspectRatioLocked] = useState(true)
    const [fileName, setFileName] = useState("")

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast({
                title: "❌ Error",
                description: "Please upload an image file",
                variant: "destructive",
            })
            return
        }

        setFileName(file.name)

        const reader = new FileReader()
        reader.onload = (event) => {
            const img = new Image()
            img.onload = () => {
                setOriginalImage(event.target?.result as string)
                setOriginalWidth(img.width)
                setOriginalHeight(img.height)
                setWidth(img.width)
                setHeight(img.height)
                resizeImage(img, img.width, img.height)
            }
            img.src = event.target?.result as string
        }
        reader.readAsDataURL(file)
    }

    const resizeImage = (img: HTMLImageElement, newWidth: number, newHeight: number) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = newWidth
        canvas.height = newHeight

        ctx?.drawImage(img, 0, 0, newWidth, newHeight)

        canvas.toBlob((blob) => {
            if (blob) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    setResizedImage(e.target?.result as string)
                }
                reader.readAsDataURL(blob)
            }
        }, 'image/png')
    }

    const handleWidthChange = (value: number) => {
        setWidth(value)
        if (aspectRatioLocked && originalWidth > 0) {
            const newHeight = Math.round((value / originalWidth) * originalHeight)
            setHeight(newHeight)
        }
    }

    const handleHeightChange = (value: number) => {
        setHeight(value)
        if (aspectRatioLocked && originalHeight > 0) {
            const newWidth = Math.round((value / originalHeight) * originalWidth)
            setWidth(newWidth)
        }
    }

    const applyResize = () => {
        if (!originalImage || width <= 0 || height <= 0) return

        const img = new Image()
        img.onload = () => {
            resizeImage(img, width, height)
            toast({
                title: "✅ Resized!",
                description: `Image resized to ${width}x${height}`,
            })
        }
        img.src = originalImage
    }

    const downloadImage = () => {
        if (!resizedImage) return

        const link = document.createElement('a')
        link.href = resizedImage
        link.download = `resized_${fileName}`
        link.click()

        toast({
            title: "✅ Downloaded!",
            description: "Resized image downloaded",
        })
    }

    const clearAll = () => {
        setOriginalImage(null)
        setResizedImage(null)
        setOriginalWidth(0)
        setOriginalHeight(0)
        setWidth(0)
        setHeight(0)
        setFileName("")
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
                        <Maximize2 className="h-8 w-8 text-[#FDB532]" />
                        Image Resizer
                    </h1>
                    <p className="text-muted-foreground">
                        Resize images to custom dimensions
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Upload & Settings */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Upload & Settings</CardTitle>
                            <CardDescription>Upload and set dimensions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-1.5">
                            {/* Upload Button - only show when no image */}
                            {!originalImage && (
                                <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors">
                                    <Upload className="h-5 w-5 mb-1 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Click to upload</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}

                            {originalImage && (
                                <>
                                    {/* Original Dimensions */}
                                    <div className="p-1.5 bg-muted/50 rounded-md text-center">
                                        <p className="text-xs text-muted-foreground">
                                            Original: {originalWidth} × {originalHeight}
                                        </p>
                                    </div>

                                    {/* Aspect Ratio Lock */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setAspectRatioLocked(!aspectRatioLocked)}
                                        className="w-full h-8 gap-2"
                                    >
                                        {aspectRatioLocked ? (
                                            <Lock className="h-3 w-3" />
                                        ) : (
                                            <Unlock className="h-3 w-3" />
                                        )}
                                        <span className="text-xs">
                                            {aspectRatioLocked ? "Locked" : "Unlocked"}
                                        </span>
                                    </Button>

                                    {/* Width */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Width (px)</label>
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                            className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>

                                    {/* Height */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Height (px)</label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                            className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        />
                                    </div>

                                    {/* Quick Presets */}
                                    <div className="grid grid-cols-3 gap-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setWidth(800)
                                                setHeight(aspectRatioLocked ? Math.round((800 / originalWidth) * originalHeight) : 600)
                                            }}
                                            className="h-7 text-xs"
                                        >
                                            800×600
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setWidth(1920)
                                                setHeight(aspectRatioLocked ? Math.round((1920 / originalWidth) * originalHeight) : 1080)
                                            }}
                                            className="h-7 text-xs"
                                        >
                                            1920×1080
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setWidth(1024)
                                                setHeight(aspectRatioLocked ? Math.round((1024 / originalWidth) * originalHeight) : 1024)
                                            }}
                                            className="h-7 text-xs"
                                        >
                                            1024×1024
                                        </Button>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Button onClick={applyResize} className="flex-1 gap-2 h-8 text-xs">
                                            Apply Resize
                                        </Button>
                                        <Button onClick={downloadImage} variant="outline" className="flex-1 gap-2 h-8 text-xs">
                                            <Download className="h-3 w-3" />
                                            Download
                                        </Button>
                                        <Button variant="outline" onClick={clearAll} className="gap-2 h-8" size="sm">
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>
                                {resizedImage ? `${width} × ${height}` : 'No image'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {!resizedImage ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <Maximize2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No image uploaded</p>
                                        <p className="text-sm">Upload an image to resize</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <img
                                        src={resizedImage}
                                        alt="Resized preview"
                                        className="max-w-full max-h-[260px] object-contain rounded-md"
                                    />
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
                            <li>• Lock aspect ratio to maintain image proportions</li>
                            <li>• Use quick presets for common dimensions (HD, Square)</li>
                            <li>• All processing happens in your browser - images stay private</li>
                            <li>• Supports JPG, PNG, and WebP formats</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
