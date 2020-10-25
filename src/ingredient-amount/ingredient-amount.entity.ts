import { IngredientEntity } from '../ingredient/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'ingredientAmount' })
export class IngredientAmountEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'smallint' })
  public amount: number;

  @ManyToMany(() => IngredientEntity)
  @JoinTable({ name: 'ingredientAmount_ingredient_relations' })
  public ingredient: IngredientEntity[];
}
