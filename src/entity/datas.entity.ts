import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DatasModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
