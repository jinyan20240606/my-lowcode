import { Injectable, Inject } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department} from './entities/department.mysql.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private depRepository: Repository<Department>,
    // private readonly departmentService: DepartmentService
  ) { }

  create(createDepartmentDto: CreateDepartmentDto) {
    console.log('创建部门的数据', createDepartmentDto)
    return this.depRepository.save(createDepartmentDto)
    // return 'This action adds a new department';
  }

  findAll() {
    // 使用relations属性：查找数据时，自动添加关联数据返给前端
    // 不使用relations属性时：默认查找模式，不会自动添加关联的字段及数据
    return this.depRepository.find({ relations: ["users"] })
    // return `This action returns all department`;
  }

  findOne(id: number) {
    return this.depRepository.findOneBy({ id })
    // return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
