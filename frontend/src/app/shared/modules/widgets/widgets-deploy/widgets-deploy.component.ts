import { Component } from "@angular/core";

@Component({
  selector: "app-deploy-widget",
  templateUrl: "./widgets-deploy.component.html",
  styleUrls: ["./widgets-deploy.component.scss"],
})
export class DeployWidgetComponent {
  deployData = [
    {
      icon: "cibTerraform",
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Deploy to AWS",
      description: "Terraform to deploy VM-Series or Panorama",
      capBg: { "--cui-card-cap-bg": "#FF9900" },
      values: [{ title: "Deploy", value: "Now" }],
      buttonLink: "/deploy",
      hashtags: ["#aws", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Deploy to Azure",
      description: "Terraform to deploy VM-Series or Panorama",
      capBg: { "--cui-card-cap-bg": "#333" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#azure", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Deploy to vCenter",
      description: "Terraform to deploy VM-Series or Panorama",
      capBg: { "--cui-card-cap-bg": "#333" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#vcenter", "#terraform", "#vm-series"],
    },
  ];
}
