import supportedLangs from '@/i18n/lang';

// 为所有支持的语言生成静态页面
export async function generateStaticParams() {
  return supportedLangs.map(locale => ({ locale }));
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 根据当前语言选择内容组件
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        {locale === 'zh' || locale === 'zh-TW' ? <ChineseSecurity /> : <EnglishSecurity />}
      </div>
    </div>
  );
}

function EnglishSecurity() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">Security Policy</h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Last updated:
        {' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">1. Introduction</h2>
      <p>
        At ShipMore, we are committed to ensuring the security of your data and our services. This Security Policy outlines the measures we take to protect your information and maintain a secure environment for all users of our platform.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">2. Data Protection</h2>
      <p>
        We implement multiple layers of security to protect your data:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>Encryption:</strong>
          {' '}
          All data transmitted between your device and our servers is encrypted using industry-standard TLS/SSL protocols.
        </li>
        <li>
          <strong>Secure Storage:</strong>
          {' '}
          Your data is stored in secure, encrypted databases with restricted access.
        </li>
        <li>
          <strong>Regular Backups:</strong>
          {' '}
          We perform regular backups to prevent data loss in case of system failures.
        </li>
        <li>
          <strong>Access Controls:</strong>
          {' '}
          We implement strict access controls to ensure that only authorized personnel can access sensitive information.
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">3. Account Security</h2>
      <p>
        We provide several features to help you keep your account secure:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>Strong Password Requirements:</strong>
          {' '}
          We enforce the use of strong passwords to protect your account.
        </li>
        <li>
          <strong>Secure Authentication:</strong>
          {' '}
          Our authentication system is designed to prevent unauthorized access to your account.
        </li>
        <li>
          <strong>Session Management:</strong>
          {' '}
          We monitor and manage user sessions to detect and prevent suspicious activities.
        </li>
        <li>
          <strong>Account Recovery:</strong>
          {' '}
          We have secure processes in place for account recovery in case you lose access to your account.
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">4. Infrastructure Security</h2>
      <p>
        Our infrastructure is designed with security as a priority:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>Secure Hosting:</strong>
          {' '}
          Our services are hosted in secure, industry-leading cloud environments with multiple security certifications.
        </li>
        <li>
          <strong>Firewalls and Intrusion Detection:</strong>
          {' '}
          We use firewalls and intrusion detection systems to monitor and block suspicious activities.
        </li>
        <li>
          <strong>Regular Security Updates:</strong>
          {' '}
          We regularly update our systems and dependencies to address security vulnerabilities.
        </li>
        <li>
          <strong>DDoS Protection:</strong>
          {' '}
          We implement measures to protect our services from distributed denial-of-service attacks.
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">5. Security Testing</h2>
      <p>
        We regularly test our security measures to ensure their effectiveness:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>Vulnerability Scanning:</strong>
          {' '}
          We perform regular vulnerability scans to identify and address potential security issues.
        </li>
        <li>
          <strong>Penetration Testing:</strong>
          {' '}
          We conduct penetration tests to evaluate the security of our systems and applications.
        </li>
        <li>
          <strong>Code Reviews:</strong>
          {' '}
          Our development process includes security-focused code reviews to identify and fix security issues early.
        </li>
        <li>
          <strong>Security Audits:</strong>
          {' '}
          We periodically conduct security audits to assess our overall security posture.
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">6. Incident Response</h2>
      <p>
        In the event of a security incident, we have procedures in place to:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>Quickly identify and contain the incident</li>
        <li>Investigate the cause and impact of the incident</li>
        <li>Notify affected users as required by applicable laws and regulations</li>
        <li>Implement measures to prevent similar incidents in the future</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">7. User Responsibilities</h2>
      <p>
        While we take extensive measures to protect your data and our services, security is a shared responsibility. We recommend that you:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>Use strong, unique passwords for your account</li>
        <li>Keep your login credentials confidential</li>
        <li>Be cautious of phishing attempts and suspicious links</li>
        <li>Keep your devices and software up to date</li>
        <li>Report any suspicious activities or potential security issues to us immediately</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">8. Changes to This Security Policy</h2>
      <p>
        We may update our Security Policy from time to time to reflect changes in our security practices or legal requirements. We will notify you of any significant changes by posting the new Security Policy on this page and updating the "Last updated" date.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">9. Contact Us</h2>
      <p>
        If you have any questions about our security practices or if you want to report a security issue, please contact us at support@shipmore.xyz.
      </p>
    </div>
  );
}

function ChineseSecurity() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">安全政策</h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        最后更新日期:
        {' '}
        {new Date().toLocaleDateString('zh', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">1. 引言</h2>
      <p>
        在ShipMore，我们致力于确保您的数据和我们的服务的安全。本安全政策概述了我们为保护您的信息并为我们平台的所有用户维护安全环境而采取的措施。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">2. 数据保护</h2>
      <p>
        我们实施多层安全措施来保护您的数据：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>加密：</strong>
          您的设备与我们的服务器之间传输的所有数据都使用行业标准的TLS/SSL协议进行加密。
        </li>
        <li>
          <strong>安全存储：</strong>
          您的数据存储在安全的、加密的数据库中，访问受到限制。
        </li>
        <li>
          <strong>定期备份：</strong>
          我们定期进行备份，以防止系统故障导致的数据丢失。
        </li>
        <li>
          <strong>访问控制：</strong>
          我们实施严格的访问控制，确保只有授权人员才能访问敏感信息。
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">3. 账户安全</h2>
      <p>
        我们提供多种功能来帮助您保持账户安全：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>强密码要求：</strong>
          我们强制使用强密码来保护您的账户。
        </li>
        <li>
          <strong>安全认证：</strong>
          我们的认证系统旨在防止未经授权访问您的账户。
        </li>
        <li>
          <strong>会话管理：</strong>
          我们监控和管理用户会话，以检测和防止可疑活动。
        </li>
        <li>
          <strong>账户恢复：</strong>
          如果您无法访问您的账户，我们有安全的流程来进行账户恢复。
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">4. 基础设施安全</h2>
      <p>
        我们的基础设施以安全为优先考虑因素设计：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>安全托管：</strong>
          我们的服务托管在安全的、行业领先的云环境中，具有多种安全认证。
        </li>
        <li>
          <strong>防火墙和入侵检测：</strong>
          我们使用防火墙和入侵检测系统来监控和阻止可疑活动。
        </li>
        <li>
          <strong>定期安全更新：</strong>
          我们定期更新我们的系统和依赖项，以解决安全漏洞。
        </li>
        <li>
          <strong>DDoS保护：</strong>
          我们实施措施保护我们的服务免受分布式拒绝服务攻击。
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">5. 安全测试</h2>
      <p>
        我们定期测试我们的安全措施，以确保其有效性：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>漏洞扫描：</strong>
          我们定期进行漏洞扫描，以识别和解决潜在的安全问题。
        </li>
        <li>
          <strong>渗透测试：</strong>
          我们进行渗透测试，以评估我们的系统和应用程序的安全性。
        </li>
        <li>
          <strong>代码审查：</strong>
          我们的开发过程包括以安全为重点的代码审查，以尽早识别和修复安全问题。
        </li>
        <li>
          <strong>安全审计：</strong>
          我们定期进行安全审计，以评估我们的整体安全状况。
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">6. 事件响应</h2>
      <p>
        在发生安全事件的情况下，我们有程序来：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>快速识别和控制事件</li>
        <li>调查事件的原因和影响</li>
        <li>按照适用的法律和法规通知受影响的用户</li>
        <li>实施措施防止类似事件在未来发生</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">7. 用户责任</h2>
      <p>
        虽然我们采取广泛的措施来保护您的数据和我们的服务，但安全是一种共同责任。我们建议您：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>为您的账户使用强大、独特的密码</li>
        <li>保持您的登录凭证的机密性</li>
        <li>警惕钓鱼尝试和可疑链接</li>
        <li>保持您的设备和软件更新</li>
        <li>立即向我们报告任何可疑活动或潜在的安全问题</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">8. 本安全政策的变更</h2>
      <p>
        我们可能会不时更新我们的安全政策，以反映我们的安全实践或法律要求的变化。我们将通过在此页面上发布新的安全政策并更新"最后更新日期"来通知您任何重大变更。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">9. 联系我们</h2>
      <p>
        如果您对我们的安全实践有任何疑问，或者如果您想报告安全问题，请通过 support@shipmore.xyz 与我们联系。
      </p>
    </div>
  );
}
