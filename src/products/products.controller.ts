import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponseDto } from './dto/product-response.dto';

import { Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }



    @Get()
    @ApiOperation({ summary: 'Get products', description: 'Get 20 products or get desired amount of products amount with sorting and pagination. Sorting by ascending name field by default' })
    @ApiQuery({
        name: "pageIndex",
        type: Number,
        description: "Page index; Must be bigger than 0. Equals 1 by default",
        required: false
    })
    @ApiQuery({
        name: "pageSize",
        type: Number,
        description: "Page size; Must be bigger than 0. Equals 20 by default",
        required: false
    })
    @ApiQuery({
        name: "sortField",
        type: String,
        description: "Selected field for sorting; Must be [name/price]. Is 'name' by default",
        required: false
    })
    @ApiQuery({
        name: "sort",
        type: String,
        description: "Sort direction; Must be [asc/desc]. Is 'asc' by default",
        required: false
    })
    @ApiOkResponse({ description: 'Server has responded with search result.'})
    @ApiBadRequestResponse({ description: 'Invalid pagination/sorting data provided' })
    getAllProducts(@Query(new ValidationPipe({ transform: true })) query: GetProductsDto) {
        return this.productsService.findAllPaginatedAndSorted(query.pageIndex, query.pageSize, query.sortField, query.sort);
    }



    @Get('expensivest')
    @ApiOperation({ summary: 'Get the expensivest', description: 'Get the expensivest product in DB' })
    @ApiOkResponse({ description: 'Server has responded with search result.'})
    getExpensivestProduct() {
        return this.productsService.getExpensivest();
    }

    @Get('cheapest')
    @ApiOperation({ summary: 'Get the cheapest', description: 'Get the cheapest product in DB' })
    @ApiOkResponse({ description: 'Server has responded with search result.'})
    getCheapestProduct() {
        return this.productsService.getCheapest();
    }

    @Get('median')
    @ApiOperation({ summary: 'Get price median', description: 'Get price median from all of the DB products' })
    @ApiOkResponse({ description: 'Server has responded with search result.'})
    getMedianPrice() {
        return this.productsService.getMedian();
    }

    @Get('count')
    @ApiOperation({ summary: 'Count products', description: 'Get amount of the products in the DB' })
    @ApiOkResponse({ description: 'Server has responded with search result.'})
    getProductsAmount() {
        return this.productsService.count();

    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'Product ID', type: "number" })
    @ApiOperation({ summary: 'Get specific product', description: 'Get product by its DB id' })
    @ApiOkResponse({ description: 'Server has responded with search result.'})
    getProductById(@Param() params: { id: number }) {
        const { id: productId } = params;
        return this.productsService.findOne(productId);
    }

    @Post()
    @ApiBody({ type: [CreateProductDto] })
    @ApiOperation({ summary: 'Create product', description: 'Create new product and save it to the DB' })
    @ApiBadRequestResponse({ description: 'Invalid product data provided' })
    @ApiCreatedResponse({ description: 'Product created successfully'})
    createProduct(@Body() body: CreateProductDto) {
        return this.productsService.createProduct(body);
    }

    @Delete()
    @ApiOkResponse({ description: 'Products deleted'})
    @ApiOperation({ summary: 'Delete products', description: 'Deletes all instances of products from the DB' })
    deleteAllProducts() {
        return this.productsService.deleteAllProducts();
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'Product ID', type: "number" })
    @ApiOkResponse({ description: 'Product deleted'})
    @ApiOperation({ summary: 'Delete product', description: 'Deletes specific product from the DB by ID.' })
    deleteProductById(@Param() params: { id: number }) {
        const { id: productId } = params;
        return this.productsService.deleteProductById(productId);
    }


}
