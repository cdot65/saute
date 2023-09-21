import { Component } from "@angular/core";

@Component({
  selector: "app-deploy-widget",
  templateUrl: "./widgets-deploy.component.html",
  styleUrls: ["./widgets-deploy.component.scss"],
})
export class AutomationDeployComponent {
  deployData = [
    {
      imagePath: "../../../../../assets/img/brand/terraform-panos-aws.svg",
      title: "Deploy VM-Series to AWS",
      description: "Use Terraform to deploy VM-Series on Amazon Web Services",
      capBg: { "--cui-card-cap-bg": "#FF9900" },
      values: [{ title: "Deploy", value: "Now" }],
      buttonLink: "/deploy",
      hashtags: ["#aws", "#terraform", "#vm-series"],
    },
    {
      imagePath: "../../../../../assets/img/brand/terraform-panos-azure.svg",
      title: "Deploy VM-Series to Azure",
      description: "Use Terraform to deploy VM-Series on Microsoft Azure",
      capBg: { "--cui-card-cap-bg": "#333" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#azure", "#terraform", "#vm-series"],
    },
    {
      imagePath: "../../../../../assets/img/brand/terraform-panos-gcp.svg",
      title: "Deploy VM-Series to GCP",
      description:
        "Use Terraform to deploy VM-Series on Google Compute Platform",
      capBg: { "--cui-card-cap-bg": "#FF9900" },
      values: [{ title: "Deploy", value: "Now" }],
      buttonLink: "/deploy",
      hashtags: ["#aws", "#terraform", "#vm-series"],
    },
    {
      imagePath: "../../../../../assets/img/brand/terraform-panos-vsphere.svg",
      title: "Deploy VM-Series to vCenter",
      description: "Terraform to deploy VM-Series on vSphere",
      capBg: { "--cui-card-cap-bg": "#333" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/automation/operations/get-software-information",
      hashtags: ["#vcenter", "#terraform", "#vm-series"],
    },
    {
      imagePath: "../../../../../assets/img/brand/terraform-panos-proxmox.svg",
      title: "Deploy VM-Series to Proxmox",
      description: "Terraform to deploy VM-Series on Proxmox",
      capBg: { "--cui-card-cap-bg": "#333" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/automation/operations/get-software-information",
      hashtags: ["#vcenter", "#terraform", "#vm-series"],
    },
  ];
}
