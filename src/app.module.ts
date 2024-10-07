import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/entity/user.entity';
import { DatasModel } from 'src/entity/datas.entity';
import { BookModel, CarModel } from 'src/entity/inheritance.entity';
import { ProfileModel } from 'src/entity/profile.entity';
import { PostModel } from 'src/entity/post.entity';
import { TagModel } from 'src/entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel,
      DatasModel,
      ProfileModel,
      PostModel,
      TagModel,
    ]), // 리포지토리 주입
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typeormstudy',
      entities: [
        UserModel,
        DatasModel,
        BookModel,
        CarModel,
        ProfileModel,
        PostModel,
        TagModel,
      ], // 매핑할 엔티티 모델
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
