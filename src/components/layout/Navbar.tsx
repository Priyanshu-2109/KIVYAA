"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/shop?featured=true" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const { toggleCart, itemCount } = useCartStore();
    const count = itemCount();

    // Navbar scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Entry animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 1.5 });

            if (logoRef.current) {
                tl.fromTo(
                    logoRef.current,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                );
            }

            if (linksRef.current) {
                tl.fromTo(
                    linksRef.current.children,
                    { opacity: 0, y: -20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );
            }
        });

        return () => ctx.revert();
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                x: 0,
                duration: 0.5,
                ease: "power3.out",
            });
            gsap.fromTo(
                mobileMenuRef.current.querySelectorAll("a"),
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                x: "100%",
                duration: 0.4,
                ease: "power3.in",
            });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                        ? "bg-luxury-black/90 backdrop-blur-xl border-b border-gold-500/10"
                        : "bg-transparent"
                    }`}
            >
                <div className="luxury-container">
                    <div className="flex items-center justify-between h-20 md:h-24">
                        {/* Logo */}
                        <Link
                            href="/"
                            ref={logoRef}
                            className="relative z-10 opacity-0"
                        >
                            <div className="flex flex-col items-center">
                                <span
                                    className="text-2xl md:text-3xl tracking-[0.3em] text-gold-500"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    KIVYAA
                                </span>
                                <span className="text-[9px] tracking-[0.5em] text-gold-500/60 uppercase mt-[-2px]">
                                    Jewels
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div
                            ref={linksRef}
                            className="hidden md:flex items-center gap-10"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-[11px] tracking-[0.25em] uppercase text-luxury-cream/70 hover:text-gold-500 transition-colors duration-300 relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4 md:gap-6">
                            <button
                                className="text-luxury-cream/70 hover:text-gold-500 transition-colors duration-300"
                                aria-label="Search"
                            >
                                <Search size={18} strokeWidth={1.5} />
                            </button>

                            <button
                                onClick={toggleCart}
                                className="relative text-luxury-cream/70 hover:text-gold-500 transition-colors duration-300"
                                aria-label="Cart"
                            >
                                <ShoppingBag size={18} strokeWidth={1.5} />
                                {count > 0 && (
                                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold-500 text-luxury-black text-[9px] font-medium rounded-full flex items-center justify-center">
                                        {count}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden text-luxury-cream/70 hover:text-gold-500 transition-colors duration-300"
                                aria-label="Menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X size={22} strokeWidth={1.5} />
                                ) : (
                                    <Menu size={22} strokeWidth={1.5} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="fixed top-0 right-0 w-full h-full bg-luxury-black/95 backdrop-blur-xl z-40 transform translate-x-full md:hidden"
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl tracking-[0.3em] uppercase text-luxury-cream/80 hover:text-gold-500 transition-colors duration-300"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
