"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        name: "Priya Sharma",
        location: "Mumbai",
        text: "The Celestine ring is absolutely breathtaking. The craftsmanship is on another level — every detail is perfect. It's become my most prized possession.",
        rating: 5,
        product: "Celestine Diamond Ring",
    },
    {
        id: 2,
        name: "Ananya Patel",
        location: "Delhi",
        text: "I ordered the Aurelia necklace for my wedding anniversary and it exceeded all expectations. The packaging, the quality, the design — everything screams luxury.",
        rating: 5,
        product: "Aurelia Gold Necklace",
    },
    {
        id: 3,
        name: "Riya Mehta",
        location: "Bangalore",
        text: "Kivyaa Jewels understand what modern elegance means. The Seraphina earrings move so beautifully and catch the light in the most magical way.",
        rating: 5,
        product: "Seraphina Drop Earrings",
    },
    {
        id: 4,
        name: "Neha Gupta",
        location: "Pune",
        text: "I've been a loyal customer since they launched. Every piece I've purchased feels unique and personal. Their attention to detail is truly remarkable.",
        rating: 5,
        product: "Versailles Cuff Bracelet",
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const cardsRef = useRef<HTMLDivElement>(null);

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

            // Cards stagger
            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section-padding bg-luxury-dark relative overflow-hidden"
        >
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute top-1/4 right-0 w-96 h-96 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
                    }}
                />
            </div>

            <div className="luxury-container relative z-10">
                {/* Heading */}
                <div ref={headingRef} className="text-center mb-16">
                    <span className="text-[11px] tracking-[0.4em] uppercase text-gold-500/60 block mb-4">
                        Testimonials
                    </span>
                    <h2
                        className="text-3xl md:text-5xl text-luxury-cream mb-4"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                    >
                        What Our <span className="text-gradient-gold">Clients</span> Say
                    </h2>
                    <div className="luxury-divider mt-6" />
                </div>

                {/* Testimonials Grid */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`group p-8 rounded-sm border transition-all duration-500 ${index === activeIndex
                                    ? "border-gold-500/20 bg-luxury-charcoal/50"
                                    : "border-gold-500/5 bg-transparent hover:border-gold-500/10 hover:bg-luxury-charcoal/30"
                                }`}
                        >
                            {/* Quote icon */}
                            <Quote
                                size={24}
                                className={`mb-4 transition-colors duration-500 ${index === activeIndex
                                        ? "text-gold-500/40"
                                        : "text-gold-500/10"
                                    }`}
                                strokeWidth={1}
                            />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={12}
                                        className="text-gold-500 fill-gold-500"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-sm text-luxury-cream/60 leading-relaxed mb-6 italic">
                                &ldquo;{testimonial.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className="text-luxury-cream/80 text-sm"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {testimonial.name}
                                    </p>
                                    <p className="text-[10px] text-luxury-cream/30 tracking-wider">
                                        {testimonial.location}
                                    </p>
                                </div>
                                <p className="text-[10px] tracking-[0.1em] text-gold-500/40 uppercase">
                                    {testimonial.product}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-10">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? "bg-gold-500 w-6"
                                    : "bg-gold-500/20 hover:bg-gold-500/40"
                                }`}
                            aria-label={`View testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
