"use client"

import { Shield, Award, Users, TrendingUp } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const statIcons = [Award, TrendingUp, Shield, Users]

export function Team() {
  const { t } = useI18n()

  const stats = t.team.stats.map((stat, index) => ({
    ...stat,
    icon: statIcons[index],
  }))

  return (
    <section id="team" className="relative py-24 lg:py-32">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm text-primary font-medium mb-3">{t.team.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            {t.team.title}
            <br />
            <span className="text-muted-foreground">{t.team.subtitle}</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-border transition-colors"
              >
                <Icon className="h-5 w-5 text-primary mb-4" />
                <div className="text-2xl font-semibold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {t.team.highlights.map((item, index) => (
            <div
              key={item.title}
              className="relative p-6 rounded-xl bg-card/50 border border-border/50 hover:border-border transition-colors"
            >
              {/* Number */}
              <div className="text-5xl font-bold text-muted/30 mb-4">
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <h3 className="text-base font-medium text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        </div>
    </section>
  )
}
