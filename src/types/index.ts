export interface Hero {
  id: number;
  name: string;
  slug: string;
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}

export interface HeroDetails extends Hero {
  powerstats: Record<string, string>;
  appearance: Record<string, string>;
  biography: Record<string, string>;
  work: Record<string, string>;
  connections: Record<string, string>;
}

export interface HeroResponse {
  length: string;
  size: number;
  page: number;
  firstPage: number;
  lastPage: number;
  startIndex: number;
  endIndex: number;
  items: Hero[];
}
