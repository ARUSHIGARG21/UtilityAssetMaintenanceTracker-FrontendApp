
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkOrder } from '../models/workorder';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private baseUrl = 'http://localhost:5062/api/workorders';
  private techUrl = 'http://localhost:5241/api/technicians'; 

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUEFsYWsiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc4NjEwNDcwMCwiaXNzIjoiQXV0aFNlcnZpY2UiLCJhdWQiOiJBbGxTZXJ2aWNlcyJ9.A2S_GARARv3Y1lxfatEp3lnf3kGVfpSgASurqOEMHxQ';

  constructor(private client: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }

  getWorkOrders(): Observable<WorkOrder[]> {
    return this.client.get<WorkOrder[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  generateWorkOrders(assetId: number): Observable<string> {
    return this.client.post(`${this.baseUrl}/generate/${assetId}`, {}, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }

  assignTechnician(id: number, technicianId: number): Observable<any> {
    return this.client.post(`${this.baseUrl}/${id}/assign`, { technicianId }, { headers: this.getHeaders() });
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.client.put(`${this.baseUrl}/${id}/status`, { status }, { headers: this.getHeaders() });
  }

  getAllTechnicians(): Observable<any[]> {
    return this.client.get<any[]>(this.techUrl, { headers: this.getHeaders() });
  }
}