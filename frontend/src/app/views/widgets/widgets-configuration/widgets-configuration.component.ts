import { Component } from "@angular/core";

@Component({
  selector: "app-configuration-widget",
  templateUrl: "./widgets-configuration.component.html",
  styleUrls: ["./widgets-configuration.component.scss"],
})
export class ConfigurationWidgetComponent {
  configurationData = [
    {
      icon: "cibTerraform",
      title: "Configuration to AWS",
      description: "Terraform to configuration VM-Series or Panorama",
      customClass: "bg-aws",
      capBg: { "--cui-card-cap-bg": "#FF9900" },
      values: [{ title: "Configuration", value: "Now" }],
      buttonLink: "/configuration",
      hashtags: ["#aws", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Configuration to Azure",
      description: "Terraform to configuration VM-Series or Panorama",
      customClass: "bg-azure",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#azure", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Configuration to GCP",
      description: "Terraform to configuration VM-Series or Panorama",
      customClass: "bg-gcp",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#gcp", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Configuration to Oracle",
      description: "Terraform to configuration VM-Series or Panorama",
      customClass: "bg-oracle",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#oracle", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Configuration to Proxmox",
      description: "Terraform to configuration VM-Series or Panorama",
      customClass: "bg-proxmox",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#proxmox", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Configuration to vCenter",
      description: "Terraform to configuration VM-Series or Panorama",
      customClass: "bg-vmware",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#vcenter", "#terraform", "#vm-series"],
    },
  ];
}
