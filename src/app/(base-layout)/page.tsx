import HeadingWithAnchorLink from '@/components/HeadingWithAnchorLink';
import ImageBlock, { ImageBlockFragment } from '@/components/blocks/ImageBlock';
import ImageGalleryBlock, {
  ImageGalleryBlockFragment,
} from '@/components/blocks/ImageGalleryBlock';
import { VideoBlockFragment } from '@/components/blocks/VideoBlock';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
// import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';
import { isCode, isHeading } from 'datocms-structured-text-utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredText, renderNodeRule } from 'react-datocms';
import PageLayout from './PageLayout';

const query = graphql(
  /* GraphQL */ `
    query BasicPageQuery {
      page(filter: { slug: { eq: "homepage" } }) {
        _seoMetaTags {
          ...TagFragment
        }
        title
        _firstPublishedAt
        structuredText {
          value
          blocks {
            ... on RecordInterface {
              id
              __typename
            }
            ... on ImageBlockRecord {
              ...ImageBlockFragment
            }
            ... on ImageGalleryBlockRecord {
              ...ImageGalleryBlockFragment
            }
            ... on VideoBlockRecord {
              ...VideoBlockFragment
            }
          }
          links {
            ... on RecordInterface {
              id
              __typename
            }
            ... on PageRecord {
              title
              slug
            }
          }
        }
      }
    }
  `,
  [TagFragment, ImageBlockFragment, ImageGalleryBlockFragment, VideoBlockFragment],
);

// export const generateMetadata = generateMetadataFn({
//   query,
//   pickSeoMetaTags: (data) => data.page?._seoMetaTags,
// });

export default async function Page() {
  const { page } = await executeQuery(query);

  if (!page) {
    notFound();
  }

  return <PageLayout page={page} />;
}
