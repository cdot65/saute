import { Component } from "@angular/core";

@Component({
  selector: "app-operations-widget",
  templateUrl: "./operations.component.html",
  styleUrls: ["./operations.component.scss"],
})
export class AutomationOperationsComponent {
  operationsData = [
    {
      imagePath: "../../../../../assets/img/brand/python-panos.svg",
      title: "Get software details",
      description: "Python script to retrieve software information.",
      buttonLink: "/automation/operations/get-software-information",
      hashtags: ["#panos", "#python"],
    },
    {
      imagePath: "../../../../../assets/img/brand/python-panos.svg",
      title: "Assurance ARP entry",
      description: "Validate if ARP entry is found on firewall.",
      buttonLink: "/automation/operations/assurance-arp",
      hashtags: ["#panos", "#assurance", "#python"],
    },
    {
      imagePath: "../../../../../assets/img/brand/python-panos.svg",
      title: "Firewall State Snapshots",
      description: "Snapshot operational data from a firewall.",
      buttonLink: "/automation/operations/assurance-snapshot",
      hashtags: ["#panos", "#assurance", "#python"],
    },
    {
      imagePath: "../../../../../assets/img/brand/python-panos.svg",
      title: "Assurance Snapshots",
      description: "Perform snapshots of various firewall tables.",
      buttonLink: "/automation/operations/assurance-snapshots",
      hashtags: ["#panos", "#assurance", "#python"],
    },
  ];
}
