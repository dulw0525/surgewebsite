"use client"

import { Mail, ArrowUpRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  const footerLinks = [
    {
      title: t.footer.links.product.title,
      links: [
        { label: t.footer.links.product.features, href: "#features" },
        { label: t.footer.links.product.subscription, href: "#subscription" },
        { label: t.footer.links.product.download, href: "#download" },
      ],
    },
    {
      title: t.footer.links.company.title,
      links: [
        { label: t.footer.links.company.about, href: "#team" },
        { label: t.footer.links.company.contact, href: "mailto:insurance@insbean.com" },
        { label: t.footer.links.company.careers, href: "#" },
      ],
    },
    {
      title: t.footer.links.support.title,
      links: [
        { label: t.footer.links.support.help, href: "#" },
        { label: t.footer.links.support.terms, href: "#" },
        { label: t.footer.links.support.privacy, href: "#" },
      ],
    },
  ]

  return (
    <footer id="download" className="relative border-t border-border/50">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Download Section */}
        <div className="py-16 lg:py-20 border-b border-border/50">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              {t.footer.downloadTitle}
            </h2>
            <p className="text-muted-foreground mb-10">
              {t.footer.downloadSubtitle}
            </p>

            {/* QR Codes */}
            <div className="flex items-center justify-center gap-8 sm:gap-12">
              <div className="flex flex-col items-center gap-3">
                <img src="/ios-qr.png" alt="iOS Download" className="w-[102px] h-[102px] rounded-xl border border-border" />
                <span className="text-sm text-muted-foreground font-medium">{t.footer.ios}</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img src="/android-qr.png" alt="Android Download" className="w-[102px] h-[102px] rounded-xl border border-border" />
                <span className="text-sm text-muted-foreground font-medium">{t.footer.android}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2">
              <a href="#" className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                  <span className="text-xs font-bold text-primary-foreground">{t.brand.shortName}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{t.brand.name}</span>
              </a>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                {t.footer.brandDesc}
              </p>
              <a 
                href="mailto:insurance@insbean.com" 
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                insurance@insbean.com
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-medium text-foreground uppercase tracking-wider mb-4">{group.title}</h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>&copy; 2014 {t.footer.copyright}</p>
            <p>{t.footer.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
