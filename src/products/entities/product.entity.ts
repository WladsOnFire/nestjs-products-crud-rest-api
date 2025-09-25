import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "name", type: 'varchar', unique:true})
  name: string;

  @Column({type:'int', unsigned:true})
  price: number;
  
}