"use client"

import { useState, useEffect, useRef } from "react"
import { Bot, BookOpen, Users, Zap, Shield, TrendingUp, ArrowRight, Share2, UserPlus } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"

const featureIcons = [Bot, BookOpen, Users, Zap, Shield, TrendingUp]

// Node types for customer network
type NodeType = 'vip' | 'potential' | 'referral' | 'new' | 'inactive'

interface NetworkNode {
  id: string
  name: string
  type: NodeType
  angle: number
  baseDistance: number
  size: number
  connections: string[]
}

// Customer Relationship Network - Spherical expansion animation
function CustomerNetworkDemo() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const progressRef = useRef(0)
  const nodesRef = useRef<NetworkNode[]>([])

  // Pastel colors with glow effect matching the reference image
  const typeColors: Record<NodeType, string> = {
    vip: '#F4C86C',       // Gold/Yellow
    potential: '#7DD3FC', // Light Blue
    referral: '#C4B5FD',  // Purple/Lavender
    new: '#86EFAC',       // Green
    inactive: '#F9A8D4',  // Pink
  }

  // Localized names based on current language
  const { locale } = useI18n()
  const getNames = () => {
    if (locale === 'en') {
      return [
        'Michael', 'Sarah', 'David', 'Emma', 'James', 'Olivia', 'William', 'Sophia',
        'Daniel', 'Emily', 'Alex', 'Grace', 'Ryan', 'Chloe', 'Lucas', 'Mia',
        'Ethan', 'Ava', 'Noah', 'Isabella', 'Liam', 'Charlotte', 'Benjamin', 'Amelia',
        'Henry', 'Harper', 'Sebastian', 'Ella', 'Jack', 'Luna', 'Oliver', 'Scarlett',
        'Jacob', 'Victoria', 'Mason', 'Aria', 'Logan', 'Riley', 'Aiden', 'Zoey',
        'Owen', 'Lily', 'Elijah', 'Hannah', 'Carter', 'Nora', 'Jayden', 'Stella',
        'Luke', 'Violet', 'Gabriel', 'Aurora', 'Isaac', 'Savannah', 'Lincoln', 'Audrey',
        'Nathan', 'Brooklyn', 'Caleb', 'Claire', 'Leo', 'Skylar', 'Adrian', 'Lucy',
        'Eli', 'Anna', 'Ezra', 'Samantha', 'Aaron', 'Caroline', 'Carson', 'Genesis',
        'Hudson', 'Aaliyah', 'Connor', 'Kennedy', 'Julian', 'Kinsley', 'Landon', 'Allison'
      ]
    } else if (locale === 'zh-TW') {
      return [
        '志明', '美玲', '建國', '淑芬', '文強', '雅婷', '志偉', '怡君',
        '俊傑', '佩珊', '家豪', '欣怡', '志強', '婉婷', '宇軒', '詩涵',
        '浩然', '梓萱', '子軒', '雅涵', '子豪', '芷涵', '宇辰', '筱婷',
        '志豪', '珮瑜', '文傑', '雅雯', '建宏', '惠婷', '志昇', '美惠',
        '俊宏', '雅琪', '文傑', '佩琳', '志偉', '淑華', '建軍', '美玲',
        '家偉', '雅惠', '志豪', '淑芬', '俊偉', '佩芸', '文華', '怡珊',
        '建宏', '雅玲', '志強', '淑娟', '俊傑', '佩蓉', '文豪', '雅芳',
        '家豪', '淑慧', '志偉', '佩珊', '建國', '美玲', '俊宏', '雅婷'
      ]
    } else {
      // Simplified Chinese
      return [
        '志明', '美玲', '建国', '淑芬', '文强', '雅婷', '志伟', '怡君',
        '俊杰', '佩珊', '家豪', '欣怡', '志强', '婉婷', '宇轩', '诗涵',
        '浩然', '梓萱', '子轩', '雅涵', '子豪', '芷涵', '宇辰', '筱婷',
        '志豪', '佩瑜', '文杰', '雅雯', '建宏', '惠婷', '志升', '美惠',
        '俊宏', '雅琪', '文华', '佩琳', '志伟', '淑华', '建军', '美玲',
        '家伟', '雅惠', '志豪', '淑芬', '俊伟', '佩芸', '文华', '怡珊',
        '建宏', '雅玲', '志强', '淑娟', '俊杰', '佩蓉', '文豪', '雅芳',
        '家豪', '淑慧', '志伟', '佩珊', '建国', '美玲', '俊宏', '雅婷'
      ]
    }
  }

  const names = getNames()
  const types: NodeType[] = ['vip', 'potential', 'referral', 'new', 'inactive']

  // Initialize nodes
  useEffect(() => {
    const nodeCount = 100
    const nodeData: NetworkNode[] = []

    for (let i = 0; i < nodeCount; i++) {
      const angle = Math.random() * Math.PI * 2
      // Larger base distance to fill the entire canvas
      const baseDistance = 15 + Math.random() * 180
      const size = 2 + Math.random() * 7
      const type = types[Math.floor(Math.random() * types.length)]

      // More connections for denser network
      const connectionCount = 3 + Math.floor(Math.random() * 5)
      const connections: string[] = []
      for (let j = 0; j < connectionCount; j++) {
        const targetId = String(Math.floor(Math.random() * nodeCount))
        if (targetId !== String(i) && !connections.includes(targetId)) {
          connections.push(targetId)
        }
      }

      nodeData.push({
        id: String(i),
        name: names[i % names.length],
        type,
        angle,
        baseDistance,
        size,
        connections
      })
    }

    nodesRef.current = nodeData
  }, [locale])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    const cycleDuration = 16000 // 16 seconds per cycle for smoother animation

    const animate = (currentTime: number) => {
      // Update progress (loops 0 to 1)
      progressRef.current = (currentTime % cycleDuration) / cycleDuration

      // Linear uniform expansion with smooth start/end
      const progress = progressRef.current
      let easedProgress: number

      if (progress < 0.05) {
        // Very gentle start (0-5%) - cubic ease in
        easedProgress = (progress / 0.05) * (progress / 0.05) * (progress / 0.05) * 0.05
      } else if (progress < 0.45) {
        // Linear expansion phase (5-45%) - uniform speed
        easedProgress = 0.05 + (progress - 0.05) * (0.95 / 0.4)
      } else if (progress < 0.55) {
        // Hold at expanded state (45-55%)
        easedProgress = 1
      } else if (progress < 0.95) {
        // Linear contraction phase (55-95%) - uniform speed
        easedProgress = 1 - ((progress - 0.55) / 0.4)
      } else {
        // Very gentle end (95-100%) - cubic ease out
        const endProgress = (progress - 0.95) / 0.05
        easedProgress = 0.05 * (1 - endProgress * endProgress * endProgress)
      }

      // Scale: starts compact (0.25), expands to fill canvas (1.4)
      const scale = 0.25 + easedProgress * 1.15
      // Node size multiplier: starts small, grows larger
      const sizeMultiplier = 0.5 + easedProgress * 0.7

      // Clear canvas with theme-aware background
      ctx.fillStyle = theme === 'dark' ? '#0f1117' : '#f5f5f5'
      ctx.fillRect(0, 0, width, height)

      const nodes = nodesRef.current
      if (nodes.length === 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Calculate current positions
      const currentNodes = nodes.map(node => {
        const distance = node.baseDistance * scale
        return {
          ...node,
          x: centerX + Math.cos(node.angle) * distance,
          y: centerY + Math.sin(node.angle) * distance,
          currentSize: node.size * sizeMultiplier
        }
      })

      // Draw edges first - theme-aware line colors
      ctx.strokeStyle = theme === 'dark' ? 'rgba(120, 130, 160, 0.35)' : 'rgba(100, 110, 140, 0.25)'
      ctx.lineWidth = 0.8
      currentNodes.forEach(node => {
        node.connections.forEach(targetId => {
          const targetNode = currentNodes.find(n => n.id === targetId)
          if (targetNode && parseInt(node.id) < parseInt(targetId)) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(targetNode.x, targetNode.y)
            ctx.stroke()
          }
        })
      })

      // Draw nodes with glow
      currentNodes.forEach(node => {
        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.currentSize * 3
        )
        gradient.addColorStop(0, typeColors[node.type] + '60')
        gradient.addColorStop(0.5, typeColors[node.type] + '20')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.currentSize * 3, 0, Math.PI * 2)
        ctx.fill()

        // Main circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.currentSize, 0, Math.PI * 2)
        ctx.fillStyle = typeColors[node.type]
        ctx.fill()

        // Show names when expanded (only for larger nodes)
        if (scale > 0.85 && node.size >= 5) {
          ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 40, 60, 0.85)'
          ctx.font = '9px system-ui, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(node.name, node.x, node.y + node.currentSize + 12)
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [typeColors, theme, locale])

  const legendItems = t.features.customerLeads?.legend ? [
    { type: 'vip' as NodeType, label: t.features.customerLeads.legend.vip },
    { type: 'potential' as NodeType, label: t.features.customerLeads.legend.potential },
    { type: 'referral' as NodeType, label: t.features.customerLeads.legend.referral },
    { type: 'new' as NodeType, label: t.features.customerLeads.legend.new },
    { type: 'inactive' as NodeType, label: t.features.customerLeads.legend.inactive },
  ] : []

  return (
    <div className="relative rounded-xl bg-muted dark:bg-[#0f1117] border border-border/50 overflow-hidden">
      <canvas
        ref={canvasRef}
        width={520}
        height={400}
        className="w-full h-[320px]"
      />

      {/* Legend */}
      {t.features.customerLeads?.legend && (
        <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur border border-border/50 rounded-lg px-3 py-2">
          <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
            {t.features.customerLeads.legend.title}
          </div>
          <div className="space-y-1.5">
            {legendItems.map(item => (
              <div key={item.type} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: typeColors[item.type] }}
                />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="absolute bottom-3 left-3 flex gap-2">
        <button className="p-2 bg-card/90 backdrop-blur border border-border/50 rounded-lg hover:bg-muted transition-colors">
          <Share2 className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="p-2 bg-card/90 backdrop-blur border border-border/50 rounded-lg hover:bg-muted transition-colors">
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}

// AI typing animation component with auto-scroll
function AITypingDemo() {
  const { t } = useI18n()
  const [displayPhase, setDisplayPhase] = useState(0) // 0: analyzing, 1: generating, 2: completed
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(true)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentLineContent, setCurrentLineContent] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0)

  // Build content array from i18n
  const contentLines = [
    t.features.aiDemo.content.customerProfile.title,
    t.features.aiDemo.content.customerProfile.age,
    t.features.aiDemo.content.customerProfile.family,
    t.features.aiDemo.content.customerProfile.income,
    t.features.aiDemo.content.customerProfile.insurance,
    '',
    t.features.aiDemo.content.riskAssessment.title,
    t.features.aiDemo.content.riskAssessment.desc,
    ...t.features.aiDemo.content.riskAssessment.points.map((p: string) => '• ' + p),
    '',
    t.features.aiDemo.content.recommendation.title,
    '',
    t.features.aiDemo.content.recommendation.criticalCare.title,
    t.features.aiDemo.content.recommendation.criticalCare.product,
    t.features.aiDemo.content.recommendation.criticalCare.coverage,
    t.features.aiDemo.content.recommendation.criticalCare.payment,
    '',
    t.features.aiDemo.content.recommendation.medical.title,
    t.features.aiDemo.content.recommendation.medical.product,
    t.features.aiDemo.content.recommendation.medical.coverage,
    t.features.aiDemo.content.recommendation.medical.payment,
    '',
    t.features.aiDemo.content.recommendation.accident.title,
    t.features.aiDemo.content.recommendation.accident.product,
    t.features.aiDemo.content.recommendation.accident.coverage,
    t.features.aiDemo.content.recommendation.accident.payment,
    '',
    t.features.aiDemo.content.recommendation.life.title,
    t.features.aiDemo.content.recommendation.life.product,
    t.features.aiDemo.content.recommendation.life.coverage,
    t.features.aiDemo.content.recommendation.life.payment,
    '',
    t.features.aiDemo.content.summary.title,
    t.features.aiDemo.content.summary.total,
    t.features.aiDemo.content.summary.ratio,
    '',
    t.features.aiDemo.content.script.title,
    t.features.aiDemo.content.script.opening,
    t.features.aiDemo.content.script.closing,
    '',
    t.features.aiDemo.content.notes.title,
    ...t.features.aiDemo.content.notes.points.map((p: string) => '• ' + p),
  ]

  // Phase timing
  useEffect(() => {
    if (displayPhase === 0) {
      const timer = setTimeout(() => {
        setDisplayPhase(1)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [displayPhase])

  // Typing effect for each line
  useEffect(() => {
    if (displayPhase !== 1) return

    if (currentLineIndex >= contentLines.length) {
      setIsTyping(false)
      setTimeout(() => setDisplayPhase(2), 1000)
      return
    }

    const targetLine = contentLines[currentLineIndex]

    if (currentLineContent.length < targetLine.length) {
      const timer = setTimeout(() => {
        setCurrentLineContent(targetLine.slice(0, currentLineContent.length + 1))
      }, 15)
      return () => clearTimeout(timer)
    } else {
      // Line completed, add to displayed lines
      setDisplayedLines(prev => [...prev, targetLine])
      setCurrentLineIndex(prev => prev + 1)
      setCurrentLineContent('')
    }
  }, [displayPhase, currentLineIndex, currentLineContent, contentLines])

  // Auto-scroll when content exceeds container
  useEffect(() => {
    if (displayPhase === 2) {
      const scrollTimer = setInterval(() => {
        setScrollPosition(prev => {
          const maxScroll = Math.max(0, displayedLines.length * 20 - 120)
          if (prev >= maxScroll) {
            // Reset and start over
            setTimeout(() => {
              setDisplayedLines([])
              setCurrentLineIndex(0)
              setCurrentLineContent('')
              setScrollPosition(0)
              setDisplayPhase(0)
              setIsTyping(true)
            }, 2000)
            return prev
          }
          return prev + 1
        })
      }, 50)
      return () => clearInterval(scrollTimer)
    }
  }, [displayPhase, displayedLines.length])

  const allLines = [...displayedLines, ...(isTyping && currentLineContent ? [currentLineContent] : [])]

  return (
    <div className="rounded-xl bg-background/80 border border-border p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{t.features.aiDemo.title}</div>
          <div className="text-xs text-muted-foreground">
            {displayPhase === 0 ? t.features.aiDemo.analyzing : displayPhase === 1 ? t.features.aiDemo.generating : t.features.aiDemo.completed}
          </div>
        </div>
      </div>

      {/* Content area with scroll */}
      <div className="h-[160px] relative overflow-hidden">
        {displayPhase === 0 ? (
          <div className="space-y-3">
            <div className="h-2.5 bg-muted rounded-full w-full animate-pulse" />
            <div className="h-2.5 bg-muted rounded-full w-4/5 animate-pulse" style={{ animationDelay: '0.1s' }} />
            <div className="h-2.5 bg-muted rounded-full w-3/5 animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
        ) : (
          <div
            className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed transition-transform duration-100"
            style={{ transform: `translateY(-${scrollPosition}px)` }}
          >
            {allLines.map((line, i) => (
              <div key={i} className="min-h-[1.25rem]">{line}</div>
            ))}
            {isTyping && <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />}
          </div>
        )}
        {/* Fade gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      </div>

      {/* Status indicator */}
      <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border/50">
        <div className={`h-2 w-2 rounded-full ${displayPhase === 2 ? 'bg-green-500' : 'bg-primary animate-pulse'}`} />
        <span className="text-xs text-muted-foreground">
          {displayPhase === 2 ? t.features.aiDemo.completed : t.features.aiDemo.generating}
        </span>
      </div>
    </div>
  )
}

export function Features() {
  const { t } = useI18n()

  const features = t.features.items.map((item, index) => ({
    icon: featureIcons[index],
    ...item
  }))

  return (
    <section id="features" className="relative py-24 lg:py-32">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - Linear style */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm text-primary font-medium mb-3">{t.features.badge}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            {t.features.title}
            <br />
            <span className="text-muted-foreground">{t.features.subtitle}</span>
          </h2>
        </div>

        {/* Feature Grid - Clean card style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-xl bg-card/50 border border-border/50 hover:border-border hover:bg-card/80 transition-all duration-300"
              >
                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground mb-4">
                  <Icon className="h-3 w-3" />
                  {feature.tag}
                </div>

                {/* Title */}
                <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature highlight - Linear style showcase */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-card via-card to-card/50 border border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs text-primary font-medium mb-3 uppercase tracking-wider">{t.features.coreCapability}</p>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {t.features.aiWorkflowTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.features.aiWorkflowDesc}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {/* Diverse real human avatars from different countries */}
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {t.features.userCount}
                </span>
              </div>
            </div>
            <div className="relative">
              <AITypingDemo />
            </div>
          </div>
        </div>

        {/* Customer Leads Network */}
        {t.features.customerLeads && (
          <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-card via-card to-card/50 border border-border/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <CustomerNetworkDemo />
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10 text-xs text-primary mb-4">
                  <Users className="h-3 w-3" />
                  {t.features.customerLeads.badge}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {t.features.customerLeads.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t.features.customerLeads.description}
                </p>
                <div className="space-y-3">
                  {t.features.customerLeads.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
