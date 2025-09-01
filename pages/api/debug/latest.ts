import { NextApiRequest, NextApiResponse } from 'next';
import { getLatestPosts, getAllPosts } from '@/lib/posts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allPosts = getAllPosts();
    const latestPosts = await getLatestPosts(10);
    
    // 最新記事を探す
    const latestPost = latestPosts[0];
    
    res.status(200).json({
      allPostsCount: allPosts.length,
      latestPostsCount: latestPosts.length,
      latestPost: latestPost ? {
        slug: latestPost.slug,
        title: latestPost.title,
        category: latestPost.category,
        date: latestPost.date
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