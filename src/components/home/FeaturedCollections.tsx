"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "@/lib/products";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCollections() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current.children,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Grid cards animation
            if (gridRef.current) {
                const cards = gridRef.current.children;
                gsap.fromTo(
                    cards,
                    { y: 80, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-luxury-black relative">
            <div className="luxury-container">
                {/* Section Heading */}
                <div ref={headingRef} className="text-center mb-16">
                    <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-4">
                        Curated For You
                    </span>
                    <h2
                        className="text-3xl md:text-5xl lg:text-6xl text-luxury-cream mb-4"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                    >
                        Our <span className="text-gradient-gold">Collections</span>
                    </h2>
                    <div className="luxury-divider mt-6" />
                </div>

                {/* Categories Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {categories.map((category, index) => (
                        <CollectionCard
                            key={category.id}
                            category={category}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CollectionCard({
    category,
    index,
}: {
    category: (typeof categories)[0];
    index: number;
}) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const shine = shineRef.current;
        if (!card || !shine) return;

        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
            .to(card, {
                y: -8,
                duration: 0.4,
                ease: "power2.out",
            })
            .fromTo(
                shine,
                { x: "-100%" },
                { x: "100%", duration: 0.6, ease: "power2.inOut" },
                0
            );

        const onEnter = () => hoverTl.restart();
        const onLeave = () => {
            gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        return () => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
            hoverTl.kill();
        };
    }, []);

    // Use varied aspect ratios for visual interest
    const heights = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[4/5]"];

    return (
        <Link
            ref={cardRef}
            href={`/shop?category=${category.slug}`}
            className="group block relative overflow-hidden rounded-sm"
        >
            {/* Background */}
            <div
                className={`${heights[index]} bg-luxury-charcoal relative overflow-hidden`}
            >
                {/* Category Image */}
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                />

                {/* Gradient overlay for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/40 to-luxury-black/20 z-10" />

                {/* Shine overlay */}
                <div
                    ref={shineRef}
                    className="absolute inset-0 z-20"
                    style={{
                        background:
                            "linear-gradient(120deg, transparent 30%, rgba(212,175,55,0.1) 45%, rgba(212,175,55,0.2) 50%, rgba(212,175,55,0.1) 55%, transparent 70%)",
                        transform: "translateX(-100%)",
                    }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3
                        className="text-xl md:text-2xl text-luxury-cream mb-1 group-hover:text-gold-500 transition-colors duration-300"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
                    >
                        {category.name}
                    </h3>
                    <p className="text-xs text-luxury-cream/40 mb-3 line-clamp-2">
                        {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-gold-500/60 group-hover:text-gold-500 transition-colors duration-300">
                        <span className="text-[10px] tracking-[0.2em] uppercase">
                            Explore
                        </span>
                        <ArrowRight
                            size={12}
                            className="transform group-hover:translate-x-1 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Border glow on hover */}
                <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/20 transition-colors duration-500 z-30 rounded-sm" />
            </div>
        </Link>
    );
}
