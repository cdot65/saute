import { Component } from "@angular/core";

@Component({
    selector: "app-assessment-widget",
    templateUrl: "./assessment.component.html",
    styleUrls: ["./assessment.component.scss"],
})
export class AutomationAssessmentComponent {
    assessmentData = [
        {
            imagePath: "../../../../../assets/img/brand/python-panos.svg",
            title: "Security Policy Lookup Tool",
            description:
                "Enter your parameters and find out if a security policy already exists on Panorama.",
            buttonLink: "/deploy",
            hashtags: ["#panos", "#python"],
        },
        {
            imagePath: "../../../../../assets/img/brand/python-panos.svg",
            title: "Admin Report",
            description: "Email a list of Panorama Administrators",
            buttonLink: "/automation/assessment/admin-report",
            hashtags: ["#panorama", "#python", "#email"],
        },
        {
            imagePath: "../../../../../assets/img/brand/python-panos.svg",
            title: "New Address Group",
            description:
                "Create a new address group object on Panorama appliances.",
            buttonLink: "/deploy",
            hashtags: ["#panos", "#python"],
        },
    ];
}
