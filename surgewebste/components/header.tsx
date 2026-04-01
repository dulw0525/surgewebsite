"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Globe, ChevronDown, Sun, Moon } from "lucide-react"
import { useI18n, languages } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"

export function Header() {
  const { locale, setLocale, t } = useI18n()
  const { theme, setTheme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: "nav-features", label: t.nav.features, href: "#features" },
    { id: "nav-subscription", label: t.nav.subscription, href: "#subscription" },
    { id: "nav-team", label: t.nav.team, href: "#team" },
    { id: "nav-contact", label: t.nav.contact, href: "#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-2xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground tracking-tight">{t.brand.shortName}</span>
            </div>
            <span className="text-base font-semibold text-foreground">{t.brand.name}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex gap-1 h-8 px-2 text-muted-foreground hover:text-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="text-xs">
                    {languages.find((l) => l.code === locale)?.label.slice(0, 2)}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover/95 backdrop-blur-xl border-border min-w-32">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`text-sm ${locale === lang.code ? "text-primary" : ""}`}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-background/95 backdrop-blur-xl border-border">
                <nav className="flex flex-col gap-1 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-md hover:bg-muted/50"
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="border-t border-border pt-4 mt-4">
                    <p className="text-xs text-muted-foreground mb-3 px-2">{t.nav.theme || "Theme"}</p>
                    <div className="flex gap-2 px-2 mb-4">
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm transition-colors ${
                          theme === "light"
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Sun className="h-4 w-4" />
                        {t.nav.lightMode || "Light"}
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm transition-colors ${
                          theme === "dark"
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Moon className="h-4 w-4" />
                        {t.nav.darkMode || "Dark"}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 px-2">{t.nav.language}</p>
                    <div className="flex flex-col gap-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setLocale(lang.code)}
                          className={`text-left py-2 px-2 rounded-md text-sm transition-colors ${
                            locale === lang.code
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
