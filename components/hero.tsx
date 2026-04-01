"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.08] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">{t.hero.badge}</span>
            <ArrowRight className="h-3 w-3 text-primary" />
          </div>

          {/* Main Title - Linear style large text */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-wide leading-[1.2] text-balance">
            <span className="text-foreground tracking-wider">{t.hero.title1}</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-300 bg-clip-text text-transparent tracking-wider">
              {t.hero.title2}
            </span>
          </h1>

          {/* Subtitle - Clean and minimal */}
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Stats - Minimal inline style */}
          <div className="mt-16 flex items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-foreground">10K+</div>
              <div className="text-xs text-muted-foreground mt-1">{t.hero.stats.users}</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-foreground">99%</div>
              <div className="text-xs text-muted-foreground mt-1">{t.hero.stats.satisfaction}</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-foreground">24/7</div>
              <div className="text-xs text-muted-foreground mt-1">{t.hero.stats.service}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
