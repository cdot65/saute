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
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Create Policy",
      description: "Create a security policy on PAN-OS or Panorama.",
      capBg: { "--cui-card-cap-bg": "#f04e23" },
      buttonLink: "/configuration",
      hashtags: ["#aws", "#terraform", "#vm-series"],
    },
    {
      icon: "cibTerraform",
      iconPath: "../../../../assets/icons/sync_pan_prisma.svg",
      title: "Sync to Prisma",
      description: "Sync Panorama configuration to a Prisma Access tenant",
      capBg: { "--cui-card-cap-bg": "#333333" },
      buttonLink: "/upload",
      hashtags: ["#panorama", "#prisma", "#python", "#diffsync"],
    },
  ];
}
