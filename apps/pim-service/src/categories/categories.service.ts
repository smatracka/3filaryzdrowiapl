import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        const allCategories = await this.prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });

        const categoryMap = new Map();
        const rootCategories: any[] = [];

        // First pass: create map nodes
        allCategories.forEach((cat: any) => {
            categoryMap.set(cat.id, {
                ...cat,
                productCount: cat._count.products,
                children: []
            });
        });

        // Second pass: build tree
        allCategories.forEach((cat: any) => {
            const node = categoryMap.get(cat.id);
            if (cat.parentId) {
                const parent = categoryMap.get(cat.parentId);
                if (parent) {
                    parent.children.push(node);
                }
            } else {
                rootCategories.push(node);
            }
        });

        return rootCategories;
    }

    async findOne(id: string) {
        return this.prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
                _count: {
                    select: { products: true }
                }
            }
        });
    }

    async create(data: any) {
        return this.prisma.category.create({
            data
        });
    }

    async update(id: string, data: any) {
        return this.prisma.category.update({
            where: { id },
            data
        });
    }

    async remove(id: string) {
        return this.prisma.category.delete({
            where: { id }
        });
    }
}
