"use client";

import { testimonials } from "@/constants";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

const Testimonials = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// ----------------------------
			// Title animation
			// ----------------------------
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
			});

			// ----------------------------
			// Horizontal scroll
			// ----------------------------
			const track = trackRef.current;
			const container = containerRef.current;

			if (!track || !container) return;

			const getValues = () => {
				const containerWidth = container.offsetWidth;
				const card = track.querySelector(".testimonial-card") as HTMLElement;

				const cardWidth = card?.offsetWidth || 0;
				const totalScroll = track.scrollWidth - containerWidth;

				const startOffset = containerWidth / 2 - cardWidth / 2;
				const endOffset = totalScroll + startOffset;

				const travel = startOffset + endOffset - cardWidth;

				return { startOffset, endOffset, travel };
			};

			gsap.fromTo(
				track,
				{
					x: () => getValues().startOffset,
				},
				{
					x: () => -getValues().endOffset,
					ease: "none",
					scrollTrigger: {
						trigger: container,
						start: "top top",
						end: () => `+=${getValues().travel}`,
						pin: true,
						scrub: 1,
						invalidateOnRefresh: true,
						anticipatePin: 1,
					},
				}
			);

			return () => {
				split.revert();
			};
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={sectionRef} id="testimonials" className="relative">
			{/* Title Section */}
			<div
				id="testimonials-title-container"
				className="relative h-screen flex-center flex-col gap-6"
			>
				<div
					id="quote-mark"
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold leading-none text-green-500/5 select-none pointer-events-none"
				>
					"
				</div>
				<p className="text-green-500/60 uppercase tracking-[8px] text-sm font-medium">
					Kind Words
				</p>
				<h2
					id="testimonials-text"
					className="text-5xl md:text-7xl uppercase tracking-[15px]"
				>
					Testimonials
				</h2>
			</div>

			<div
				ref={containerRef}
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

					{/* <div className="testimonial-card flex-shrink-0 w-[320px] md:w-[400px] flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-dashed border-green-500/30 text-center">
						<div className="text-4xl">✦</div>

						<p className="text-xl font-bold uppercase tracking-wider text-green-950/50">
							Work with me
						</p>

						<p className="text-sm text-green-950/40">
							Let's build something great together.
						</p>
						<Link
							href="#contact"
							className="mt-2 px-6 py-2 rounded-full border border-green-500 text-green-700 text-sm font-medium hover:bg-green-500 hover:text-white transition-all duration-300"
						>
							Get in touch
						</Link>
					</div> */}
				</div>

				{/* <div className="pointer-events-none absolute inset-y- left-0 w-20 bg-gradient-to-r from-white to-transparent -z-1" /> */}
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
				rotate: index % 2 === 0 ? "0.5deg" : "-0.5deg",
			}}
		>
			<div
				className="text-3xl font-black leading-none"
				style={{ color: testimonial.color }}
			>
				"
			</div>

			<p className="text-green-950/70 text-sm leading-relaxed flex-1">
				{testimonial.text}
			</p>

			<div className="flex items-center gap-3 pt-4 border-t border-green-500/10">
				<div
					className="size-10 rounded-full flex-center text-white text-xs font-bold flex-shrink-0"
					style={{ backgroundColor: testimonial.color }}
				>
					{testimonial.avatar}
				</div>

				<div>
					<p className="font-bold text-green-950 text-sm">
						{testimonial.name}
					</p>
					<p className="text-green-950/50 text-xs">
						{testimonial.role}
					</p>
				</div>

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