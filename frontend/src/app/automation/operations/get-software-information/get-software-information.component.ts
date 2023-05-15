import { Component, OnInit } from "@angular/core";
import { ToastService, Toast } from "../../../shared/services/toast.service";
import { PanoramaService } from "../../../shared/services/panorama.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-get-software-information",
  templateUrl: "./get-software-information.component.html",
  styleUrls: ["./get-software-information.component.scss"],
})
export class GetSoftwareInformationComponent implements OnInit {
  panoramas: any[] = [];
  selectedPanorama: any = null;

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
      const softwareInformation = {
        pan_url: this.selectedPanorama.hostname,
        api_token: this.selectedPanorama.api_token,
      };

      console.log("softwareInformation:", softwareInformation);

      this.panoramaService
        .postSoftwareInformation(softwareInformation)
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
