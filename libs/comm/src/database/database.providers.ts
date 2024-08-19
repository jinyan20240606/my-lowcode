import { DataSource } from 'typeorm';

import { getConfig } from '../utils/index';
import { NamingStrategy } from './naming.strategies';

const { MONGODB_CONFIG, MYSQL_CONFIG } = getConfig();

const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  // 创建的实体类文件命名后缀统一为 entity.ts，但为了区分不同的数据库扫描，
  // 加了 MYSQL_CONFIG.entities 来区分不同的数据库类型，同样当我们需要使用多数据库的时候，
  // 可以依照这种模式来新增不同的数据库
  entities: [`dist/**/*.${MONGODB_CONFIG.entities}.entity.js`]
};

const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  namingStrategy: new NamingStrategy(),
  entities: [`dist/**/*.${MYSQL_CONFIG.entities}.entity.js`]
};

const MONGODB_DATA_SOURCE = new DataSource(MONGODB_DATABASE_CONFIG);
const MYSQL_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG);

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      if (!MONGODB_DATA_SOURCE.isInitialized) await MONGODB_DATA_SOURCE.initialize();
      return MONGODB_DATA_SOURCE;
    },
  },
  {
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async () => {
      if (!MYSQL_DATA_SOURCE.isInitialized) await MYSQL_DATA_SOURCE.initialize();
      return MYSQL_DATA_SOURCE;
    },
  },
];
