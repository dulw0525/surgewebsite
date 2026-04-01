import type { Translations } from './zh-CN'

export const zhTW: Translations = {
  // Brand
  brand: {
    name: '聚流',
    shortName: 'JL',
  },

  // Navigation
  nav: {
    features: '產品特性',
    subscription: '訂閱方案',
    team: '關於我們',
    contact: '聯繫我們',
    getStarted: '開始使用',
    language: '語言',
    theme: '主題',
    lightMode: '淺色',
    darkMode: '深色',
  },

  // Hero Section
  hero: {
    badge: 'AI 原生社區平台',
    title1: '金融保險人的',
    title2: 'AI 賦能平台',
    subtitle: '從「人海戰術」向「AI 賦能」轉型。個性化 AI 助手、智能知識庫與社群運營中心，助力您成為超級個體。',
    cta: '免費開始使用',
    learnMore: '了解更多',
    stats: {
      users: '活躍用戶',
      satisfaction: '滿意度',
      service: 'AI 服務',
    },
  },

  // Features Section
  features: {
    badge: '產品特性',
    title: '為金融保險從業者',
    subtitle: '打造的全方位 AI 賦能平台',
    coreCapability: '核心能力',
    aiWorkflowTitle: 'AI 驅動的智能工作流',
    aiWorkflowDesc: '從客戶溝通到方案設計，從合規檢查到數據分析。聚流 AI 貫穿您的工作全流程，讓專業能力得到指數級提升。',
    userCount: '10,000+ 用戶正在使用',
    items: [
      {
        tag: 'AI 助手',
        title: '個性化 AI 助手',
        description: '自動生成營銷話術、客戶洞察報告及合規自查建議，讓 AI 成為您的專屬助理。',
      },
      {
        tag: '知識庫',
        title: '智能知識庫',
        description: '沉澱行業資料與產品對比，解決碎片知識獲取痛點，隨時隨地獲取專業知識。',
      },
      {
        tag: '社群',
        title: '社群運營中心',
        description: '建立互助型知識網絡，實現共享即成長，與同行交流學習。',
      },
      {
        tag: '效率',
        title: '智能效率提升',
        description: 'AI 驅動的工作流自動化，大幅提升日常工作效率。',
      },
      {
        tag: '合規',
        title: '合規安全保障',
        description: '內置合規檢查機制，確保業務操作符合監管要求。',
      },
      {
        tag: '洞察',
        title: '數據洞察分析',
        description: '深度客戶畫像分析，精準把握業務機會。',
      },
    ],
    aiDemo: {
      title: 'AI 助手',
      analyzing: '正在分析客戶需求...',
      generating: '正在生成建議方案',
      completed: '方案生成完成',
      content: {
        customerProfile: {
          title: '【客戶畫像分析】',
          age: '年齡：35 歲，處於事業上升期',
          family: '家庭結構：已婚，育有一子（5 歲）',
          income: '年收入：約 45 萬元',
          insurance: '現有保障：僅有基礎社保，商業保險空白',
        },
        riskAssessment: {
          title: '【風險評估】',
          desc: '該客戶屬於典型的"上有老、下有小"家庭支柱型，需重點關注：',
          points: [
            '重大疾病風險 - 建議保額 50 萬起',
            '意外傷害風險 - 需覆蓋房貸餘額',
            '子女教育儲備 - 建議提前規劃',
          ],
        },
        recommendation: {
          title: '【產品配置建議】',
          criticalCare: {
            title: '一、重疾險方案',
            product: '推薦產品：多次賠付型重疾險',
            coverage: '保額建議：50 萬（覆蓋 3-5 年收入損失）',
            payment: '繳費方式：30 年繳，年繳約 8,500 元',
          },
          medical: {
            title: '二、醫療險方案',
            product: '推薦產品：百萬醫療險 + 中端醫療險',
            coverage: '保障範圍：住院醫療、門診手術、特殊門診',
            payment: '年繳保費：約 1,200 元',
          },
          accident: {
            title: '三、意外險方案',
            product: '推薦產品：綜合意外險',
            coverage: '保額建議：100 萬身故/傷殘 + 5 萬醫療',
            payment: '年繳保費：約 300 元',
          },
          life: {
            title: '四、定期壽險方案',
            product: '推薦產品：定期壽險（保至 60 歲）',
            coverage: '保額建議：200 萬（覆蓋房貸 + 家庭支出）',
            payment: '年繳保費：約 2,000 元',
          },
        },
        summary: {
          title: '【預算匯總】',
          total: '年度總保費：約 12,000 元',
          ratio: '佔年收入比例：2.7%（健康合理區間）',
        },
        script: {
          title: '【溝通話術建議】',
          opening: '開場白："張先生，根據您的家庭情況，我為您量身定製了一套保障方案，既能幫您控制風險，又不會給家庭造成太大負擔。"',
          closing: '促成話術："這套方案每天只需 33 元，相當於一杯咖啡的價格，就能給全家帶來全方位保障。"',
        },
        notes: {
          title: '【注意事項】',
          points: [
            '投保前需確認健康告知情況',
            '建議先配置保障型產品，再考慮理財型',
            '可根據客戶實際預算適當調整保額',
          ],
        },
      },
    },
    customerLeads: {
      badge: '客戶線索',
      title: '智慧客戶關係網絡',
      description: '視覺化展示客戶關係鏈，智慧識別高價值客戶和潛在轉介紹機會。支援客戶分享和推薦，輕鬆拓展人脈圈。',
      features: ['客戶關係視覺化', '智慧分類與標籤', '一鍵分享與推薦', '轉介紹追蹤分析'],
      legend: {
        title: '圖例',
        vip: 'VIP 客戶',
        potential: '潛在客戶',
        referral: '轉介紹來源',
        new: '新客戶',
        inactive: '待激活',
      },
    },
  },

  // Subscription Section
  subscription: {
    badge: '訂閱方案',
    title: '靈活的定價方案',
    subtitle: 'SaaS 訂閱模式，按需選擇，高性價比的數字化轉型方案',
    recommended: '推薦',
    paymentNote: '支持支付寶 / 微信支付 / AlipayHK / 信用卡等多種支付方式',
    plans: [
      {
        name: '基礎版',
        price: '免費',
        period: '',
        description: '適合初次體驗的用戶',
        features: [
          '無限 AI 對話次數',
          '高級營銷話術生成',
          '客戶洞察報告',
          '合規自查建議',
          '完整知識庫訪問',
          '社群運營工具',
        ],
        cta: '免費開始',
      },
      {
        name: '專業版',
        price: '¥168',
        period: '/年',
        description: '適合個人從業者',
        features: [
          '基礎版全部功能',
          '個人知識庫',
          '智能產品計劃書',
          '智能產品比較報告',
        ],
        cta: '立即訂閱',
      },
      {
        name: '企業版',
        price: '定制',
        period: '',
        description: '適合大型團隊和企業',
        features: [
          '專業版全部功能',
          '團隊協作管理',
          '數據分析儀表盤',
          'API 接口訪問',
          '專屬客戶經理',
          '定制化部署方案',
        ],
        cta: '聯繫我們',
      },
    ],
  },

  // Team Section
  team: {
    badge: '關於我們',
    title: '專業團隊',
    subtitle: '專注 AI 賦能金融保險行業',
    companyName: '上海小也科技有限公司',
    stats: [
      { value: '10+', label: '年行業經驗' },
      { value: 'AI', label: '技術驅動' },
      { value: '100%', label: '數據安全' },
      { value: '10K+', label: '活躍用戶' },
    ],
    highlights: [
      {
        title: '複合背景團隊',
        description: '總部位於上海，核心團隊擁有十年以上 AI、金融及社區運營經驗。',
      },
      {
        title: '技術創新能力',
        description: '持續投入 AI 技術研發，打造行業領先的智能化解決方案。',
      },
      {
        title: '合規安全承諾',
        description: '嚴格遵循數據安全與行業監管要求，保障用戶信息安全。',
      },
    ],
  },

  // Contact Section
  contact: {
    badge: '聯繫我們',
    title: '開啟您的數字化轉型之旅',
    subtitle: '無論您有任何問題或合作意向，我們都期待與您取得聯繫',
    contactMethods: '聯繫方式',
    email: '電子郵箱',
    phone: '聯繫電話',
    workingHours: '工作時間',
    workingHoursValue: '週一至週五 9:00 - 18:00',
    responseNote: '提交信息後，我們的團隊將在 24 小時內與您取得聯繫。如需緊急諮詢，請直接撥打客服熱線。',
    form: {
      name: '姓名',
      namePlaceholder: '請輸入您的姓名',
      phone: '手機號碼',
      phonePlaceholder: '請輸入您的手機號碼',
      email: '電子郵箱',
      emailPlaceholder: '請輸入您的郵箱地址',
      company: '公司名稱',
      companyPlaceholder: '請輸入您的公司名稱',
      message: '留言內容',
      messagePlaceholder: '請描述您的需求或問題...',
      required: '*',
      submit: '提交留言',
      submitting: '提交中...',
      successTitle: '提交成功',
      successMessage: '感謝您的留言，我們會盡快與您聯繫',
      privacyNote: '提交即表示您同意我們的隱私政策和服務條款',
    },
  },

  // Footer Section
  footer: {
    downloadTitle: '立即開始使用聚流',
    downloadSubtitle: '掃描二維碼下載 App，開啟您的 AI 賦能之旅',
    ios: 'iOS',
    android: 'Android',
    brandDesc: 'AI 原生社區，驅動金融保險人的數字化成長。',
    links: {
      product: {
        title: '產品',
        features: '產品特性',
        subscription: '訂閱方案',
        download: '下載 App',
      },
      company: {
        title: '公司',
        about: '關於我們',
        contact: '聯繫我們',
        careers: '加入我們',
      },
      support: {
        title: '支持',
        help: '幫助中心',
        terms: '用戶協議',
        privacy: '隱私政策',
      },
    },
    copyright: '上海小也科技有限公司',
    disclaimer: '本平台內容僅供參考，不構成投資建議',
  },
}
