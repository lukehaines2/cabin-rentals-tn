import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'lead-viewer');
  CREATE TYPE "public"."enum_users_status" AS ENUM('active', 'disabled');
  CREATE TYPE "public"."enum_media_source_method" AS ENUM('ai-generated', 'business-supplied', 'licensed');
  CREATE TYPE "public"."enum_media_approval_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TYPE "public"."enum_locations_kind" AS ENUM('town', 'area');
  CREATE TYPE "public"."enum_locations_town" AS ENUM('gatlinburg', 'pigeon-forge', 'sevierville');
  CREATE TYPE "public"."enum_amenities_category" AS ENUM('wellness', 'view', 'leisure', 'guest-policy', 'interior');
  CREATE TYPE "public"."enum_properties_listing_status" AS ENUM('onboarding', 'active', 'hidden', 'archived');
  CREATE TYPE "public"."enum_properties_conversion_action_mode" AS ENUM('enquiry', 'external', 'hosted-engine');
  CREATE TYPE "public"."enum_properties_approval_status" AS ENUM('pending', 'approved-demo', 'approved-public');
  CREATE TYPE "public"."enum_properties_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__properties_v_version_listing_status" AS ENUM('onboarding', 'active', 'hidden', 'archived');
  CREATE TYPE "public"."enum__properties_v_version_conversion_action_mode" AS ENUM('enquiry', 'external', 'hosted-engine');
  CREATE TYPE "public"."enum__properties_v_version_approval_status" AS ENUM('pending', 'approved-demo', 'approved-public');
  CREATE TYPE "public"."enum__properties_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_guest_enquiries_abuse_metadata_disposition" AS ENUM('accepted', 'rejected-spam');
  CREATE TYPE "public"."enum_guest_enquiries_status" AS ENUM('new', 'contacted', 'closed', 'spam');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"status" "enum_users_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"source_method" "enum_media_source_method" NOT NULL,
  	"license_record" varchar NOT NULL,
  	"approval_status" "enum_media_approval_status" DEFAULT 'pending' NOT NULL,
  	"content_owner" varchar NOT NULL,
  	"required_replacement" boolean DEFAULT true NOT NULL,
  	"is_demo" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"kind" "enum_locations_kind" NOT NULL,
  	"town" "enum_locations_town" NOT NULL,
  	"parent_id" integer,
  	"summary" varchar NOT NULL,
  	"active" boolean DEFAULT true NOT NULL,
  	"is_demo" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "amenities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"category" "enum_amenities_category" NOT NULL,
  	"filterable" boolean DEFAULT false NOT NULL,
  	"featured" boolean DEFAULT false NOT NULL,
  	"display_order" numeric DEFAULT 0 NOT NULL,
  	"active" boolean DEFAULT true NOT NULL,
  	"is_demo" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "property_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"active" boolean DEFAULT true NOT NULL,
  	"is_demo" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "properties_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "properties" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"internal_id" varchar,
  	"listing_status" "enum_properties_listing_status" DEFAULT 'onboarding',
  	"featured" boolean DEFAULT false,
  	"location_id" integer,
  	"property_type_id" integer,
  	"max_guests" numeric,
  	"bedrooms" numeric,
  	"bathrooms" numeric,
  	"hero_image_id" integer,
  	"summary" varchar,
  	"description" varchar,
  	"conversion_action_mode" "enum_properties_conversion_action_mode" DEFAULT 'enquiry',
  	"conversion_action_label" varchar DEFAULT 'Request preferred dates',
  	"conversion_action_url" varchar,
  	"content_owner" varchar,
  	"approval_status" "enum_properties_approval_status" DEFAULT 'pending',
  	"is_demo" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_properties_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "properties_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"amenities_id" integer
  );
  
  CREATE TABLE "_properties_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_properties_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_internal_id" varchar,
  	"version_listing_status" "enum__properties_v_version_listing_status" DEFAULT 'onboarding',
  	"version_featured" boolean DEFAULT false,
  	"version_location_id" integer,
  	"version_property_type_id" integer,
  	"version_max_guests" numeric,
  	"version_bedrooms" numeric,
  	"version_bathrooms" numeric,
  	"version_hero_image_id" integer,
  	"version_summary" varchar,
  	"version_description" varchar,
  	"version_conversion_action_mode" "enum__properties_v_version_conversion_action_mode" DEFAULT 'enquiry',
  	"version_conversion_action_label" varchar DEFAULT 'Request preferred dates',
  	"version_conversion_action_url" varchar,
  	"version_content_owner" varchar,
  	"version_approval_status" "enum__properties_v_version_approval_status" DEFAULT 'pending',
  	"version_is_demo" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__properties_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_properties_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"amenities_id" integer
  );
  
  CREATE TABLE "guest_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"property_id" integer NOT NULL,
  	"property_slug_snapshot" varchar NOT NULL,
  	"property_name_snapshot" varchar NOT NULL,
  	"preferred_check_in" timestamp(3) with time zone,
  	"preferred_check_out" timestamp(3) with time zone,
  	"guests" numeric NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"message" varchar,
  	"source_url" varchar NOT NULL,
  	"consent_accepted" boolean DEFAULT false NOT NULL,
  	"consent_wording_version" varchar NOT NULL,
  	"consent_captured_at" timestamp(3) with time zone NOT NULL,
  	"abuse_metadata_honeypot_triggered" boolean DEFAULT false NOT NULL,
  	"abuse_metadata_disposition" "enum_guest_enquiries_abuse_metadata_disposition" DEFAULT 'accepted' NOT NULL,
  	"abuse_metadata_request_fingerprint" varchar,
  	"status" "enum_guest_enquiries_status" DEFAULT 'new' NOT NULL,
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"locations_id" integer,
  	"amenities_id" integer,
  	"property_types_id" integer,
  	"properties_id" integer,
  	"guest_enquiries_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"contact_phone" varchar NOT NULL,
  	"demo_notice_enabled" boolean DEFAULT true NOT NULL,
  	"demo_notice_message" varchar NOT NULL,
  	"default_seo_title" varchar NOT NULL,
  	"default_seo_description" varchar NOT NULL,
  	"default_seo_social_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "properties_gallery" ADD CONSTRAINT "properties_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "properties_gallery" ADD CONSTRAINT "properties_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "properties" ADD CONSTRAINT "properties_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "properties" ADD CONSTRAINT "properties_property_type_id_property_types_id_fk" FOREIGN KEY ("property_type_id") REFERENCES "public"."property_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "properties" ADD CONSTRAINT "properties_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "properties_rels" ADD CONSTRAINT "properties_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "properties_rels" ADD CONSTRAINT "properties_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_properties_v_version_gallery" ADD CONSTRAINT "_properties_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_properties_v_version_gallery" ADD CONSTRAINT "_properties_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_properties_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_properties_v" ADD CONSTRAINT "_properties_v_parent_id_properties_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."properties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_properties_v" ADD CONSTRAINT "_properties_v_version_location_id_locations_id_fk" FOREIGN KEY ("version_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_properties_v" ADD CONSTRAINT "_properties_v_version_property_type_id_property_types_id_fk" FOREIGN KEY ("version_property_type_id") REFERENCES "public"."property_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_properties_v" ADD CONSTRAINT "_properties_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_properties_v_rels" ADD CONSTRAINT "_properties_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_properties_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_properties_v_rels" ADD CONSTRAINT "_properties_v_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guest_enquiries" ADD CONSTRAINT "guest_enquiries_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_property_types_fk" FOREIGN KEY ("property_types_id") REFERENCES "public"."property_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_properties_fk" FOREIGN KEY ("properties_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guest_enquiries_fk" FOREIGN KEY ("guest_enquiries_id") REFERENCES "public"."guest_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_social_image_id_media_id_fk" FOREIGN KEY ("default_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "locations_slug_idx" ON "locations" USING btree ("slug");
  CREATE INDEX "locations_town_idx" ON "locations" USING btree ("town");
  CREATE INDEX "locations_parent_idx" ON "locations" USING btree ("parent_id");
  CREATE INDEX "locations_active_idx" ON "locations" USING btree ("active");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE UNIQUE INDEX "amenities_slug_idx" ON "amenities" USING btree ("slug");
  CREATE INDEX "amenities_active_idx" ON "amenities" USING btree ("active");
  CREATE INDEX "amenities_updated_at_idx" ON "amenities" USING btree ("updated_at");
  CREATE INDEX "amenities_created_at_idx" ON "amenities" USING btree ("created_at");
  CREATE UNIQUE INDEX "property_types_slug_idx" ON "property_types" USING btree ("slug");
  CREATE INDEX "property_types_active_idx" ON "property_types" USING btree ("active");
  CREATE INDEX "property_types_updated_at_idx" ON "property_types" USING btree ("updated_at");
  CREATE INDEX "property_types_created_at_idx" ON "property_types" USING btree ("created_at");
  CREATE INDEX "properties_gallery_order_idx" ON "properties_gallery" USING btree ("_order");
  CREATE INDEX "properties_gallery_parent_id_idx" ON "properties_gallery" USING btree ("_parent_id");
  CREATE INDEX "properties_gallery_image_idx" ON "properties_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "properties_slug_idx" ON "properties" USING btree ("slug");
  CREATE UNIQUE INDEX "properties_internal_id_idx" ON "properties" USING btree ("internal_id");
  CREATE INDEX "properties_listing_status_idx" ON "properties" USING btree ("listing_status");
  CREATE INDEX "properties_featured_idx" ON "properties" USING btree ("featured");
  CREATE INDEX "properties_location_idx" ON "properties" USING btree ("location_id");
  CREATE INDEX "properties_property_type_idx" ON "properties" USING btree ("property_type_id");
  CREATE INDEX "properties_max_guests_idx" ON "properties" USING btree ("max_guests");
  CREATE INDEX "properties_bedrooms_idx" ON "properties" USING btree ("bedrooms");
  CREATE INDEX "properties_hero_image_idx" ON "properties" USING btree ("hero_image_id");
  CREATE INDEX "properties_updated_at_idx" ON "properties" USING btree ("updated_at");
  CREATE INDEX "properties_created_at_idx" ON "properties" USING btree ("created_at");
  CREATE INDEX "properties__status_idx" ON "properties" USING btree ("_status");
  CREATE INDEX "properties_rels_order_idx" ON "properties_rels" USING btree ("order");
  CREATE INDEX "properties_rels_parent_idx" ON "properties_rels" USING btree ("parent_id");
  CREATE INDEX "properties_rels_path_idx" ON "properties_rels" USING btree ("path");
  CREATE INDEX "properties_rels_amenities_id_idx" ON "properties_rels" USING btree ("amenities_id");
  CREATE INDEX "_properties_v_version_gallery_order_idx" ON "_properties_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_properties_v_version_gallery_parent_id_idx" ON "_properties_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_properties_v_version_gallery_image_idx" ON "_properties_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_properties_v_parent_idx" ON "_properties_v" USING btree ("parent_id");
  CREATE INDEX "_properties_v_version_version_slug_idx" ON "_properties_v" USING btree ("version_slug");
  CREATE INDEX "_properties_v_version_version_internal_id_idx" ON "_properties_v" USING btree ("version_internal_id");
  CREATE INDEX "_properties_v_version_version_listing_status_idx" ON "_properties_v" USING btree ("version_listing_status");
  CREATE INDEX "_properties_v_version_version_featured_idx" ON "_properties_v" USING btree ("version_featured");
  CREATE INDEX "_properties_v_version_version_location_idx" ON "_properties_v" USING btree ("version_location_id");
  CREATE INDEX "_properties_v_version_version_property_type_idx" ON "_properties_v" USING btree ("version_property_type_id");
  CREATE INDEX "_properties_v_version_version_max_guests_idx" ON "_properties_v" USING btree ("version_max_guests");
  CREATE INDEX "_properties_v_version_version_bedrooms_idx" ON "_properties_v" USING btree ("version_bedrooms");
  CREATE INDEX "_properties_v_version_version_hero_image_idx" ON "_properties_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_properties_v_version_version_updated_at_idx" ON "_properties_v" USING btree ("version_updated_at");
  CREATE INDEX "_properties_v_version_version_created_at_idx" ON "_properties_v" USING btree ("version_created_at");
  CREATE INDEX "_properties_v_version_version__status_idx" ON "_properties_v" USING btree ("version__status");
  CREATE INDEX "_properties_v_created_at_idx" ON "_properties_v" USING btree ("created_at");
  CREATE INDEX "_properties_v_updated_at_idx" ON "_properties_v" USING btree ("updated_at");
  CREATE INDEX "_properties_v_latest_idx" ON "_properties_v" USING btree ("latest");
  CREATE INDEX "_properties_v_rels_order_idx" ON "_properties_v_rels" USING btree ("order");
  CREATE INDEX "_properties_v_rels_parent_idx" ON "_properties_v_rels" USING btree ("parent_id");
  CREATE INDEX "_properties_v_rels_path_idx" ON "_properties_v_rels" USING btree ("path");
  CREATE INDEX "_properties_v_rels_amenities_id_idx" ON "_properties_v_rels" USING btree ("amenities_id");
  CREATE INDEX "guest_enquiries_property_idx" ON "guest_enquiries" USING btree ("property_id");
  CREATE INDEX "guest_enquiries_property_slug_snapshot_idx" ON "guest_enquiries" USING btree ("property_slug_snapshot");
  CREATE INDEX "guest_enquiries_email_idx" ON "guest_enquiries" USING btree ("email");
  CREATE INDEX "guest_enquiries_status_idx" ON "guest_enquiries" USING btree ("status");
  CREATE INDEX "guest_enquiries_updated_at_idx" ON "guest_enquiries" USING btree ("updated_at");
  CREATE INDEX "guest_enquiries_created_at_idx" ON "guest_enquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_amenities_id_idx" ON "payload_locked_documents_rels" USING btree ("amenities_id");
  CREATE INDEX "payload_locked_documents_rels_property_types_id_idx" ON "payload_locked_documents_rels" USING btree ("property_types_id");
  CREATE INDEX "payload_locked_documents_rels_properties_id_idx" ON "payload_locked_documents_rels" USING btree ("properties_id");
  CREATE INDEX "payload_locked_documents_rels_guest_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("guest_enquiries_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_default_seo_default_seo_social_image_idx" ON "site_settings" USING btree ("default_seo_social_image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "amenities" CASCADE;
  DROP TABLE "property_types" CASCADE;
  DROP TABLE "properties_gallery" CASCADE;
  DROP TABLE "properties" CASCADE;
  DROP TABLE "properties_rels" CASCADE;
  DROP TABLE "_properties_v_version_gallery" CASCADE;
  DROP TABLE "_properties_v" CASCADE;
  DROP TABLE "_properties_v_rels" CASCADE;
  DROP TABLE "guest_enquiries" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_users_status";
  DROP TYPE "public"."enum_media_source_method";
  DROP TYPE "public"."enum_media_approval_status";
  DROP TYPE "public"."enum_locations_kind";
  DROP TYPE "public"."enum_locations_town";
  DROP TYPE "public"."enum_amenities_category";
  DROP TYPE "public"."enum_properties_listing_status";
  DROP TYPE "public"."enum_properties_conversion_action_mode";
  DROP TYPE "public"."enum_properties_approval_status";
  DROP TYPE "public"."enum_properties_status";
  DROP TYPE "public"."enum__properties_v_version_listing_status";
  DROP TYPE "public"."enum__properties_v_version_conversion_action_mode";
  DROP TYPE "public"."enum__properties_v_version_approval_status";
  DROP TYPE "public"."enum__properties_v_version_status";
  DROP TYPE "public"."enum_guest_enquiries_abuse_metadata_disposition";
  DROP TYPE "public"."enum_guest_enquiries_status";`)
}
