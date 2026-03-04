"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Gem, Heart, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        icon: Gem,
        title: "Exquisite Craftsmanship",
        description:
            "Every piece is meticulously handcrafted by master artisans with decades of experience, ensuring perfection in every detail.",
    },
    {
        icon: Heart,
        title: "Ethically Sourced",
        description:
            "We are committed to responsible sourcing. All our gemstones and metals are ethically procured and conflict-free.",
    },
    {
        icon: Award,
        title: "Certified Quality",
        description:
            "Each piece comes with a certificate of authenticity — hallmarked gold, GIA-certified diamonds, and genuine gemstones.",
    },
    {
        icon: Shield,
        title: "Lifetime Warranty",
        description:
            "We stand behind our work with a lifetime warranty on all structural elements and a complimentary annual cleaning service.",
    },
];

export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero text reveal
            if (heroRef.current) {
                gsap.fromTo(
                    heroRef.current.children,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.5,
                    }
                );
            }

            // Story section
            if (storyRef.current) {
                gsap.fromTo(
                    storyRef.current.querySelectorAll(".story-element"),
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: storyRef.current,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Values cards
            if (valuesRef.current) {
                gsap.fromTo(
                    valuesRef.current.children,
                    { y: 60, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: valuesRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // CTA
            if (ctaRef.current) {
                gsap.fromTo(
                    ctaRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero/hero-bg.png"
                        alt="Kivyaa Jewels craftsmanship"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-luxury-black/70" />
                </div>

                <div ref={heroRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                    <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-4">
                        Our Story
                    </span>
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl text-luxury-cream mb-6"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                    >
                        A Legacy of <span className="text-gradient-gold">Brilliance</span>
                    </h1>
                    <p className="text-sm md:text-base text-luxury-cream/50 tracking-wide max-w-xl mx-auto">
                        Since our founding, Kivyaa Jewels has been dedicated to creating
                        extraordinary pieces that celebrate life&apos;s most precious moments.
                    </p>
                    <div className="luxury-divider mt-8" />
                </div>
            </section>

            {/* Brand Story */}
            <section ref={storyRef} className="section-padding">
                <div className="luxury-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <div className="story-element relative aspect-[4/5] rounded-sm overflow-hidden">
                            <Image
                                src="/images/categories/rings.png"
                                alt="Kivyaa Jewels artisan at work"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent" />
                            {/* Decorative frame */}
                            <div className="absolute inset-4 border border-gold-500/15 rounded-sm pointer-events-none" />
                        </div>

                        {/* Text */}
                        <div>
                            <span className="story-element text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-4">
                                Heritage & Vision
                            </span>
                            <h2
                                className="story-element text-3xl md:text-4xl text-luxury-cream mb-6"
                                style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                            >
                                Where Tradition Meets{" "}
                                <span className="text-gradient-gold">Modern Artistry</span>
                            </h2>
                            <div className="story-element luxury-divider !mx-0 mb-8" />

                            <p className="story-element text-sm text-luxury-cream/50 leading-relaxed mb-6">
                                At Kivyaa Jewels, every piece begins as a vision — a whisper of gold,
                                a dance of light. Our master artisans bring decades of heritage to
                                each creation, weaving stories of elegance into precious metals and
                                gemstones.
                            </p>
                            <p className="story-element text-sm text-luxury-cream/50 leading-relaxed mb-8">
                                We believe that jewellery is more than an accessory — it&apos;s an
                                expression of identity, a celebration of milestones, and a legacy
                                passed through generations. Each design draws inspiration from nature,
                                architecture, and the timeless beauty of Indian craftsmanship.
                            </p>

                            {/* Stats */}
                            <div className="story-element grid grid-cols-3 gap-6 pt-6 border-t border-gold-500/10">
                                <div>
                                    <p
                                        className="text-3xl text-gold-500 mb-1"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        25+
                                    </p>
                                    <p className="text-[10px] tracking-wider uppercase text-luxury-cream/30">
                                        Years of Excellence
                                    </p>
                                </div>
                                <div>
                                    <p
                                        className="text-3xl text-gold-500 mb-1"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        10K+
                                    </p>
                                    <p className="text-[10px] tracking-wider uppercase text-luxury-cream/30">
                                        Pieces Crafted
                                    </p>
                                </div>
                                <div>
                                    <p
                                        className="text-3xl text-gold-500 mb-1"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        50+
                                    </p>
                                    <p className="text-[10px] tracking-wider uppercase text-luxury-cream/30">
                                        Master Artisans
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="section-padding bg-luxury-dark">
                <div className="luxury-container">
                    <div className="text-center mb-16">
                        <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-4">
                            What We Stand For
                        </span>
                        <h2
                            className="text-3xl md:text-5xl text-luxury-cream mb-4"
                            style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                        >
                            Our <span className="text-gradient-gold">Values</span>
                        </h2>
                        <div className="luxury-divider mt-6" />
                    </div>

                    <div
                        ref={valuesRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={value.title}
                                    className="group p-8 border border-gold-500/10 rounded-sm hover:border-gold-500/25 transition-all duration-500 hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 rounded-full border border-gold-500/20 flex items-center justify-center mb-6 group-hover:border-gold-500/50 transition-colors duration-500">
                                        <Icon
                                            size={20}
                                            className="text-gold-500/60 group-hover:text-gold-500 transition-colors duration-500"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <h3
                                        className="text-lg text-luxury-cream mb-3 group-hover:text-gold-500 transition-colors duration-300"
                                        style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
                                    >
                                        {value.title}
                                    </h3>
                                    <p className="text-xs text-luxury-cream/40 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="luxury-container">
                    <div ref={ctaRef} className="text-center max-w-2xl mx-auto">
                        <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-4">
                            Begin Your Journey
                        </span>
                        <h2
                            className="text-3xl md:text-5xl text-luxury-cream mb-6"
                            style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                        >
                            Discover Your <span className="text-gradient-gold">Signature Piece</span>
                        </h2>
                        <p className="text-sm text-luxury-cream/40 mb-10 max-w-lg mx-auto">
                            Browse our curated collection and find the perfect piece that reflects
                            your unique style and story.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop" className="btn-luxury btn-luxury-filled">
                                <span>Explore Collection</span>
                            </Link>
                            <Link href="/shop?featured=true" className="btn-luxury">
                                <span>Featured Pieces</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
