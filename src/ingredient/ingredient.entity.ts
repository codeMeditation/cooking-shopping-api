import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ingredients' })
export class IngredientEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  public name: string;
}
