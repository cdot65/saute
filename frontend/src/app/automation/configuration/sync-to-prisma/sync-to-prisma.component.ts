import { Component, OnInit } from "@angular/core";
import { Toast, ToastService } from "../../../shared/services/toast.service";

import { NgForm } from "@angular/forms";
import { PanoramaService } from "../../../shared/services/panorama.service";
import { PrismaService } from "../../../shared/services/prisma.service";

@Component({
  selector: "app-sync-to-prisma",
  templateUrl: "./sync-to-prisma.component.html",
  styleUrls: ["./sync-to-prisma.component.scss"],
})
export class SyncToPrismaComponent implements OnInit {
  panoramas: any[] = [];
  selectedPanorama: any = null;
  prismaTenants: any[] = [];
  selectedPrismaTenant: any = null;
  myObject = {
    key: "value",
    anotherKey: "another value",
    // ...
  };

  constructor(
    private panoramaService: PanoramaService,
    private prismaService: PrismaService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.panoramaService.fetchPanoramaData().subscribe((data: any[]) => {
      this.panoramas = data;
    });
    this.prismaService.fetchPrismaData().subscribe((data: any[]) => {
      this.prismaTenants = data;
    });
  }

  onSubmitForm(form: NgForm): void {
    if (form.valid) {
      const syncInformation = {
        pan_url: this.selectedPanorama.hostname,
        api_token: this.selectedPanorama.api_token,
        client_id: this.selectedPrismaTenant.client_id,
        client_secret: this.selectedPrismaTenant.client_secret,
        tsg_id: this.selectedPrismaTenant.tsg_id,
        token_url:
          "https://auth.apps.paloaltonetworks.com/am/oauth2/access_token",
      };

      // console.log("syncInformation:", syncInformation);

      this.prismaService
        .postSyncInformation(syncInformation)
        .subscribe((response) => {
          // console.log(response);
          const taskUrl = `#/jobs/details/${response.task_id}`;
          const anchor = `<a href="${taskUrl}" target="_blank" class="toast-link">Job Details</a>`;
          const toast: Toast = {
            title: "Job submitted successfully",
            message: `${response.message}. ${anchor}`,
            color: "secondary",
            autohide: true,
            delay: 5000,
            closeButton: true,
          };
          this.toastService.show(toast);
        });
    } else {
      console.error("Form is invalid");
    }
  }
}
