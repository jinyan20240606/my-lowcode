import { Entity, Column,  ObjectIdColumn } from 'typeorm';

// 注册用户实体表
@Entity()
export class User {
  @ObjectIdColumn()// 作为主键
  id?: number;

  @Column({ default: null }) // 第一列：用户名
  name: string;
}
