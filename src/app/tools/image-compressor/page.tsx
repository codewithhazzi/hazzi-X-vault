"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, Trash2, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ImageCompressorPage() {
    const { toast } = useToast()
    const [originalImage, setOriginalImage] = useState<string | null>(null)
    const [compressedImage, setCompressedImage] = useState<string | null>(null)
    const [originalSize, setOriginalSize] = useState(0)
    const [compressedSize, setCompressedSize] = useState(0)
    const [quality, setQuality] = useState(80)
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
        setOriginalSize(file.size)

        const reader = new FileReader()
        reader.onload = (event) => {
            const img = new Image()
            img.onload = () => {
                setOriginalImage(event.target?.result as string)
                compressImage(img, quality)
            }
            img.src = event.target?.result as string
        }
        reader.readAsDataURL(file)
    }

    const compressImage = (img: HTMLImageElement, qual: number) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = img.width
        canvas.height = img.height

        ctx?.drawImage(img, 0, 0)

        canvas.toBlob(
            (blob) => {
                if (blob) {
                    setCompressedSize(blob.size)
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        setCompressedImage(e.target?.result as string)
                    }
                    reader.readAsDataURL(blob)
                }
            },
            'image/jpeg',
            qual / 100
        )
    }

    const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuality = parseInt(e.target.value)
        setQuality(newQuality)

        if (originalImage) {
            const img = new Image()
            img.onload = () => {
                compressImage(img, newQuality)
            }
            img.src = originalImage
        }
    }

    const downloadImage = () => {
        if (!compressedImage) return

        const link = document.createElement('a')
        link.href = compressedImage
        link.download = `compressed_${fileName}`
        link.click()

        toast({
            title: "✅ Downloaded!",
            description: "Compressed image downloaded",
        })
    }

    const clearAll = () => {
        setOriginalImage(null)
        setCompressedImage(null)
        setOriginalSize(0)
        setCompressedSize(0)
        setFileName("")
        toast({
            title: "🗑️ Cleared",
            description: "All data has been cleared",
        })
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
    }

    const savedPercentage = originalSize > 0
        ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
        : 0

    return (
        <AppLayout>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <ImageIcon className="h-8 w-8 text-[#FDB532]" />
                        Image Compressor
                    </h1>
                    <p className="text-muted-foreground">
                        Compress images to reduce file size without losing quality
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Upload & Settings */}
                    <Card className="h-[400px]">
                        <CardHeader>
                            <CardTitle>Upload & Settings</CardTitle>
                            <CardDescription>Upload image and adjust quality</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-1.5">
                            {/* Upload Button */}
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

                            {/* Quality Slider */}
                            <div className="space-y-1">
                                <label className="text-xs font-medium">
                                    Quality: {quality}%
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={quality}
                                    onChange={handleQualityChange}
                                    className="w-full"
                                    disabled={!originalImage}
                                />
                            </div>

                            {/* Stats */}
                            {originalImage && (
                                <div className="space-y-1">
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <div className="p-1.5 bg-muted/50 rounded-md">
                                            <p className="text-xs text-muted-foreground">Original</p>
                                            <p className="text-sm font-semibold">{formatSize(originalSize)}</p>
                                        </div>
                                        <div className="p-1.5 bg-muted/50 rounded-md">
                                            <p className="text-xs text-muted-foreground">Compressed</p>
                                            <p className="text-sm font-semibold">{formatSize(compressedSize)}</p>
                                        </div>
                                    </div>
                                    <div className="p-1.5 bg-[#FDB532]/10 rounded-md text-center">
                                        <p className="text-xs font-semibold text-[#FDB532]">
                                            Saved {savedPercentage}% ({formatSize(originalSize - compressedSize)})
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            {compressedImage && (
                                <div className="flex gap-2">
                                    <Button onClick={downloadImage} className="flex-1 gap-2 h-8 text-xs">
                                        <Download className="h-3 w-3" />
                                        Download
                                    </Button>
                                    <Button variant="outline" onClick={clearAll} className="gap-2 h-8" size="sm">
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>Compressed image preview</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {!compressedImage ? (
                                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                                    <div>
                                        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No image uploaded</p>
                                        <p className="text-sm">Upload an image to compress</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <img
                                        src={compressedImage}
                                        alt="Compressed preview"
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
                            <li>• All compression happens in your browser - images never leave your device</li>
                            <li>• Quality 80-90% is recommended for web use - good balance of size and quality</li>
                            <li>• Lower quality settings create smaller files but may reduce image clarity</li>
                            <li>• Supports JPG, PNG, and WebP formats</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
