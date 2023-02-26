import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class ProductCharacteristic {
  @prop()
  name: string;

  @prop()
  value: string;
}

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
  @prop()
  advantages: string;

  @prop({ type: () => [ProductCharacteristic], _id: false })
  characteristics: ProductCharacteristic[];

  @prop({ type: () => [String] })
  categories: string[];

  @prop()
  credit: number;

  @prop()
  description: string;

  @prop()
  disAdvantages: string;

  @prop()
  image: string;

  @prop()
  oldPrice?: number;

  @prop()
  price: number;

  @prop({ type: () => [String] })
  tags: string[];

  @prop()
  title: string;
}
