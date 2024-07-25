// Tip tanımı
export type ProductTypeApiParams = {
  date: string | number | Date;
  createdAt: string;
  name: string;
  image: string;
  price: number;
  description: string;
  model: string;
  brand: string;
  id: string;
  quantity?: number;
};

export type ProductTypeApiResponse = ProductTypeApiParams[];
