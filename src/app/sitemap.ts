import type { MetadataRoute } from 'next';
import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';

const query = graphql(/* GraphQL */ `
  query AllPagesQuery {
    allPages {
      slug
    }
  }
`);

type Page = {
  slug: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { allPages } = await executeQuery(query);
  const pages = allPages as Page[];

  return pages.map((page) => ({
    url: `https://dospolov.com/${page.slug === 'homepage' ? '' : page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));
}
