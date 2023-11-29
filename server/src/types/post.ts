export interface Post {
    id?: string;
    title: string;
    content?: string | null;
  }
  

 export interface SearchHits {
    hits: {
      hits: Array<{
        _id: string;
      }>
    }
  }