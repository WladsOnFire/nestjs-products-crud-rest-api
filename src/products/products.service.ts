import { ClassSerializerInterceptor, Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dto/product-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async findAll() {
        try {
            const products = await this.productsRepository.find();
            return plainToInstance(ProductResponseDto, products, {
                excludeExtraneousValues: true,
            });
        } catch (exception) {
            return exception.message;
        }
    }

    async findOne(id: number) {
        try {
            const product = await this.productsRepository.findOneBy({ id });

            return plainToInstance(ProductResponseDto, product, {
                excludeExtraneousValues: true,
            });
        } catch (exception) {
            return exception.message;
        }
    }

    async findAllPaginatedAndSorted(pageIndex?: number, pageSize?: number, sortField?: string, sort?: string) {
        try {
            const [products] = await this.productsRepository.findAndCount({
                take: pageSize ?? 20,
                skip: ((pageIndex ?? 1) - 1) * (pageSize ?? 0),
                order: { [sortField ?? "name"]: sort ?? "asc" },
            });

            return plainToInstance(ProductResponseDto, products, {
                excludeExtraneousValues: true,
            });
        } catch (exception) {
            return exception.message;
        }
    }


    async count() {
        try {
            const result = await this.productsRepository.count();
            return { amount: result };
        } catch (exception) {
            return exception.message;
        }
    }

    async getCheapest() {
        try {
            const product = await this.productsRepository.query("SELECT * FROM products_db.product WHERE price = (SELECT MIN(price) FROM products_db.product)");

            return plainToInstance(ProductResponseDto, product, {
                excludeExtraneousValues: true,
            });
        } catch (exception) {
            return exception.message;
        }
    }

    async getMedian() {
        try {
            const [products, total] = await this.productsRepository.findAndCount({
                order: { price: 'asc' }
            });
            if(total <2){
                return { median: 0}
            }
            if (total % 2 == 0) {
                return { median: (products[total / 2].price + products[(total / 2) - 1].price) / 2 };
            } else {
                return { median: products[Math.ceil(total / 2) - 1].price }
            }
        } catch (exception) {
            return exception.message;
        }
    }

    async createProduct(input: CreateProductDto) {
        try {
            const resultProduct = await this.productsRepository.create({ name: input.name, price: input.price });
            return await this.productsRepository.save(resultProduct);
        } catch (exception) {
            return exception.message;
        }
    }

    async getExpensivest() {
        try {
            const product = await this.productsRepository.query("SELECT * FROM products_db.product WHERE price = (SELECT MAX(price) FROM products_db.product)");

            return plainToInstance(ProductResponseDto, product, {
                excludeExtraneousValues: true,
            });
        } catch (exception) {
            return exception.message;
        }
    }

    async deleteAllProducts() {
        try {
            return { affected: (await this.productsRepository.deleteAll()).affected };
        } catch (exception) {
            return exception.message;
        }
    }

    async deleteProductById(id: number) {
        try {
            return { affected: (await this.productsRepository.delete({ "id": id })).affected };
        } catch (exception) {
            return exception.message;
        }
    }

}
