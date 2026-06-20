import { Assignment } from './assignment';

export class WorkOrder {
  workOrderID?: number;   
  assetID!: number;       
  planID!: number;        
  taskID!: number;        
  scheduledDate: string = ''; 
  status: string = 'Pending'; 
  assignments: Assignment[] = []; 
  workLogs?: any[] = []; 
}