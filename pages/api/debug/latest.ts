// pages/api/debug/latest.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getLatestPosts, getAllPosts } from '@/lib/posts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allPosts = getAllPosts();
    const latestPosts = await getLatestPosts(10);
    
    // 09-beauty-health記事を探す
    const beautyHealthPost = allPosts.find(p => p.slug === '09-beauty-health');
    
    res.status(200).json({
      allPostsCount: allPosts.length,
      latestPostsCount: latestPosts.length,
      beautyHealthPost: beautyHealthPost ? {
        slug: beautyHealthPost.slug,
        title: beautyHealthPost.title,
        category: beautyHealthPost.category,
        date: beautyHealthPost.date,
        published: beautyHealthPost.published
      } : null,
      allPosts: allPosts.slice(0, 5).map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date,
        published: p.published
      })),
      latestPosts: latestPosts.map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date
      }))
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
} 