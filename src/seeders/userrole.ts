import { QueryInterface } from 'sequelize';

const userRoles = [
   
    {
        role_name: 'admin',
        description: 'Administrator with full access',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    
    {
        role_name: 'user',
        description: 'Regular user with basic access',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

export const up = async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('user_roles', userRoles, {});
};

export const down = async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('user_roles', {
        role_name: userRoles.map(role => role.role_name),
    }, {});
};