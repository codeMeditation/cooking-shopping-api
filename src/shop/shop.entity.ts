import { Ingredient } from '../Ingredients/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'shops' })
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @ManyToMany(() => Ingredient)
  @JoinTable({ name: 'shop_ingredient_relations' })
  ingredients: Ingredient[];
}

