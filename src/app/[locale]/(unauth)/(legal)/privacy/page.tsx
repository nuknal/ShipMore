import supportedLangs from '@/i18n/lang';

// 为所有支持的语言生成静态页面
export async function generateStaticParams() {
  return supportedLangs.map(locale => ({ locale }));
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 根据当前语言选择内容组件
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        {locale === 'zh' || locale === 'zh-TW' ? <ChinesePrivacy /> : <EnglishPrivacy />}
      </div>
    </div>
  );
}

function EnglishPrivacy() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Last updated:
        {' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">1. Introduction</h2>
      <p>
        At ShipMore ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, template, and services (collectively, the "Services").
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">2. Information We Collect</h2>
      <p>
        We may collect information about you in various ways, including:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>Personal Information:</strong>
          {' '}
          Name, email address, and other contact details you provide when creating an account or contacting us.
        </li>
        <li>
          <strong>Usage Data:</strong>
          {' '}
          Information about how you interact with our Services, including access times, pages viewed, and features used.
        </li>
        <li>
          <strong>Device Information:</strong>
          {' '}
          Information about your device, such as IP address, browser type, and operating system.
        </li>
        <li>
          <strong>Template Usage Data:</strong>
          {' '}
          Information about how you use our template and development tools, including deployment configurations and customizations.
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">3. How We Use Your Information</h2>
      <p>
        We may use the information we collect for various purposes, including to:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>Provide, maintain, and improve our Services</li>
        <li>Process and complete transactions</li>
        <li>Send you technical notices, updates, and support messages</li>
        <li>Respond to your comments, questions, and requests</li>
        <li>Develop new products and services</li>
        <li>Monitor and analyze trends, usage, and activities</li>
        <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
        <li>Personalize your experience</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">4. How We Share Your Information</h2>
      <p>
        We may share your information with third parties in the following circumstances:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>Service Providers:</strong>
          {' '}
          We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
        </li>
        <li>
          <strong>Legal Requirements:</strong>
          {' '}
          We may disclose your information if required to do so by law or in response to valid requests by public authorities.
        </li>
        <li>
          <strong>Business Transfers:</strong>
          {' '}
          If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
        </li>
        <li>
          <strong>With Your Consent:</strong>
          {' '}
          We may share your information with third parties when we have your consent to do so.
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">6. Your Rights</h2>
      <p>
        Depending on your location, you may have certain rights regarding your personal information, including:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>The right to access your personal information</li>
        <li>The right to rectify inaccurate personal information</li>
        <li>The right to request the deletion of your personal information</li>
        <li>The right to restrict the processing of your personal information</li>
        <li>The right to data portability</li>
        <li>The right to object to the processing of your personal information</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">7. Children's Privacy</h2>
      <p>
        Our Services are not intended for children under the age of 18. We do not intentionally collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">8. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">9. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at support@shipmore.xyz.
      </p>
    </div>
  );
}

function ChinesePrivacy() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">隐私政策</h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        最后更新日期:
        {' '}
        {new Date().toLocaleDateString('zh', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">1. 引言</h2>
      <p>
        在ShipMore（以下简称"我们"、"我们的"或"本公司"），我们重视您的隐私并致力于保护您的个人信息。本隐私政策解释了我们如何在您使用我们的网站、模板和服务（统称为"服务"）时收集、使用、披露和保护您的信息。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">2. 我们收集的信息</h2>
      <p>
        我们可能通过各种方式收集有关您的信息，包括：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>个人信息：</strong>
          您在创建账户或联系我们时提供的姓名、电子邮件地址和其他联系方式。
        </li>
        <li>
          <strong>使用数据：</strong>
          有关您如何与我们的服务互动的信息，包括访问时间、查看的页面和使用的功能。
        </li>
        <li>
          <strong>设备信息：</strong>
          有关您的设备的信息，如IP地址、浏览器类型和操作系统。
        </li>
        <li>
          <strong>模板使用数据：</strong>
          关于您如何使用我们的模板和开发工具的信息，包括部署配置和自定义设置。
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">3. 我们如何使用您的信息</h2>
      <p>
        我们可能将收集的信息用于各种目的，包括：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>提供、维护和改进我们的服务</li>
        <li>处理和完成交易</li>
        <li>向您发送技术通知、更新和支持消息</li>
        <li>回应您的评论、问题和请求</li>
        <li>开发新产品和服务</li>
        <li>监控和分析趋势、使用情况和活动</li>
        <li>检测、调查和防止欺诈交易和其他非法活动</li>
        <li>个性化您的体验</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">4. 我们如何共享您的信息</h2>
      <p>
        我们可能在以下情况下与第三方共享您的信息：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>服务提供商：</strong>
          我们可能与需要访问此类信息以代表我们开展工作的第三方供应商、顾问和其他服务提供商共享您的信息。
        </li>
        <li>
          <strong>法律要求：</strong>
          如果法律要求或响应公共当局的有效请求，我们可能会披露您的信息。
        </li>
        <li>
          <strong>业务转让：</strong>
          如果我们参与合并、收购或出售我们的全部或部分资产，您的信息可能作为该交易的一部分被转让。
        </li>
        <li>
          <strong>经您同意：</strong>
          在获得您的同意的情况下，我们可能与第三方共享您的信息。
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">5. 数据安全</h2>
      <p>
        我们实施适当的技术和组织措施来保护您的个人信息的安全。但是，请注意，没有任何通过互联网传输或电子存储的方法是100%安全的。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">6. 您的权利</h2>
      <p>
        根据您的位置，您可能对您的个人信息拥有某些权利，包括：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>访问您的个人信息的权利</li>
        <li>纠正不准确的个人信息的权利</li>
        <li>请求删除您的个人信息的权利</li>
        <li>限制处理您的个人信息的权利</li>
        <li>数据可携带性的权利</li>
        <li>反对处理您的个人信息的权利</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">7. 儿童隐私</h2>
      <p>
        我们的服务不适用于18岁以下的儿童。我们不会故意收集18岁以下儿童的个人信息。如果您是父母或监护人，并相信您的孩子向我们提供了个人信息，请联系我们。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">8. 本隐私政策的变更</h2>
      <p>
        我们可能会不时更新我们的隐私政策。我们将通过在此页面上发布新的隐私政策并更新"最后更新日期"来通知您任何变更。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">9. 联系我们</h2>
      <p>
        如果您对本隐私政策有任何疑问，请通过 support@shipmore.xyz 与我们联系。
      </p>
    </div>
  );
}
