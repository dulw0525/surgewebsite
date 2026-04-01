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

  // English names
  const names = [
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
  }, [])

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
  }, [typeColors, theme])

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
  const [displayText, setDisplayText] = useState("")
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  
  const fullContent = `根据您提供的客户信息，我为您生成了以下专业建议方案：

【客户画像分析】
- 年龄：35岁，处于事业上升期
- 家庭结构：已婚，育有一子（5岁）
- 年收入：约45万元
- 现有保障：仅有基础社保，商业保险空白

【风险评估】
该客户属于典型的"���有老、下有小"家庭支柱型，需重点关注：
1. 重大疾病风险 - 建议保额50万起
2. 意外伤害风险 - 需覆盖房贷余额
3. 子女教育储备 - 建议提前规划

【产品配置建议】
一、重疾险方案
推荐产品：多次赔付型重疾险
保额建议：50万（覆盖3-5年收入损失）
缴费方式：30年缴，年缴约8,500元

二、医疗险方案
推荐产品：百万医疗险 + 中端医疗险
保障范围：住院医疗、门诊手术、特殊门诊
年缴保费：约1,200元

三、意外险方案
推荐产品：综合意外险
保额建议：100万身故/伤残 + 5万医疗
年缴保费：约300元

四、定期寿险方案
推荐产品：定期寿险（保至60岁）
保额建议：200万（覆盖房贷+家庭支出）
年缴保费：约2,000元

【预算汇总】
年度总保费：约12,000元
占年收入比例：2.7%（健康合理区间）

【沟通话术建议】
开场白："张先生，根据您的家庭情况，我为您量身定制了一套保障方案，既能帮您控制风险，又不会给家庭造成太大负担。"

促成话术："这套方案每天只需33元，相当于一杯咖啡的价格，就能给全家带来全方位保障。"

【注意事项】
1. 投保前需确认健康告知情况
2. 建议先配置保障型产品，再考虑理财型
3. 可根据客户实际预算适当调整保额`

  const phases = [
    { status: t.features.aiDemo.analyzing, showContent: false },
    { status: t.features.aiDemo.generating, showContent: true },
    { status: t.features.aiDemo.completed, showContent: true },
  ]
  
  useEffect(() => {
    if (currentPhase === 0) {
      const timer = setTimeout(() => {
        setCurrentPhase(1)
      }, 2000)
      return () => clearTimeout(timer)
    }
    
    if (currentPhase === 1 && displayText.length < fullContent.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullContent.slice(0, displayText.length + 1))
      }, 20)
      return () => clearTimeout(timer)
    }
    
    if (currentPhase === 1 && displayText.length === fullContent.length) {
      setIsTyping(false)
      setCurrentPhase(2)
    }
  }, [displayText, currentPhase, fullContent])
  
  // Auto-scroll effect when content exceeds container
  useEffect(() => {
    if (currentPhase === 2) {
      // Start scrolling after typing completes
      const scrollTimer = setInterval(() => {
        setScrollPosition((prev) => {
          const maxScroll = Math.max(0, displayText.split('\n').length * 20 - 140)
          if (prev >= maxScroll) {
            // Reset and start over
            setTimeout(() => {
              setDisplayText("")
              setCurrentPhase(0)
              setIsTyping(true)
              setScrollPosition(0)
            }, 2000)
            return prev
          }
          return prev + 1
        })
      }, 50)
      return () => clearInterval(scrollTimer)
    }
  }, [currentPhase, displayText])
  
  return (
    <div className="rounded-xl bg-background/80 border border-border p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{t.features.aiDemo.title}</div>
          <div className="text-xs text-muted-foreground">{phases[currentPhase].status}</div>
        </div>
      </div>
      
      {/* Content area with scroll */}
      <div className="h-[160px] relative overflow-hidden">
        {currentPhase === 0 ? (
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
            {displayText}
            {isTyping && <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />}
          </div>
        )}
        {/* Fade gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      </div>
      
      {/* Status indicator */}
      <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border/50">
        <div className={`h-2 w-2 rounded-full ${currentPhase === 2 ? 'bg-green-500' : 'bg-primary animate-pulse'}`} />
        <span className="text-xs text-muted-foreground">
          {currentPhase === 2 ? t.features.aiDemo.completed : t.features.aiDemo.generating}
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
