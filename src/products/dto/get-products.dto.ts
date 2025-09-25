import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive } from "class-validator";

enum Sort { asc = "asc", desc = "desc"}
enum sortField { name = "name", price = "price"}


export class GetProductsDto {

    
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    pageSize: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    pageIndex: number;

    @IsOptional()
    @IsEnum(sortField)
    sortField: string;

    @IsOptional()
    @IsEnum(Sort)
    sort: string;
}