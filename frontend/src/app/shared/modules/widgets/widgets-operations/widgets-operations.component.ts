import { Component } from "@angular/core";

@Component({
  selector: "app-operations-widget",
  templateUrl: "./widgets-operations.component.html",
  styleUrls: ["./widgets-operations.component.scss"],
})
export class AutomationOperationsComponent {
  operationsData = [
    {
      icon: "cibPython",
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Get software details",
      description: "Python script to retrieve software information.",
      customClass: "bg-panos",
      capBg: { "--cui-card-cap-bg": "#FA582D" },
      values: [{ title: "Operations", value: "Now" }],
      buttonLink: "/automation/operations/get-software-information",
      hashtags: ["#panos", "#panorama", "#python"],
    },
    {
      icon: "cibPython",
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Assurance ARP entry",
      description: "Validate if ARP entry is found on firewall.",
      customClass: "bg-panos",
      capBg: { "--cui-card-cap-bg": "#FA582D" },
      values: [{ title: "Operations", value: "Now" }],
      buttonLink: "/automation/operations/assurance-arp-entry",
      hashtags: ["#panos", "#assurance", "#python"],
    },
    {
      icon: "cibPython",
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Assurance Snapshots",
      description: "Perform snapshots of various firewall tables.",
      customClass: "bg-panos",
      capBg: { "--cui-card-cap-bg": "#FA582D" },
      values: [{ title: "Operations", value: "Now" }],
      buttonLink: "/automation/operations/assurance-snapshots",
      hashtags: ["#panos", "#assurance", "#python"],
    },
  ];
}
