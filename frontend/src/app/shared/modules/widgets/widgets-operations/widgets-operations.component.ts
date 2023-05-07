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
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Get software details",
      description: "Python script to retrieve software information.",
      customClass: "bg-panos",
      capBg: { "--cui-card-cap-bg": "#FA582D" },
      values: [{ title: "Operations", value: "Now" }],
      buttonLink: "/automation/operations/get-software-information",
      hashtags: ["#panos", "#panorama", "#python"],
    },
  ];
}
