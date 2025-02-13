export default interface SearchContentSchema {
  __component: string;
  id: number;
  
  trendheaderTitle: string;
  trendheaderLogo: string;
  trendcolumns: number;
  listlogo:string;
  recentheaderTitle:string;
  recentheaderLogo:string;
  recentcolumns:number;
  popularheaderTitle:string;
  popularheaderLogo:string;
  popularcolumns:Number;
  trendlistItems: TrendingLIST_ITEM[];
  recentlistItems: RecentLIST_ITEM[];
  popularlistItems: popularLIST_ITEM[];
  filterdata: filterLIST_ITEM[];
  trendingsearchesTitle: string;
  popularcategoriesTitle: string;
}
export type TrendingLIST_ITEM = {
  path: URL | string;
  ctaLabel: string;

  isNewTab: boolean;
  trendLogo: string;
};


export type RecentLIST_ITEM = {
    path: URL | string;
    ctaRecent: string;
  
    isNewTab: boolean;
   
  };

  export type filterLIST_ITEM = {
    path: URL | string;
    recentdata: string;
  
    isNewTab: boolean;
   
  };


  export type popularLIST_ITEM = {
    path: URL | string;
    ctaLogo: string;
  
    isNewTab: boolean;
   
  };
