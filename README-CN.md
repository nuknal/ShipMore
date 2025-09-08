# ShipMore - Next.js 应用模板

一个功能完整的 Next.js 应用程序模板，帮助开发者快速构建现代 Web 应用。包含用户认证、支付集成、多语言支持、主题切换等现代应用必需的功能，让您专注于业务逻辑而非基础设施。

## ✨ 特性

- 🔐 **用户认证** - 基于 NextAuth.js，支持多种登录方式
- 💳 **支付集成** - 完整的订阅和支付系统
- 🌍 **国际化** - 基于 next-intl 的多语言支持
- 🎨 **主题切换** - 深色/浅色模式切换
- 📊 **数据库** - 使用 Drizzle ORM 和 PostgreSQL
- 🎯 **现代化UI** - Tailwind CSS + Shadcn UI
- 📱 **响应式设计** - 完美适配各种设备
- 🚀 **性能优化** - Next.js 15 最佳实践

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: Shadcn UI
- **认证**: NextAuth.js
- **数据库**: PostgreSQL + Drizzle ORM
- **支付**: Stripe
- **国际化**: next-intl
- **部署**: Vercel

## 📦 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd shipmore
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 环境配置

复制 `.env.example` 到 `.env.local` 并配置环境变量：

```bash
cp .env.example .env.local
```

配置以下环境变量：

```env
# 数据库
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth 提供商
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# 其他服务
RESEND_API_KEY="your-resend-key"
CLOUDFLARE_R2_ACCESS_KEY_ID="your-r2-key"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-r2-secret"
```

### 4. 数据库设置

```bash
# 生成数据库迁移
pnpm db:generate

# 推送到数据库
pnpm db:push

# 运行种子数据（可选）
pnpm db:seed
```

### 5. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 多语言路由
│   │   ├── (auth)/        # 需要认证的页面
│   │   └── (unauth)/      # 公开页面
│   └── api/               # API 路由
├── components/            # React 组件
│   ├── auth/             # 认证相关组件
│   ├── landing/          # Landing 页面组件
│   ├── settings/         # 设置相关组件
│   ├── subscription/     # 订阅相关组件
│   └── ui/               # 基础 UI 组件
├── db/                   # 数据库配置和 schema
├── hooks/                # 自定义 React Hooks
├── i18n/                 # 国际化配置
├── lib/                  # 工具库和配置
├── locales/              # 翻译文件
├── services/             # API 服务
├── styles/               # 样式文件
├── types/                # TypeScript 类型定义
└── utils/                # 工具函数
```

## 🔧 核心功能

### 用户认证

- 支持邮箱/密码登录
- 社交登录（GitHub、Google、Apple）
- 邮箱验证
- 会话管理

### 支付系统

- Creem 集成
- 订阅管理
- 账单历史
- 使用量统计

### 国际化

- 中文/英文支持
- 动态语言切换
- 本地化路由

### 主题系统

- 深色/浅色模式
- 系统主题检测
- 持久化设置

## 📝 开发指南

### 添加新页面

1. 在 `src/app/[locale]/(auth)` 或 `src/app/[locale]/(unauth)` 中创建页面
2. 添加相应的翻译到 `src/locales/` 中
3. 如需要，添加到侧边栏导航

### 添加新组件

1. 在 `src/components/` 中创建组件
2. 使用 TypeScript 和 Tailwind CSS
3. 遵循项目的命名约定

### 数据库操作

```bash
# 生成新的迁移
pnpm db:generate

# 推送到数据库
pnpm db:push

# 查看数据库
pnpm db:studio
```

## 🚀 部署

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 部署

### 其他平台

项目支持部署到任何支持 Next.js 的平台，如 Netlify、Railway、Render 等。

## 📄 脚本命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 数据库相关
pnpm db:generate    # 生成迁移
pnpm db:push        # 推送到数据库
pnpm db:studio      # 打开数据库管理界面
pnpm db:seed        # 运行种子数据
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT License](LICENSE)

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [NextAuth.js 文档](https://next-auth.js.org)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Shadcn UI 文档](https://ui.shadcn.com)
- [Drizzle ORM 文档](https://orm.drizzle.team)

## 📞 技术支持

如有任何问题或需要支持，请联系我们：[support@shipmore.xyz](mailto:support@shipmore.xyz)
