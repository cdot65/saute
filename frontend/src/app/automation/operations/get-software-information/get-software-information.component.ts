import { Component, OnInit } from "@angular/core";
import { PanoramaService } from "../../../shared/services/panorama.service";

@Component({
  selector: "app-get-software-information",
  templateUrl: "./get-software-information.component.html",
  styleUrls: ["./get-software-information.component.scss"],
})
export class GetSoftwareInformationComponent implements OnInit {
  panoramas: any[] = [];
  selectedPanorama: any = null; // Define the selectedPanorama property with a default value
  selectedCommand: string = ""; // Define the selectedCommand property with a default value

  constructor(private panoramaService: PanoramaService) {}

  ngOnInit(): void {
    this.panoramaService.fetchPanoramaData().subscribe((data: any[]) => {
      this.panoramas = data;
    });
  }

  myFunc(val: any) {
    // code here
  }
}
