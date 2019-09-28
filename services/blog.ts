import { ContentfulClientApi, createClient } from "contentful";
import { Author, HeroImage, BlogPost } from "./blog.types";
import moment from "moment";

export class BlogApi {
  client: ContentfulClientApi;

  constructor() {
    this.client = createClient({
      space: "9lk5dcgffszt",
      accessToken: "Q_89doAVg1Ej_uofqMv3mYl75ymOijDnwHhPT05Plt4"
    });
  }

  convertImage = (rawImage): HeroImage => {
    if (rawImage) {
      return {
        imageUrl: rawImage.file.url.replace("//", "http://"), // may need to put null check as well here
        description: rawImage.description,
        title: rawImage.title
      };
    }
    return null;
  };

  convertAuthor = (rawAuthor): Author => {
    if (rawAuthor) {
      return {
        name: rawAuthor.name,
        phone: rawAuthor.phone,
        shortBio: rawAuthor.shortBio,
        title: rawAuthor.title,
        email: rawAuthor.email,
        company: rawAuthor.company,
        twitter: rawAuthor.twitter,
        facebook: rawAuthor.facebook,
        github: rawAuthor.github
      };
    }
    return null;
  };

  convertPost = (rawData): BlogPost => {
    const rawPost = rawData.fields;
    const rawHeroImage = rawPost.heroImage ? rawPost.heroImage.fields : null;
    const rawAuthor = rawPost.author ? rawPost.author.fields : null;
    return {
      id: rawData.sys.id,
      body: rawPost.body,
      description: rawPost.description,
      publishedDate: moment(rawPost.publishedDate).format("DD MMM YYYY"),
      slug: rawPost.slug,
      tags: rawPost.tags,
      title: rawPost.title,
      heroImage: this.convertImage(rawHeroImage),
      author: this.convertAuthor(rawAuthor)
    };
  };

  async fetchBlogEntries(): Promise<Array<BlogPost>> {
    return await this.client
      .getEntries({
        content_type: "blogPost" // only fetch blog post entry
      })
      .then(entries => {
        if (entries && entries.items && entries.items.length > 0) {
          const blogPosts = entries.items.map(entry => this.convertPost(entry));
          return blogPosts;
        }
        return [];
      });
  }

  async fetchBlogById(id): Promise<BlogPost> {
    return await this.client.getEntry(id).then(entry => {
      if (entry) {
        const post = this.convertPost(entry);
        return post;
      }
      return null;
    });
  }
}
