import { Module } from '@nestjs/common';
import { DevopsController } from './devops.controller';
import { DevopsService } from './devops.service';
import { User1Module } from './user1/user1.module';

@Module({
  imports: [User1Module],
  controllers: [DevopsController],
  providers: [DevopsService],
})
export class DevopsModule {}
