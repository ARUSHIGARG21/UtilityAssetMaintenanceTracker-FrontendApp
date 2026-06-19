import { Technician } from './technician';

export class Assignment {
  assignmentID?: number;   // required
  workOrderID!: number;    // required
  technicianID!: number;   // required
  technician?: Technician; // optional
}
