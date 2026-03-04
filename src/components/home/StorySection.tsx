"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left side: image reveal
            if (leftRef.current) {
                gsap.fromTo(
                    leftRef.current,
                    { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
                    {
                        clipPath: "inset(0 0% 0 0)",
                        scale: 1,
                        duration: 1.4,
                        ease: "power4.inOut",
                        scrollTrigger: {
                            trigger: leftRef.current,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Right side: text reveal
            if (rightRef.current) {
                gsap.fromTo(
                    rightRef.current.children,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: rightRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Parallax on the decorative elements
            if (quoteRef.current) {
                gsap.to(quoteRef.current, {
                    y: -40,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section-padding bg-luxury-black relative overflow-hidden"
        >
            {/* Large decorative quote mark */}
            <div
                ref={quoteRef}
                className="absolute -top-20 -left-10 text-[300px] text-gold-500/[0.03] leading-none pointer-events-none select-none"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                &ldquo;
            </div>

            <div className="luxury-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Image */}
                    <div ref={leftRef} className="relative">
                        <div className="aspect-[4/5] bg-luxury-charcoal rounded-sm relative overflow-hidden">
                            {/* Gradient overlay for premium look */}
                            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent z-10" />

                            {/* Actual Image */}
                            <Image
                                src="/images/categories/necklaces.png"
                                alt="Kivyaa Jewels craftsmanship"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Gold border accent */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
                        </div>

                        {/* Floating accent card */}
                        <div className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-8 glass px-6 py-4 rounded-sm z-20">
                            <p
                                className="text-sm text-gold-500 tracking-wider"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Since 2020
                            </p>
                            <p className="text-xs text-luxury-cream/40">
                                Crafting Excellence
                            </p>
                        </div>
                    </div>

                    {/* Right: Text */}
                    <div ref={rightRef}>
                        <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-4">
                            Our Story
                        </span>

                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl text-luxury-cream mb-6"
                            style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                        >
                            Where Tradition Meets{" "}
                            <span className="text-gradient-gold">Modern Artistry</span>
                        </h2>

                        <div className="luxury-divider !mx-0 mb-6" />

                        <p className="text-luxury-cream/50 text-sm leading-relaxed mb-4">
                            At Kivyaa Jewels, every piece begins as a vision — a whisper of
                            gold, a dance of light. Our master artisans bring decades of
                            heritage to each creation, weaving stories of elegance into
                            precious metals and gemstones.
                        </p>

                        <p className="text-luxury-cream/40 text-sm leading-relaxed mb-8">
                            From the vibrant streets of Mumbai to the world — we craft
                            jewellery that transcends time, celebrates individuality, and
                            becomes a cherished part of your journey.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <p
                                    className="text-2xl md:text-3xl text-gold-500 mb-1"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    500+
                                </p>
                                <p className="text-[10px] tracking-[0.15em] uppercase text-luxury-cream/30">
                                    Unique Designs
                                </p>
                            </div>
                            <div>
                                <p
                                    className="text-2xl md:text-3xl text-gold-500 mb-1"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    10K+
                                </p>
                                <p className="text-[10px] tracking-[0.15em] uppercase text-luxury-cream/30">
                                    Happy Clients
                                </p>
                            </div>
                            <div>
                                <p
                                    className="text-2xl md:text-3xl text-gold-500 mb-1"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    5★
                                </p>
                                <p className="text-[10px] tracking-[0.15em] uppercase text-luxury-cream/30">
                                    Avg. Rating
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
