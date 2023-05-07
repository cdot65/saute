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
      title: "Deploy to AWS",
      description: "Terraform to deploy VM-Series or Panorama",
      customClass: "bg-aws",
      capBg: { "--cui-card-cap-bg": "#FF9900" },
      values: [{ title: "Deploy", value: "Now" }],
      buttonLink: "/deploy",
      hashtags: ["#aws", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Deploy to Azure",
      description: "Terraform to deploy VM-Series or Panorama",
      customClass: "bg-azure",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#azure", "#terraform", "#vm-series"],
    },
    // {
    //   icon: "cibTerraform",
    //   title: "Deploy to GCP",
    //   description: "Terraform to deploy VM-Series or Panorama",
    //   customClass: "bg-gcp",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#gcp", "#terraform", "#vm-series"],
    // },
    // {
    //   icon: "cibTerraform",
    //   title: "Deploy to Oracle",
    //   description: "Terraform to deploy VM-Series or Panorama",
    //   customClass: "bg-oracle",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#oracle", "#terraform", "#vm-series"],
    // },
    // {
    //   icon: "cibTerraform",
    //   title: "Deploy to Proxmox",
    //   description: "Terraform to deploy VM-Series or Panorama",
    //   customClass: "bg-proxmox",
    //   capBg: { "--cui-card-cap-bg": "#00aced" },
    //   values: [{ title: "Upload", value: "Files" }],
    //   buttonLink: "/upload",
    //   hashtags: ["#proxmox", "#terraform", "#vm-series"],
    // },
    {
      icon: "cibTerraform",
      title: "Deploy to vCenter",
      description: "Terraform to deploy VM-Series or Panorama",
      customClass: "bg-vmware",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#vcenter", "#terraform", "#vm-series"],
    },
  ];
}
