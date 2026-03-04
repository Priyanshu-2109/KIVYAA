"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { products, categories, formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/stores/cart-store";
import { SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export default function ShopPage() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");
    const featuredParam = searchParams.get("featured");

    const [activeCategory, setActiveCategory] = useState<string>(
        categoryParam || "all"
    );
    const [sortBy, setSortBy] = useState<SortOption>("featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        if (activeCategory !== "all") {
            filtered = filtered.filter((p) => p.categorySlug === activeCategory);
        }

        if (featuredParam) {
            filtered = filtered.filter((p) => p.featured);
        }

        switch (sortBy) {
            case "price-asc":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case "featured":
            default:
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        return filtered;
    }, [activeCategory, sortBy, featuredParam]);

    // Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        delay: 0.3,
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    // Re-animate grid when filter changes
    useEffect(() => {
        if (gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                }
            );
        }
    }, [activeCategory, sortBy]);

    return (
        <div className="min-h-screen pt-24 md:pt-32">
            {/* Page Header */}
            <div ref={headerRef} className="luxury-container mb-12">
                <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-3">
                    Our Collection
                </span>
                <h1
                    className="text-4xl md:text-5xl lg:text-6xl text-luxury-cream mb-4"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                >
                    Shop <span className="text-gradient-gold">Jewellery</span>
                </h1>
                <div className="luxury-divider !mx-0 mt-4" />
            </div>

            {/* Filters Bar */}
            <div className="luxury-container mb-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gold-500/10">
                    {/* Category Filters */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase border rounded-sm transition-all duration-300 ${activeCategory === "all"
                                ? "border-gold-500 text-gold-500 bg-gold-500/5"
                                : "border-gold-500/10 text-luxury-cream/40 hover:border-gold-500/30 hover:text-luxury-cream/70"
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.slug)}
                                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase border rounded-sm transition-all duration-300 ${activeCategory === cat.slug
                                    ? "border-gold-500 text-gold-500 bg-gold-500/5"
                                    : "border-gold-500/10 text-luxury-cream/40 hover:border-gold-500/30 hover:text-luxury-cream/70"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Sort & View */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal
                                size={14}
                                className="text-luxury-cream/30"
                            />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="bg-transparent border border-gold-500/10 text-luxury-cream/60 text-[10px] tracking-wider uppercase px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500/30 cursor-pointer"
                            >
                                <option value="featured" className="bg-luxury-dark">
                                    Featured
                                </option>
                                <option value="newest" className="bg-luxury-dark">
                                    Newest
                                </option>
                                <option value="price-asc" className="bg-luxury-dark">
                                    Price: Low → High
                                </option>
                                <option value="price-desc" className="bg-luxury-dark">
                                    Price: High → Low
                                </option>
                            </select>
                        </div>

                        <div className="hidden md:flex items-center gap-1 border border-gold-500/10 rounded-sm">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 transition-colors ${viewMode === "grid"
                                    ? "text-gold-500"
                                    : "text-luxury-cream/30"
                                    }`}
                            >
                                <Grid3X3 size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 transition-colors ${viewMode === "list"
                                    ? "text-gold-500"
                                    : "text-luxury-cream/30"
                                    }`}
                            >
                                <LayoutList size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <p className="text-[10px] text-luxury-cream/30 tracking-wider mt-4">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "piece" : "pieces"} found
                </p>
            </div>

            {/* Product Grid */}
            <div className="luxury-container pb-24">
                <div
                    ref={gridRef}
                    className={`grid gap-6 ${viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                        }`}
                >
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            viewMode={viewMode}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProductCard({
    product,
    viewMode,
}: {
    product: Product;
    viewMode: "grid" | "list";
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const { addItem, openCart } = useCartStore();

    useEffect(() => {
        const card = cardRef.current;
        const shine = shineRef.current;
        if (!card || !shine) return;

        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
            .to(card, { y: -6, duration: 0.4, ease: "power2.out" })
            .fromTo(
                shine,
                { x: "-100%" },
                { x: "100%", duration: 0.6, ease: "power2.inOut" },
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

    if (viewMode === "list") {
        return (
            <div
                ref={cardRef}
                className="group flex gap-6 p-4 border border-gold-500/5 rounded-sm hover:border-gold-500/15 transition-all duration-300"
            >
                {/* Image */}
                <Link
                    href={`/shop/${product.slug}`}
                    className="w-32 h-32 bg-luxury-charcoal rounded-sm overflow-hidden shrink-0 relative"
                >
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                    />
                    <div
                        ref={shineRef}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(120deg, transparent 30%, rgba(212,175,55,0.1) 45%, rgba(212,175,55,0.2) 50%, rgba(212,175,55,0.1) 55%, transparent 70%)",
                            transform: "translateX(-100%)",
                        }}
                    />
                </Link>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gold-500/50 mb-1">
                        {product.category}
                    </p>
                    <Link href={`/shop/${product.slug}`}>
                        <h3
                            className="text-lg text-luxury-cream group-hover:text-gold-500 transition-colors duration-300 mb-1"
                            style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
                        >
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-xs text-luxury-cream/30 line-clamp-2 mb-2">
                        {product.description}
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gold-500">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-luxury-cream/30 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                        <button
                            onClick={handleAddToCart}
                            className="ml-auto btn-luxury text-[9px] px-4 py-2"
                        >
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={cardRef} className="group">
            <Link href={`/shop/${product.slug}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-luxury-charcoal rounded-sm overflow-hidden mb-4">
                    {/* Product Image */}
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 via-transparent to-luxury-black/10 z-10" />

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
                    <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                        {product.isNew && (
                            <span className="text-[8px] tracking-[0.2em] uppercase bg-gold-500 text-luxury-black px-2.5 py-0.5">
                                New
                            </span>
                        )}
                        {product.originalPrice && (
                            <span className="text-[8px] tracking-[0.2em] uppercase bg-luxury-cream/10 text-luxury-cream px-2.5 py-0.5">
                                Sale
                            </span>
                        )}
                    </div>

                    {/* Quick Add */}
                    <div className="absolute bottom-3 left-3 right-3 z-20 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <button
                            onClick={handleAddToCart}
                            className="w-full btn-luxury-filled text-[9px] py-2.5"
                        >
                            <span>Add to Cart</span>
                        </button>
                    </div>

                    {/* Border */}
                    <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/15 transition-colors duration-500 z-25 rounded-sm" />
                </div>

                {/* Product Info */}
                <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-gold-500/40 mb-1">
                        {product.category}
                    </p>
                    <h3
                        className="text-sm text-luxury-cream group-hover:text-gold-500 transition-colors duration-300 mb-1"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
                    >
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gold-500/80">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-luxury-cream/25 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
