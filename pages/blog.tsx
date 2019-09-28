import React from "react";
import { Layout } from "components/layout";
import { BlogApi, BlogPost } from "services";
import { BlogBox } from "components/blog";

type BlogPageState = {
  entries: Array<BlogPost>;
};

export default class BlogPage extends React.Component<{}, BlogPageState> {
  state = {
    entries: []
  };

  async componentDidMount() {
    const api = new BlogApi();
    const entries = await api.fetchBlogEntries();
    this.setState({ entries });
  }

  renderBlogList = entries =>
    entries.map(entry => {
      return (
        <BlogBox
          slug={entry.slug}
          imageUrl={entry.heroImage.imageUrl}
          title={entry.title}
          author={entry.author.name}
          description={entry.description}
          tags={entry.tags}
        />
      );
    });

  render() {
    const { entries } = this.state;
    return (
      <Layout>
        <h1>Blog</h1>
        <div className="row mt-3">
          {entries.length > 0 && this.renderBlogList(entries)}
          {entries.length == 0 && <div>Loading...</div>}
        </div>
      </Layout>
    );
  }
}
