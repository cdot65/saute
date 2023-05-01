import { Component, OnInit } from "@angular/core";
import { PanoramaService } from "../../../shared/services/panorama.service";

@Component({
  selector: "app-get-software-information",
  templateUrl: "./get-software-information.component.html",
  styleUrls: ["./get-software-information.component.scss"],
})
export class GetSoftwareInformationComponent implements OnInit {
  panoramas: any[] = [];
  selectedPanorama: any = null;
  selectedCommand: string = "";
  customStylesValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;

  constructor(private panoramaService: PanoramaService) {}

  ngOnInit(): void {
    this.panoramaService.fetchPanoramaData().subscribe((data: any[]) => {
      this.panoramas = data;
    });
  }

  onSubmit1() {
    this.customStylesValidated = true;
    console.log("Submit... 1");
  }

  onReset1() {
    this.customStylesValidated = false;
    console.log("Reset... 1");
  }

  onSubmit2() {
    this.browserDefaultsValidated = true;
    console.log("Submit... 2");
  }

  onReset2() {
    this.browserDefaultsValidated = false;
    console.log("Reset... 3");
  }

  onSubmit3() {
    this.tooltipValidated = true;
    console.log("Submit... 3");
  }

  onReset3() {
    this.tooltipValidated = false;
    console.log("Reset... 3");
  }
}
