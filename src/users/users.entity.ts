import { Entity, Column, PrimaryGeneratedColumn , Unique} from 'typeorm';

@Entity()
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ default: true})
  isActive: boolean;
}