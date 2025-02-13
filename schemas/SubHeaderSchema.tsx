export default interface SubHeaderSchema {
    data: {
      categories:Categories
    };
  }
  
  export interface Categories{
      items:[
          level: number,
          name: string,
          children_count: number,
          children: [ChildItem]
      ]
  }
  export interface PageInfo {
    current_page: number;
    page_size: number;
    total_pages: number;
  }
  export interface ChildItem {
    level: number;
    name: string;
    children_count: number;
    children: [level: number, name: string];
  }
  