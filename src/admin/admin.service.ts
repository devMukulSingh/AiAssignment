import { Response } from 'express';
import { prisma } from 'src/prisma/prisma';

export class AdminService {
  async getUsers(res: Response) {
    const users = await prisma.user.findMany();
    return res.status(200).json({
      data: users,
    });
  }
  async deleteUser(id: string, res: Response) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      data: user,
      message: 'User deleted',
    });
  }
}
