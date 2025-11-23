import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProductWhereUniqueInput;
        where?: Prisma.ProductWhereInput;
        orderBy?: Prisma.ProductOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.product.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                category: true,
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                variants: true,
            },
        });
    }

    async create(data: Prisma.ProductCreateInput) {
        return this.prisma.product.create({
            data,
        });
    }

    async update(params: {
        where: Prisma.ProductWhereUniqueInput;
        data: Prisma.ProductUpdateInput;
    }) {
        const { where, data } = params;
        return this.prisma.product.update({
            data,
            where,
        });
    }

    async remove(where: Prisma.ProductWhereUniqueInput) {
        return this.prisma.product.delete({
            where,
        });
    }
}
