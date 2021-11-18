import React, { useEffect } from "react";
import { createClient } from "contentful";
import { useRouter } from "next/router";
import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";
import { greeting } from "../../utils/greeting";

// Component imports
import BlogHeadLayout from "../../components/layout/head/BlogHeadLayout";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import BlogPreviewCard from "../../components/page_components/blog/BlogPreviewCard";

const Blog = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  navStylePurple["navBgColor"] = "lg:bg-white";
  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  // useEffect(() => {
  //   window.scroll({ top: 1, left: 0, behavior: "smooth" });
  // }, []);

  return (
    <BlogHeadLayout>
      <Navbar navStyle={navStylePurple} />
      <div className="h-full w-full">
        <div id="article" className="text-center pt-32 px-10 pb-20">
          <h1 className="component-heading">{greeting}! Welcome to our blog</h1>
          <h2>
            A compendium of articles ranging from preloved's and pets to kids
            and all things DIY!
          </h2>

          <BlogPreviewCard blogs={props.blogs} />
        </div>
      </div>

      <Footer
        footerGradientClass={footerGradientClassPurple}
        pathname={pathname}
      />
    </BlogHeadLayout>
  );
};

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "blog" });

  return {
    props: {
      blogs: res.items,
    },
    revalidate: 10,
  };
};

export default Blog;
