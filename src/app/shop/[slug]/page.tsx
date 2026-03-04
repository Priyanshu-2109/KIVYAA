"use client";

import { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ChevronRight,
    Star,
    Heart,
    Minus,
    Plus,
    ShoppingBag,
    Truck,
    Shield,
    RefreshCw,
} from "lucide-react";
import {
    getProductBySlug,
    formatPrice,
    products,
} from "@/lib/products";
import { useCartStore } from "@/stores/cart-store";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const product = getProductBySlug(slug);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { addItem, openCart } = useCartStore();

    const pageRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!product) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            // Image cinematic reveal
            if (imageRef.current) {
                tl.fromTo(
                    imageRef.current,
                    { clipPath: "inset(0 0 100% 0)", opacity: 0 },
                    {
                        clipPath: "inset(0 0 0% 0)",
                        opacity: 1,
                        duration: 1.2,
                        ease: "power4.inOut",
                    }
                );
            }

            // Info stagger
            if (infoRef.current) {
                tl.fromTo(
                    infoRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power3.out",
                    },
                    "-=0.6"
                );
            }
        }, pageRef);

        return () => ctx.revert();
    }, [product]);

    // Shine on hover
    useEffect(() => {
        const image = imageRef.current;
        const shine = shineRef.current;
        if (!image || !shine) return;

        const onEnter = () => {
            gsap.fromTo(
                shine,
                { x: "-100%" },
                { x: "100%", duration: 0.8, ease: "power2.inOut" }
            );
        };

        image.addEventListener("mouseenter", onEnter);
        return () => image.removeEventListener("mouseenter", onEnter);
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1
                        className="text-3xl text-luxury-cream mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Product Not Found
                    </h1>
                    <Link href="/shop" className="btn-luxury">
                        <span>Back to Shop</span>
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                slug: product.slug,
            });
        }
        openCart();
    };

    // Get related products
    const related = products
        .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
        .slice(0, 4);

    return (
        <div ref={pageRef} className="min-h-screen pt-24 md:pt-32 pb-24">
            {/* Breadcrumbs */}
            <div className="luxury-container mb-8">
                <div className="flex items-center gap-2 text-[10px] tracking-wider">
                    <Link
                        href="/"
                        className="text-luxury-cream/30 hover:text-gold-500 transition-colors"
                    >
                        Home
                    </Link>
                    <ChevronRight size={10} className="text-luxury-cream/20" />
                    <Link
                        href="/shop"
                        className="text-luxury-cream/30 hover:text-gold-500 transition-colors"
                    >
                        Shop
                    </Link>
                    <ChevronRight size={10} className="text-luxury-cream/20" />
                    <Link
                        href={`/shop?category=${product.categorySlug}`}
                        className="text-luxury-cream/30 hover:text-gold-500 transition-colors"
                    >
                        {product.category}
                    </Link>
                    <ChevronRight size={10} className="text-luxury-cream/20" />
                    <span className="text-gold-500/60">{product.name}</span>
                </div>
            </div>

            {/* Product Layout */}
            <div className="luxury-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image */}
                    <div
                        ref={imageRef}
                        className="relative aspect-square bg-luxury-charcoal rounded-sm overflow-hidden cursor-crosshair"
                    >
                        {/* Product Image */}
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/30 to-transparent z-10" />

                        {/* Shine overlay */}
                        <div
                            ref={shineRef}
                            className="absolute inset-0 z-20 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(120deg, transparent 30%, rgba(212,175,55,0.1) 45%, rgba(212,175,55,0.25) 50%, rgba(212,175,55,0.1) 55%, transparent 70%)",
                                transform: "translateX(-100%)",
                            }}
                        />

                        {/* Badges */}
                        {product.isNew && (
                            <span className="absolute top-4 left-4 z-30 text-[9px] tracking-[0.2em] uppercase bg-gold-500 text-luxury-black px-3 py-1">
                                New Arrival
                            </span>
                        )}

                        {/* Wishlist */}
                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full glass flex items-center justify-center hover:border-gold-500/30 transition-all duration-300"
                        >
                            <Heart
                                size={16}
                                className={
                                    isWishlisted
                                        ? "text-gold-500 fill-gold-500"
                                        : "text-luxury-cream/40"
                                }
                            />
                        </button>
                    </div>

                    {/* Product Info */}
                    <div ref={infoRef} className="flex flex-col justify-center">
                        {/* Category */}
                        <p className="text-[10px] tracking-[0.3em] uppercase text-gold-500/60 mb-2">
                            {product.category}
                        </p>

                        {/* Name */}
                        <h1
                            className="text-3xl md:text-4xl lg:text-5xl text-luxury-cream mb-4"
                            style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                        >
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={
                                            i < Math.floor(product.rating)
                                                ? "text-gold-500 fill-gold-500"
                                                : "text-gold-500/20"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-luxury-cream/30">
                                ({product.reviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                            <span
                                className="text-2xl text-gold-500"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-lg text-luxury-cream/25 line-through">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                    <span className="text-[10px] tracking-wider uppercase text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                                        {Math.round(
                                            (1 - product.price / product.originalPrice) * 100
                                        )}
                                        % Off
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="luxury-divider !mx-0 mb-6" />

                        {/* Description */}
                        <p className="text-sm text-luxury-cream/50 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div>
                                <p className="text-[10px] tracking-wider uppercase text-luxury-cream/30 mb-1">
                                    Material
                                </p>
                                <p className="text-sm text-luxury-cream/60">
                                    {product.material}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] tracking-wider uppercase text-luxury-cream/30 mb-1">
                                    Weight
                                </p>
                                <p className="text-sm text-luxury-cream/60">
                                    {product.weight}
                                </p>
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex items-center gap-4 mb-6">
                            {/* Quantity */}
                            <div className="flex items-center border border-gold-500/20 rounded-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 text-luxury-cream/40 hover:text-gold-500 transition-colors"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="px-4 py-3 text-sm text-luxury-cream min-w-[48px] text-center border-x border-gold-500/20">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 text-luxury-cream/40 hover:text-gold-500 transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 btn-luxury-filled flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={16} />
                                <span>Add to Cart</span>
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold-500/10">
                            <div className="flex items-center gap-2">
                                <Truck size={16} className="text-gold-500/40" />
                                <span className="text-[10px] text-luxury-cream/30 tracking-wider">
                                    Free Shipping
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield size={16} className="text-gold-500/40" />
                                <span className="text-[10px] text-luxury-cream/30 tracking-wider">
                                    Certified
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RefreshCw size={16} className="text-gold-500/40" />
                                <span className="text-[10px] text-luxury-cream/30 tracking-wider">
                                    Easy Returns
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-24">
                        <div className="text-center mb-12">
                            <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-3">
                                You May Also Like
                            </span>
                            <h2
                                className="text-2xl md:text-3xl text-luxury-cream"
                                style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                            >
                                Related Pieces
                            </h2>
                            <div className="luxury-divider mt-4" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {related.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/shop/${p.slug}`}
                                    className="group"
                                >
                                    <div className="aspect-[3/4] bg-luxury-charcoal rounded-sm mb-3 relative overflow-hidden">
                                        <Image
                                            src={p.images[0]}
                                            alt={p.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent" />
                                        <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/15 transition-colors duration-500 rounded-sm" />
                                    </div>
                                    <p className="text-[9px] tracking-[0.2em] uppercase text-gold-500/40 mb-1">
                                        {p.category}
                                    </p>
                                    <h3
                                        className="text-sm text-luxury-cream group-hover:text-gold-500 transition-colors"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {p.name}
                                    </h3>
                                    <p className="text-sm text-gold-500/70 mt-1">
                                        {formatPrice(p.price)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
