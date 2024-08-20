import { Injectable } from '@nestjs/common';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';

@Injectable()
export class PageConfigService {
  create(createPageConfigDto: CreatePageDto) {
    return 'This action adds a new pageConfig';
  }

  findAll() {
    return `This action returns all pageConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pageConfig`;
  }

  update(id: number, updatePageConfigDto: UpdatePageDto) {
    return `This action updates a #${id} pageConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} pageConfig`;
  }
}
