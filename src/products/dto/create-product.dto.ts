import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: 'Product name',
    })
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Product price',
    })
    
    @IsPositive()
    @Type(() => Number)
    price: number;
}