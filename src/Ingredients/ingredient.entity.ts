import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'ingredients' })
export class IngredientEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  public source: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  public brand: string;

  @Column({ type: "float", default: 0.0 })
  public price: number

  @Column({ type: "int" })
  public orderQty: number

  @Column({ type: "int" })
  public minimumStock: number

  @Column({ type: "int" })
  public actualStock: number
}

