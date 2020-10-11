import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'ingredients' })
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @Column({ type: 'varchar', length: 200 })
  public text?: string;
  
  @Index()
  @Column({ type: 'varchar', length: 50 })
  public brand?: string;
}
