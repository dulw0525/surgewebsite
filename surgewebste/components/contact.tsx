"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Contact() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // 重置表单
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        phone: "",
        email: "",
        company: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-primary font-medium tracking-wide uppercase mb-4">
            {t.contact.badge}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {t.contact.contactMethods}
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.contact.email}</p>
                    <p className="text-foreground">insurance@insbean.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.contact.workingHours}</p>
                    <p className="text-foreground">{t.contact.workingHoursValue}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card/50 border border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.contact.responseNote}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.contact.form.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        {t.contact.form.name} <span className="text-primary">{t.contact.form.required}</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t.contact.form.namePlaceholder}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        {t.contact.form.phone} <span className="text-primary">{t.contact.form.required}</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={t.contact.form.phonePlaceholder}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        {t.contact.form.email}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t.contact.form.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-foreground">
                        {t.contact.form.company}
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder={t.contact.form.companyPlaceholder}
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      {t.contact.form.message} <span className="text-primary">{t.contact.form.required}</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t.contact.form.messagePlaceholder}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="bg-background/50 border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        {t.contact.form.submitting}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {t.contact.form.submit}
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {t.contact.form.privacyNote}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
