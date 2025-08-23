declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        page_location?: string;
        page_path?: string;
        page_title?: string;
        content_type?: string;
        content_id?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

export {}; 