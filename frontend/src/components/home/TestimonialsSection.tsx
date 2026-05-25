import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";
import avatar1 from "../../assets/avatar-1.jpg";
import avatar2 from "../../assets/avatar-2.jpg";
import avatar3 from "../../assets/avatar-3.jpg";
import avatar4 from "../../assets/avatar-4.jpg";
import { SectionHeader } from "./FeaturedNewsCarousel";
import "swiper/css";

const EMPLOYEE_QUOTES = [
  {
    quote:
      "Everything from policies to event RSVPs lives in one place — I haven&apos;t opened an email about HR in months.",
    name: "Elena Marchetti",
    role: "Senior Brand Designer",
    tenant: "MSA Group",
    avatar: avatar1,
  },
  {
    quote:
      "Our team uses the announcements ticker every morning. It makes the whole group feel close, even from a different country.",
    name: "James Holloway",
    role: "Engineering Manager",
    tenant: "Rush People",
    avatar: avatar2,
  },
  {
    quote:
      "When I joined Miya Services, the onboarding hub had everything I needed — laptop, policies, my buddy, and the right Slack channels.",
    name: "Daniel Mensah",
    role: "Operations Lead",
    tenant: "Miya Services",
    avatar: avatar4,
  },
  {
    quote:
      "Posting a company update used to take days of approval. Now it&apos;s minutes — with full audit trail.",
    name: "Priya Raman",
    role: "Chief Operating Officer",
    tenant: "Mana Services",
    avatar: avatar3,
  },
];

const HR_QUOTES = [
  {
    quote:
      "Operating four brands from one workplace gave us back the visibility we&apos;d been missing for years.",
    name: "Hannah Whitfield",
    role: "Group CEO",
    tenant: "MSA Group",
    avatar: avatar1,
  },
  {
    quote:
      "Compliance acknowledgements, policy refreshes, performance cycles — everything runs through one source of truth now.",
    name: "Karim Othmani",
    role: "Head of People",
    tenant: "Rush People",
    avatar: avatar2,
  },
  {
    quote:
      "Our employee engagement scores are up 18 points since we moved internal comms here.",
    name: "Priya Raman",
    role: "Chief Operating Officer",
    tenant: "Mana Services",
    avatar: avatar3,
  },
];

function QuoteCard({
  q,
}: {
  q: { quote: string; name: string; role: string; tenant: string; avatar: string };
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <Quote className="h-5 w-5 text-[var(--info)]" />
      <p
        className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90"
        dangerouslySetInnerHTML={{ __html: q.quote }}
      />
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <img
          src={q.avatar}
          alt=""
          loading="lazy"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
        />
        <div className="flex-1 leading-tight">
          <p className="text-[13px] font-semibold text-foreground">{q.name}</p>
          <p className="text-[11px] text-muted-foreground">
            {q.role} · {q.tenant}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <section className="mt-24 border-y border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
        <SectionHeader
          eyebrow="Voices"
          title="What colleagues say"
          description="From the people who use the MSA Group workplace every day."
        />
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.05}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{ 640: { slidesPerView: 1.6 }, 900: { slidesPerView: 2.2 }, 1200: { slidesPerView: 3 } }}
        >
          {EMPLOYEE_QUOTES.map((q, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <QuoteCard q={q} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-14">
          <SectionHeader eyebrow="Leadership" title="From the people leading the group" />
          <div className="grid gap-4 lg:grid-cols-3">
            {HR_QUOTES.map((q) => (
              <QuoteCard key={q.name} q={q} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}