import { NextApiRequest, NextApiResponse } from 'next';
import { getTravelSlugs, getTravelPostBySlug } from '@/lib/mdx';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slugs = getTravelSlugs();
    const results = [];
    
    for (const slug of slugs) {
      try {
        const { frontMatter, slug: actualSlug } = getTravelPostBySlug(slug);
        results.push({
          slug,
          actualSlug,
          title: frontMatter.title,
          category: frontMatter.category,
          date: frontMatter.date,
          success: true
        });
      } catch (error) {
        results.push({
          slug,
          error: String(error),
          success: false
        });
      }
    }
    
    res.status(200).json({
      slugs,
      results
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
}
