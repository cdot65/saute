import { Component } from "@angular/core";

@Component({
  selector: "app-operations-widget",
  templateUrl: "./widgets-operations.component.html",
  styleUrls: ["./widgets-operations.component.scss"],
})
export class OperationsWidgetComponent {
  operationsData = [
    {
      icon: "cibPython",
      title: "Get software details",
      description: "Python script to retrieve software information.",
      customClass: "bg-panos",
      capBg: { "--cui-card-cap-bg": "#FA582D" },
      values: [{ title: "Operations", value: "Now" }],
      buttonLink: "/automation/operations/get-software-information",
      hashtags: ["#panos", "#panorama", "#python"],
    },
    // {
    //   icon: "cibTerraform",
    //   title: "Operations to Azure",
    //   description: "Terraform to operations VM-Series or Panorama",
    //   customClass: "bg-azure",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#azure", "#terraform", "#vm-series"],
    // },
    // {
    //   icon: "cibTerraform",
    //   title: "Operations to GCP",
    //   description: "Terraform to operations VM-Series or Panorama",
    //   customClass: "bg-gcp",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#gcp", "#terraform", "#vm-series"],
    // },
    // {
    //   icon: "cibTerraform",
    //   title: "Operations to Oracle",
    //   description: "Terraform to operations VM-Series or Panorama",
    //   customClass: "bg-oracle",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#oracle", "#terraform", "#vm-series"],
    // },
    // {
    //   icon: "cibTerraform",
    //   title: "Operations to Proxmox",
    //   description: "Terraform to operations VM-Series or Panorama",
    //   customClass: "bg-proxmox",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#proxmox", "#terraform", "#vm-series"],
    // },
    // {
    //   icon: "cibTerraform",
    //   title: "Operations to vCenter",
    //   description: "Terraform to operations VM-Series or Panorama",
    //   customClass: "bg-vmware",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#vcenter", "#terraform", "#vm-series"],
    // },
  ];
}
