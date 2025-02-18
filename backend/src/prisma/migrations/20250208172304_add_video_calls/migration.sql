-- CreateTable
CREATE TABLE "VideoCall" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "roomUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoCall_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoCall" ADD CONSTRAINT "VideoCall_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoCall" ADD CONSTRAINT "VideoCall_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
