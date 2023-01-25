import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ReviewModel extends Base {}
export class ReviewModel extends TimeStamps {
  @prop()
  createdAt: Date;

  @prop()
  description: string;

  @prop()
  name: string;

  @prop()
  raiting: number;

  @prop()
  title: string;
}
