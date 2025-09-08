CREATE TABLE "visitor_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"visitor_id" text NOT NULL,
	"ip" text NOT NULL,
	"user_agent" text NOT NULL,
	"referer" text,
	"path" text NOT NULL,
	"query_params" jsonb DEFAULT '{}'::jsonb,
	"visit_time" timestamp with time zone DEFAULT now() NOT NULL,
	"country" text,
	"region" text,
	"city" text,
	"device_type" text,
	"browser" text,
	"os" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "usage_data" ALTER COLUMN "text_total" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "usage_data" ALTER COLUMN "image_total" DROP NOT NULL;