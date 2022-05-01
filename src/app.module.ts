import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
