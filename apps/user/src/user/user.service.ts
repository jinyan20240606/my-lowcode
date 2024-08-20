import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.mysql.entity';
import { Repository } from 'typeorm';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private readonly departmentService: DepartmentService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 新增创建用户时，同步所属部门id
    const dep = await this.departmentService.findOne(
      createUserDto.departmentId,
    );
    console.log(createUserDto, '创建msql用户表行数据', dep);
    return this.userRepository.save({ ...createUserDto, department: dep });
  }

  findAll() {
    // 查询所有用户时，带上关联表的数据
    return this.userRepository.find({ relations: ['department'] });
  }

  findOne(id: number) {
    console.log('根据id查询用户详情', id);
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // @ts-ignore
    return this.userRepository.update({ id }, updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
    // return `This action removes a #${id} user`;
  }
}
