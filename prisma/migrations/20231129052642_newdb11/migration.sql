-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "img" DROP NOT NULL,
ALTER COLUMN "img" SET DEFAULT '',
ALTER COLUMN "img" SET DATA TYPE TEXT;
