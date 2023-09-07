/*
  Warnings:

  - You are about to drop the column `templateId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_templateId_fkey";

-- DropIndex
DROP INDEX "tamplates_name_key";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "templateId",
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tamplates" ADD COLUMN     "frequencyPenalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "model" TEXT NOT NULL DEFAULT 'gpt-3.5-turbo',
ADD COLUMN     "presentPenalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "temperature" DOUBLE PRECISION NOT NULL DEFAULT 1,
ADD COLUMN     "topP" DOUBLE PRECISION NOT NULL DEFAULT 1,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "parameters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "context_messages" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "context_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParameterToTemplate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "parameters_name_key" ON "parameters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "context_messages_position_templateId_key" ON "context_messages"("position", "templateId");

-- CreateIndex
CREATE UNIQUE INDEX "_ParameterToTemplate_AB_unique" ON "_ParameterToTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_ParameterToTemplate_B_index" ON "_ParameterToTemplate"("B");

-- CreateIndex
CREATE INDEX "tamplates_name_idx" ON "tamplates"("name");

-- AddForeignKey
ALTER TABLE "context_messages" ADD CONSTRAINT "context_messages_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "tamplates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParameterToTemplate" ADD CONSTRAINT "_ParameterToTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParameterToTemplate" ADD CONSTRAINT "_ParameterToTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "tamplates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
