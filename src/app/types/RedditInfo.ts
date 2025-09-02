export type Post = {
  title: string;
  url: string;
  upvotes: number;
};

export type RedditInfo = {
  posts: Post[];
  subName: string;
};