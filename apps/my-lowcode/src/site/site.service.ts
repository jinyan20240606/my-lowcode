import { Injectable, Inject } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { MongoRepository, ObjectId } from 'typeorm';
import { Site } from './entities/site.mongo.entity';

@Injectable()
export class SiteService {
  constructor(
    @Inject('SITE_REPOSITORY')
    private siteRepository: MongoRepository<Site>,
  ) {}

  create(createSiteDto: CreateSiteDto) {
    console.log('创建站点site', createSiteDto);
    return this.siteRepository.save(createSiteDto);
  }

  findAll() {
    return this.siteRepository.find()
    // return `This action returns all site`;
  }

  findOne(id) {
    console.log(id, '25-------')
    return this.siteRepository.findOne(id);
  }

  update(id: number, updateSiteDto: UpdateSiteDto) {
    return `This action updates a #${id} site`;
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}
