export class ProductModel {
  advantages: string;
  calculatedRaiting: number;
  characteristics: {
    [key: string]: string;
  };
  categories: string[];
  credit: number;
  description: string;
  disAdvantages: string;
  image: string;
  oldPrice: number;
  price: number;
  tags: string[];
  title: string;
}
