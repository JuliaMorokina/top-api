import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface ReviewModel extends Base {}
export class ReviewModel extends TimeStamps {
  @prop()
  description: string;

  @prop()
  name: string;

  @prop()
  raiting: number;

  @prop()
  productId: Types.ObjectId;

  @prop()
  title: string;
}
