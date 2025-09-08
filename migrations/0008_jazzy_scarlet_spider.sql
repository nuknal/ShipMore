CREATE TABLE "llm_token_usage" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"provider" text NOT NULL,
	"model" text,
	"prompt_tokens" integer DEFAULT 0,
	"completion_tokens" integer DEFAULT 0,
	"total_tokens" integer DEFAULT 0,
	"request_id" text,
	"endpoint" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "llm_token_usage_user_id_idx" ON "llm_token_usage" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "llm_token_usage_created_at_idx" ON "llm_token_usage" USING btree ("created_at");