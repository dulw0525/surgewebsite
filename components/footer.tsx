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
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-card border border-border p-3 hover:border-primary/50 transition-colors">
                  <div className="w-full h-full bg-foreground rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* QR Code Placeholder Pattern */}
                    <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                      <rect fill="white" width="100" height="100"/>
                      {/* QR code pattern simulation */}
                      <rect fill="black" x="10" y="10" width="25" height="25"/>
                      <rect fill="white" x="15" y="15" width="15" height="15"/>
                      <rect fill="black" x="18" y="18" width="9" height="9"/>
                      
                      <rect fill="black" x="65" y="10" width="25" height="25"/>
                      <rect fill="white" x="70" y="15" width="15" height="15"/>
                      <rect fill="black" x="73" y="18" width="9" height="9"/>
                      
                      <rect fill="black" x="10" y="65" width="25" height="25"/>
                      <rect fill="white" x="15" y="70" width="15" height="15"/>
                      <rect fill="black" x="18" y="73" width="9" height="9"/>
                      
                      {/* Data modules */}
                      <rect fill="black" x="40" y="10" width="5" height="5"/>
                      <rect fill="black" x="50" y="10" width="5" height="5"/>
                      <rect fill="black" x="40" y="20" width="5" height="5"/>
                      <rect fill="black" x="45" y="25" width="5" height="5"/>
                      <rect fill="black" x="55" y="20" width="5" height="5"/>
                      
                      <rect fill="black" x="10" y="40" width="5" height="5"/>
                      <rect fill="black" x="20" y="45" width="5" height="5"/>
                      <rect fill="black" x="10" y="50" width="5" height="5"/>
                      <rect fill="black" x="25" y="55" width="5" height="5"/>
                      
                      <rect fill="black" x="40" y="40" width="5" height="5"/>
                      <rect fill="black" x="50" y="45" width="5" height="5"/>
                      <rect fill="black" x="45" y="50" width="5" height="5"/>
                      <rect fill="black" x="55" y="55" width="5" height="5"/>
                      
                      <rect fill="black" x="65" y="40" width="5" height="5"/>
                      <rect fill="black" x="75" y="45" width="5" height="5"/>
                      <rect fill="black" x="85" y="50" width="5" height="5"/>
                      <rect fill="black" x="70" y="55" width="5" height="5"/>
                      
                      <rect fill="black" x="40" y="70" width="5" height="5"/>
                      <rect fill="black" x="50" y="75" width="5" height="5"/>
                      <rect fill="black" x="60" y="70" width="5" height="5"/>
                      <rect fill="black" x="55" y="80" width="5" height="5"/>
                      
                      <rect fill="black" x="70" y="70" width="5" height="5"/>
                      <rect fill="black" x="80" y="75" width="5" height="5"/>
                      <rect fill="black" x="75" y="85" width="5" height="5"/>
                      <rect fill="black" x="85" y="80" width="5" height="5"/>
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground font-medium">{t.footer.ios}</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-card border border-border p-3 hover:border-primary/50 transition-colors">
                  <div className="w-full h-full bg-foreground rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* QR Code Placeholder Pattern */}
                    <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                      <rect fill="white" width="100" height="100"/>
                      {/* QR code pattern simulation */}
                      <rect fill="black" x="10" y="10" width="25" height="25"/>
                      <rect fill="white" x="15" y="15" width="15" height="15"/>
                      <rect fill="black" x="18" y="18" width="9" height="9"/>
                      
                      <rect fill="black" x="65" y="10" width="25" height="25"/>
                      <rect fill="white" x="70" y="15" width="15" height="15"/>
                      <rect fill="black" x="73" y="18" width="9" height="9"/>
                      
                      <rect fill="black" x="10" y="65" width="25" height="25"/>
                      <rect fill="white" x="15" y="70" width="15" height="15"/>
                      <rect fill="black" x="18" y="73" width="9" height="9"/>
                      
                      {/* Data modules - different pattern for Android */}
                      <rect fill="black" x="42" y="12" width="5" height="5"/>
                      <rect fill="black" x="48" y="18" width="5" height="5"/>
                      <rect fill="black" x="42" y="24" width="5" height="5"/>
                      <rect fill="black" x="54" y="15" width="5" height="5"/>
                      
                      <rect fill="black" x="12" y="42" width="5" height="5"/>
                      <rect fill="black" x="18" y="48" width="5" height="5"/>
                      <rect fill="black" x="24" y="42" width="5" height="5"/>
                      <rect fill="black" x="15" y="54" width="5" height="5"/>
                      
                      <rect fill="black" x="42" y="42" width="5" height="5"/>
                      <rect fill="black" x="48" y="48" width="5" height="5"/>
                      <rect fill="black" x="54" y="42" width="5" height="5"/>
                      <rect fill="black" x="42" y="54" width="5" height="5"/>
                      
                      <rect fill="black" x="68" y="42" width="5" height="5"/>
                      <rect fill="black" x="78" y="48" width="5" height="5"/>
                      <rect fill="black" x="72" y="54" width="5" height="5"/>
                      <rect fill="black" x="84" y="42" width="5" height="5"/>
                      
                      <rect fill="black" x="42" y="68" width="5" height="5"/>
                      <rect fill="black" x="54" y="72" width="5" height="5"/>
                      <rect fill="black" x="48" y="78" width="5" height="5"/>
                      <rect fill="black" x="58" y="84" width="5" height="5"/>
                      
                      <rect fill="black" x="68" y="68" width="5" height="5"/>
                      <rect fill="black" x="78" y="72" width="5" height="5"/>
                      <rect fill="black" x="84" y="78" width="5" height="5"/>
                      <rect fill="black" x="72" y="84" width="5" height="5"/>
                    </svg>
                  </div>
                </div>
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
            <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
            <p>{t.footer.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
