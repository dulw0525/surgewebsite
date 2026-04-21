"use client"

import { Check, Sparkles, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const planIcons = [Sparkles, Zap, Crown]

export function Subscription() {
  const { t } = useI18n()

  const plans = t.subscription.plans.map((plan, index) => ({
    ...plan,
    icon: planIcons[index],
    highlighted: index === 1,
    isEnterprise: index === 2,
  }))

  return (
    <section id="subscription" className="relative py-24 lg:py-32">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm text-primary font-medium mb-3">{t.subscription.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {t.subscription.title}
          </h2>
          <p className="text-muted-foreground">
            {t.subscription.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.name}
                className={`relative rounded-xl border transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-card border-primary/50"
                    : "bg-card/50 border-border/50 hover:border-border"
                }`}
              >
                {/* Highlighted badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {t.subscription.recommended}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      plan.highlighted ? "bg-primary/20" : "bg-muted"
                    }`}>
                      <Icon className={`h-4 w-4 ${plan.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{plan.name}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl font-semibold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                  {/* CTA */}
                  {plan.isEnterprise ? (
                    <a href="#contact" className="block w-full mb-6">
                      <Button
                        className="w-full bg-muted hover:bg-muted/80 text-foreground"
                      >
                        {plan.cta}
                      </Button>
                    </a>
                  ) : plan.price === 'Free' || plan.price === '免费' || plan.price === '免費' ? (
                    <a href="#download" className="block w-full mb-6">
                      <Button
                        className={`w-full mb-6 ${
                          plan.highlighted
                            ? "bg-foreground hover:bg-foreground/90 text-background"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </a>
                  ) : (
                    <Button
                      className={`w-full mb-6 ${
                        plan.highlighted
                          ? "bg-foreground hover:bg-foreground/90 text-background"
                          : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  )}

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Payment note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            {t.subscription.paymentNote}
          </p>
        </div>
      </div>
    </section>
  )
}
