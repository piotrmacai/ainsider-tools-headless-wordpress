'use client'

// Craft Imports
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Components
import Link from "next/link";

// Icons
import { File, Pen, Tag, Boxes, User, Folder } from "lucide-react";

// For Posts
import {
  getAllPosts,
  getAllAuthors,
  getAllTags,
  getAllCategories,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import PostCard from "@/components/posts/post-card";
import FilterPosts from "./posts/filter";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { author, tag, category, page: pageParam } = searchParams;
  const posts = await getAllPosts({ author, tag, category });
  const authors = await getAllAuthors();
  const tags = await getAllTags();
  const categories = await getAllCategories();

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 39;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <Section>
      <Container>
        <h1>Posts</h1>
        <FilterPosts
          authors={authors}
          tags={tags}
          categories={categories}
          selectedAuthor={author}
          selectedTag={tag}
          selectedCategory={category}
        />

        {paginatedPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 z-0">
            {paginatedPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
            <p>No Results Found</p>
          </div>
        )}

        <div className="mt-8 not-prose">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={page === 1 ? "pointer-events-none text-muted" : ""}
                  href={`/posts?page=${Math.max(page - 1, 1)}${
                    category ? `&category=${category}` : ""
                  }${author ? `&author=${author}` : ""}${
                    tag ? `&tag=${tag}` : ""
                  }`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/posts?page=${page}`}>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={
                    page === totalPages ? "pointer-events-none text-muted" : ""
                  }
                  href={`/posts?page=${Math.min(page + 1, totalPages)}${
                    category ? `&category=${category}` : ""
                  }${author ? `&author=${author}` : ""}${
                    tag ? `&tag=${tag}` : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Container>
    </Section>
  );
}


// This page is using the craft.tsx component and design system
// export default function Home() {
//   return (
//     <Section>
//       <Container>
//         <ExampleJsx />
//       </Container>
//     </Section>
//   );
// }



// This is just some example JS to demonstrate automatic styling from brijr/craft
// const ExampleJsx = () => {
//   return (
//     <article className="prose-m-none">
//       <h1>
//         <Balancer>
//           AI Tools Library by Ainsider{" "}
//         </Balancer>
//       </h1>
//       <a
//         className="h-16 block"
//         href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F9d8dev%2Fnext-wp&env=WORDPRESS_URL,WORDPRESS_HOSTNAME&envDescription=Add%20WordPress%20URL%20with%20Rest%20API%20enabled%20(ie.%20https%3A%2F%2Fwp.example.com)%20abd%20the%20hostname%20for%20Image%20rendering%20in%20Next%20JS%20(ie.%20wp.example.com)&project-name=next-wp&repository-name=next-wp&demo-title=Next%20JS%20and%20WordPress%20Starter&demo-url=https%3A%2F%2Fwp.9d8.dev"
//       >
//         <img
//           className="not-prose my-4"
//           src="https://vercel.com/button"
//           alt="Newsletter"
//         />
//       </a>
//       <p>
//         This is <a href="https://github.com/9d8dev/next-wp">next-wp</a>, created
//         as a way to build WordPress sites with Next.js at rapid speed. This
//         starter is designed with <a href="https://ui.shadcn.com">shadcn/ui</a>,{" "}
//         <a href="https://github.com/brijr/craft">brijr/craft</a>, and Tailwind
//         CSS. Use <a href="https://components.bridger.to">brijr/components</a> to
//         build your site with prebuilt components. The data fetching and
//         typesafety is handled in <code>lib/WordPress.ts</code> and{" "}
//         <code>lib/WordPress.d.ts</code>. Questions? Email 9d8dev@gmail.com
//       </p>
//       <div className="grid md:grid-cols-3 gap-4 mt-6 not-prose">
//         <Link
//           className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
//           href="/posts"
//         >
//           <Pen size={32} />
//           <span>
//             Posts{" "}
//             <span className="block text-sm text-muted-foreground">
//               All posts from your WordPress
//             </span>
//           </span>
//         </Link>
//         <Link
//           className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
//           href="/pages"
//         >
//           <File size={32} />
//           <span>
//             Pages{" "}
//             <span className="block text-sm text-muted-foreground">
//               Custom pages from your WordPress
//             </span>
//           </span>
//         </Link>
//         <Link
//           className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
//           href="/posts/authors"
//         >
//           <User size={32} />
//           <span>
//             Authors{" "}
//             <span className="block text-sm text-muted-foreground">
//               List of the authors from your WordPress
//             </span>
//           </span>
//         </Link>
//         <Link
//           className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
//           href="/posts/tags"
//         >
//           <Tag size={32} />
//           <span>
//             Tags{" "}
//             <span className="block text-sm text-muted-foreground">
//               Content by tags from your WordPress
//             </span>
//           </span>
//         </Link>
//         <Link
//           className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
//           href="/posts/categories"
//         >
//           <Boxes size={32} />
//           <span>
//             Categories{" "}
//             <span className="block text-sm text-muted-foreground">
//               Categories from your WordPress
//             </span>
//           </span>
//         </Link>
//         <a
//           className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
//           href="https://github.com/9d8dev/next-wp"
//         >
//           <Folder size={32} />
//           <span>
//             Documentation{" "}
//             <span className="block text-sm text-muted-foreground">
//               How to use `next-wp`
//             </span>
//           </span>
//         </a>
//       </div>
//     </article>
//   );
// };
