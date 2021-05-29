import { Request } from 'express';
import { getAuthUser } from '../../../utils/jwt.utils';
import prisma from '../../../utils/prisma.utils';
// import { paginate } from '../../../utils/response.util';
// import { ItemPerPage } from '../../config/site.config';
import {CategoryRepositoryInterface} from './category.interface'

export class CategoryRepository implements CategoryRepositoryInterface{

  
  //async list category with category
  async index(req:Request){
    try{
      const page = Number(req.query.page);
      const keyword = (req.query.keyword)?.toString() || '';
      const type:'income'|'expense' = req.query.type as "income"|"expense";
      const user = getAuthUser(req);
      const categories = await prisma.category.findMany({
        where:{
          parent_id:null,
          type:type,
          userId:user.id,
          OR:{
            name:{contains:keyword},
          },
        },
        orderBy:{
          createdAt:'desc'
        },
        include:{
          Category:true
        },
        // skip:page * ItemPerPage - ItemPerPage || 0,
      });
      const total = await prisma.category.count({
        where:{
          parent_id:null,
          type:type,
          userId:user.id,
          OR:{
            name:{contains:keyword},
          },
        },
      });
      return categories;
      // return paginate('categories',page,total,categories);
    }catch(e){
      throw e;
    }
  }

  // store category
  async store(req:Request){
    try{
      const {
        name,
        description,
        type,
        parent_id
      } = req.body;
      const cat_id = Number(parent_id);

      const user = getAuthUser(req);

      const category = prisma.category.create({ 
        data:{
            name:name,
            description:description,
            type:type,
            createdAt:new Date(),
            updatedAt:new Date(),
            parent_id:cat_id? cat_id :null,
            userId:user.id
          },
        }); 
      return category;
    }catch(e){
      console.log(e);
      throw e;

    }
  }

  // update category
  async update(req:Request){
    try{
      const id = Number(req.params.id);
      const {
        name,
        description,
        type,
        parent_id
      } = req.body;
      const cat_id = Number(parent_id);
      const category = await prisma.category.update({
        where:{
          id:id
        },
        data:{
          name:name,
          description:description,
          type:type,
          updatedAt:new Date(),
          parent_id:cat_id? cat_id :null,
        },
        include:{
          Category:true
        },
      });
      return category;
    }catch(e){
      throw e;
    }
  }

} 