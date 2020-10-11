import { Ingredient } from '../Ingredients/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @Column({ type: 'varchar', length: 150 })
  public title?: string;

  @Column()
  public text?: string;

  @ManyToMany(() => Ingredient)
  @JoinTable({ name: 'recipe_ingredient_relations' })
  ingredients: Ingredient[];
}
