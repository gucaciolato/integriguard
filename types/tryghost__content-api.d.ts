declare module '@tryghost/content-api' {
  interface GhostContentAPI {
    posts: {
      browse(options: {
        limit?: number | string;
        page?: number;
        include?: string[];
        fields?: string[];
        filter?: string;
      }): Promise<{
        posts: Post[];
        meta: {
          pagination: {
            pages: number;
            total: number;
          };
        };
      }>;
      read(options: {
        slug: string;
        include?: string[];
      }): Promise<Post>;
    };
    tags: {
      browse(options: {
        limit?: number | string;
        include?: string;
        filter?: string;
      }): Promise<Tag[]>;
    };
    authors: {
      read(options: {
        slug: string;
        include?: string;
      }): Promise<Author>;
    };
  }

  interface Post {
    id: string;
    title: string;
    slug: string;
    feature_image: string;
    excerpt: string;
    published_at: string;
    reading_time: number;
    tags: Tag[];
    primary_author: Author;
    html: string;
  }

  interface Tag {
    id: string;
    slug: string;
    name: string;
  }

  interface Author {
    id: string;
    name: string;
    slug: string;
    profile_image: string;
    bio: string;
  }

  export default class GhostContentAPI {
    constructor(options: {
      url: string;
      key: string;
      version: string;
    });
  }
} 