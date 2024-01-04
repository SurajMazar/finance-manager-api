import {Request} from 'express-serve-static-core';
import {formatDate, getStartEndHr} from '../../../utils/common.utils';
import {getAuthUser} from '../../../utils/jwt.utils';
import prisma from '../../../utils/prisma.utils';
// import { paginate } from '../../../utils/response.util';
// import { ItemPerPage } from '../../config/site.config';
import {IncomeRepositoryInterface} from './income.interface';
import moment from "moment";


export class IncomeRepository implements IncomeRepositoryInterface {


    async index(req: Request) {
        try {
            // const page = Number(req.query.page);
            const keyword = (req.query.keyword)?.toString() || '';
            let category: any = req.query.category || undefined;
            const month = req.query.month ? new Date(req.query.month as string) : new Date();
            const user = getAuthUser(req);

            let cat: Array<number> | number | undefined = [];
            if (category) {
                if (Array.isArray(category)) {
                    category.forEach((c: any) => {
                        if (Array.isArray(cat)) {
                            cat.push(Number(c))
                        }
                    })
                } else {
                    cat = Number(category);
                }
            } else {
                cat = undefined;
            }

            const incomes = await prisma.income.findMany({
                where: {
                    cat_id: {
                        in: cat
                    },
                    userId: user.id,
                    OR: {
                        title: {contains: keyword},
                    },
                    createdAt: {
                        gt: new Date(month.getFullYear(), month.getMonth(), 1),
                        lt: new Date(month.getFullYear(), month.getMonth() + 1, 1)
                    }

                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    category: true
                },
                // skip:page * ItemPerPage - ItemPerPage || 0,
            });
            return incomes;
            // const total = await prisma.income.count({where:{ cat_id:{
            //   in:cat
            // },userId:user.id,OR:{title:{contains:keyword},},createdAt: {gte:startDate,lt:endDate},},});
            // return paginate('income',page,total,incomes);
        } catch (e: any) {
            throw new Error(e);
        }
    }


    async store(req: Request) {
        try {
            const {
                title,
                amount,
                cat_id,
                created_at
            } = req.body;

            const user = getAuthUser(req)
            const income = await prisma.income.create({
                data: {
                    title: title,
                    amount: parseFloat(amount),
                    createdAt: moment(created_at ? created_at : new Date()).toDate(),
                    updatedAt: moment(created_at ? created_at : new Date()).toDate(),
                    cat_id: Number(cat_id),
                    userId: user.id
                }
            });
            return income;
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    async update(req: Request) {
        try {
            const {
                title,
                amount,
                cat_id
            } = req.body;
            const id = Number(req.params.id);
            const income = await prisma.income.update({
                where: {
                    id: id
                },
                data: {
                    title: title,
                    amount: parseFloat(amount),
                    cat_id: Number(cat_id),
                    updatedAt: new Date(),
                }
            });
            return income;
        } catch (e) {
            console.log(e)
            throw e;
        }
    }


    async getByDate(req: Request) {
        try {
            const date = req.query.date || null;
            const user = getAuthUser(req);
            const currentDate = date ? new Date(date as string) : new Date(formatDate());
            const nextDate = new Date(currentDate.getTime() + 60 * 60 * 24 * 1000);
            const incomes = await prisma.income.findMany({
                where: {
                    createdAt: {
                        gte: currentDate,
                        lt: nextDate,
                    },
                    userId: user.id,
                },
                include: {
                    category: true
                }
            })
            const totalIncomes = await this.getTotalIncome(req, date);
            return {incomes: incomes, total_income: totalIncomes};
        } catch (e) {
            throw e;
        }
    }


    private async getTotalIncome(req: Request, date: any) {
        try {
            const user = getAuthUser(req);
            const currentDate = moment(date || new Date()).startOf('day').toDate();
            const income = await prisma.income.findMany({
                where: {
                    userId: user.id,
                    createdAt: {
                        lt: currentDate,
                    }
                },
            })

            let total = 0;

            income.forEach(e => {
                total = total + e?.amount || 0
            })

            return total;

        } catch (e) {
            throw e;
        }
    }

}
