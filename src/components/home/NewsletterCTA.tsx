"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image reveal
            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { clipPath: "inset(0 100% 0 0)", opacity: 0 },
                    {
                        clipPath: "inset(0 0% 0 0)",
                        opacity: 1,
                        duration: 1.2,
                        ease: "power4.inOut",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Content stagger
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current.children,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setEmail("");
            }, 3000);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
        >
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

            <div className="luxury-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                    {/* Left: Image */}
                    <div
                        ref={imageRef}
                        className="relative hidden lg:block"
                    >
                        <Image
                            src="/images/categories/earrings.png"
                            alt="Luxury jewellery"
                            fill
                            className="object-cover"
                            sizes="50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-luxury-black/90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-luxury-black/40" />

                        {/* Floating badge */}
                        <div className="absolute bottom-12 left-12 glass px-5 py-3 rounded-sm">
                            <div className="flex items-center gap-2">
                                <Sparkles size={14} className="text-gold-500" />
                                <span
                                    className="text-sm text-gold-500 tracking-wider"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Exclusive Access
                                </span>
                            </div>
                            <p className="text-[10px] text-luxury-cream/40 mt-0.5">
                                Members-only previews & early drops
                            </p>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex items-center justify-center py-24 lg:py-0 lg:pl-16 relative">
                        {/* Background subtle glow */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)",
                            }}
                        />

                        <div
                            ref={contentRef}
                            className="max-w-md w-full relative z-10"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-full border border-gold-500/20 flex items-center justify-center mb-8">
                                <Sparkles
                                    size={20}
                                    className="text-gold-500/60"
                                    strokeWidth={1.5}
                                />
                            </div>

                            {/* Label */}
                            <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-3">
                                Stay Connected
                            </span>

                            {/* Heading */}
                            <h2
                                className="text-3xl md:text-4xl text-luxury-cream mb-4"
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: 300,
                                }}
                            >
                                Join the{" "}
                                <span className="text-gradient-gold">Kivyaa</span>{" "}
                                Inner Circle
                            </h2>

                            <div className="luxury-divider !mx-0 mb-6" />

                            {/* Description */}
                            <p className="text-sm text-luxury-cream/40 leading-relaxed mb-8">
                                Be the first to discover new collections, receive
                                exclusive offers, and get styling inspiration
                                delivered to your inbox.
                            </p>

                            {/* Perks */}
                            <div className="space-y-3 mb-10">
                                {[
                                    "Early access to new collections",
                                    "Exclusive member-only discounts",
                                    "Curated style guides & inspiration",
                                ].map((perk) => (
                                    <div
                                        key={perk}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-5 h-5 rounded-full border border-gold-500/30 flex items-center justify-center shrink-0">
                                            <Check
                                                size={10}
                                                className="text-gold-500"
                                            />
                                        </div>
                                        <span className="text-xs text-luxury-cream/50 tracking-wide">
                                            {perk}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Email Form */}
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="mb-4"
                            >
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Your email address"
                                        required
                                        className="w-full bg-luxury-charcoal/50 border border-gold-500/15 px-5 py-4 pr-14 text-sm text-luxury-cream placeholder:text-luxury-cream/20 focus:border-gold-500/40 focus:outline-none focus:bg-luxury-charcoal/70 transition-all duration-300 rounded-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold-500 rounded-sm flex items-center justify-center hover:bg-gold-400 transition-colors duration-300 group"
                                        aria-label="Subscribe"
                                    >
                                        {isSubscribed ? (
                                            <Check
                                                size={16}
                                                className="text-luxury-black"
                                            />
                                        ) : (
                                            <ArrowRight
                                                size={16}
                                                className="text-luxury-black group-hover:translate-x-0.5 transition-transform duration-300"
                                            />
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Success / Disclaimer */}
                            {isSubscribed ? (
                                <p className="text-xs text-gold-500 tracking-wider flex items-center gap-2">
                                    <Sparkles size={12} />
                                    Welcome to the Kivyaa family!
                                </p>
                            ) : (
                                <p className="text-[10px] text-luxury-cream/20 tracking-wider">
                                    No spam. Unsubscribe anytime. We respect your
                                    privacy.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        </section>
    );
}
