import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';
import { UserRole } from '../enums/Global.enums';

export default {
  up: async (queryInterface: QueryInterface) => {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password456', 10);
    const hashedPassword3 = await bcrypt.hash('password789', 10);
    const hashedPassword4 = await bcrypt.hash('password101', 10);

    await queryInterface.bulkInsert('users', [
     
      {
        firstName: 'Sajith',
        lastName: 'Silva',
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword2,
        mobile: '0712457937',
        roleId: UserRole.ADMIN, // admin role
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        firstName: 'John',
        lastName: 'Smith',
        username: 'user',
        email: 'user@example.com',
        password: hashedPassword4,
        mobile: '0712457937',
        roleId: UserRole.USER, // regular user role
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {
      email: [
        'superadmin@example.com',
        'admin@example.com',
        'manager@example.com',
        'user@example.com'
      ],
    });
  },
};