export class ProductModel {
  _id: string;
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
