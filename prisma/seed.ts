import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create User
  const user = await prisma.user.create({
    data: {
      username: 'test_user',
      useremail: 'test@example.com',
      password: 'hashedpassword123',
    },
  })

  // Create Status Settings
  const statusSettings = await Promise.all([
    { statusName: 'New', statusColor: '#FF0000' },
    { statusName: 'Contacted', statusColor: '#00FF00' },
    { statusName: 'Interested', statusColor: '#0000FF' },
    { statusName: 'Closed', statusColor: '#AAAAAA' },
  ].map((status, index) =>
    prisma.statusSetting.create({
      data: {
        ...status,
        statusOrder: index + 1,
        user: { connect: { id: user.id } },
      },
    })
  ))

  // Create Content Settings
  await Promise.all([
    'Email',
    'Call',
    'Meeting'
  ].map((contentName) =>
    prisma.contentsSetting.create({
      data: {
        contentName,
        user: { connect: { id: user.id } },
      },
    })
  ))

  // Create Prospect List
  const prospectList = await prisma.prospectList.create({
    data: {
      user: { connect: { id: user.id } },
    },
  })

  // Create a Prospect
  const prospect = await prisma.prospects.create({
    data: {
      prospectName: 'Jane Doe',
      prospectSex: 'Female',
      prospectAge: 32,
      prospectMarital: 'Married',
      children: 2,
      prospectBusiness: 'Marketing',
      prospectLocation: 'Osaka',
      prospectPhone: '080-1234-5678',
      prospectEmail: 'jane.doe@example.com',
      prospectHidden: false,
      prospectList: { connect: { id: prospectList.id } },
    },
  })

  // Create Note
  const note = await prisma.notes.create({
    data: {
      noteTitle: 'First Meeting',
      content: 'Met with Jane to discuss business needs.',
      status: 'Interested',
      prospect: { connect: { id: prospect.id } },
    },
  })

  // Create Memo
  await prisma.memos.create({
    data: {
      memoSubject: 'Follow-up Plan',
      memoDetail: 'Send proposal by next Monday.',
      note: { connect: { id: note.id } },
    },
  })

  console.log('🌱 Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
