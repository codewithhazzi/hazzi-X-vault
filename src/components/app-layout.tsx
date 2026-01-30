"use client"

import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
    children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-background">
            <Header
                sidebarOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="flex">
                {/* Desktop Sidebar */}
                <aside
                    className={cn(
                        "hidden md:block border-r h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 overflow-auto",
                        sidebarOpen ? "w-72" : "w-0"
                    )}
                >
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
