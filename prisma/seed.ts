import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function createUserData(index: number) {
  const user = await prisma.user.create({
    data: {
      username: `user${index}`,
      useremail: `user${index}@example.com`,
      password: `hashedpassword${index}`,
    },
  });

  await Promise.all(
    ['New', 'Contacted', 'Interested', 'Negotiating', 'Closed'].map((name, i) =>
      prisma.statusSetting.create({
        data: {
          statusName: name,
          statusColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          statusOrder: i + 1,
          userId: user.id,
        },
      })
    )
  );

  await Promise.all(
    ['Email', 'Phone Call', 'Meeting'].map(content =>
      prisma.contentsSetting.create({
        data: {
          contentName: content,
          userId: user.id,
        },
      })
    )
  );

  const prospectList = await prisma.prospectList.create({
    data: {
      userId: user.id,
    },
  });

  for (let i = 1; i <= 4; i++) {
    const prospect = await prisma.prospects.create({
      data: {
        prospectName: `Prospect ${i} of User ${index}`,
        prospectSex: Math.random() > 0.5 ? 'Male' : 'Female',
        prospectAge: getRandomInt(20, 60),
        prospectMarital: 'Single',
        children: getRandomInt(0, 3),
        prospectBusiness: 'Tech',
        prospectLocation: 'Tokyo',
        prospectPhone: `080-${getRandomInt(1000, 9999)}-${getRandomInt(1000, 9999)}`,
        prospectEmail: `prospect${i}_user${index}@example.com`,
        prospectHidden: false,
        prospectListId: prospectList.id,
      },
    });

    const noteCount = getRandomInt(1, 3);
    for (let j = 1; j <= noteCount; j++) {
      const note = await prisma.notes.create({
        data: {
          noteTitle: `Note ${j} for Prospect ${i}`,
          content: `Discussed project details for note ${j}`,
          status: 'Pending',
          prospectId: prospect.id,
        },
      });

      const memoCount = getRandomInt(1, 3);
      for (let k = 1; k <= memoCount; k++) {
        await prisma.memos.create({
          data: {
            memoSubject: `Memo ${k}`,
            memoDetail: `Details of memo ${k} for note ${j}`,
            noteId: note.id,
          },
        });
      }
    }
  }
}

async function main() {
  await createUserData(1);
  await createUserData(2);
  console.log('🌱 Seed completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
