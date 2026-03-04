"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useGSAPReveal } from "@/hooks/useGSAP";

const quickLinks = [
    { name: "Shop All", href: "/shop" },
    { name: "Rings", href: "/shop?category=rings" },
    { name: "Necklaces", href: "/shop?category=necklaces" },
    { name: "Earrings", href: "/shop?category=earrings" },
    { name: "Bracelets", href: "/shop?category=bracelets" },
];

const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
];

export default function Footer() {
    const footerRef = useGSAPReveal<HTMLElement>({ y: 40, duration: 0.8 });

    return (
        <footer
            ref={footerRef}
            className="bg-luxury-dark border-t border-gold-500/10"
        >
            <div className="luxury-container section-padding">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex flex-col items-start mb-6">
                            <span
                                className="text-2xl tracking-[0.3em] text-gold-500"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                KIVYAA
                            </span>
                            <span className="text-[9px] tracking-[0.5em] text-gold-500/60 uppercase mt-[-2px]">
                                Jewels
                            </span>
                        </div>
                        <p className="text-luxury-cream/50 text-sm leading-relaxed mb-6">
                            Exquisite jewellery combining timeless elegance with contemporary
                            design. Each piece is meticulously crafted to help you tell your
                            unique story.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com/kivyaajewels"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-gold-500/20 rounded-full flex items-center justify-center text-gold-500/60 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram size={16} />
                            </a>
                            <a
                                href="mailto:hello@kivyaajewels.co.in"
                                className="w-10 h-10 border border-gold-500/20 rounded-full flex items-center justify-center text-gold-500/60 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
                                aria-label="Email"
                            >
                                <Mail size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[11px] tracking-[0.3em] uppercase text-gold-500/80 mb-6">
                            Shop
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-luxury-cream/50 hover:text-gold-500 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-[11px] tracking-[0.3em] uppercase text-gold-500/80 mb-6">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-luxury-cream/50 hover:text-gold-500 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-[11px] tracking-[0.3em] uppercase text-gold-500/80 mb-6">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin
                                    size={16}
                                    className="text-gold-500/60 mt-0.5 shrink-0"
                                />
                                <span className="text-sm text-luxury-cream/50">
                                    Mumbai, Maharashtra, India
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-gold-500/60 shrink-0" />
                                <a
                                    href="tel:+917737777377"
                                    className="text-sm text-luxury-cream/50 hover:text-gold-500 transition-colors duration-300"
                                >
                                    +91 77377 77377
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-gold-500/60 shrink-0" />
                                <a
                                    href="mailto:hello@kivyaajewels.co.in"
                                    className="text-sm text-luxury-cream/50 hover:text-gold-500 transition-colors duration-300"
                                >
                                    hello@kivyaajewels.co.in
                                </a>
                            </li>
                        </ul>
                        <p className="text-xs text-luxury-cream/30 mt-4">
                            Mon – Sat: 10:00 AM – 8:00 PM
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="luxury-divider my-12" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-luxury-cream/30">
                        © {new Date().getFullYear()} Kivyaa Jewels. All rights reserved.
                    </p>
                    <p className="text-xs text-luxury-cream/20">
                        Crafted with elegance ✦
                    </p>
                </div>
            </div>
        </footer>
    );
}
