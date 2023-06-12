import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-prisma-list",
  templateUrl: "./prisma-list.component.html",
})
export class PrismaListComponent implements OnInit {
  prismaData: any[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.prismaData = [];
  }

  ngOnInit() {
    this.fetchPrismaData();
  }

  // Fetch data from the API
  fetchPrismaData() {
    this.http
      .get<any[]>("http://localhost:8000/api/v1/prisma/")
      .pipe(
        catchError((error) => {
          console.error("Error fetching Prisma data:", error);
          return of([]);
        })
      )
      .subscribe((data: any[]) => {
        this.prismaData = data;
      });
  }

  showDeleteConfirmationDialog(entryId: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEntry(entryId);
        Swal.fire("Deleted!", "The entry has been deleted.", "success");
      }
    });
  }

  deleteEntry(entryId: number): void {
    const authToken = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set(
      "Authorization",
      `Token ${authToken}`
    );
    this.http
      .delete(`http://localhost:8000/api/v1/prisma/${entryId}/`, { headers })
      .subscribe(
        (response) => {
          // console.log("Prisma instance deleted:", response);
          this.fetchPrismaData();
        },
        (error) => {
          console.error("Error deleting Prisma instance:", error);
        }
      );
  }

  navigateToCreate(): void {
    this.router.navigate(["/inventory/prisma/create"]);
  }

  navigateToDetails(id: number): void {
    this.router.navigate(["/inventory/prisma/details", id]);
  }
}
