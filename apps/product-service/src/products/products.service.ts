import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService {
  private prisma = new PrismaClient();

  async findAll(params?: {
    skip?: number;
    take?: number;
    search?: string;
    categoryId?: string;
  }) {
    const { skip, take, search, categoryId } = params || {};
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (categoryId) {
      where.categoryId = categoryId;
    }

    return this.prisma.storeProduct.findMany({
      skip,
      take,
      where,
      include: {
        category: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.storeProduct.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async findBySku(sku: string) {
    return this.prisma.storeProduct.findUnique({
      where: { sku },
      include: {
        category: true,
      },
    });
  }

  async count(params?: { search?: string; categoryId?: string }) {
    const { search, categoryId } = params || {};
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (categoryId) {
      where.categoryId = categoryId;
    }

    return this.prisma.storeProduct.count({ where });
  }
}
