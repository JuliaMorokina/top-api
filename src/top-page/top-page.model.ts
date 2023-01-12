export enum TopLevelCategory {
  Books,
  Courses,
  Services,
  Products,
}

export class TopPageModel {
  _id: string;
  category: string;
  advantages: {
    title: string;
    description: string;
  }[];
  hh?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  firstCategory: TopLevelCategory;
  secondCategory: string;
  seoText: string;
  tags: string[];
  tagsTitle: string;
  title: string;
}
