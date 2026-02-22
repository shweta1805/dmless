-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "correct" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    CONSTRAINT "Question_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
