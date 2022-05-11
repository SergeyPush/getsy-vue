export interface ProductInterface {
  id?: number;
  title: string;
  description: string;
  createdAt: Date;
  features: string[] | undefined;
  type: string;
  price: number;
  images?: string[];
  imageId: any[];
  quantity: number;
  authorId?: any;
}

export interface CreateProductInterface {
  [key: string]: any;
}
