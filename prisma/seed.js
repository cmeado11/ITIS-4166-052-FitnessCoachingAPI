import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

async function main() {
  console.log('Wiping database...');

  await prisma.diary.deleteMany();
  await prisma.workoutLog.deleteMany();
  await prisma.program.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating users...');

  const password_hash = await bcrypt.hash('Password123!', 10);

  const coach1 = await prisma.user.create({
    data: {
      name: 'Test Coach1',
      email: 'coach1@example.com',
      password_hash,
      role: 'coach',
    },
  });

  const coach2 = await prisma.user.create({
    data: {
      name: 'Test Coach2',
      email: 'coach2@example.com',
      password_hash,
      role: 'coach',
    },
  });

  const client1 = await prisma.user.create({
    data: {
      name: 'Test Client1',
      email: 'client1@example.com',
      password_hash,
      role: 'client',
    },
  });

  const client2 = await prisma.user.create({
    data: {
      name: 'Test Client2',
      email: 'client2@example.com',
      password_hash,
      role: 'client',
    },
  });

  console.log('Creating programs, workout logs, and diary entries...');

  const assignments = [
    { coach: coach1, client: client1 },
    { coach: coach2, client: client2 },
  ];

  for (const { coach, client } of assignments) {
    for (let programNumber = 1; programNumber <= 2; programNumber++) {
      const program = await prisma.program.create({
        data: {
          coach_id: coach.id,
          client_id: client.id,
          title: `${client.name} Program ${programNumber}`,
          goal:
            programNumber === 1
              ? 'Build foundational strength'
              : 'Improve conditioning and recovery',
          duration_weeks: programNumber === 1 ? 8 : 6,
          status: 'active',
        },
      });

      for (let logNumber = 1; logNumber <= 2; logNumber++) {
        await prisma.workoutLog.create({
          data: {
            program_id: program.id,
            client_id: client.id,
            workout_date: new Date(`2026-04-${20 + logNumber}T00:00:00.000Z`),
            exercise_name: logNumber === 1 ? 'Barbell Squat' : 'Bench Press',
            prescribed_sets: 3,
            prescribed_reps: 5,
            actual_sets: 3,
            actual_reps: logNumber === 1 ? 5 : 6,
            load: logNumber === 1 ? 185 : 135,
            rpe: logNumber === 1 ? 8 : 7,
            notes: `Workout log ${logNumber} for ${program.title}`,
          },
        });
      }

      // Your Diary model relates to Program, not WorkoutLog,
      // so this creates 2 diary entries per program.
      for (let diaryNumber = 1; diaryNumber <= 2; diaryNumber++) {
        await prisma.diary.create({
          data: {
            program_id: program.id,
            client_id: client.id,
            entry_date: new Date(`2026-04-${24 + diaryNumber}T00:00:00.000Z`),
            mood: diaryNumber === 1 ? 'motivated' : 'tired but positive',
            energy_level: diaryNumber === 1 ? 8 : 6,
            soreness_level: diaryNumber === 1 ? 4 : 6,
            comment: `Diary entry ${diaryNumber} for ${program.title}`,
          },
        });
      }
    }
  }

  console.log('Seed complete.');
  console.log('Login credentials:');
  console.log('coach1@example.com / Password123!');
  console.log('coach2@example.com / Password123!');
  console.log('client1@example.com / Password123!');
  console.log('client2@example.com / Password123!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });