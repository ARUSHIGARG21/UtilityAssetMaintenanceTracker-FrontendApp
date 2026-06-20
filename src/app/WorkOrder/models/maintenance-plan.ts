import { Task } from './task';

export class MaintenancePlan {
  planID!: number;         // required
  assetID!: number;        // required
  frequency: string = '';  // default empty string
  tasks: Task[]=[];          // optional
}
