import { Component } from "@angular/core";

@Component({
  selector: "app-assessment-widget",
  templateUrl: "./widgets-assessment.component.html",
  styleUrls: ["./widgets-assessment.component.scss"],
})
export class AssessmentWidgetComponent {
  assessmentData = [
    {
      icon: "cibTerraform",
      title: "Assessment to AWS",
      description: "Terraform to assessment VM-Series or Panorama",
      customClass: "bg-aws",
      capBg: { "--cui-card-cap-bg": "#FF9900" },
      values: [{ title: "Assessment", value: "Now" }],
      buttonLink: "/assessment",
      hashtags: ["#aws", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Assessment to Azure",
      description: "Terraform to assessment VM-Series or Panorama",
      customClass: "bg-azure",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#azure", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Assessment to GCP",
      description: "Terraform to assessment VM-Series or Panorama",
      customClass: "bg-gcp",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#gcp", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Assessment to Oracle",
      description: "Terraform to assessment VM-Series or Panorama",
      customClass: "bg-oracle",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#oracle", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Assessment to Proxmox",
      description: "Terraform to assessment VM-Series or Panorama",
      customClass: "bg-proxmox",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#proxmox", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      title: "Assessment to vCenter",
      description: "Terraform to assessment VM-Series or Panorama",
      customClass: "bg-vmware",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#vcenter", "#terraform", "#vm-series"],
    },
  ];
}
