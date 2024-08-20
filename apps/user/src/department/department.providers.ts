import { Department } from './entities/department.mysql.entity';

export const DepartmentProviders = [
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(Department),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
