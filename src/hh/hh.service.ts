import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { HhData } from 'src/top-page/top-page.model';
import { API_URL, CLUSTER_FIND_ERROR, SALARY_CLUSTER_ID } from './hh.constants';
import { IHhResponse } from './hh.models';

@Injectable()
export class HhService {
  private token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = this.configService.get('HH_TOKEN') ?? '';
  }

  async getData(text: string): Promise<HhData | undefined> {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get<IHhResponse>(API_URL.vacancies, {
          params: { text, cluster: true },
          headers: {
            'User-Agent': 'CoursesTop/1.0 (juliamorokina@mail.ru)',
            Authorization: 'Bearer ' + this.token,
          },
        }),
      );

      return this.parsData(data);
    } catch (e) {
      Logger.error(e);
    }
  }

  private parsData(data: IHhResponse): HhData {
    const salaryCluster = data.clusters.find(
      (cluster) => cluster.id === SALARY_CLUSTER_ID,
    );

    if (!salaryCluster) {
      throw new Error(CLUSTER_FIND_ERROR);
    }

    const juniorSalary = this.getSalaryFromString(salaryCluster.items[0].name);
    const middleSalary = this.getSalaryFromString(
      salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name,
    );
    const seniorSalary = this.getSalaryFromString(
      salaryCluster.items[salaryCluster.items.length - 1].name,
    );

    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
      updatedAt: new Date(),
    };
  }

  private getSalaryFromString(salaryString: string): number {
    const numberRegExp = /(\d+)/g;
    const res = salaryString.match(numberRegExp);

    if (!res) {
      return 0;
    }

    return Number(res[0]);
  }
}
