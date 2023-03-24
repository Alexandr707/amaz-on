import { Prisma } from '@prisma/client';

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  avatarURL: true,
  phone: true,
  password: false,
};
