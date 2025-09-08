import supportedLangs from '@/i18n/lang';

// 为所有支持的语言生成静态页面
export async function generateStaticParams() {
  return supportedLangs.map(locale => ({ locale }));
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 根据当前语言选择内容组件
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        {locale === 'zh' || locale === 'zh-TW' ? <ChineseAbout /> : <EnglishAbout />}
      </div>
    </div>
  );
}

function EnglishAbout() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">About ShipMore</h1>

      <section className="mb-10">
        <h2 className="mb-4 mt-8 text-2xl font-semibold">What is ShipMore?</h2>
        <p className="mb-4">
          ShipMore is a comprehensive Next.js application template designed to help developers ship products faster.
          Built with modern technologies and best practices, ShipMore provides everything you need to launch your next SaaS,
          web application, or digital product without starting from scratch.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">For Developers</h3>
            <p>
              Skip the tedious setup and focus on building your unique features. ShipMore comes with authentication,
              payments, database, and deployment configurations already configured.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">For Entrepreneurs</h3>
            <p>
              Turn your ideas into reality faster. With ShipMore's pre-built components and integrations,
              you can validate your concept and get to market in weeks, not months.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 mt-8 text-2xl font-semibold">Key Features</h2>
        <p className="mb-4">
          ShipMore is packed with essential features that every modern web application needs,
          saving you months of development time and allowing you to focus on what makes your product unique.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">Authentication</h3>
            <p>
              Complete user management system with sign-up, sign-in, password recovery, and social login integrations.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">Payment Integration</h3>
            <p>
              Ready-to-use payment processing with subscription management, invoicing, and multiple payment methods.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">Database & API</h3>
            <p>
              Modern database setup with type-safe queries, API routes, and data validation using the latest tools.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 mt-8 text-2xl font-semibold">Technology Stack</h2>
        <p className="mb-4">
          Built with cutting-edge technologies to ensure your application is fast, scalable, and maintainable.
          ShipMore uses industry-standard tools and follows best practices for modern web development.
        </p>

        <div className="relative ml-4 mt-8 border-l-2 border-gray-300 pl-6 dark:border-gray-600">
          <div className="relative mb-8">
            <div className="absolute -left-8 top-0 size-4 rounded-full bg-blue-500"></div>
            <h3 className="mb-2 text-xl font-medium">Frontend</h3>
            <p>
              Next.js 15, React 18, TypeScript, Tailwind CSS, and Shadcn/ui components for a modern,
              responsive, and accessible user interface.
            </p>
          </div>

          <div className="relative mb-8">
            <div className="absolute -left-8 top-0 size-4 rounded-full bg-blue-500"></div>
            <h3 className="mb-2 text-xl font-medium">Backend & Database</h3>
            <p>
              Drizzle ORM with PostgreSQL, server actions, API routes, and comprehensive data validation
              to ensure your application is robust and secure.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-0 size-4 rounded-full bg-blue-500"></div>
            <h3 className="mb-2 text-xl font-medium">Deployment & Tools</h3>
            <p>
              Ready for deployment on Vercel, with ESLint, Prettier, testing setup, and CI/CD configurations
              to maintain code quality and streamline your development workflow.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 mt-8 text-2xl font-semibold">Get Started</h2>
        <p className="mb-4">
          Ready to ship your next project faster? ShipMore provides comprehensive documentation,
          examples, and support to help you get up and running quickly. Join thousands of developers
          who have already accelerated their development process with ShipMore.
        </p>
        <p>
          Questions or need support? Contact us at
          {' '}
          <a href="mailto:support@shipmore.xyz" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">support@shipmore.xyz</a>
          {' '}
          and we'll help you get started.
        </p>
      </section>
    </div>
  );
}

function ChineseAbout() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">关于 ShipMore</h1>

      <section className="mb-10">
        <h2 className="mb-4 mt-8 text-2xl font-semibold">什么是 ShipMore？</h2>
        <p className="mb-4">
          ShipMore 是一个全面的 Next.js 应用程序模板，旨在帮助开发者更快地交付产品。
          采用现代技术和最佳实践构建，ShipMore 提供您启动下一个 SaaS、Web 应用程序或数字产品所需的一切，
          无需从零开始。
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">为开发者而生</h3>
            <p>
              跳过繁琐的设置，专注于构建您的独特功能。ShipMore 已经预配置了身份验证、
              支付、数据库和部署配置。
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">为创业者设计</h3>
            <p>
              更快地将您的想法变为现实。通过 ShipMore 的预构建组件和集成，
              您可以在几周而不是几个月内验证您的概念并进入市场。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 mt-8 text-2xl font-semibold">核心功能</h2>
        <p className="mb-4">
          ShipMore 包含了每个现代 Web 应用程序所需的基本功能，
          为您节省数月的开发时间，让您专注于使您的产品独特的功能。
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">身份验证</h3>
            <p>
              完整的用户管理系统，包括注册、登录、密码恢复和社交登录集成。
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">支付集成</h3>
            <p>
              即用型支付处理系统，包括订阅管理、发票和多种支付方式。
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h3 className="mb-2 text-xl font-medium">数据库与 API</h3>
            <p>
              现代数据库设置，包含类型安全查询、API 路由和使用最新工具的数据验证。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 mt-8 text-2xl font-semibold">技术栈</h2>
        <p className="mb-4">
          采用前沿技术构建，确保您的应用程序快速、可扩展且易于维护。
          ShipMore 使用行业标准工具并遵循现代 Web 开发的最佳实践。
        </p>

        <div className="relative ml-4 mt-8 border-l-2 border-gray-300 pl-6 dark:border-gray-600">
          <div className="relative mb-8">
            <div className="absolute -left-8 top-0 size-4 rounded-full bg-blue-500"></div>
            <h3 className="mb-2 text-xl font-medium">前端技术</h3>
            <p>
              Next.js 15、React 18、TypeScript、Tailwind CSS 和 Shadcn/ui 组件，
              打造现代、响应式且无障碍的用户界面。
            </p>
          </div>

          <div className="relative mb-8">
            <div className="absolute -left-8 top-0 size-4 rounded-full bg-blue-500"></div>
            <h3 className="mb-2 text-xl font-medium">后端与数据库</h3>
            <p>
              Drizzle ORM 配合 PostgreSQL、服务器操作、API 路由和全面的数据验证，
              确保您的应用程序稳健且安全。
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-0 size-4 rounded-full bg-blue-500"></div>
            <h3 className="mb-2 text-xl font-medium">部署与工具</h3>
            <p>
              可在 Vercel 上部署，配备 ESLint、Prettier、测试设置和 CI/CD 配置，
              以维护代码质量并简化您的开发工作流程。
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 mt-8 text-2xl font-semibold">开始使用</h2>
        <p className="mb-4">
          准备更快地交付您的下一个项目？ShipMore 提供全面的文档、
          示例和支持，帮助您快速启动和运行。加入已经使用 ShipMore
          加速开发流程的数千名开发者。
        </p>
        <p>
          有问题或需要支持？联系我们：
          {' '}
          <a href="mailto:support@shipmore.xyz" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">support@shipmore.xyz</a>
          {' '}
          我们将帮助您开始使用。
        </p>
      </section>
    </div>
  );
}
