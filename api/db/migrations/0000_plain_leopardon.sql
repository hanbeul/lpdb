CREATE TABLE IF NOT EXISTS "visit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"license_plate" text NOT NULL,
	"image" text,
	"amount_money" integer,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now()
);
