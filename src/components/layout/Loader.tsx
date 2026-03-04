"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Fade out loader
                    gsap.to(loaderRef.current, {
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.inOut",
                        onComplete: () => setIsLoading(false),
                    });
                },
            });

            // Ring animation
            if (ringRef.current) {
                tl.fromTo(
                    ringRef.current,
                    {
                        scale: 0,
                        rotation: -180,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        rotation: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                    }
                );

                // Ring glow pulse
                tl.to(
                    ringRef.current,
                    {
                        boxShadow:
                            "0 0 40px rgba(212, 175, 55, 0.4), 0 0 80px rgba(212, 175, 55, 0.1), inset 0 0 30px rgba(212, 175, 55, 0.1)",
                        duration: 0.6,
                        ease: "power2.inOut",
                    },
                    "-=0.3"
                );
            }

            // Text reveal
            if (textRef.current) {
                tl.fromTo(
                    textRef.current,
                    { opacity: 0, y: 20, letterSpacing: "0.1em" },
                    {
                        opacity: 1,
                        y: 0,
                        letterSpacing: "0.4em",
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );
            }

            // Subtext
            if (subtextRef.current) {
                tl.fromTo(
                    subtextRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                );
            }

            // Hold for a moment
            tl.to({}, { duration: 0.3 });
        });

        return () => ctx.revert();
    }, []);

    if (!isLoading) return null;

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center"
        >
            {/* Ring */}
            <div
                ref={ringRef}
                className="w-20 h-20 rounded-full border-2 border-gold-500 opacity-0 mb-8"
                style={{
                    boxShadow:
                        "0 0 20px rgba(212, 175, 55, 0.2), inset 0 0 15px rgba(212, 175, 55, 0.05)",
                }}
            >
                {/* Inner diamond accent */}
                <div className="w-full h-full rounded-full flex items-center justify-center">
                    <div
                        className="w-2 h-2 bg-gold-500 rotate-45"
                        style={{
                            boxShadow: "0 0 10px rgba(212, 175, 55, 0.6)",
                        }}
                    />
                </div>
            </div>

            {/* Brand Name */}
            <div
                ref={textRef}
                className="text-2xl text-gold-500 opacity-0"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                KIVYAA
            </div>

            {/* Subtitle */}
            <div
                ref={subtextRef}
                className="text-[9px] tracking-[0.6em] text-gold-500/40 uppercase mt-1 opacity-0"
            >
                Jewels
            </div>

            {/* Loading bar */}
            <div className="w-16 h-[1px] bg-gold-500/10 mt-8 overflow-hidden rounded-full">
                <div className="h-full bg-gold-500/60 shimmer rounded-full" />
            </div>
        </div>
    );
}
