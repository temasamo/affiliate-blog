declare module 'amazon-paapi' {
  interface SearchItemsParams {
    AccessKey: string;
    SecretKey: string;
    PartnerTag: string;
    PartnerType: string;
    Marketplace: string;
    Region: string;
    Keywords: string;
    ItemCount: number;
    Resources: string[];
  }

  interface SearchResult {
    SearchResult?: {
      Items?: any[];
    };
  }

  function SearchItems(params: SearchItemsParams): Promise<SearchResult>;
  
  export default {
    SearchItems
  };
} 