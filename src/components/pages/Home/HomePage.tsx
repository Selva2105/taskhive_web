import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowRightIcon, LayoutGrid, Users, Bell } from "lucide-react"
import Image from "next/image"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Pricing from "./Pricing"
import HeroSection from "./Hero"
import CTA from "./CTA"
import FAQ from "./FAQ"
import Testimonials from "./Testimonials"
import Features from "./Features"
import TrustList from "./TrustList"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-800">
            {/* Header */}
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-32">
                <HeroSection />
            </section>

            {/* Trust List */}
            <section className="py-16 bg-white">
                <TrustList />
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gradient-to-b from-amber-50 to-white">
                <Features />
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white">
                <Pricing />
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gradient-to-b from-amber-50 to-white">
                <Testimonials />
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-10 bg-white">
                <FAQ />
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <CTA />
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}