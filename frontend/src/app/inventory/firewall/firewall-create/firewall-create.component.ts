import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { CookieService } from "ngx-cookie-service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-firewall-create",
  templateUrl: "./firewall-create.component.html",
})
export class FirewallCreateComponent implements OnInit {
  firewall = {
    hostname: "",
    ipv4_address: "",
    ipv6_address: "",
    api_token: "",
    author: "",
  };

  validated = false;

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
      this.firewall.author = response.pk;
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }

  onSubmit(form: NgForm) {
    this.validated = true;
    if (form.valid) {
      const authToken = this.cookieService.get("auth_token");
      const headers = new HttpHeaders().set(
        "Authorization",
        `Token ${authToken}`
      );

      this.http
        .post("http://localhost:8000/api/v1/firewall/", this.firewall, {
          headers,
        })
        .subscribe({
          next: (response) => {
            // console.log("New firewall created:", response);
            this.resetForm(form);
            this.router.navigate(["/inventory/firewall/"]);
          },
          error: (error) => {
            console.error("Error creating firewall:", error);
          },
        });
    } else {
      console.error("Form is invalid");
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.validated = false;
  }

  onCancel(): void {
    this.router.navigate(["/inventory/firewall/"]);
  }
}
