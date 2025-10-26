// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    // 1. Configure the ConfigModule to load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Optional: Makes ConfigService available globally
    }),

    // 2. Configure TypeOrmModule using the environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT! || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      // ... other TypeORM options
    }),

    ProductsModule,

    CommonModule,

    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
