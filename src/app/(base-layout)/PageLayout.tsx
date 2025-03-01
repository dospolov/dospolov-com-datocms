import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode, isHeading } from 'datocms-structured-text-utils';
import Link from 'next/link';
import HeadingWithAnchorLink from '@/components/HeadingWithAnchorLink';
import ImageBlock from '@/components/blocks/ImageBlock';
import ImageGalleryBlock from '@/components/blocks/ImageGalleryBlock';
import dynamic from 'next/dynamic';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Define the PageRecord type based on the structure from your GraphQL query
type PageRecord = {
  title: string;
  _firstPublishedAt: string | null;
  slug: string | unknown; // Allow both string and unknown types
  structuredText: {
    value: unknown;
    blocks: any[];
    links: any[];
  };
  _seoMetaTags?: Array<{
    tag: string;
    attributes: Record<string, string> | null;
    content: string | null;
  }>;
};

/*
 * By using next/dynamic, the components will not be included in the page's
 * initial JavaScript bundle. It allows you to defer loading of Client
 * Components and imported libraries, and only include them in the client bundle
 * when they're needed.
 */
const VideoBlock = dynamic(() => import('@/components/blocks/VideoBlock'));
const Code = dynamic(() => import('@/components/Code'));

export default function PageLayout({ page }: { page: PageRecord }) {
  return (
    <div className="container mx-auto prose dark:prose-invert md:py-10">
      {page.slug !== 'homepage' && (
        <div className="not-prose mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{page.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}

      <h1>{page.title}</h1>
      {/*
       * Structured Text is a JSON format similar to HTML, but with the advantage
       * of a significantly reduced and tailored set of possible tags
       * for editorial content, along with the capability to create hyperlinks
       * to other DatoCMS records and embed custom DatoCMS blocks.
       */}
      <StructuredText
        data={page.structuredText}
        customNodeRules={
          /*
           * Although the component knows how to convert all "standard" elements
           * (headings, bullet lists, etc.) into HTML, it's possible to
           * customize the rendering of each node.
           */
          [
            renderNodeRule(isCode, ({ node, key }) => <Code key={key} node={node} />),
            renderNodeRule(isHeading, ({ node, key, children }) => (
              <HeadingWithAnchorLink node={node} key={key}>
                {children}
              </HeadingWithAnchorLink>
            )),
          ]
        }
        renderBlock={
          /*
           * If the structured text embeds any blocks, it's up to you to decide
           * how to render them:
           */
          ({ record }) => {
            switch (record.__typename) {
              case 'VideoBlockRecord': {
                return <VideoBlock data={record} />;
              }
              case 'ImageBlockRecord': {
                return <ImageBlock data={record} />;
              }
              case 'ImageGalleryBlockRecord': {
                return <ImageGalleryBlock data={record} />;
              }
              default: {
                return null;
              }
            }
          }
        }
        renderInlineRecord={
          /*
           * If the structured text includes a reference to another DatoCMS
           * record, it's up to you to decide how to render them:
           */
          ({ record }) => {
            switch (record.__typename) {
              case 'PageRecord': {
                return (
                  <Link href={`/${record.slug}`} className="pill">
                    {record.title}
                  </Link>
                );
              }
              default: {
                return null;
              }
            }
          }
        }
        renderLinkToRecord={
          /*
           * If the structured text includes a link to another DatoCMS record,
           * it's your decision to determine where the link should lead, or if
           * you wish to customize its appearance:
           */
          ({ transformedMeta, record, children }) => {
            switch (record.__typename) {
              case 'PageRecord': {
                return (
                  <Link {...transformedMeta} href={`/${record.slug}`}>
                    {children}
                  </Link>
                );
              }
              default: {
                return null;
              }
            }
          }
        }
      />
      <footer>Published at {page._firstPublishedAt}</footer>
    </div>
  );
}
