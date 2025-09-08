ALTER TABLE "billing_history" ALTER COLUMN "amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "usage_data" ADD COLUMN "current_period_start_date" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "usage_data" ADD COLUMN "current_period_end_date" timestamp with time zone;