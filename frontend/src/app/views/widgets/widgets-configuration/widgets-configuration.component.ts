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
      iconPath: "../../../../assets/icons/panos.svg",
      title: "Create Policy",
      description: "Create a security policy on PAN-OS or Panorama.",
      // customClass: "bg-aws",
      capBg: { "--cui-card-cap-bg": "#333333" },
      values: [{ title: "Configuration", value: "Now" }],
      buttonLink: "/configuration",
      hashtags: ["#aws", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      iconPath: "../../../../assets/icons/sync_pan_prisma.svg",
      title: "Sync to Prisma",
      description: "Sync Panorama configuration to a Prisma Access tenant",
      // customClass: "bg-azure",
      capBg: { "--cui-card-cap-bg": "#333333" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#panorama", "#prisma", "#python", "#diffsync"],
    },
    // {
    //   icon: "cibTerraform",
    //   title: "Configuration to GCP",
    //   description: "Terraform to configuration VM-Series or Panorama",
    //   customClass: "bg-gcp",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#gcp", "#terraform", "#vm-series"],
    // },
    // {
    //   icon: "cibTerraform",
    //   title: "Configuration to Oracle",
    //   description: "Terraform to configuration VM-Series or Panorama",
    //   customClass: "bg-oracle",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#oracle", "#terraform", "#vm-series"],
    // },
    // {
    //   icon: "cibTerraform",
    //   title: "Configuration to Proxmox",
    //   description: "Terraform to configuration VM-Series or Panorama",
    //   customClass: "bg-proxmox",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#proxmox", "#terraform", "#vm-series"],
    // },
    // {
    //   icon: "cibTerraform",
    //   title: "Configuration to vCenter",
    //   description: "Terraform to configuration VM-Series or Panorama",
    //   customClass: "bg-vmware",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#vcenter", "#terraform", "#vm-series"],
    // },
  ];
}
