import { IJob } from "src/modules/job/interface/job.interface";

export interface ICompany {
  id: number;
  name: string;
  jobs?: IJob[]
}
