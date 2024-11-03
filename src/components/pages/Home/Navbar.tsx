'use client';

import { Button } from "@/components/ui/button"
import { fetchUserData } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
    const [token, setToken] = useState<string | null>(null);
    const { user } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("accessToken-TH");
            const storedUserId = localStorage.getItem("userId-TH");
            setToken(storedToken);
            console.log(storedUserId, storedToken);
            if (storedUserId && storedToken) {
                dispatch(fetchUserData({ id: storedUserId, token: storedToken }));
            }
        }
    }, []);

    const getStarted = () => {
        if (token && user?.id && user?.emailVerified) {
            window.location.href = "/dashboard"
        } else {
            window.location.href = "/signup"
        }
    }

    return (
        <header className="fixed w-full bg-white bg-opacity-90 backdrop-blur-sm z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <img src="/images/logo-lap.jpeg" alt="TaskHive Logo" className="h-12 w-16" />
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">TaskHive</span>
                </Link>
                <nav className="hidden md:flex space-x-8">
                    <Link href="#features" className="text-sm font-medium hover:text-amber-500 transition-colors">Features</Link>
                    <Link href="#pricing" className="text-sm font-medium hover:text-amber-500 transition-colors">Pricing</Link>
                    <Link href="#testimonials" className="text-sm font-medium hover:text-amber-500 transition-colors">Testimonials</Link>
                    <Link href="#faq" className="text-sm font-medium hover:text-amber-500 transition-colors">FAQ</Link>
                </nav>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all duration-300" onClick={getStarted}>
                    {token ? "Dashboard" : "Get Started"}
                </Button>
            </div>
        </header>
    )
}