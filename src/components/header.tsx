"use client"

import { Menu, PanelLeftClose, PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

interface HeaderProps {
    sidebarOpen?: boolean
    onToggleSidebar?: () => void
}


import Link from "next/link"

export function Header({ sidebarOpen = true, onToggleSidebar }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ borderBottom: '3px solid rgb(253, 181, 50) !important' }}>
            <div className="flex h-16 items-center px-4">
                <div className="flex items-center gap-4">
                    {/* Mobile menu toggle */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72 overflow-y-auto">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>

                    {/* Desktop sidebar toggle */}
                    {onToggleSidebar && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex"
                            onClick={onToggleSidebar}
                        >
                            {sidebarOpen ? (
                                <PanelLeftClose className="h-5 w-5" />
                            ) : (
                                <PanelLeft className="h-5 w-5" />
                            )}
                            <span className="sr-only">Toggle sidebar</span>
                        </Button>
                    )}

                    <h1 className="text-xl font-bold">
                        <span className="text-[#FDB532]">Hazzi</span>
                        <span className="text-white"> X </span>
                        <span className="text-[#FDB532]">Vault</span>
                    </h1>
                </div>

                <div className="flex-1" />

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Sign Up</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
