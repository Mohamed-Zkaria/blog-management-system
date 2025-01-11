import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog')
export class BlogsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tags: string;
}