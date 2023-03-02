-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('like', 'dislike');

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "authorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "phone" INTEGER,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PostLike" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER,
    "authorId" INTEGER,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentLike" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER,
    "authorId" INTEGER,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostDislike" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER,
    "authorId" INTEGER,

    CONSTRAINT "PostDislike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentDislike" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER,
    "authorId" INTEGER,
    "commentId" INTEGER,

    CONSTRAINT "CommentDislike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_authorId_key" ON "PostLike"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_authorId_key" ON "CommentLike"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "PostDislike_authorId_key" ON "PostDislike"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentDislike_authorId_key" ON "CommentDislike"("authorId");

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostDislike" ADD CONSTRAINT "PostDislike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostDislike" ADD CONSTRAINT "PostDislike_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDislike" ADD CONSTRAINT "CommentDislike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDislike" ADD CONSTRAINT "CommentDislike_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentDislike" ADD CONSTRAINT "CommentDislike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
