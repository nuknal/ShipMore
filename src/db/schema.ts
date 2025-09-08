import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

// 用户表 - NextAuth.js 兼容
export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  password: text('password'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// 账户表 - NextAuth.js 兼容
export const accounts = pgTable(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  account => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

// 会话表 - NextAuth.js 兼容
export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// 验证令牌表 - NextAuth.js 兼容
export const verificationTokens = pgTable(
  'verificationTokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  verificationToken => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

// 认证器表 - NextAuth.js 兼容 (WebAuthn)
export const authenticators = pgTable(
  'authenticators',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  authenticator => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);

// 文件表 - 文件上传管理
export const files = pgTable('files', {
  id: serial('id').notNull().primaryKey(),
  key: text('key').notNull().unique(),
  originalName: text('original_name').notNull(),
  contentType: varchar('content_type', { length: 100 }).notNull(),
  size: integer('size').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
  signedUrl: text('signed_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// 订阅计划表
export const plans = pgTable('plans', {
  id: text('id').notNull().primaryKey(),
  productId: varchar('product_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  interval: varchar('interval', { length: 20 }).notNull(),
  description: text('description').notNull(),
  credits: integer('credits').notNull(),
  features: jsonb('features').$type<string[]>().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// 订阅表
export const subscriptions = pgTable('subscriptions', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  planId: text('plan_id'),
  subscriptionId: text('subscription_id').notNull(),
  productId: text('product_id').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  trialEndDate: timestamp('trial_end_date', { withTimezone: true }),
  provider: varchar('provider', { length: 255 }),
  price: integer('price').notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  interval: varchar('interval', { length: 20 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// 结账会话表
export const checkoutSessions = pgTable('checkout_sessions', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  requestId: text('request_id').notNull(),
  checkoutUrl: text('checkout_url'),
  checkoutId: text('checkout_id'),
  orderId: text('order_id'),
  customerId: text('customer_id'),
  subscriptionId: text('subscription_id'),
  productId: text('product_id'),
  status: varchar('status', { length: 50 }).notNull(), // pending, completed, failed, expired
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// 使用量表
export const usageData = pgTable('usage_data', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  subscriptionId: text('subscriptionId').notNull(),
  creditTotal: integer('credit_total').notNull(),
  creditUsed: integer('credit_used').default(0).notNull(),
  textTotal: integer('text_total'),
  textUsed: integer('text_used').default(0).notNull(),
  imageTotal: integer('image_total'),
  imageUsed: integer('image_used').default(0).notNull(),
  currentPeriodStartDate: timestamp('current_period_start_date', { withTimezone: true }),
  currentPeriodEndDate: timestamp('current_period_end_date', { withTimezone: true }),
  resetDate: timestamp('reset_date', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// 账单历史表
export const billingHistory = pgTable('billing_history', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  subscriptionId: text('subscription_id'),
  amount: integer('amount').notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  status: varchar('status', { length: 20 }).notNull(),
  description: text('description').notNull(),
  paymentMethod: varchar('payment_method', { length: 100 }).notNull(),
  invoiceUrl: varchar('invoice_url', { length: 255 }),
  receiptUrl: varchar('receipt_url', { length: 255 }),
  billingType: varchar('billing_type', { length: 20 }),
  billingPeriod: varchar('billing_period', { length: 20 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// 设置表
export const settings = pgTable('settings', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  theme: varchar('theme', { length: 20 }).default('dark'),
  language: varchar('language', { length: 10 }).default('en'),
  notificationEnabled: boolean('notification_enabled').default(true),
  allowDataCollection: boolean('allow_data_collection').default(true),
  preferences: jsonb('preferences').default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, table => [
  uniqueIndex('settings_user_id_idx').on(table.userId),
]);

// 客户表（用于存储用户与支付服务商的关系）
export const customers = pgTable('customers', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  provider: varchar('provider', { length: 50 }).notNull(), // 支付服务提供商，如 'stripe', 'paddle' 等
  customerId: varchar('customer_id', { length: 255 }).notNull(), // 在服务提供商系统中的客户ID
  customerEmail: varchar('customer_email', { length: 255 }), // 客户在服务提供商系统中的邮箱
  customerName: varchar('customer_name', { length: 255 }), // 客户在服务提供商系统中的名称
  country: varchar('country', { length: 255 }), // 客户在服务提供商系统中的国家
  metadata: jsonb('metadata').default({}), // 额外的元数据
  defaultPaymentMethod: varchar('default_payment_method', { length: 255 }), // 默认支付方式
  isActive: boolean('is_active').default(true).notNull(), // 是否激活
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, table => [
  uniqueIndex('customers_user_id_provider_idx').on(table.userId, table.provider),
  uniqueIndex('customers_provider_customer_id_idx').on(table.provider, table.customerId),
]);

// 多语言翻译表
export const translations = pgTable('translations', {
  id: serial('id').notNull().primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
  value: text('value').notNull(),
  language: varchar('language', { length: 10 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, table => [
  uniqueIndex('translations_key_lang_idx').on(table.key, table.language),
]);

// 访问记录表
export const visitorLogs = pgTable('visitor_logs', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id'),
  visitorId: text('visitor_id').notNull(),
  ip: text('ip').notNull(),
  userAgent: text('user_agent').notNull(),
  referer: text('referer'),
  path: text('path').notNull(),
  queryParams: jsonb('query_params').default({}),
  visitTime: timestamp('visit_time', { withTimezone: true }).defaultNow().notNull(),
  country: text('country'),
  region: text('region'),
  city: text('city'),
  deviceType: text('device_type'),
  browser: text('browser'),
  method: text('method'),
  os: text('os'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// LLM Token 使用记录表
export const llmTokenUsage = pgTable('llm_token_usage', {
  id: serial('id').notNull().primaryKey(),
  userId: text('user_id').notNull(),
  provider: text('provider').notNull(),
  model: text('model'),
  promptTokens: integer('prompt_tokens').default(0),
  completionTokens: integer('completion_tokens').default(0),
  totalTokens: integer('total_tokens').default(0),
  duration: integer('duration').default(0),
  requestId: text('request_id'),
  endpoint: text('endpoint'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, table => [
  index('llm_token_usage_user_id_idx').on(table.userId),
  index('llm_token_usage_created_at_idx').on(table.createdAt),
]);