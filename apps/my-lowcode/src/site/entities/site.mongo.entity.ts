import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
  ObjectId,
} from 'typeorm';

export enum PAGE_TYPE {
  'pc' = 0,
  'mobile' = 1,
  'weapp' = 2,
}

export enum STATUS_TYPE {
  'activated' = 0, // 未激活
  'inactive' = 1, // 激活
  'deleted' = 2, // 删除
}

export enum API_TYPE {
  'swagger' = 0,
}

@Entity()
export class Site {
  // 自动为每个文档生成一个唯一的 _id 适用NoSQL数据库,
  // 在数据库查询方法find时，会自动将内部_id赋给下行指定的id属性值进行返回
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  url: string;

  @Column({ default: null })
  currentVersion: string;

  // 设备类型
  @Column()
  type: PAGE_TYPE;

  // site 状态
  @Column({ default: STATUS_TYPE.inactive })
  status: STATUS_TYPE;

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;

  @UpdateDateColumn({ default: null })
  appointmentUp: string;

  @UpdateDateColumn({ default: null })
  appointmentDown: string;
}
