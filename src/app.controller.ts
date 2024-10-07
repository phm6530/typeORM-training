import {
  BadRequestException,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatasModel } from 'src/entity/datas.entity';
import { PostModel } from 'src/entity/post.entity';
import { ProfileModel } from 'src/entity/profile.entity';
import { TagModel } from 'src/entity/tag.entity';
import { UserModel } from 'src/entity/user.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(ProfileModel)
    private readonly profileRepositry: Repository<ProfileModel>,

    @InjectRepository(UserModel)
    private readonly userRepositry: Repository<UserModel>,

    @InjectRepository(DatasModel)
    private readonly datasRepositry: Repository<DatasModel>,

    @InjectRepository(PostModel)
    private readonly postRepositry: Repository<PostModel>,

    @InjectRepository(TagModel)
    private readonly tagRepositry: Repository<TagModel>,
  ) {}

  @Get('datas/:id')
  async getDatas(@Param('id') id: string) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const test = await this.datasRepositry.findOne({
      where: { id },
    });

    if (!test) throw new NotFoundException();

    return this.datasRepositry.find({
      where: {
        id,
      },
    });
  }

  @Patch('users/:id')
  async patchTags(@Param('id') id: string) {
    const test = await this.tagRepositry.findOne({ where: { id: +id } });

    if (!test) throw new NotFoundException('없음');

    const ttt = await this.tagRepositry.save({ ...test, tag: 'Change' });

    return ttt;
  }

  @Post('users')
  async postUser() {
    try {
      return await this.userRepositry.save({
        email: 'test',
        profile: { profileImg: 'profileImg' },
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Title must be unique');
      }
      throw error;
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepositry.find({});
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    if (!id) throw new NotFoundException();

    const user = await this.userRepositry.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.userRepositry.save({});
  }

  @Post('users/post')
  async createUserAndPost() {
    const user = await this.userRepositry.save({
      email: 'squirrel309@naver.com',
    });

    await this.postRepositry.save({
      author: user,
      title: 'test-1',
    });

    await this.postRepositry.save({
      author: user,
      title: 'test-2',
    });
  }

  @Post('posts/tags')
  async createPostTags() {
    const tag1 = await this.tagRepositry.save({
      tag: 'javaScript',
    });

    const tag2 = await this.tagRepositry.save({
      tag: 'TypeScript',
    });

    const post1 = await this.postRepositry.save({
      title: 'Nextjs - book',
      tags: [tag1, tag2],
    });

    const post2 = await this.postRepositry.save({
      title: 'Nestjs - book',
      tags: [tag1],
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepositry.delete(+id);
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const user = await this.userRepositry.save({
      email: 'squirrel309@naver.com',
    });

    const profile = await this.profileRepositry.save({
      profileImg: 'test.jpg',
      user,
    });

    return user;
  }

  @Get('posts')
  getPosts() {
    return this.postRepositry.find({ relations: { tags: true } });
  }

  @Get('tags')
  getTags() {
    return this.tagRepositry.find({ relations: { Posts: true } });
  }

  isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}
