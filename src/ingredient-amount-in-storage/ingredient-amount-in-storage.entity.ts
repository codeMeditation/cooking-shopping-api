
import { IngredientEntity } from 'src/ingredient/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'ingredientAmountInStorage' })
export class IngredientAmountInStorageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'smallint' })
  public amount: number;

  @ManyToMany(() => IngredientEntity)
  @JoinTable({ name: 'ingredientAmountInStorage_ingredient_relations' })
  public ingredient: IngredientEntity[];
}
