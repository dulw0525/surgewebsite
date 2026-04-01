import type { Metadata, Viewport } from 'next'
import { Noto_Sans_SC, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/lib/i18n'
import { ThemeProvider } from '@/lib/theme'
import './globals.css'

const notoSansSC = Noto_Sans_SC({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '聚流 Juliu - AI 原生社区，驱动金融保险人的数字化成长',
  description: '聚流是一款 AI 原生社区应用，为金融保险从业者提供个性化 AI 助手、智能知识库和社群运营中心，助力从"人海战术"向"AI 赋能"转型。',
  keywords: ['聚流', 'Juliu', 'AI', '金融', '保险', '社区', '数字化', '智能助手'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00bc71',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${notoSansSC.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
