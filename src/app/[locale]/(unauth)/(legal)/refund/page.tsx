import supportedLangs from '@/i18n/lang';

// 为所有支持的语言生成静态页面
export async function generateStaticParams() {
  return supportedLangs.map(locale => ({ locale }));
}

export default async function RefundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 根据当前语言选择内容组件
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        {locale === 'zh' || locale === 'zh-TW' ? <ChineseRefund /> : <EnglishRefund />}
      </div>
    </div>
  );
}

function EnglishRefund() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">Refund Policy</h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Last updated:
        {' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">1. Introduction</h2>
      <p>
        At ShipMore, we strive to ensure your satisfaction with our template and services. This Refund Policy outlines the terms and conditions for refunds related to our template purchases and subscription plans.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">2. Subscription Refunds</h2>
      <p>
        We offer refunds under the following conditions:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>14-Day Money-Back Guarantee:</strong>
          {' '}
          If you are not satisfied with our service, you may request a full refund within 14 days of your initial subscription purchase.
        </li>
        <li>
          <strong>Technical Issues:</strong>
          {' '}
          If you experience significant technical issues that prevent you from using our service and our support team is unable to resolve them, you may be eligible for a refund.
        </li>
        <li>
          <strong>Duplicate Charges:</strong>
          {' '}
          If you were charged multiple times for the same subscription, the duplicate charges will be refunded.
        </li>
        <li>
          <strong>Service Unavailability:</strong>
          {' '}
          If our service is unavailable for an extended period (more than 24 consecutive hours), you may be eligible for a prorated refund for the affected period.
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">3. Non-Refundable Items</h2>
      <p>
        The following are generally not eligible for refunds:
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>Subscription Cancellations After 14 Days:</strong>
          {' '}
          Refunds will not be provided for subscription cancellations made after the 14-day money-back guarantee period.
        </li>
        <li>
          <strong>Partial Usage:</strong>
          {' '}
          If you have used a significant portion of the service before requesting a refund, we may deny or prorate the refund based on usage.
        </li>
        <li>
          <strong>Add-on Services:</strong>
          {' '}
          One-time purchases or add-on services may not be refundable once they have been delivered or activated.
        </li>
        <li>
          <strong>Violations of Terms:</strong>
          {' '}
          Refunds will not be provided if your account was suspended or terminated due to violations of our Terms of Service.
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">4. Refund Process</h2>
      <p>
        To request a refund, please follow these steps:
      </p>
      <ol className="mb-6 list-decimal pl-6">
        <li>Contact our support team at support@shipmore.xyz with the subject line "Refund Request".</li>
        <li>Include your account email address and the reason for your refund request.</li>
        <li>Provide any relevant information or documentation that supports your refund request.</li>
      </ol>
      <p>
        We will review your request and respond within 5 business days. If your refund is approved, it will be processed using the original payment method. Depending on your payment provider, it may take 5-10 business days for the refund to appear in your account.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">5. Prorated Refunds</h2>
      <p>
        In some cases, we may offer prorated refunds based on the unused portion of your subscription. The prorated amount will be calculated from the date of the refund request to the end of the billing cycle.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">6. Currency and Payment Processing Fees</h2>
      <p>
        Refunds will be issued in the same currency as the original payment. Please note that we do not refund any payment processing fees that may have been charged by your payment provider. Currency exchange rate differences may also apply if your original payment was made in a different currency.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">7. Changes to This Refund Policy</h2>
      <p>
        We may update our Refund Policy from time to time to reflect changes in our business practices or legal requirements. We will notify you of any significant changes by posting the new Refund Policy on this page and updating the "Last updated" date.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">8. Contact Us</h2>
      <p>
        If you have any questions about our Refund Policy, please contact us at support@shipmore.xyz.
      </p>
    </div>
  );
}

function ChineseRefund() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-6 text-3xl font-bold">退款政策</h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        最后更新日期:
        {' '}
        {new Date().toLocaleDateString('zh', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">1. 引言</h2>
      <p>
        在ShipMore，我们致力于确保您对我们的模板和服务感到满意。本退款政策概述了与我们的模板购买和订阅计划相关的退款条款和条件。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">2. 订阅退款</h2>
      <p>
        我们在以下条件下提供退款：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>14天退款保证：</strong>
          如果您对我们的服务不满意，您可以在初次订阅购买后14天内申请全额退款。
        </li>
        <li>
          <strong>技术问题：</strong>
          如果您遇到严重的技术问题，导致您无法使用我们的服务，且我们的支持团队无法解决这些问题，您可能有资格获得退款。
        </li>
        <li>
          <strong>重复收费：</strong>
          如果您因同一订阅被多次收费，重复收取的费用将被退还。
        </li>
        <li>
          <strong>服务不可用：</strong>
          如果我们的服务长时间不可用（连续超过24小时），您可能有资格获得受影响期间的按比例退款。
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">3. 不可退款项目</h2>
      <p>
        以下情况通常不符合退款条件：
      </p>
      <ul className="mb-6 list-disc pl-6">
        <li>
          <strong>14天后的订阅取消：</strong>
          对于在14天退款保证期后进行的订阅取消，将不提供退款。
        </li>
        <li>
          <strong>部分使用：</strong>
          如果您在申请退款前已使用了大部分服务，我们可能会拒绝退款或根据使用情况按比例退款。
        </li>
        <li>
          <strong>附加服务：</strong>
          一次性购买或附加服务在交付或激活后可能不可退款。
        </li>
        <li>
          <strong>违反条款：</strong>
          如果您的账户因违反我们的服务条款而被暂停或终止，将不提供退款。
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">4. 退款流程</h2>
      <p>
        要申请退款，请按照以下步骤操作：
      </p>
      <ol className="mb-6 list-decimal pl-6">
        <li>联系我们的支持团队，发送邮件至support@shipmore.xyz，主题为"退款申请"。</li>
        <li>包括您的账户电子邮件地址和退款申请的原因。</li>
        <li>提供支持您的退款申请的任何相关信息或文档。</li>
      </ol>
      <p>
        我们将审核您的申请并在5个工作日内回复。如果您的退款获得批准，将使用原始支付方式处理。根据您的支付提供商，退款可能需要5-10个工作日才能显示在您的账户中。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">5. 按比例退款</h2>
      <p>
        在某些情况下，我们可能会根据您订阅的未使用部分提供按比例退款。按比例金额将从退款申请日期到计费周期结束日期计算。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">6. 货币和支付处理费用</h2>
      <p>
        退款将以与原始付款相同的货币发放。请注意，我们不退还您的支付提供商可能收取的任何支付处理费用。如果您的原始付款是以不同货币支付的，货币汇率差异也可能适用。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">7. 本退款政策的变更</h2>
      <p>
        我们可能会不时更新我们的退款政策，以反映我们的业务实践或法律要求的变化。我们将通过在此页面上发布新的退款政策并更新"最后更新日期"来通知您任何重大变更。
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">8. 联系我们</h2>
      <p>
        如果您对我们的退款政策有任何疑问，请联系我们：support@shipmore.xyz。
      </p>
    </div>
  );
}
