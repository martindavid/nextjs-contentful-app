import React from "react";
import { Layout } from "components/layout";
import { BlogDetail } from "components/blog";
import { BlogApi, BlogPost } from "services";

type BlogDetailPageProps = {
  post: BlogPost;
};

export default class BlogDetailPage extends React.Component<
  BlogDetailPageProps
> {
  static async getInitialProps(ctx) {
    const { id } = ctx.query;
    const api = new BlogApi();
    const post = await api.fetchBlogById(id);
    return { post };
  }

  render() {
    const { post } = this.props;
    return (
      <Layout>
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
