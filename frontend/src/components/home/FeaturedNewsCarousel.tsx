import React from "react";
import { useEffect, useState } from "react";
import { newsApi, type NewsItem } from "../../lib/api/news";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowUpRight, Clock } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";



export function FeaturedNewsCarousel() {
    const [slides, setSlides] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadFeaturedNews = async () => {
        try {
        const data = await newsApi.getFeatured();
        setSlides(data);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    };

    loadFeaturedNews();
    }, []);
    if (loading) {
    return null;
    }
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <SectionHeader
        eyebrow="Featured"
        title="Top stories across the group"
        description="Highlights selected by the MSA Group communications team."
      />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={slides.length > 3}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{ 768: { slidesPerView: 1.6 }, 1100: { slidesPerView: 2.1 } }}
        className="!pb-12"
      >
        {slides.map((s, i) => {
        const gradients = [
            "from-blue-50 to-cyan-50",
            "from-emerald-50 to-teal-50",
            "from-orange-50 to-amber-50",
            "from-violet-50 to-fuchsia-50",
            "from-rose-50 to-pink-50",
        ];

        const tone = gradients[i % gradients.length];

        return (
            
                <SwiperSlide key={i}>
                    <article
                    className={`group relative h-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${tone} p-7 shadow-card transition hover:shadow-lift`}
                    >
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/80 backdrop-blur">
                        {s.tenantId?.name ?? "MSA Group"}
                        </span>
                        <span className="text-[11px] font-medium text-muted-foreground">News</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-[22px]">
                        {s.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                        {s.excerpt ?? "No excerpt available."}
                    </p>
                    <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4">
                        <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-[11px] font-semibold text-foreground">
                            {(s.authorId?.name ?? "Admin")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                        <div className="leading-tight">
                            <p className="text-[12px] font-medium text-foreground">{s.authorId?.name ?? "Admin"}</p>
                            <p className="text-[11px] text-muted-foreground">Editor</p>
                        </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>5 min read</span>
                        </div>
                    </div>
                    <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </article>
                </SwiperSlide>
                );
                })}
            </Swiper>
            </section>
        );
        }

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--info)]">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}