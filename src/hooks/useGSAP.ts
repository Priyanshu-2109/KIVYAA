"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ===== REVEAL ANIMATION =====
// Fade + slide up reveal when element enters viewport
interface RevealOptions {
    y?: number;
    x?: number;
    duration?: number;
    delay?: number;
    start?: string;
    stagger?: number;
    once?: boolean;
}

export function useGSAPReveal<T extends HTMLElement>(
    options: RevealOptions = {}
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const {
        y = 60,
        x = 0,
        duration = 1,
        delay = 0,
        start = "top 85%",
        stagger = 0,
        once = true,
    } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const targets = stagger > 0 ? element.children : element;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                targets,
                {
                    opacity: 0,
                    y,
                    x,
                },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration,
                    delay,
                    stagger: stagger > 0 ? stagger : undefined,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start,
                        toggleActions: once
                            ? "play none none none"
                            : "play reverse play reverse",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [y, x, duration, delay, start, stagger, once]);

    return ref;
}

// ===== PARALLAX EFFECT =====
interface ParallaxOptions {
    speed?: number;
    direction?: "vertical" | "horizontal";
}

export function useParallax<T extends HTMLElement>(
    options: ParallaxOptions = {}
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const { speed = 50, direction = "vertical" } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            gsap.to(element, {
                [direction === "vertical" ? "y" : "x"]: -speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        });

        return () => ctx.revert();
    }, [speed, direction]);

    return ref;
}

// ===== HOVER ANIMATION =====
// Product card hover: lift + glow
export function useHoverAnimation<T extends HTMLElement>(): RefObject<T | null> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const tl = gsap.timeline({ paused: true });

        tl.to(element, {
            y: -8,
            scale: 1.02,
            boxShadow: "0 20px 60px rgba(212, 175, 55, 0.15)",
            duration: 0.4,
            ease: "power2.out",
        });

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();

        element.addEventListener("mouseenter", onEnter);
        element.addEventListener("mouseleave", onLeave);

        return () => {
            element.removeEventListener("mouseenter", onEnter);
            element.removeEventListener("mouseleave", onLeave);
            tl.kill();
        };
    }, []);

    return ref;
}

// ===== SHINE EFFECT =====
// Light reflection sweep across element
export function useShineEffect<T extends HTMLElement>(): RefObject<T | null> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Find or create shine overlay
        let shine = element.querySelector(".shine-overlay") as HTMLElement;
        if (!shine) {
            shine = document.createElement("div");
            shine.className = "shine-overlay";
            element.style.position = "relative";
            element.style.overflow = "hidden";
            element.appendChild(shine);
        }

        const tl = gsap.timeline({ paused: true });
        tl.fromTo(
            shine,
            { x: "-100%" },
            { x: "100%", duration: 0.8, ease: "power2.inOut" }
        );

        const onEnter = () => {
            tl.restart();
        };

        element.addEventListener("mouseenter", onEnter);

        return () => {
            element.removeEventListener("mouseenter", onEnter);
            tl.kill();
        };
    }, []);

    return ref;
}

// ===== TEXT REVEAL =====
// Animate text lines one by one on scroll
interface TextRevealOptions {
    duration?: number;
    stagger?: number;
    start?: string;
}

export function useTextReveal<T extends HTMLElement>(
    options: TextRevealOptions = {}
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const { duration = 0.8, stagger = 0.1, start = "top 85%" } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Wrap each line in a span for animation
        const text = element.textContent || "";
        const words = text.split(" ");

        // Simple word-based animation
        element.innerHTML = words
            .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block" style="opacity:0; transform:translateY(100%)">${word}</span></span>`)
            .join(" ");

        const innerSpans = element.querySelectorAll(
            "span > span"
        );

        const ctx = gsap.context(() => {
            gsap.to(innerSpans, {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start,
                    toggleActions: "play none none none",
                },
            });
        });

        return () => ctx.revert();
    }, [duration, stagger, start]);

    return ref;
}

// ===== IMAGE REVEAL =====
// Mask reveal animation for images
interface ImageRevealOptions {
    direction?: "left" | "right" | "top" | "bottom";
    duration?: number;
    start?: string;
}

export function useImageReveal<T extends HTMLElement>(
    options: ImageRevealOptions = {}
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const { direction = "left", duration = 1.2, start = "top 80%" } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const clipPaths: Record<string, { from: string; to: string }> = {
            left: {
                from: "inset(0 100% 0 0)",
                to: "inset(0 0% 0 0)",
            },
            right: {
                from: "inset(0 0 0 100%)",
                to: "inset(0 0 0 0%)",
            },
            top: {
                from: "inset(0 0 100% 0)",
                to: "inset(0 0 0% 0)",
            },
            bottom: {
                from: "inset(100% 0 0 0)",
                to: "inset(0% 0 0 0)",
            },
        };

        const ctx = gsap.context(() => {
            gsap.fromTo(
                element,
                {
                    clipPath: clipPaths[direction].from,
                    scale: 1.1,
                },
                {
                    clipPath: clipPaths[direction].to,
                    scale: 1,
                    duration,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: element,
                        start,
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [direction, duration, start]);

    return ref;
}

// ===== STAGGER CHILDREN =====
// Animate children elements with stagger
interface StaggerOptions {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
}

export function useStaggerReveal<T extends HTMLElement>(
    options: StaggerOptions = {}
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const { y = 40, duration = 0.8, stagger = 0.15, start = "top 85%" } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const children = element.children;
        if (!children.length) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                children,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    stagger,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start,
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [y, duration, stagger, start]);

    return ref;
}
