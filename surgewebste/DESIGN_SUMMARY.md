# 聚流 (Surge) 网站设计总结

## 项目概述

聚流是一款 AI 原生社区平台，驱动金融保险人的数字化成长。本项目是一个多语言企业官网，支持简体中文、繁体中文和英文三种语言。

**网站地址**: https://surge.insbean.com

**代码仓库**: https://github.com/dulw0525/surgewebsite

---

## 技术架构

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.1.6 | React 框架（静态导出模式） |
| React | 19.2.4 | UI 库 |
| TypeScript | 5.7.3 | 类型系统 |
| Tailwind CSS | 4.2.0 | CSS 框架 |
| shadcn/ui | - | 组件库 |
| lucide-react | 0.564.0 | 图标库 |

### 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | - | 运行时 |
| Express.js | - | API 服务器 |
| MySQL | - | 数据库 |
| PM2 | - | 进程管理 |
| Nginx | - | 反向代理/Web 服务器 |

### 部署架构

```
                    ┌─────────────────┐
                    │   用户访问       │
                    │ surge.insbean.com│
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │      Nginx      │
                    │  (HTTPS/SSL)    │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
    ┌───────▼────────┐      │      ┌─────────▼────────┐
    │ 静态网站        │      │      │ API 服务          │
    │ /var/www/      │      │      │ /var/www/        │
    │ surge.insbean  │      │      │ surge-api/       │
    │ .com/          │      │      │ (Express:3001)   │
    │ (Next.js 静态) │      │      │                  │
    └────────────────┘      │      └─────────┬────────┘
                             │                │
                             │      ┌─────────▼────────┐
                             │      │ MySQL 数据库      │
                             │      │ 210.16.160.111   │
                             │      │ Port: 5455       │
                             │      └──────────────────┘
                             │
                    ┌────────▼────────┐
                    │ 124.220.4.236   │
                    │ (Web 服务器)     │
                    └─────────────────┘
```

---

## 核心功能模块

### 1. 国际化 (i18n)

**实现方式**: 基于 React Context 的自定义 i18n 方案

**支持语言**:
- 简体中文 (zh-CN) - 默认
- 繁体中文 (zh-TW)
- 英文 (en)

**文件结构**:
```
lib/i18n/
├── index.ts          # i18n 配置和 Context
├── locales/
│   ├── zh-CN.ts      # 简体中文翻译
│   ├── zh-TW.ts      # 繁体中文翻译
│   └── en.ts         # 英文翻译
```

**使用方式**:
```typescript
import { useI18n } from "@/lib/i18n"

function Component() {
  const { t, locale, setLocale } = useI18n()
  
  return <h1>{t.hero.title}</h1>
}
```

### 2. 联系表单

**功能**: 用户提交联系信息，存储到 MySQL 数据库

**数据流**:
```
前端表单 → POST /api/contact → Express API → MySQL 数据库
                                    ↓
                              雪花算法生成 ID
                                    ↓
                              返回成功响应
```

**数据库表结构**:
```sql
CREATE TABLE contact_submissions (
  id BIGINT UNSIGNED PRIMARY KEY,  -- 雪花算法生成的 18 位 ID
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  company VARCHAR(100),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

**API 端点**:
- URL: `https://surge.insbean.com/api/contact`
- 方法：POST
- 服务：Express.js (端口 3001)

### 3. AI 功能演示

**动态内容生成**: 根据当前语言显示不同的演示内容

**演示场景**:
- 客户画像分析
- 风险评估
- 保险方案推荐（重疾、医疗、意外、寿险）

### 4. 下载二维码

**位置**: Footer 组件

**样式**:
- 尺寸：102×102 像素
- 圆角边框
- 文字在二维码下方

**文件**:
- iOS: `/public/ios-qr.png`
- Android: `/public/android-qr.png`

---

## 关键设计决策

### 1. 为什么使用静态导出？

**决策**: Next.js 配置为 `output: 'export'`

**原因**:
- 网站内容为纯静态，无需服务端渲染
- 可直接由 Nginx 提供，性能最优
- 简化部署流程，降低服务器资源消耗

**限制与解决**:
- 无法使用 Next.js API Routes → 部署独立的 Express API 服务
- 无法使用动态路由 → 全部使用静态页面

### 2. 雪花算法 ID 生成

**决策**: 使用雪花算法生成 18 位唯一 ID，而非数据库自增

**原因**:
- 分布式友好，支持未来扩展
- ID 不连续，保护业务隐私
- 时间有序，便于数据归档

**实现要点**:
- 使用 BigInt 避免 JavaScript 精度丢失
- 数据库字段使用 `BIGINT UNSIGNED`

### 3. 数据库选型

**最终方案**: MySQL @ 210.16.160.111:5455

**尝试过的方案**:
- PostgreSQL @ 49.235.53.222:5432 - 网络连接超时
- MySQL @ 49.235.53.222:3306 - 网络连接超时

### 4. HTTPS 证书配置

**证书来源**: TrustAsia SSL 证书

**证书文件**:
- `surge.insbean.com.crt` - 域名证书
- `surge.insbean.com.key` - 私钥

**Nginx 配置**:
```nginx
server {
    listen 443 ssl;
    server_name surge.insbean.com;
    
    ssl_certificate /etc/nginx/ssl/surge.insbean.com.crt;
    ssl_certificate_key /etc/nginx/ssl/surge.insbean.com.key;
    
    location / {
        root /var/www/surge.insbean.com;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 部署流程

### 前端部署

```bash
# 1. 本地构建
npm run build

# 2. 打包输出
tar -czf out.tar.gz out/

# 3. 上传到服务器
scp out.tar.gz root@124.220.4.236:/tmp/

# 4. 服务器部署
ssh root@124.220.4.236
cd /var/www/surge.insbean.com
rm -rf *
tar -xzf /tmp/out.tar.gz
mv out/* .
rm -rf out /tmp/out.tar.gz
```

### API 服务部署

```bash
# 1. 上传 API 代码
scp surge-api.js root@124.220.4.236:/var/www/surge-api/

# 2. 安装依赖
cd /var/www/surge-api
npm install

# 3. PM2 管理
pm2 start surge-api.js --name surge-api
pm2 save
pm2 startup
```

---

## 文件结构

```
surgewebste/
├── components/
│   ├── contact.tsx        # 联系表单组件
│   ├── features.tsx       # 功能展示组件（含 AI 演示）
│   ├── footer.tsx         # 页脚组件（含下载二维码）
│   ├── header.tsx         # 头部组件
│   ├── hero.tsx           # 首屏组件
│   ├── subscription.tsx   # 订阅组件
│   └── team.tsx           # 团队组件
├── lib/
│   └── i18n/
│       ├── index.ts       # i18n 核心
│       └── locales/       # 翻译文件
├── public/
│   ├── ios-qr.png         # iOS 下载二维码
│   └── android-qr.png     # Android 下载二维码
├── out/                   # 构建输出目录
├── next.config.mjs        # Next.js 配置
├── package.json           # 依赖配置
└── tailwind.config.ts     # Tailwind 配置
```

---

## 服务器配置清单

### 124.220.4.236 (Web 服务器)

| 服务 | 端口 | 路径 | 状态 |
|------|------|------|------|
| Nginx | 443, 80 | /etc/nginx/ | 运行中 |
| surge-api | 3001 | /var/www/surge-api/ | PM2 管理 |
| 静态网站 | - | /var/www/surge.insbean.com/ | Nginx 托管 |

### 210.16.160.111 (数据库服务器)

| 服务 | 端口 | 数据库 | 用户 |
|------|------|--------|------|
| MySQL | 5455 | agent | root |

---

## 常见问题与解决方案

### 1. SSL 证书不匹配

**问题**: 初始证书为 insbean.com，不适用于 surge.insbean.com

**解决**: 使用正确的 surge.insbean.com 证书

### 2. 数据库连接超时

**问题**: 49.235.53.222 服务器防火墙阻止外部连接

**解决**: 切换到 210.16.160.111 服务器

### 3. 雪花算法 ID 精度丢失

**问题**: JavaScript Number 类型无法精确表示 64 位整数

**解决**: 全程使用 BigInt，数据库使用 BIGINT UNSIGNED

### 4. iCloud 云文件同步问题

**问题**: 设计资源文件存储在 iCloud，命令行无法直接访问

**解决**: 先打开 Finder 触发下载，或使用 Python/脚本来复制

---

## 更新日志

### 2026-04-01
- [x] 初始化项目，部署 Next.js 代码到服务器
- [x] 配置 HTTPS，使用 TrustAsia SSL 证书
- [x] 实现国际化支持（简中、繁中、英文）
- [x] AI 功能演示支持多语言动态内容
- [x] 联系表单接入 MySQL 数据库
- [x] 实现雪花算法 ID 生成
- [x] 更新 iOS 下载二维码（102×102 像素）
- [x] 更新 Android 下载二维码（102×102 像素）

---

## 参考资料

- [Next.js 文档](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [雪花算法实现](https://en.wikipedia.org/wiki/Snowflake_ID)

---

*本文档最后更新：2026-04-01*
