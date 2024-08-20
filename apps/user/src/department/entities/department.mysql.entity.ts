import { Entity, Column, UpdateDateColumn, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.mysql.entity';

@Entity()
export class Department {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: null })
  name: string;

  @OneToMany(() => User, user => user.department)
  users: User[];

  @UpdateDateColumn()
  updateTime?: string;

  @CreateDateColumn()
  createTime?: string;
}
