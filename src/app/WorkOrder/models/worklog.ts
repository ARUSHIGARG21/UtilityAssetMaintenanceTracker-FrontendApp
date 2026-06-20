export class WorkLog {
  workLogID?: number;      // optional
  assignmentID!: number;   // required
  startTime!: string;  
  endTime!: string ;   
  notes: string='';      // default empty string
}
