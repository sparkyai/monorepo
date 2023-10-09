/*
  Warnings:

  - The primary key for the `context_messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `templateId` on the `context_messages` table. All the data in the column will be lost.
  - The `id` column on the `context_messages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParameterToTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parameters` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[position,template_id]` on the table `context_messages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `language_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `template_id` to the `context_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_id` to the `tamplates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ParameterToTemplate" DROP CONSTRAINT "_ParameterToTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParameterToTemplate" DROP CONSTRAINT "_ParameterToTemplate_B_fkey";

-- DropForeignKey
ALTER TABLE "context_messages" DROP CONSTRAINT "context_messages_templateId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chatId_fkey";

-- DropIndex
DROP INDEX "context_messages_position_templateId_key";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "language_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "context_messages" DROP CONSTRAINT "context_messages_pkey",
DROP COLUMN "templateId",
ADD COLUMN     "template_id" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "context_messages_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tamplates" ADD COLUMN     "language_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "_ParameterToTemplate";

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "parameters";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" VARCHAR(2) NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL DEFAULT 'gpt-3.5-turbo',
    "topP" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "presentPenalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "frequencyPenalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_systems_promps" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "role_systems_promps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "setting_name_key" ON "setting"("name");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- CreateIndex
CREATE INDEX "roles_name_idx" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_systems_promps_role_id_key" ON "role_systems_promps"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "context_messages_position_template_id_key" ON "context_messages"("position", "template_id");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_systems_promps" ADD CONSTRAINT "role_systems_promps_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tamplates" ADD CONSTRAINT "tamplates_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "context_messages" ADD CONSTRAINT "context_messages_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "tamplates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
