import { Exclude, Expose } from "class-transformer";


export class ProductResponseDto {

    @Exclude()
    id: number;

    @Expose()
    name: string;

    @Expose()
    price: number;

    constructor(partial: Partial<ProductResponseDto>){
        Object.assign(this, partial);
    }
}