"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current.children,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-luxury-black relative overflow-hidden"
        >
            {/* Background glow */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 60%)",
                }}
            />

            {/* Decorative borders */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />

            <div className="luxury-container relative z-10">
                <div
                    ref={contentRef}
                    className="max-w-2xl mx-auto text-center"
                >
                    <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-4">
                        Stay Connected
                    </span>

                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl text-luxury-cream mb-6"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                    >
                        Join the <span className="text-gradient-gold">Kivyaa</span> World
                    </h2>

                    <p className="text-sm text-luxury-cream/40 mb-10 tracking-wider">
                        Subscribe to receive exclusive previews, limited edition launches,
                        and curated style inspiration.
                    </p>

                    {/* Email form */}
                    <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-transparent border border-gold-500/20 px-5 py-3.5 text-sm text-luxury-cream placeholder:text-luxury-cream/20 focus:border-gold-500/40 focus:outline-none transition-colors duration-300 rounded-sm"
                        />
                        <button className="btn-luxury-filled px-8 py-3.5 whitespace-nowrap">
                            <span>Subscribe</span>
                        </button>
                    </div>

                    <p className="text-[10px] text-luxury-cream/20 tracking-wider">
                        By subscribing, you agree to receive marketing communications from Kivyaa Jewels.
                    </p>
                </div>
            </div>
        </section>
    );
}
