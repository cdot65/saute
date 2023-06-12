import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { CookieService } from "ngx-cookie-service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-panorama-create",
  templateUrl: "./panorama-create.component.html",
})
export class PanoramaCreateComponent implements OnInit {
  panorama = {
    hostname: "",
    ipv4_address: "",
    ipv6_address: "",
    api_token: "",
    author: "",
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  async getUserData() {
    const authToken = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set(
      "Authorization",
      `Token ${authToken}`
    );

    try {
      const response: any = await firstValueFrom(
        this.http.get("http://localhost:8000/api/v1/dj-rest-auth/user/", {
          headers,
        })
      );
      this.panorama.author = response.pk;
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const authToken = this.cookieService.get("auth_token");
      const headers = new HttpHeaders().set(
        "Authorization",
        `Token ${authToken}`
      );

      this.http
        .post("http://localhost:8000/api/v1/panorama/", this.panorama, {
          headers,
        })
        .subscribe({
          next: (response) => {
            // console.log("New panorama created:", response);
            this.resetForm(form);
            this.router.navigate(["/inventory/panorama/"]);
          },
          error: (error) => {
            console.error("Error creating panorama:", error);
          },
        });
    } else {
      console.error("Form is invalid");
    }
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  onCancel(): void {
    this.router.navigate(["/inventory/panorama/"]);
  }
}
