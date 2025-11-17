/*
  Warnings:

  - The values [PROFESSIONEL] on the enum `AccountTier` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountTier_new" AS ENUM ('PARTICULIER', 'PROFESSIONNEL');
ALTER TABLE "public"."users" ALTER COLUMN "accountTier" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "accountTier" TYPE "AccountTier_new" USING ("accountTier"::text::"AccountTier_new");
ALTER TYPE "AccountTier" RENAME TO "AccountTier_old";
ALTER TYPE "AccountTier_new" RENAME TO "AccountTier";
DROP TYPE "public"."AccountTier_old";
ALTER TABLE "users" ALTER COLUMN "accountTier" SET DEFAULT 'PARTICULIER';
COMMIT;
