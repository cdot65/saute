import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-panorama-details",
  templateUrl: "./panorama-details.component.html",
})
export class PanoramaDetailsComponent implements OnInit {
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
      this.fetchPanoramaData();
    });
  }

  createForm(): void {
    this.entryForm = new FormGroup({
      hostname: new FormControl(""),
      ipv4_address: new FormControl(""),
      ipv6_address: new FormControl(""),
      api_token: new FormControl(""),
    });
  }

  fetchPanoramaData(): void {
    this.http
      .get<any>(`http://localhost:8000/api/v1/panorama/${this.id}/`)
      .subscribe((data) => {
        this.entryForm.setValue({
          hostname: data.hostname,
          ipv4_address: data.ipv4_address,
          ipv6_address: data.ipv6_address || "",
          api_token: data.api_token,
        });
      });
  }

  updateEntry(updatedEntry: any): void {
    if (this.entryForm.valid) {
      const apiUrl = `http://localhost:8000/api/v1/panorama/${this.id}/`;
      if (!updatedEntry.ipv6_address) {
        updatedEntry.ipv6_address = null;
      }

      this.http.patch(apiUrl, updatedEntry).subscribe({
        next: (response) => {
          // console.log("Entry updated:", response);
          this.router.navigate(["/inventory/panorama/"]);
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
    this.router.navigate(["/inventory/panorama/"]);
  }
}
