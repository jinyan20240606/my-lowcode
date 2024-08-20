import { Entity, Column, UpdateDateColumn, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Department } from '../../department/entities/department.mysql.entity';

export enum UserStatus {
  disabled = 0,
  enabled = 1
}

// 向mysql数据库中注册一张user表
@Entity()
export class User {
  @PrimaryGeneratedColumn() // 自增主键
  id?: number;

  @Column({ default: null })
  username: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  avatar?: string;

  @Column({ default: null })
  mobile?: string;

  @Column({ default: null })
  enName?: string;

  // 所属部门名字
  // @Column({ default: null })
  // departmentName?: string;
  // 所属部门id
  // @Column({ default: null })
  // departmentId?: number;
  // 1参是返回多对一目标一的实体实例，2参是返回的是目标一的关联属性字段对应值
  @ManyToOne(() => Department, department => department.users)
  department: Department;

  @Column({ default: UserStatus.enabled })
  status?: UserStatus;

  @UpdateDateColumn()
  updateTime?: string;

  @CreateDateColumn()
  createTime?: string;
}
