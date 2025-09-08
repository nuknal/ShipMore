CREATE TABLE "checkout_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"request_id" text NOT NULL,
	"checkout_url" text,
	"checkout_id" text,
	"order_id" text,
	"customer_id" text,
	"subscription_id" text,
	"product_id" text,
	"status" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"provider" varchar(50) NOT NULL,
	"customer_id" varchar(255) NOT NULL,
	"customer_email" varchar(255),
	"customer_name" varchar(255),
	"country" varchar(255),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"default_payment_method" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "subscriptions" RENAME COLUMN "payment_method" TO "provider";--> statement-breakpoint
ALTER TABLE "usage_data" RENAME COLUMN "plan_id" TO "subscriptionId";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_plan_id_plans_id_fk";
--> statement-breakpoint
ALTER TABLE "usage_data" DROP CONSTRAINT "usage_data_plan_id_plans_id_fk";
--> statement-breakpoint
DROP INDEX "subscriptions_user_id_idx";--> statement-breakpoint
DROP INDEX "usage_data_user_id_idx";--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "plan_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "start_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "end_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "trial_end_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "credits" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "subscription_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "product_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "usage_data" ADD COLUMN "credit_total" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "usage_data" ADD COLUMN "credit_used" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "checkout_sessions" ADD CONSTRAINT "checkout_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "customers_user_id_provider_idx" ON "customers" USING btree ("user_id","provider");--> statement-breakpoint
CREATE UNIQUE INDEX "customers_provider_customer_id_idx" ON "customers" USING btree ("provider","customer_id");