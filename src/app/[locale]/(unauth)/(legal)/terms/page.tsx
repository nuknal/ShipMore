import supportedLangs from '@/i18n/lang';

// 为所有支持的语言生成静态页面
export async function generateStaticParams() {
  return supportedLangs.map(locale => ({ locale }));
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 根据当前语言选择内容组件
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        {locale === 'zh' || locale === 'zh-TW' ? <ChineseTerms /> : <EnglishTerms />}
      </div>
    </div>
  );
}

function EnglishTerms() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Last updated:
        {' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">1. Introduction</h2>
      <p>
        Welcome to ShipMore ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, template, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">2. Eligibility</h2>
      <p>
        You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet this eligibility requirement and that you have the legal capacity to enter into these Terms.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">3. User Accounts</h2>
      <p>
        To access certain features of our Services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account and to update your information as necessary.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">4. User Content</h2>
      <p>
        Our Services may allow you to upload, submit, store, send, or receive content ("User Content"). You retain ownership of any intellectual property rights that you hold in your User Content.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">5. Prohibited Conduct</h2>
      <p>
        You agree not to engage in any of the following prohibited activities:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>Violating any applicable laws or regulations</li>
        <li>Engaging in deceptive, fraudulent, or misleading practices</li>
        <li>Creating, sharing, or promoting harmful, offensive, or inappropriate content</li>
        <li>Infringing the intellectual property rights of others</li>
        <li>Uploading or transmitting viruses, malware, or other malicious code</li>
        <li>Interfering with or disrupting the integrity or performance of our Services</li>
        <li>Attempting to gain unauthorized access to our Services or related systems</li>
        <li>Harassing, threatening, or intimidating other users</li>
        <li>Using our Services for any illegal, harmful, or unauthorized purpose</li>
        <li>Circumventing or attempting to circumvent our security measures</li>
        <li>Impersonating others or providing false information</li>
        <li>Using our Services to spread misinformation or engage in manipulation</li>
        <li>Violating the privacy rights of others</li>
        <li>Using automated tools or bots without explicit permission</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">6. Intellectual Property</h2>
      <p>
        Our Services and all content and materials included on our Services, such as text, graphics, logos, images, and software, are the property of ShipMore or our licensors and are protected by copyright, trademark, and other intellectual property laws.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">7. Platform Compliance and Monitoring</h2>
      <p>
        We are committed to maintaining a safe, secure, and compliant platform. To ensure this:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>We actively monitor and review user activities and content to prevent prohibited conduct</li>
        <li>We employ both automated and manual systems to detect and prevent violations of these Terms</li>
        <li>We cooperate with law enforcement and regulatory authorities when required</li>
        <li>We maintain comprehensive logs and records to ensure accountability and transparency</li>
        <li>We regularly update our security measures and compliance procedures</li>
        <li>We reserve the right to investigate any suspected violations of these Terms</li>
        <li>We may take immediate action, including suspension or termination, for any violations</li>
      </ul>
      <p>
        Users are expected to report any violations or suspicious activities to help maintain platform integrity. We encourage responsible use and provide clear guidelines to ensure all users understand acceptable behavior.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">8. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to our Services at any time, with or without cause, and with or without notice. Upon termination, your right to use our Services will immediately cease.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">9. Disclaimer of Warranties</h2>
      <p>
        OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">10. Limitation of Liability</h2>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF OR INABILITY TO USE OUR SERVICES.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">11. Changes to Terms</h2>
      <p>
        We may modify these Terms at any time. If we make material changes to these Terms, we will provide notice through our Services or by other means. Your continued use of our Services after such notice constitutes your acceptance of the modified Terms.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">12. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">13. Contact Information</h2>
      <p>
        If you have any questions about these Terms, please contact us at support@shipmore.xyz.
      </p>
    </div>
  );
}

function ChineseTerms() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">服务条款</h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        最后更新日期:
        {' '}
        {new Date().toLocaleDateString('zh', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">1. 引言</h2>
      <p>
        欢迎使用ShipMore（以下简称"我们"、"我们的"或"本公司"）。本服务条款（以下简称"条款"）规范您对我们网站、模板和服务（统称为"服务"）的访问和使用。通过访问或使用我们的服务，您同意受这些条款的约束。如果您不同意这些条款，请不要使用我们的服务。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">2. 资格要求</h2>
      <p>
        您必须年满18岁才能使用我们的服务。通过使用我们的服务，您声明并保证您符合此资格要求，并且您具有签订这些条款的法律能力。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">3. 用户账户</h2>
      <p>
        要访问我们服务的某些功能，您可能需要创建一个账户。您有责任维护您的账户凭证的机密性，并对您账户下发生的所有活动负责。您同意在创建账户时提供准确和完整的信息，并在必要时更新您的信息。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">4. 用户内容</h2>
      <p>
        我们的服务可能允许您上传、提交、存储、发送或接收内容（"用户内容"）。您保留您对用户内容持有的任何知识产权。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">5. 禁止行为</h2>
      <p>
        您同意不从事以下任何禁止活动：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>违反任何适用法律或法规</li>
        <li>从事欺骗性、欺诈性或误导性做法</li>
        <li>创建、分享或推广有害、冒犯性或不当内容</li>
        <li>侵犯他人的知识产权</li>
        <li>上传或传输病毒、恶意软件或其他恶意代码</li>
        <li>干扰或破坏我们服务的完整性或性能</li>
        <li>尝试未经授权访问我们的服务或相关系统</li>
        <li>骚扰、威胁或恐吓其他用户</li>
        <li>将我们的服务用于任何非法、有害或未经授权的目的</li>
        <li>规避或试图规避我们的安全措施</li>
        <li>冒充他人或提供虚假信息</li>
        <li>使用我们的服务传播虚假信息或进行操纵</li>
        <li>侵犯他人的隐私权</li>
        <li>在未明确许可的情况下使用自动化工具或机器人</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">6. 知识产权</h2>
      <p>
        我们的服务以及我们服务中包含的所有内容和材料，如文本、图形、标志、图像和软件，均为ShipMore或我们的许可方的财产，并受版权、商标和其他知识产权法律的保护。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">7. 平台合规与监控</h2>
      <p>
        我们致力于维护一个安全、可靠且合规的平台。为确保这一点：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>我们积极监控和审查用户活动及内容，以防止被禁止的行为</li>
        <li>我们采用自动化和人工系统来检测和预防违反这些条款的行为</li>
        <li>在需要时，我们与执法部门和监管机构合作</li>
        <li>我们维护完整的日志和记录，以确保问责制和透明度</li>
        <li>我们定期更新安全措施和合规程序</li>
        <li>我们保留调查任何涉嫌违反这些条款行为的权利</li>
        <li>对于任何违规行为，我们可能立即采取行动，包括暂停或终止服务</li>
      </ul>
      <p>
        用户有责任报告任何违规行为或可疑活动，以帮助维护平台的完整性。我们鼓励负责任的使用，并提供明确的指导方针，确保所有用户了解可接受的行为。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">8. 终止</h2>
      <p>
        我们保留随时暂停或终止您访问我们服务的权利，无论是否有原因，也无论是否通知。一旦终止，您使用我们服务的权利将立即停止。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">9. 免责声明</h2>
      <p>
        我们的服务按"原样"和"可用性"提供，不提供任何形式的明示或暗示保证。在法律允许的最大范围内，我们否认所有保证，包括但不限于适销性、特定用途适用性和非侵权的暗示保证。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">10. 责任限制</h2>
      <p>
        在法律允许的最大范围内，我们不对因您使用或无法使用我们的服务而产生的任何间接、偶然、特殊、后果性或惩罚性损害承担责任。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">11. 条款变更</h2>
      <p>
        我们可能随时修改这些条款。如果我们对这些条款进行重大更改，我们将通过我们的服务或其他方式提供通知。在此类通知后继续使用我们的服务，即表示您接受修改后的条款。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">12. 适用法律</h2>
      <p>
        这些条款应受我们运营所在司法管辖区的法律管辖并按其解释，不考虑其冲突法规定。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">13. 联系信息</h2>
      <p>
        如果您对这些条款有任何疑问，请通过 support@shipmore.xyz 与我们联系。
      </p>
    </div>
  );
}
