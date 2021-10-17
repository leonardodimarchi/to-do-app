import { UserEntity } from "src/modules/users/entities/user.entity";

export const mockedAdminUser: UserEntity = {
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: 'AdminUser',
    nickname: 'admin',
    password: '123123',
    permissions: 'admin|user',
    isActive: true,

    hasId: jest.fn(),
    recover: jest.fn(),
    reload: jest.fn(),
    remove: jest.fn(),
    save: jest.fn(),
    softRemove: jest.fn(),
    toProxy: jest.fn(),
}

export const mockedUser: UserEntity = {
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: 'User',
    nickname: 'user',
    password: '123123',
    permissions: 'user',
    isActive: true,

    hasId: jest.fn(),
    recover: jest.fn(),
    reload: jest.fn(),
    remove: jest.fn(),
    save: jest.fn(),
    softRemove: jest.fn(),
    toProxy: jest.fn(),
}