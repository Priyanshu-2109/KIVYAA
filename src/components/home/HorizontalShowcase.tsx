"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedProducts, formatPrice } from "@/lib/products";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const featured = getFeaturedProducts();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading reveal
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Horizontal scroll
            if (trackRef.current && sectionRef.current) {
                const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

                gsap.to(trackRef.current, {
                    x: -totalWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: () => `+=${totalWidth}`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                // Animate each card as it comes into view
                const cards = trackRef.current.children;
                Array.from(cards).forEach((card, i) => {
                    gsap.fromTo(
                        card,
                        { opacity: 0.3, scale: 0.9 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: gsap.getById("horizontal-scroll") || undefined,
                                start: "left 80%",
                                end: "left 50%",
                                scrub: 1,
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-luxury-dark overflow-hidden"
        >
            {/* Section Header */}
            <div ref={headingRef} className="text-center pt-24 pb-12 px-6">
                <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-4">
                    Featured Pieces
                </span>
                <h2
                    className="text-3xl md:text-5xl lg:text-6xl text-luxury-cream mb-4"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                >
                    The <span className="text-gradient-gold">Signature</span> Collection
                </h2>
                <div className="luxury-divider mt-6" />
                <p className="text-sm text-luxury-cream/40 mt-6 tracking-wider max-w-lg mx-auto">
                    Scroll to explore our most coveted pieces
                </p>
            </div>

            {/* Horizontal Track */}
            <div
                ref={trackRef}
                className="flex gap-8 px-12 pb-24 pt-8"
                style={{ width: "fit-content" }}
            >
                {featured.map((product) => (
                    <ShowcaseCard key={product.id} product={product} />
                ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-luxury-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-luxury-dark to-transparent z-10 pointer-events-none" />
        </section>
    );
}

function ShowcaseCard({ product }: { product: ReturnType<typeof getFeaturedProducts>[0] }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const { addItem, openCart } = useCartStore();

    useEffect(() => {
        const card = cardRef.current;
        const shine = shineRef.current;
        if (!card || !shine) return;

        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
            .to(card, { y: -12, duration: 0.4, ease: "power2.out" })
            .fromTo(
                shine,
                { x: "-100%" },
                { x: "100%", duration: 0.7, ease: "power2.inOut" },
                0
            );

        const onEnter = () => hoverTl.restart();
        const onLeave = () =>
            gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        return () => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
            hoverTl.kill();
        };
    }, []);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            slug: product.slug,
        });
        openCart();
    };

    return (
        <div
            ref={cardRef}
            className="group w-[350px] md:w-[420px] shrink-0"
        >
            <Link href={`/shop/${product.slug}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-luxury-charcoal rounded-sm overflow-hidden mb-5">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-luxury-black/20 z-10" />

                    {/* Product Image */}
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="420px"
                    />

                    {/* Shine */}
                    <div
                        ref={shineRef}
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(120deg, transparent 30%, rgba(212,175,55,0.1) 45%, rgba(212,175,55,0.2) 50%, rgba(212,175,55,0.1) 55%, transparent 70%)",
                            transform: "translateX(-100%)",
                        }}
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                        {product.isNew && (
                            <span className="text-[9px] tracking-[0.2em] uppercase bg-gold-500 text-luxury-black px-3 py-1">
                                New
                            </span>
                        )}
                        {product.originalPrice && (
                            <span className="text-[9px] tracking-[0.2em] uppercase bg-luxury-cream/10 text-luxury-cream px-3 py-1">
                                Sale
                            </span>
                        )}
                    </div>

                    {/* Quick Add */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                        <button
                            onClick={handleAddToCart}
                            className="w-full btn-luxury-filled text-[10px] py-3"
                        >
                            <span>Add to Cart</span>
                        </button>
                    </div>

                    {/* Border glow */}
                    <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/20 transition-colors duration-500 z-30 rounded-sm" />
                </div>

                {/* Product Info */}
                <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gold-500/50 mb-1">
                        {product.category}
                    </p>
                    <h3
                        className="text-lg text-luxury-cream group-hover:text-gold-500 transition-colors duration-300 mb-1"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
                    >
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gold-500">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-luxury-cream/30 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
