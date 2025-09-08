-- 创建customers表
CREATE TABLE IF NOT EXISTS "customers" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" TEXT NOT NULL,
  "provider" VARCHAR(50) NOT NULL,
  "customer_id" VARCHAR(255) NOT NULL,
  "customer_email" VARCHAR(255),
  "customer_name" VARCHAR(255),
  "metadata" JSONB DEFAULT '{}',
  "default_payment_method" VARCHAR(255),
  "is_active" BOOLEAN DEFAULT true NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  "deleted_at" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

-- 添加索引
CREATE UNIQUE INDEX IF NOT EXISTS "customers_user_id_provider_idx" ON "customers" ("user_id", "provider");
CREATE UNIQUE INDEX IF NOT EXISTS "customers_provider_customer_id_idx" ON "customers" ("provider", "customer_id");

-- 更新meta/_journal.json以记录此次迁移 