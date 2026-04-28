-- CreateEnum
CREATE TYPE "Role" AS ENUM ('coach', 'client');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "duration_weeks" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutLog" (
    "id" SERIAL NOT NULL,
    "program_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "workout_date" TIMESTAMP(3) NOT NULL,
    "exercise_name" TEXT NOT NULL,
    "prescribed_sets" INTEGER NOT NULL,
    "prescribed_reps" INTEGER NOT NULL,
    "actual_sets" INTEGER NOT NULL,
    "actual_reps" INTEGER NOT NULL,
    "load" DOUBLE PRECISION NOT NULL,
    "rpe" INTEGER NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diary" (
    "id" SERIAL NOT NULL,
    "program_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "mood" TEXT NOT NULL,
    "energy_level" INTEGER NOT NULL,
    "soreness_level" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLog" ADD CONSTRAINT "WorkoutLog_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLog" ADD CONSTRAINT "WorkoutLog_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
