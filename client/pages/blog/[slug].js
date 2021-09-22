import React from "react";
import Image from "next/image";
import { createClient } from "contentful";
import { useRouter } from "next/router";
import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";
import titleCase from "../../utils/titleCase";

// Component imports
import BlogArticleHeadLayout from "../../components/layout/head/BlogArticleHeadLayout";
import BlogHeader from "../../components/forms/blog/BlogHeader";
import BlogBody from "../../components/forms/blog/BlogBody";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const Article = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  navStylePurple["navBgColor"] = "lg:bg-white";
  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  if (router.isFallback) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Image
          src={"/images/loader/loader.gif"}
          alt={"Loader"}
          height={100}
          width={100}
        />
      </div>
    );
  }

  return (
    <BlogArticleHeadLayout
      title={titleCase(props.blog.fields.title)}
      slug={props.blog.fields.slug}
      description={props.blog.fields.shortDescription}
    >
      <Navbar navStyle={navStylePurple} />
      <div className="bg-alt-gray pt-32 pb-10 px-5 lg:px-20">
        <div>
          <article>
            <BlogHeader
              title={titleCase(props.blog.fields.title)}
              heroImage={props.blog.fields.heroImage.fields.file.url}
              heroImageDescription={
                props.blog.fields.heroImage.fields.description
              }
              createdOn={props.blog.sys.createdAt}
              imageWidth={
                props.blog.fields.heroImage.fields.file.details.image.width
              }
              imageHeight={
                props.blog.fields.heroImage.fields.file.details.image.height
              }
            />
            <BlogBody article={props.blog.fields.article} />
          </article>
        </div>
      </div>

      <Footer
        footerGradientClass={footerGradientClassPurple}
        pathname={pathname}
      />
    </BlogArticleHeadLayout>
  );
};

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "blog",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return { paths: paths, fallback: true };
};

export const getStaticProps = async (context) => {
  const res = await client.getEntries({
    content_type: "blog",
    "fields.slug": context.params.slug,
  });

  if (!res.items.length) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { blog: res.items[0] },
    revalidate: 10,
  };
};

export default Article;
