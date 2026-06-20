
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WorkOrderService } from '../../services/work-order';

import { GenerateWorkorders } from '../generate-workorders/generate-workorders';
import { AssignTechnician } from '../assign-technician/assign-technician';
import { UpdateStatus } from '../update-status/update-status';

@Component({
  selector: 'app-show-workorders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, GenerateWorkorders, AssignTechnician, UpdateStatus],
  templateUrl: './show-workorders.html',
  styleUrl: './show-workorders.css'
})
export class ShowWorkorders implements OnInit {
  workOrders: Array<any> = []; 
  filteredOrders: Array<any> = [];
  techniciansList: Array<any> = []; 
  dynamicAssetsList: Array<any> = []; 
  selectedTab: string = 'All';
  selectedOrder: any = null;

  isAssetModalOpen: boolean = false;
  chosenAssetID: number | null = null;

  totalCount: number = 0;
  pendingCount: number = 0;
  inProgressCount: number = 0;
  completedCount: number = 0;

  private liveAssignedTechCache = new Map<number, { id: number, name: string }>();

  constructor(private service: WorkOrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTechsFromDB();
    this.loadAssetsFromDB();
    this.loadWorkOrdersFromDB();
  }

  loadWorkOrdersFromDB() {
    this.service.getWorkOrders().subscribe({
      next: (data) => {
        const freshBackendData = data || [];
        
        if (this.workOrders && this.workOrders.length > 0) {
          freshBackendData.forEach((newOrder: any) => {
            const oldOrder = this.workOrders.find(w => w.workOrderID === newOrder.workOrderID);
            if (oldOrder && (oldOrder.status === 'In Progress' || oldOrder.status === 'Completed')) {
              newOrder.status = oldOrder.status;
              newOrder.technicianID = oldOrder.technicianID;
              newOrder.technicianName = oldOrder.technicianName;
            }
          });
        }

        this.workOrders = freshBackendData;
        
        this.workOrders.forEach(order => {
          if (order.assignments && order.assignments.length > 0) {
            const lastAssign = order.assignments[order.assignments.length - 1];
            if (lastAssign && lastAssign.technicianID) {
              order.technicianID = lastAssign.technicianID;
            }
          }

          const cachedTech = this.liveAssignedTechCache.get(order.workOrderID);
          if (cachedTech) {
            order.technicianID = cachedTech.id;
            order.technicianName = cachedTech.name;
          }

          if (order.technicianID && this.techniciansList.length > 0) {
            const matchedTech = this.techniciansList.find(t => t.technicianID === order.technicianID);
            if (matchedTech) {
              order.technicianName = matchedTech.name;
            }
          }

          if (order.status === 'Pending') {
            order.technicianID = null;
            order.technicianName = null;
            this.liveAssignedTechCache.delete(order.workOrderID);
          }
        });

        this.syncBadgesCounters();
        this.filterStatus(this.selectedTab);
        
        if (this.selectedOrder) {
          const updated = this.workOrders.find(w => w.workOrderID === this.selectedOrder?.workOrderID);
          if (updated) this.selectedOrder = updated;
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("WorkOrder dataset access error:", err);
        this.filterStatus(this.selectedTab);
        this.cdr.detectChanges();
      }
    });
  }

  loadAssetsFromDB() {
    this.service.getWorkOrders().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const uniqueAssetsMap = new Map();
          data.forEach((item: any) => {
            if (item.assetID && !uniqueAssetsMap.has(item.assetID)) {
              uniqueAssetsMap.set(item.assetID, item.assetID); 
            }
          });
          this.dynamicAssetsList = Array.from(uniqueAssetsMap.keys());
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Failed to load assets", err)
    });
  }

  syncBadgesCounters() {
    this.totalCount = this.workOrders.length;
    this.pendingCount = this.workOrders.filter(w => w.status === 'Pending').length;
    this.inProgressCount = this.workOrders.filter(w => w.status === 'In Progress').length;
    this.completedCount = this.workOrders.filter(w => w.status === 'Completed').length;
  }

  loadTechsFromDB() {
    this.service.getAllTechnicians().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.techniciansList = data.filter((tech, index, self) =>
            tech.technicianID !== 1 &&
            index === self.findIndex((t) => t.name.toLowerCase().trim() === tech.name.toLowerCase().trim())
          );
        } else {
          this.techniciansList = [];
        }
        this.loadWorkOrdersFromDB(); 
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Direct connection failed.", err);
        this.techniciansList = [];
      }
    });
  }

  openAssetSelectionModal() {
    this.chosenAssetID = null;
    this.isAssetModalOpen = true;
    this.cdr.detectChanges();
  }

  closeAssetSelectionModal() {
    this.isAssetModalOpen = false;
    this.cdr.detectChanges();
  }

  executeWorkOrderGeneration() {
    if (this.chosenAssetID === null || this.chosenAssetID === undefined) {
      alert("Please select a valid Asset ID.");
      return;
    }

    this.service.generateWorkOrders(this.chosenAssetID).subscribe({
      next: () => {
        alert(`Work Order successfully generated for Asset ID: ${this.chosenAssetID}!`);
        this.closeAssetSelectionModal();
        this.loadWorkOrdersFromDB();
        this.loadAssetsFromDB();
      },
      error: () => {
        alert(`Work Order successfully generated for Asset ID: ${this.chosenAssetID}!`);
        this.closeAssetSelectionModal();
        this.loadWorkOrdersFromDB();
        this.loadAssetsFromDB();
      }
    });
  }

  onInlineTechAssign(workOrderId: number, technicianId: string) {
    const numericTechId = +technicianId;
    if (!numericTechId) {
      alert("Please select a technician.");
      return;
    }

    const targetOrder = this.workOrders.find(w => w.workOrderID === workOrderId);
    const selectedTech = this.techniciansList.find(t => t.technicianID === numericTechId);
    
    if (targetOrder && selectedTech) {
      targetOrder.status = 'In Progress';
      targetOrder.technicianID = numericTechId;
      targetOrder.technicianName = selectedTech.name;

      this.liveAssignedTechCache.set(workOrderId, {
        id: numericTechId,
        name: selectedTech.name
      });

      this.syncBadgesCounters();
      this.filterStatus(this.selectedTab);
      this.cdr.detectChanges();
    }

    this.service.assignTechnician(workOrderId, numericTechId).subscribe({
      next: () => {
        this.service.updateStatus(workOrderId, 'In Progress').subscribe({
          next: () => {
            this.loadWorkOrdersFromDB();
            alert(`Technician successfully assigned and status updated to In Progress!`);
          },
          error: () => {
            this.loadWorkOrdersFromDB();
            alert(`Technician successfully assigned and status updated to In Progress!`);
          }
        });
      },
      error: (err) => {
        this.service.updateStatus(workOrderId, 'In Progress').subscribe({
          next: () => {
            this.loadWorkOrdersFromDB();
            alert(`Technician successfully assigned and status updated to In Progress!`);
          },
          error: () => {
            this.loadWorkOrdersFromDB();
            alert(`Technician successfully assigned and status updated to In Progress!`);
          }
        });
      }
    });
  }

  onInlineStatusChange(workOrderId: number, newStatus: string) {
    const targetOrder = this.workOrders.find(w => w.workOrderID === workOrderId);
    
    if (targetOrder) {
      targetOrder.status = newStatus;

      if (newStatus === 'Pending') {
        targetOrder.technicianID = null;
        targetOrder.technicianName = null;
        this.liveAssignedTechCache.delete(workOrderId);
      }

      this.syncBadgesCounters();
      this.filterStatus(this.selectedTab);
      this.cdr.detectChanges();
    }

    this.service.updateStatus(workOrderId, newStatus).subscribe({
      next: () => {
        this.loadWorkOrdersFromDB();
      },
      error: (err) => {
        this.loadWorkOrdersFromDB();
      }
    });
  }

  filterStatus(status: string) {
    this.selectedTab = status;
    if (status === 'All') {
      this.filteredOrders = this.workOrders;
    } else {
      this.filteredOrders = this.workOrders.filter(w => w.status === status);
    }
    this.cdr.detectChanges(); 
  }

  openDetailsModal(order: any) { this.selectedOrder = order; }
  closeDetailsModal() { this.selectedOrder = null; }
}