import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Tutorials</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Webinars</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-amber-500 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-800 text-center">
                    <p>&copy; {new Date().getFullYear()} TaskHive. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer