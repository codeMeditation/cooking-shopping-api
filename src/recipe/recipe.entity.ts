import { IngredientEntity } from '../Ingredients/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'recipes' })
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @ManyToMany(() => IngredientEntity)
  @JoinTable({ name: 'recipe_ingredient_relations' })
  public ingredients: IngredientEntity[]; 
}
