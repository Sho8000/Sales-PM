import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

async function main() {
  // 1. Create User
  const user = await prisma.user.create({
    data: {
      username: 'test_user',
      useremail: 'test@example.com',
      password: 'hashedpassword123',
    },
  })

  // 2. Create 5 Status Settings
  const statusNames = ['New', 'Contacted', 'Interested', 'Negotiating', 'Closed']
  await Promise.all(
    statusNames.map((name, index) =>
      prisma.statusSetting.create({
        data: {
          statusName: name,
          statusColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          statusOrder: index + 1,
          userId: user.id,
        },
      })
    )
  )

  // 3. Create 3 Content Settings
  const contentTypes = ['Email', 'Call', 'Meeting']
  await Promise.all(
    contentTypes.map((contentName) =>
      prisma.contentsSetting.create({
        data: {
          contentName,
          userId: user.id,
        },
      })
    )
  )

  // 4. Create ProspectList
  const prospectList = await prisma.prospectList.create({
    data: {
      userId: user.id,
    },
  })

  // 5. Create 4 Prospects (each with 1–3 Notes, and each Note with 1–3 Memos)
  for (let i = 1; i <= 4; i++) {
    const prospect = await prisma.prospects.create({
      data: {
        prospectName: `Prospect ${i}`,
        prospectSex: i % 2 === 0 ? 'Male' : 'Female',
        prospectAge: random(25, 55),
        prospectMarital: i % 2 === 0 ? 'Single' : 'Married',
        children: random(0, 3),
        prospectBusiness: 'Industry ' + i,
        prospectLocation: 'City ' + i,
        prospectPhone: `080-1234-567${i}`,
        prospectEmail: `prospect${i}@example.com`,
        prospectHidden: false,
        prospectListId: prospectList.id,
      },
    })

    const noteCount = random(1, 3)
    for (let j = 1; j <= noteCount; j++) {
      const note = await prisma.notes.create({
        data: {
          noteTitle: `Note ${j} for Prospect ${i}`,
          content: `Details about contact ${j} with Prospect ${i}`,
          status: statusNames[random(0, statusNames.length - 1)],
          prospectId: prospect.id,
        },
      })

      const memoCount = random(1, 3)
      for (let k = 1; k <= memoCount; k++) {
        await prisma.memos.create({
          data: {
            memoSubject: `Memo ${k} of Note ${j} (Prospect ${i})`,
            memoDetail: `Additional details ${k} for note ${j}`,
            noteId: note.id,
          },
        })
      }
    }
  }

  console.log('✅ Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
