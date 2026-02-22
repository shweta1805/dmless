/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Recruiter` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recruiter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Recruiter" ("email", "id") SELECT "email", "id" FROM "Recruiter";
DROP TABLE "Recruiter";
ALTER TABLE "new_Recruiter" RENAME TO "Recruiter";
CREATE UNIQUE INDEX "Recruiter_email_key" ON "Recruiter"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
