import { TagModel } from 'src/entity/tag.entity';
import { UserModel } from 'src/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel, (user) => user.posts)
  author: UserModel;

  @ManyToMany(() => TagModel, (tags) => tags.Posts)
  @JoinTable()
  tags: TagModel[];

  @Column()
  title: string;
}
