import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeclarationSymptoms } from './declarations.enum';

@Entity()
export class Declaration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  temperature: number;

  @Column()
  has_contact: Boolean;

  @Column({
    type: 'enum',
    enum: DeclarationSymptoms,
    array: true,
    default: [],
  })
  symptoms: DeclarationSymptoms[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne((_type) => User, (user) => user.declaration, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
