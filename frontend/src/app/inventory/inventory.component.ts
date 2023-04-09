import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PanoramaCreateComponent } from '../panorama-create/panorama-create.component';
import { PrismaCreateComponent } from '../prisma-create/prisma-create.component'; // Assuming you have a similar component for Prisma

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  constructor(public dialog: MatDialog) {}

  openPanoramaCreateDialog(): void {
    this.dialog.open(PanoramaCreateComponent);
  }

  openPrismaCreateDialog(): void {
    this.dialog.open(PrismaCreateComponent); // Assuming you have a similar component for Prisma
  }

}
