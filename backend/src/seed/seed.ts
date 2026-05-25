import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../models/User.model';
import { createCompanyFromTemplate } from '../services/template.service';
import { connectDB } from '../config/db';

const seed = async () => {
  await connectDB();
  console.log('Seeding...');
  const existingAdmin = await User.findOne({
    email: process.env.SUPER_ADMIN_EMAIL,
    });

    if (existingAdmin) {
    console.log('Seed already exists.');
    await mongoose.disconnect();
    process.exit(0);
    }

  // 1. Create parent company tenant first (needs a placeholder admin id)
  const placeholderAdminId = new mongoose.Types.ObjectId().toString();

  const parentTenant: any = await createCompanyFromTemplate({
    name: 'MSA Group',
    slug: 'msa-group',
    type: 'parent',
    adminUserId: placeholderAdminId,
    branding: { primaryColor: '#1A365D', heroTagline: 'One Group, Many Brands' },
  });

  // 2. Create super admin user
  const admin = await User.create({
    tenantId:  parentTenant._id,
    name:      'Super Admin',
    email:     process.env.SUPER_ADMIN_EMAIL!,
    password:  process.env.SUPER_ADMIN_PASSWORD!,
    role:      'super_admin',
  });

  // 3. Seed subsidiaries
  const subsidiaries = [
    { name: 'Rush People', slug: 'rush-people', branding: { primaryColor: '#E53E3E', heroTagline: 'People First', } },
    { name: 'Mana Services', slug: 'mana-services', branding: { primaryColor: '#2F855A', heroTagline: 'Reliable Business Solutions', } },
    { name: 'Miya Services', slug: 'miya-services', branding: { primaryColor: '#6B46C1', heroTagline: 'Modern Service Excellence' } },
  ];

  for (const s of subsidiaries) {
    await createCompanyFromTemplate({
      ...s,
      type: 'subsidiary',
      parentId: parentTenant._id.toString(),
      adminUserId: admin._id.toString(),
    });
  }

  console.log('Seed complete.');
  console.log(`Super admin: ${process.env.SUPER_ADMIN_EMAIL} / ${process.env.SUPER_ADMIN_PASSWORD}`);
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect();
  process.exit(1);
});