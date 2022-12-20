interface IndexDataItf{
  salePie:{}[]
  saleMap:{}[]
}

interface IndexRes {
  data: {
    data:IndexDataItf,
    errno?: number;
  };
  code?: any;
  message?: any;
  
  errmsg?: string;
}

declare module '*.json' {
  const value: any;
  export default value;
}
