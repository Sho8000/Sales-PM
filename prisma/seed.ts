import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const statusSettings = [
  { statusName: 'Urgent', statusColor: '#FF0000', statusOrder: 1 },
  { statusName: 'Hopefully', statusColor: '#FFFF00', statusOrder: 2 },
  { statusName: 'Open', statusColor: '#00FF00', statusOrder: 3 },
  { statusName: 'Cooled off', statusColor: '#0000FF', statusOrder: 4 },
  { statusName: 'Not Potential', statusColor: '#FF00EA', statusOrder: 5 },
];

const contentSettings = [
  { contentName: 'Mortgage' },
  { contentName: 'Investment' },
  { contentName: 'Insurance' },
];

const prospectNamesUser1 = [
  'John Doe1',
  'Jane Smith1',
  'Alice Johnson1',
  'Bob Brown1',
];
const prospectNamesUser2 = [
  'John Doe2',
  'Jane Smith2',
  'Alice Johnson2',
  'Bob Brown2',
  'Carol White2',
];

// Helpers to pick random elements/counts
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const noteStatuses = statusSettings.map(s => s.statusName);
const noteContents = contentSettings.map(c => c.contentName);

async function createRandomMemos() {
  const memoCount = randomInt(0, 2);
  const memos = [];
  for (let i = 0; i < memoCount; i++) {
    memos.push({
      memoSubject: `Memo Subject ${i + 1}`,
      memoDetail: `Details for memo ${i + 1}`,
    });
  }
  return memos;
}

async function createRandomNotes() {
  const noteCount = randomInt(1, 3);
  const notes = [];
  for (let i = 0; i < noteCount; i++) {
    const memos = await createRandomMemos();
    notes.push({
      noteTitle: `Note Title ${i + 1}`,
      content: randomFromArray(noteContents),
      status: randomFromArray(noteStatuses),
      // appointmentDate is optional, let it default to now()
      memos: {
        create: memos,
      },
    });
  }
  return notes;
}

async function createUser({
  username,
  useremail,
  password,
  prospectNames,
}: {
  username: string;
  useremail: string;
  password: string;
  prospectNames: string[];
}) {
  const prospectsData = await Promise.all(
    prospectNames.map(async (name) => ({
      prospectName: name,
      prospectSex: 'Male',
      prospectAge: randomInt(25, 65),
      prospectMarital: 'Married',
      children: randomInt(0, 3),
      prospectBusiness: 'Finance',
      prospectPosition: 'Manager',
      prospectLocation: 'New York',
      prospectPhone: '123-456-7890',
      prospectEmail: `${name.toLowerCase().replace(/\s/g, '')}@example.com`,
      prospectHidden: false,
      notes: {
        create: await createRandomNotes(),
      },
    }))
  );

  const user = await prisma.user.create({
    data: {
      username,
      useremail,
      password,
      statusSetting: {
        create: statusSettings,
      },
      contentsSetting: {
        create: contentSettings,
      },
      prospectList: {
        create: {
          prospects: {
            create: prospectsData,
          },
        },
      },
    },
  });

  console.log(`✅ Created ${username} with ${prospectNames.length} prospects`);
}

async function main() {
  await createUser({
    username: 'User1',
    useremail: 'test@1',
    password: '$2b$12$BB9458AizoHOSMp3jMoEH.jLQUPlKwW2m/R7vZryt17bKMFuX4UvK',
    prospectNames: prospectNamesUser1,
  });

  await createUser({
    username: 'User2',
    useremail: 'test@2',
    password: '$2b$12$YiO53Z.EvRWRKsSuDX/tz.Z0uZfPtZ4v03I3ItumUVw94sdIMw31C',
    prospectNames: prospectNamesUser2,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
