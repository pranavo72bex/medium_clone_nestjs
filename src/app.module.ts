import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TagModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
