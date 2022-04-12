export interface ProductInterface {
  id?: number;
  type: string;
  title: string;
  description: string;
  price: number | null;
  features: string[] | undefined;
  quantity: number;
  images?: string[];
}
