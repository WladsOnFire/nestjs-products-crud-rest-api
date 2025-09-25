import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { config } from 'dotenv';

//dotenv configuration
config();



@Module({
  imports: [ProductsModule, TypeOrmModule.forRoot({
    type: (process.env.DB_TYPE as 'mysql' | 'postgres' | 'mariadb' | 'sqlite'),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT!, 10),
    database: process.env.DB_NAME,
    entities: [Product],
    synchronize: false,
  })],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
