export interface ProductInterface {
  id?: number;
  type: string;
  title: string;
  description: string;
  price: number | null;
  features: string[] | undefined;
}
