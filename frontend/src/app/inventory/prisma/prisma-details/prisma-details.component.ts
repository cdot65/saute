import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-prisma-details",
  templateUrl: "./prisma-details.component.html",
})
export class PrismaDetailsComponent implements OnInit {
  entryForm!: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.fetchPrismaData();
    });
  }

  createForm(): void {
    this.entryForm = new FormGroup({
      tenant_name: new FormControl(""),
      client_id: new FormControl(""),
      tsg_id: new FormControl(""),
      client_secret: new FormControl(""),
    });
  }

  fetchPrismaData(): void {
    this.http
      .get<any>(`http://localhost:8000/api/v1/prisma/${this.id}/`)
      .subscribe((data) => {
        this.entryForm.setValue({
          tenant_name: data.tenant_name,
          client_id: data.client_id,
          tsg_id: data.tsg_id || "",
          client_secret: data.client_secret,
        });
      });
  }

  updateEntry(updatedEntry: any): void {
    if (this.entryForm.valid) {
      const apiUrl = `http://localhost:8000/api/v1/prisma/${this.id}/`;
      if (!updatedEntry.tsg_id) {
        updatedEntry.tsg_id = null;
      }

      this.http.patch(apiUrl, updatedEntry).subscribe({
        next: (response) => {
          // console.log("Entry updated:", response);
          this.router.navigate(["/inventory/prisma/"]);
        },
        error: (error) => {
          console.error("Error updating entry:", error);
        },
      });
    } else {
      console.error("Form is invalid");
    }
  }

  onCancel(): void {
    this.router.navigate(["/inventory/prisma/"]);
  }
}
