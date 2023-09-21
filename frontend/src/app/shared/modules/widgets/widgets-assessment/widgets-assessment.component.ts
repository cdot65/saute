import { Component } from "@angular/core";

@Component({
  selector: "app-assessment-widget",
  templateUrl: "./widgets-assessment.component.html",
  styleUrls: ["./widgets-assessment.component.scss"],
})
export class AutomationAssessmentComponent {
  assessmentData = [
    {
      icon: "cibTerraform",
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Admin Report",
      description: "Email a list of Panorama Administrators",
      capBg: { "--cui-card-cap-bg": "#f04e23" },
      values: [{ title: "Assessment", value: "Now" }],
      buttonLink: "/automation/assessment/admin-report",
      hashtags: ["#panorama", "#python", "#email"],
    },
    {
      icon: "cibTerraform",
      iconPath: "../../../../assets/icons/panos_white.svg",
      title: "Compliance Report",
      description: "Run our internal assessment tool",
      customClass: "bg-azure",
      capBg: { "--cui-card-cap-bg": "#00aced" },
      values: [{ title: "Upload", value: "Files" }],
      buttonLink: "/upload",
      hashtags: ["#azure", "#terraform", "#vm-series"],
    },
  ];
}
