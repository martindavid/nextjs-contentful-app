import React from "react";
import { Layout } from "components/layout";
import { BlogDetail } from "components/blog";
import { BlogApi, BlogPost } from "services";
import { NextSeo } from "next-seo";

type BlogDetailPageProps = {
  post: BlogPost;
};

export default class BlogDetailPage extends React.Component<
  BlogDetailPageProps
> {
  static async getInitialProps(ctx) {
    const { slug } = ctx.query;
    const api = new BlogApi();
    const post = await api.fetchBlogById(slug);
    return { post };
  }

  render() {
    const { post } = this.props;
    return (
      <Layout>
        <NextSeo
          openGraph={{
            type: "article",
            title: post.metaTitle,
            description: post.metaDescription,
            images: [
              {
                url: post.metaImage,
                width: 850,
                height: 650,
                alt: post.metaTitle
              }
            ]
          }}
          title={post.metaTitle}
          description={post.metaDescription}
        />
        <div className="row">
          <div className="col-12">
            {!post && <div>Loading...</div>}
            {post && <BlogDetail post={post} />}
          </div>
        </div>
      </Layout>
    );
  }
}
