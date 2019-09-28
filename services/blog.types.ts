export type Author = {
  name: string;
  phone: string;
  shortBio: string;
  title: string;
  email: string;
  company: string;
  twitter: string;
  facebook: string;
  github: string;
};

export type HeroImage = {
  imageUrl: string;
  description: string;
  title: string;
};

export type BlogPost = {
  id: string;
  body: string;
  description: string;
  publishedDate: string;
  slug: string;
  tags: Array<string>;
  title: string;
  heroImage?: HeroImage;
  author?: Author;
};
