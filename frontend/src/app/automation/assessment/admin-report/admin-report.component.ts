import { Component, OnInit } from "@angular/core";
import { ToastService, Toast } from "../../../shared/services/toast.service";
import { PanoramaService } from "../../../shared/services/panorama.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-admin-report",
  templateUrl: "./admin-report.component.html",
  styleUrls: ["./admin-report.component.scss"],
})
export class AdminReportComponent implements OnInit {
  panoramas: any[] = [];
  selectedPanorama: any = null;
  email: string = "";

  constructor(
    private panoramaService: PanoramaService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.panoramaService.fetchPanoramaData().subscribe((data: any[]) => {
      this.panoramas = data;
    });
  }

  onSubmitForm(form: NgForm): void {
    if (form.valid) {
      const panoramaDetails = {
        pan_url: this.selectedPanorama.hostname,
        api_token: this.selectedPanorama.api_token,
        email: this.email,
      };

      console.log("panoramaDetails:", panoramaDetails);

      this.panoramaService
        .executeAdminReport(panoramaDetails)
        .subscribe((response) => {
          console.log(response);
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
