import {PrismaClient} from '@prisma/client';

const bcrypt = require('bcrypt');
const prisma =new PrismaClient();


async function main(){
  const salt = await bcrypt.genSalt(10);
  await prisma.user.create({
    data:{
      name:"Suraj Mazar",
      email:"suraj.mazar@gmail.com",
      password:await bcrypt.hash('admin', salt),
      createdAt:new Date(),
      updatedAt:new Date()
    }
  });
}

main().catch(e=>{
  console.log(e);
  process.exit(1);
}).finally(()=>{
  prisma.$disconnect();
})
