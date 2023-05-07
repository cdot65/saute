import { Component, OnInit } from "@angular/core";
import { ToastService, Toast } from "../../../shared/services/toast.service"; // Update the import path accordingly
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
          const toast: Toast = {
            title: "Success",
            message: "Software information submitted successfully.",
            color: "success-25",
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
