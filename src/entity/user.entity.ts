import { PostModel } from 'src/entity/post.entity';
import { ProfileModel } from 'src/entity/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class UserModel {
  //AutoIncrement
  //PrimaryColumn은 직접 적용해야함
  //@PrimaryGeneratedColumn('uuid') <-- 난수 ID 생성
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  //   @Column({
  //     type: 'varchar',
  //     name: 'title',
  //     length: 300,
  //     nullable: true,
  //     update: false,
  //     select: true,
  //     default: 'default values...',
  //     // unique: false,
  //   })
  //   title: string;

  //   @Column({ type: 'enum', enum: Role, default: Role.USER })
  //   role: Role;

  //   //데이터 생성되는 날짜와 시간이 자동생성
  //   @CreateDateColumn()
  //   createdAt: Date;

  //   @CreateDateColumn()
  //   updateAt: Date;

  //   //데이터 업데이트시 1씩 업데이트 됨,
  //   //save 함수가 몇번 불렸는지 기록함
  //   @VersionColumn()
  //   version: number;

  //   //PK이외 자동생성되어야 할 컬럼에 사용함
  //   @Column()
  //   @Generated('increment')
  //   additionalId: number;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    //relation 같이가져옴
    // eager: true,
    //연쇄
    cascade: true,
    //null 허용 (이미 null 값이 있다면 Error)
    nullable: true,

    //No action -> 아무것도안함
    //cascade ->  연쇄 삭제
    //set null -> 참조 id null
    //set default -> 기본세팅
    //restrict -> 참조하고 있는 row가 있으면 참조당하는 Row 삭제 불가
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({ default: 0 })
  count: number;
}
