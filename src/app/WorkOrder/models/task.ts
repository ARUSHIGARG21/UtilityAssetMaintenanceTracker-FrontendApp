export class Task {
  taskID!: number;         // required
  description: string = ''; // default empty string
  estimatedHours!: number; // required
}
