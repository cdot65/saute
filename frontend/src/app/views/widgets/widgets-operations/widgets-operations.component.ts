import { Component } from "@angular/core";

@Component({
  selector: "app-operations-widget",
  templateUrl: "./widgets-operations.component.html",
  styleUrls: ["./widgets-operations.component.scss"],
})
export class OperationsWidgetComponent {
  operationsData = [
    {
      icon: "cibTerraform",
      title: "Operations to AWS",
      description: "Terraform to operations VM-Series or Panorama",
      customClass: "bg-aws",
      capBg: { "--cui-card-cap-bg": "#FF9900" },
      values: [{ title: "Operations", value: "Now" }],
      buttonLink: "/operations",
      hashtags: ["#aws", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Operations to Azure",
      description: "Terraform to operations VM-Series or Panorama",
      customClass: "bg-azure",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#azure", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Operations to GCP",
      description: "Terraform to operations VM-Series or Panorama",
      customClass: "bg-gcp",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#gcp", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Operations to Oracle",
      description: "Terraform to operations VM-Series or Panorama",
      customClass: "bg-oracle",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#oracle", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Operations to Proxmox",
      description: "Terraform to operations VM-Series or Panorama",
      customClass: "bg-proxmox",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#proxmox", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Operations to vCenter",
      description: "Terraform to operations VM-Series or Panorama",
      customClass: "bg-vmware",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#vcenter", "#terraform", "#vm-series"],
    },
  ];
}
