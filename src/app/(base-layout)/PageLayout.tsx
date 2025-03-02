import { StructuredText } from 'react-datocms';
import Link from 'next/link';
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
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

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
// const Code = dynamic(() => import('@/components/Code'));

export default function PageLayout({
  page,
  showTitle = true,
}: {
  page: PageRecord;
  showTitle?: boolean;
}) {
  return (
    <div className="px-4 md:px-0">
      <div className="container mx-auto prose dark:prose-invert pt-4 flex justify-between items-center">
        <div className="not-prose">
          {page.slug !== 'homepage' && (
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
          )}
        </div>
        <ThemeSwitcher />
      </div>
      <div className="container mx-auto prose dark:prose-invert md:py-10 prose-hr:border-gray-500">
        {showTitle && <h1>{page.title}</h1>}
        {/*
         * Structured Text is a JSON format similar to HTML, but with the advantage
         * of a significantly reduced and tailored set of possible tags
         * for editorial content, along with the capability to create hyperlinks
         * to other DatoCMS records and embed custom DatoCMS blocks.
         */}
        <StructuredText
          data={page.structuredText}
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
        {/* <footer>Published at {page._firstPublishedAt}</footer> */}
      </div>
    </div>
  );
}
