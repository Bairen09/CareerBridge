import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { TenantSlug } from "../types";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTenant } from "../contexts/TenantContext";
import { Logo } from "../components/shared/Logo";
import login1 from "../assets/login-1.jpg";
import login2 from "../assets/login-2.jpg";
import login3 from "../assets/login-3.jpg";
import "swiper/css";
import "swiper/css/effect-fade";



const SLIDES = [
  {
    image: login1,
    eyebrow: "Internal collaboration",
    headline: "Bring every team into one workplace",
    sub: "From London to Lisbon, MSA Group keeps every company aligned.",
  },
  {
    image: login2,
    eyebrow: "Group-wide communication",
    headline: "Reach every employee in minutes",
    sub: "Targeted announcements, town halls and policy updates — without the email blast.",
  },
  {
    image: login3,
    eyebrow: "Operational clarity",
    headline: "One source of truth across the group",
    sub: "Policies, people, events and documents — secured and audited end-to-end.",
  },
];

function LoginPage() {
  const { login } = useAuth();
  const { tenantSlug, setTenantSlug } = useTenant();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    tenantSlug,
    email: "",
    password: "",
    rememberMe: true,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      setTenantSlug(form.tenantSlug as TenantSlug);
      await login({
        tenantSlug: form.tenantSlug,
        email: form.email,
        password: form.password,
      });
      navigate({ to: "/" });
    } catch (err) {
      // Phase 1: backend may not be live yet — show a clear message.
      const message =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response
          ?.data?.message ??
        (err as Error)?.message ??
        "We couldn't sign you in. Check your details and try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_1fr]">
      {/* LEFT — carousel */}
      <aside className="relative hidden overflow-hidden lg:block">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {SLIDES.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full w-full">
                <img
                  src={s.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  width={1280}
                  height={1600}
                />
                <div className="absolute inset-0 bg-[var(--brand-ink)]/55" />
                <div className="absolute inset-0 flex flex-col justify-between p-10 text-primary-foreground">
                  <Logo variant="default" className="[&_span]:!text-primary-foreground" />
                  <div className="max-w-md">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
                      {s.eyebrow}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">
                      {s.headline}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-primary-foreground/85">
                      {s.sub}
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-[12px] text-primary-foreground/75">
                      <ShieldCheck className="h-4 w-4" />
                      MSA Group · SSO · SOC 2 Type II · ISO 27001
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </aside>

      {/* RIGHT — login form */}
      <main className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--info)]">
              MSA Group Workplace
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Sign in to your workspace
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Use your company credentials to access internal news, people and events.
            </p>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <Field label="Company workspace">
                <select
                  value={form.tenantSlug}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      tenantSlug: e.target.value as TenantSlug,
                    }))
                  }
                  className="h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  <option value="msa-group">MSA Group</option>
                  <option value="rush-people">Rush People</option>
                  <option value="mana-services">Mana Services</option>
                  <option value="miya-services">Miya Services</option>
                </select>
              </Field>

              <Field label="Work email">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@msagroup.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                </div>
              </Field>

              <Field label="Password">
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-surface hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-[13px] text-foreground">
                  <input
                    type="checkbox"
                    checked={form.rememberMe}
                    onChange={(e) => setForm((f) => ({ ...f, rememberMe: e.target.checked }))}
                    className="h-4 w-4 rounded border-border text-[var(--brand-ink)] focus:ring-ring/30"
                  />
                  Keep me signed in
                </label>
                <button
                  type="button"
                  className="text-[13px] font-medium text-[var(--info)] transition hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="rounded-lg border border-[oklch(0.88_0.06_27)] bg-[oklch(0.97_0.02_27)] px-3 py-2 text-[13px] text-[oklch(0.4_0.12_27)]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand-ink)] text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? "Signing in…" : "Sign in"}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>

              <p className="pt-1 text-center text-[12px] text-muted-foreground">
                Trouble signing in? Contact your{" "}
                <span className="font-medium text-foreground">workspace administrator</span> or
                MSA Group IT support.
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              ← Back to homepage
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
export { LoginPage };