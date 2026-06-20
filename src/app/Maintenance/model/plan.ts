import { Task } from './task';

export class Plan {
    planID?: number;
    assetID?: number;
    type?: string;
    frequency?: string;
    name?: string;
    tasks?: Task[]; // Added to match your new backend JSON payload!
}