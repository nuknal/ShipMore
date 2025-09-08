ALTER TABLE "billing_history" DROP CONSTRAINT "billing_history_plan_id_plans_id_fk";
--> statement-breakpoint
ALTER TABLE "billing_history" ADD COLUMN "subscription_id" text;--> statement-breakpoint
ALTER TABLE "billing_history" DROP COLUMN "plan_id";