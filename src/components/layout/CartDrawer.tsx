"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore, type CartItem } from "@/stores/cart-store";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, total } =
        useCartStore();
    const drawerRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);
    const cartTotal = total();

    useEffect(() => {
        if (!drawerRef.current || !backdropRef.current) return;

        if (isOpen) {
            // Prevent body scroll
            document.body.style.overflow = "hidden";

            // Animate in
            gsap.to(backdropRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
            });
            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.5,
                ease: "power3.out",
            });

            // Stagger items
            if (itemsRef.current) {
                gsap.fromTo(
                    itemsRef.current.children,
                    { opacity: 0, x: 30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        stagger: 0.08,
                        ease: "power3.out",
                        delay: 0.3,
                    }
                );
            }
        } else {
            gsap.to(drawerRef.current, {
                x: "100%",
                duration: 0.4,
                ease: "power3.in",
            });
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    document.body.style.overflow = "";
                },
            });
        }
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] opacity-0 ${isOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                onClick={closeCart}
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 w-full max-w-md h-full bg-luxury-dark border-l border-gold-500/10 z-[70] transform translate-x-full flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gold-500/10">
                    <div className="flex items-center gap-3">
                        <ShoppingBag size={18} className="text-gold-500" />
                        <h2
                            className="text-lg tracking-[0.15em] text-luxury-cream"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Your Cart
                        </h2>
                        <span className="text-xs text-luxury-cream/40">
                            ({items.length} {items.length === 1 ? "item" : "items"})
                        </span>
                    </div>
                    <button
                        onClick={closeCart}
                        className="text-luxury-cream/50 hover:text-gold-500 transition-colors duration-300"
                        aria-label="Close cart"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Items */}
                <div ref={itemsRef} className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <ShoppingBag
                                size={48}
                                className="text-luxury-cream/10"
                                strokeWidth={1}
                            />
                            <p className="text-luxury-cream/30 text-sm tracking-wider">
                                Your cart is empty
                            </p>
                            <button
                                onClick={closeCart}
                                className="btn-luxury text-xs mt-4"
                            >
                                <span>Continue Shopping</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onRemove={() => removeItem(item.id)}
                                    onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-6 py-5 border-t border-gold-500/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-luxury-cream/60 tracking-wider uppercase">
                                Subtotal
                            </span>
                            <span
                                className="text-lg text-gold-500"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {formatPrice(cartTotal)}
                            </span>
                        </div>
                        <p className="text-[11px] text-luxury-cream/30">
                            Shipping & taxes calculated at checkout
                        </p>
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="btn-luxury-filled w-full text-center block"
                        >
                            <span>Proceed to Checkout</span>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

function CartItemCard({
    item,
    onRemove,
    onUpdateQuantity,
}: {
    item: CartItem;
    onRemove: () => void;
    onUpdateQuantity: (qty: number) => void;
}) {
    return (
        <div className="flex gap-4 py-4 border-b border-gold-500/5">
            {/* Image */}
            <div className="w-20 h-20 bg-luxury-charcoal rounded-sm overflow-hidden shrink-0 relative">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <Link
                    href={`/shop/${item.slug}`}
                    className="text-sm text-luxury-cream/80 hover:text-gold-500 transition-colors duration-300 line-clamp-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {item.name}
                </Link>
                <p className="text-sm text-gold-500/80 mt-1">
                    {formatPrice(item.price)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gold-500/10 rounded-sm">
                        <button
                            onClick={() => onUpdateQuantity(item.quantity - 1)}
                            className="p-1.5 text-luxury-cream/40 hover:text-gold-500 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs text-luxury-cream/70 min-w-[28px] text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.quantity + 1)}
                            className="p-1.5 text-luxury-cream/40 hover:text-gold-500 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus size={12} />
                        </button>
                    </div>

                    <button
                        onClick={onRemove}
                        className="text-luxury-cream/20 hover:text-red-400 transition-colors duration-300"
                        aria-label="Remove item"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
