"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 1.8 });

            // Background overlay fade
            if (overlayRef.current) {
                tl.fromTo(
                    overlayRef.current,
                    { opacity: 1 },
                    { opacity: 0.4, duration: 1.5, ease: "power2.out" }
                );
            }

            // Hero image gentle reveal (no zoom)
            if (imageRef.current) {
                tl.fromTo(
                    imageRef.current,
                    { scale: 1.05, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" },
                    "-=1.2"
                );
            }

            // Heading reveal - word by word
            if (headingRef.current) {
                const words = headingRef.current.querySelectorAll(".word");
                tl.fromTo(
                    words,
                    { y: 100, opacity: 0, rotateX: -40 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 1,
                        stagger: 0.12,
                        ease: "power3.out",
                    },
                    "-=1.5"
                );
            }

            // Subtitle
            if (subtitleRef.current) {
                tl.fromTo(
                    subtitleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.5"
                );
            }

            // CTA
            if (ctaRef.current) {
                tl.fromTo(
                    ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
                    "-=0.3"
                );
            }

            // Scroll indicator
            if (scrollIndicatorRef.current) {
                tl.fromTo(
                    scrollIndicatorRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5, ease: "power2.out" },
                    "-=0.1"
                );

                // Bounce animation
                gsap.to(scrollIndicatorRef.current, {
                    y: 10,
                    duration: 1.5,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: 4,
                });
            }

            // Floating particles
            if (particlesRef.current) {
                const particles = particlesRef.current.children;
                Array.from(particles).forEach((particle, i) => {
                    gsap.set(particle, {
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: Math.random() * 0.3 + 0.1,
                    });

                    gsap.to(particle, {
                        y: `-=${100 + Math.random() * 200}`,
                        x: `+=${(Math.random() - 0.5) * 100}`,
                        opacity: 0,
                        duration: 4 + Math.random() * 4,
                        repeat: -1,
                        delay: i * 0.5,
                        ease: "none",
                        onRepeat: function () {
                            gsap.set(particle, {
                                y: window.innerHeight + 20,
                                x: Math.random() * window.innerWidth,
                                opacity: Math.random() * 0.3 + 0.1,
                            });
                        },
                    });
                });
            }

            // Subtle parallax on scroll (no zoom)
            if (imageRef.current) {
                gsap.to(imageRef.current, {
                    y: 60,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }

            if (headingRef.current) {
                gsap.to(headingRef.current, {
                    y: 50,
                    opacity: 0.3,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headingWords = ["Timeless", "Elegance,", "Crafted", "for", "You"];

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-dark to-luxury-black" />

            {/* Hero background image */}
            <div
                ref={imageRef}
                className="absolute inset-0 opacity-0"
            >
                <Image
                    src="/images/hero/hero-bg.png"
                    alt="Luxury jewellery"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-luxury-black/30 to-luxury-black/80" />
            </div>

            {/* Dark overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-luxury-black"
            />

            {/* Floating gold particles */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-gold-500/40"
                        style={{
                            filter: "blur(0.5px)",
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Decorative line */}
                <div className="luxury-divider mb-8 opacity-60" />

                {/* Heading */}
                <h1
                    ref={headingRef}
                    className="text-4xl md:text-6xl lg:text-8xl mb-6"
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 300,
                        perspective: "1000px",
                    }}
                >
                    {headingWords.map((word, i) => (
                        <span
                            key={i}
                            className="word inline-block mr-[0.25em] text-luxury-cream"
                            style={{
                                transformOrigin: "center bottom",
                            }}
                        >
                            {word === "Elegance," ? (
                                <span className="text-gradient-gold">{word}</span>
                            ) : (
                                word
                            )}
                        </span>
                    ))}
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-sm md:text-base text-luxury-cream/50 tracking-[0.15em] max-w-lg mx-auto mb-10 opacity-0"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    Exquisite jewellery combining timeless elegance with contemporary
                    design. Each piece tells your unique story.
                </p>

                {/* CTA */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
                    <Link href="/shop" className="btn-luxury btn-luxury-filled">
                        <span>Explore Collection</span>
                    </Link>
                    <Link href="/about" className="btn-luxury">
                        <span>Our Story</span>
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
            >
                <span className="text-[10px] tracking-[0.4em] text-gold-500/40 uppercase">
                    Scroll
                </span>
                <ArrowDown size={16} className="text-gold-500/40" strokeWidth={1} />
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black to-transparent" />
        </section>
    );
}
