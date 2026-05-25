import { Request, Response } from 'express';
import News from '../models/News.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { auditLog } from '../services/audit.service';
import slugifyStr from 'slugify';

export const getNews = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, tag, search } = req.query;
  const filter: Record<string, unknown> = {
    tenantId: req.tenant!._id,
    status: 'published',
    //status: { $in: ['draft', 'published'] },
    };
  if (tag) filter.tags = tag;
  if (search) filter.$text = { $search: search as string };

  const [news, total] = await Promise.all([
    News.find(filter)
      .populate('author', 'name avatar jobTitle')
      .sort({
        isFeatured: -1,
        publishedAt: -1,
        })
      .skip((+page - 1) * +limit)
      .limit(+limit),
    News.countDocuments(filter),
  ]);

  res.json(new ApiResponse('News fetched', { news, total, pages: Math.ceil(total / +limit), page: +page }));
};

export const getGroupNews = async (_req: Request, res: Response) => {
  const news = await News.find({
    isGroupWide: true,
    status: 'published',
    })
    .populate('author', 'name avatar')
    .populate('tenantId', 'name slug branding')
    .sort('-publishedAt')
    .limit(20);
  res.json(new ApiResponse('Group news fetched', { news }));
};

export const getFeaturedNews = async (
    req: Request,
    res: Response
    ) => {
    const news = await News.find({
        tenantId: req.tenant!._id,
        isFeatured: true,
        status: 'published',
    })
        .sort('-publishedAt')
        .limit(5);

    res.json(
        new ApiResponse('Featured news fetched', {
        news,
        })
    );
    };

export const getSingleNews = async (req: Request, res: Response) => {
  const article = await News.findOne({
    slug: req.params.slug,
    tenantId: req.tenant!._id,
    status: 'published',
    })
    .populate('author', 'name avatar jobTitle');
  if (!article) throw new ApiError(404, 'Article not found');
  article.viewCount += 1;
  await article.save();
  res.json(new ApiResponse('Article fetched', { article }));
};

export const createNews = async (req: Request, res: Response) => {
  const { title, ...rest } = req.body;
  const slug = slugifyStr(title, { lower: true, strict: true }) + '-' + Date.now();
  const article = await News.create({
    status: 'draft',
    ...rest, title, slug,
    tenantId: req.tenant!._id,
    author: req.user!._id,
  });
  await auditLog({
    tenantId:   req.tenant!._id.toString(),
    userId: req.user!._id.toString(),
    action:     'NEWS_CREATED',
    resource:   'news',
    resourceId: article.id,
    details:    { title },
  });
  res.status(201).json(new ApiResponse('Article created', { article }));
};

export const publishNews = async (req: Request, res: Response) => {
  const article = await News.findOne({ _id: req.params.id, tenantId: req.tenant!._id });
  if (!article) throw new ApiError(404, 'Article not found');
  article.isPublished = true;
  article.status = 'published';
  article.publishedAt = new Date();
  await article.save();
  await auditLog({
    tenantId: req.tenant!._id.toString(),
    userId: req.user!._id.toString(),
    action:   'NEWS_PUBLISHED',
    resource: 'news',
    resourceId: article.id,
  });
  res.json(new ApiResponse('Article published', { article }));
};

export const updateNews = async (req: Request, res: Response) => {
  const article = await News.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.tenant!._id },
    req.body,
    { new: true }
  );
  if (!article) throw new ApiError(404, 'Article not found');
  res.json(new ApiResponse('Article updated', { article }));
};

export const deleteNews = async (req: Request, res: Response) => {
  const article = await News.findOneAndDelete({ _id: req.params.id, tenantId: req.tenant!._id });
  if (!article) throw new ApiError(404, 'Article not found');
  await auditLog({
    tenantId: req.tenant!._id.toString(),
    userId: req.user!._id.toString(),
    action:   'NEWS_DELETED',
    resource: 'news',
    resourceId: req.params.id as string,
  });
  res.json(new ApiResponse('Article deleted', {}));
};