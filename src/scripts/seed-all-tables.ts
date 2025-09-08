import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import {
  billingHistory,
  characterAnalysis,
  characters,
  communicationSuggestions,
  emotionalAnalysis,
  files,
  interactions,
  messages,
  milestones,
  plans,
  relationshipDevelopment,
  settings,
  significantEvents,
  subscriptions,
  translations,
  usageData,
  users,
} from '@/db/schema';

export async function connectDb() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  return drizzle(client);
}

async function main() {
  console.log('开始初始化所有表的模拟数据...');
  const db = await connectDb();

  // 检查是否已有用户数据
  const existingUsers = await db.select().from(users).limit(1);
  if (existingUsers.length === 0) {
    console.log('没有找到用户数据，请先创建用户');
    return;
  }

  // 获取第一个用户作为示例
  const user = existingUsers[0]!;
  console.log(`使用用户 ID: ${user.id}`);

  // 检查用户是否有角色
  const existingCharacters = await db.select().from(characters).where(sql`${characters.userId} = ${user.id}`);
  if (existingCharacters.length === 0) {
    console.log('该用户没有角色，请先创建角色');
    return;
  }

  console.log(`找到 ${existingCharacters.length} 个角色`);
  const character = existingCharacters[0]!;

  // 1. 创建角色分析数据
  console.log('创建角色分析数据...');
  await db.insert(characterAnalysis).values({
    characterId: character.id,
    mbtiAnalysis: {
      type: 'ENFJ',
      description: '热情开朗的教导者',
      strengths: ['善解人意', '有领导力', '善于沟通', '有责任感'],
      weaknesses: ['过度理想化', '过于敏感', '优柔寡断', '过度牺牲自我'],
      cognitiveStack: [
        { function: 'Fe', description: '外向感觉：关注他人情感和需求' },
        { function: 'Ni', description: '内向直觉：洞察力强，看到事物本质' },
        { function: 'Se', description: '外向感知：注意细节和当下体验' },
        { function: 'Ti', description: '内向思考：分析和逻辑推理能力' },
      ],
    },
    bigFiveAnalysis: {
      openness: 85,
      conscientiousness: 75,
      extraversion: 90,
      agreeableness: 88,
      neuroticism: 40,
      details: [
        { trait: '开放性', score: 85, description: '富有创造力，喜欢新体验' },
        { trait: '尽责性', score: 75, description: '有组织能力，可靠' },
        { trait: '外向性', score: 90, description: '社交能力强，精力充沛' },
        { trait: '宜人性', score: 88, description: '友善，乐于助人' },
        { trait: '神经质', score: 40, description: '情绪稳定，应对压力能力强' },
      ],
    },
    psychologicalTraits: [
      { title: '同理心', description: '能够理解和分享他人的感受' },
      { title: '自信心', description: '相信自己的能力和判断' },
      { title: '适应力', description: '能够适应变化和新环境' },
    ],
  });

  // 2. 创建情感分析数据
  console.log('创建情感分析数据...');
  await db.insert(emotionalAnalysis).values({
    characterId: character.id,
    emotionalTrends: [
      { date: '2023-01-01', emotion: '快乐', intensity: 8 },
      { date: '2023-01-02', emotion: '焦虑', intensity: 6 },
      { date: '2023-01-03', emotion: '平静', intensity: 5 },
      { date: '2023-01-04', emotion: '兴奋', intensity: 9 },
      { date: '2023-01-05', emotion: '满足', intensity: 7 },
    ],
    emotionalRegulation: {
      overallScore: 75,
      aspects: [
        { aspect: '情绪识别', score: 80, description: '能够准确识别自己的情绪状态' },
        { aspect: '情绪表达', score: 75, description: '能够适当表达情绪，不压抑也不过度宣泄' },
        { aspect: '情绪调节', score: 70, description: '能够调整情绪，但在极端情况下有困难' },
      ],
    },
  });

  // 3. 创建交流建议数据
  console.log('创建交流建议数据...');
  await db.insert(communicationSuggestions).values({
    characterId: character.id,
    communicationPreferences: [
      {
        category: '沟通方式',
        preferences: [
          { title: '直接表达', description: '喜欢直接明了的沟通，不喜欢拐弯抹角' },
          { title: '积极反馈', description: '喜欢收到积极的反馈和肯定' },
        ],
      },
      {
        category: '交流环境',
        preferences: [
          { title: '一对一交流', description: '更喜欢一对一的深入交流' },
          { title: '安静环境', description: '在安静的环境中更容易集中注意力' },
        ],
      },
    ],
    effectiveStrategies: [
      { title: '积极倾听', description: '表现出真诚的兴趣和关注' },
      { title: '提问反馈', description: '通过提问确认理解并获取反馈' },
      { title: '情感共鸣', description: '表达对其情感的理解和共鸣' },
    ],
  });

  // 4. 创建消息数据
  console.log('创建消息数据...');
  const msgs = [
    {
      characterId: character.id,
      userId: user.id,
      content: '你好，最近怎么样？',
      isUser: true,
      typingComplete: true,
    },
    {
      characterId: character.id,
      userId: user.id,
      content: '我很好，谢谢关心！最近在忙些什么呢？',
      isUser: false,
      thinking: '用户似乎想开始一个友好的对话，我应该以积极的态度回应并询问他的近况。',
      displayedThinking: '思考用户的问候意图，准备友好回应...',
      thinkingTypingComplete: true,
      typingComplete: true,
    },
    {
      characterId: character.id,
      userId: user.id,
      content: '我最近在学习新的编程语言，感觉很有挑战性。',
      isUser: true,
      typingComplete: true,
    },
    {
      characterId: character.id,
      userId: user.id,
      content: '那很棒啊！学习新技能总是充满挑战但也很有成就感。你在学习哪种编程语言？',
      isUser: false,
      thinking: '用户分享了他正在学习编程，这表明他对技术有兴趣并愿意接受挑战。我应该表示支持并进一步了解详情。',
      displayedThinking: '分析用户的学习经历，准备鼓励性回应...',
      thinkingTypingComplete: true,
      typingComplete: true,
    },
  ];

  for (const message of msgs) {
    await db.insert(messages).values(message);
  }

  // 5. 创建互动记录数据
  console.log('创建互动记录数据...');
  await db.insert(interactions).values([
    {
      type: '日常对话',
      topic: '近况分享',
      mood: '愉快',
      summary: '讨论了近期的学习和工作情况',
      details: '用户分享了正在学习新编程语言的经历，表达了对技术学习的兴趣和挑战感。',
      characterId: character.id,
      userId: user.id,
    },
    {
      type: '情感支持',
      topic: '工作压力',
      mood: '焦虑',
      summary: '讨论了工作中面临的压力和应对方法',
      details: '用户表达了对工作截止日期的担忧，我提供了时间管理和减压的建议。',
      characterId: character.id,
      userId: user.id,
    },
  ]);

  // 6. 创建重要事件数据
  console.log('创建重要事件数据...');
  await db.insert(significantEvents).values([
    {
      title: '首次深入交流',
      description: '第一次进行了超过一小时的深入交谈',
      impact: '建立了初步的信任和理解',
      tags: ['里程碑', '关系发展'],
      characterId: character.id,
      userId: user.id,
    },
    {
      title: '情感突破',
      description: '用户首次分享个人困境并寻求建议',
      impact: '增强了情感连接和支持关系',
      tags: ['情感支持', '信任建立'],
      characterId: character.id,
      userId: user.id,
    },
  ]);

  // 7. 创建关系发展数据
  console.log('创建关系发展数据...');
  await db.insert(relationshipDevelopment).values({
    overview: '关系稳步发展，已建立良好的信任和沟通基础',
    closenessLevel: 7,
    characterId: character.id,
    userId: user.id,
  });

  // 8. 创建里程碑数据
  console.log('创建里程碑数据...');
  await db.insert(milestones).values([
    {
      userId: user.id,
      characterId: character.id,
      title: '首次对话',
      description: '完成了第一次完整的对话交流',
    },
    {
      userId: user.id,
      characterId: character.id,
      title: '深入了解',
      description: '交流次数达到10次，开始形成稳定的交流模式',
    },
  ]);

  // 9. 创建文件数据
  console.log('创建文件数据...');
  await db.insert(files).values({
    key: 'user_upload_1',
    originalName: 'profile_picture.jpg',
    contentType: 'image/jpeg',
    size: 1024 * 100, // 100KB
    userId: user.id,
    characterId: character.id,
    signedUrl: 'https://example.com/signed-url/profile_picture.jpg',
  });

  // 10. 创建订阅计划数据
  console.log('创建订阅计划数据...');
  const plan = await db.insert(plans).values({
    productId: 'prod_basic_monthly',
    name: '基础月度计划',
    price: 9.99,
    currency: 'USD',
    interval: 'month',
    description: '基础功能的月度订阅计划',
    features: ['无限对话', '基础分析', '5GB存储空间'],
  }).returning();

  // 11. 创建订阅数据
  console.log('创建订阅数据...');
  await db.insert(subscriptions).values({
    userId: user.id,
    planId: plan[0]!.id,
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后
    cancelAtPeriodEnd: false,
    price: 9.99,
    currency: 'USD',
    interval: 'month',
  });

  // 12. 创建使用量数据
  console.log('创建使用量数据...');
  await db.insert(usageData).values({
    userId: user.id,
    planId: plan[0]!.id,
    textTotal: 1000,
    textUsed: 150,
    imageTotal: 100,
    imageUsed: 10,
    resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后
  });

  // 13. 创建账单历史数据
  console.log('创建账单历史数据...');
  await db.insert(billingHistory).values({
    userId: user.id,
    planId: plan[0]!.id,
    amount: 9.99,
    currency: 'USD',
    status: 'paid',
    description: '基础月度计划 - 首次付款',
    paymentMethod: 'credit_card',
    invoiceUrl: 'https://example.com/invoices/inv_001',
    receiptUrl: 'https://example.com/receipts/rec_001',
  });

  // 14. 创建设置数据
  console.log('创建设置数据...');
  await db.insert(settings).values({
    userId: user.id,
    theme: 'dark',
    language: 'zh',
    notificationEnabled: true,
    saveAnalysisHistory: true,
    saveChatHistory: true,
    allowDataCollection: true,
    preferences: { fontsize: 'medium', messageSound: true },
  });

  // 15. 创建多语言翻译数据
  console.log('创建多语言翻译数据...');
  await db.insert(translations).values([
    {
      key: 'welcome_message',
      value: '欢迎使用我们的应用！',
      language: 'zh',
    },
    {
      key: 'welcome_message',
      value: 'Welcome to our application!',
      language: 'en',
    },
    {
      key: 'settings_title',
      value: '设置',
      language: 'zh',
    },
    {
      key: 'settings_title',
      value: 'Settings',
      language: 'en',
    },
  ]);

  console.log('所有表的模拟数据初始化完成');
}

main()
  .catch((e) => {
    console.error('初始化数据时出错:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('数据初始化脚本执行完毕');
    process.exit(0);
  });
