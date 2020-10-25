import { IngredientAmountEntity } from 'src/ingredient-amount/ingredient-amount.entity';
import { Entity, Column, Index, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'recipes' })
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @ManyToMany(() => IngredientAmountEntity)
  @JoinTable({ name: 'recipe_ingredientAmount_relations' })
  public ingredientAmount: IngredientAmountEntity[];
}
