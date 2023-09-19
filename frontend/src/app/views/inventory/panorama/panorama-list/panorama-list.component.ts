import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { of } from "rxjs";

@Component({
  selector: "app-panorama-list",
  templateUrl: "./panorama-list.component.html",
})
export class PanoramaListComponent implements OnInit {
  private API_URL = environment.apiUrl;
  panoramaData: any[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.panoramaData = [];
  }

  ngOnInit() {
    this.panoramaInventory();
  }

  // Fetch data from the API
  panoramaInventory() {
    this.http
      .get<any[]>(`${this.API_URL}/api/v1/panorama/inventory`)
      .pipe(
        catchError((error) => {
          console.error("Error fetching Panorama data:", error);
          return of([]);
        })
      )
      .subscribe((data: any[]) => {
        this.panoramaData = data;
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
      .delete(`${this.API_URL}/api/v1/panorama/inventory/${entryId}/`, {
        headers,
      })
      .subscribe(
        (response) => {
          // console.log("Panorama instance deleted:", response);
          this.panoramaInventory();
        },
        (error) => {
          console.error("Error deleting Panorama instance:", error);
        }
      );
  }

  navigateToCreate(): void {
    this.router.navigate(["/inventory/panorama/create"]);
  }

  navigateToDetails(id: number): void {
    this.router.navigate(["/inventory/panorama/details", id]);
  }
}
