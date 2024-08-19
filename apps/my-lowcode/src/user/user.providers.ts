import { User } from './user.mongo.entity';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    inject: ['MONGODB_DATA_SOURCE'],
    // 这个AppDataSource参数就是注入的provider的useFactory方法的返回值，管道一样，传进了这个参数--
    // ---就是typeorm的MongoDB初始化后的实例,调用了获取对应实体表存储库的方法，返回这个表实体的操作实例对象
    // 在后面的service中业务操作使用
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(User),

  },
];
