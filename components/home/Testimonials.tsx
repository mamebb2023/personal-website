"use client";

import { testimonials } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Testimonials = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title blur-in animation (matching Projects style)
            const split = new SplitText("#testimonials-text", { type: "chars" });

            gsap.set(split.chars, {
                filter: "blur(10px)",
                scale: 1.5,
                opacity: 0,
                willChange: "filter, opacity, transform",
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: "#testimonials-title-container",
                    start: "top top",
                    end: "bottom center",
                    pin: true,
                    scrub: true,
                },
            }).to(split.chars, {
                filter: "blur(0px)",
                scale: 1,
                opacity: 1,
                stagger: 0.05,
                ease: "none",
                duration: 0.5,
            });

            // Horizontal scroll for the cards track
            const track = trackRef.current;
            if (!track) return;

            const totalScroll = track.scrollWidth - track.offsetWidth;

            gsap.to(track, {
                x: -totalScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: "#testimonials-scroll-container",
                    start: "top top",
                    end: () => `+=${totalScroll + window.innerWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });

            // Staggered card fade-in on scroll
            gsap.from(".testimonial-card", {
                opacity: 0,
                y: 40,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#testimonials-scroll-container",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Decorative quote mark
            gsap.from("#quote-mark", {
                opacity: 0,
                scale: 0.5,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: "#testimonials-title-container",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            return () => {
                split.revert();
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} id="testimonials" className="relative bg-white">
            {/* Title section — pinned while chars animate in */}
            <div
                id="testimonials-title-container"
                className="relative h-screen flex-center flex-col gap-6"
            >
                {/* Decorative giant quote mark */}
                <div
                    id="quote-mark"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold leading-none text-green-500/5 select-none pointer-events-none"
                    aria-hidden="true"
                >
                    "
                </div>

                {/* Decorative blobs */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-emerald-400/15 via-green-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-teal-400/10 via-green-400/5 to-transparent rounded-full blur-2xl pointer-events-none" />

                <p className="text-green-500/60 uppercase tracking-[8px] text-sm font-medium">
                    Kind Words
                </p>
                <h2
                    id="testimonials-text"
                    className="text-7xl uppercase tracking-[15px]"
                >
                    Testimonials
                </h2>
            </div>

            {/* Horizontal scrolling cards */}
            <div
                id="testimonials-scroll-container"
                className="relative h-screen overflow-hidden flex items-center"
            >
                <div
                    ref={trackRef}
                    className="flex gap-6 px-20 will-change-transform"
                    style={{ width: "max-content" }}
                >
                    {testimonials.map((t, index) => (
                        <TestimonialCard key={index} testimonial={t} index={index} />
                    ))}

                    {/* End of track spacer with a subtle CTA */}
                    <div className="testimonial-card flex-shrink-0 w-[320px] md:w-[400px] flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-dashed border-green-500/30 text-center">
                        <div className="text-4xl">✦</div>
                        <p className="text-xl font-bold uppercase tracking-wider text-green-950/50">
                            Work with me
                        </p>
                        <p className="text-sm text-green-950/40">
                            Let&apos;s build something great together.
                        </p>
                        <a
                            href="#contact"
                            className="mt-2 px-6 py-2 rounded-full border border-green-500 text-green-700 text-sm font-medium hover:bg-green-500 hover:text-white transition-all duration-300"
                        >
                            Get in touch
                        </a>
                    </div>
                </div>

                {/* Gradient fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
            </div>
        </div>
    );
};

const TestimonialCard = ({
    testimonial,
    index,
}: {
    testimonial: (typeof testimonials)[0];
    index: number;
}) => {
    return (
        <div
            className="testimonial-card flex-shrink-0 w-[320px] md:w-[400px] bg-white rounded-2xl p-8 flex flex-col gap-6 border border-green-500/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            style={{
                // Subtle per-card tilt to make the layout feel alive
                transform: `rotate(${index % 2 === 0 ? "0.5deg" : "-0.5deg"})`,
            }}
        >
            {/* Quote icon */}
            <div
                className="text-3xl font-black leading-none"
                style={{ color: testimonial.color }}
            >
                "
            </div>

            {/* Text */}
            <p className="text-green-950/70 text-sm leading-relaxed flex-1">
                {testimonial.text}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-green-500/10">
                {/* Avatar */}
                <div
                    className="size-10 rounded-full flex-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: testimonial.color }}
                >
                    {testimonial.avatar}
                </div>
                <div>
                    <p className="font-bold text-green-950 text-sm">{testimonial.name}</p>
                    <p className="text-green-950/50 text-xs">{testimonial.role}</p>
                </div>

                {/* Star rating */}
                <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xs">
                            ★
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
