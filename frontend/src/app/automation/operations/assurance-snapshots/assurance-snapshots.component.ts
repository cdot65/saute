// Importing Angular, and services required for the component
import { Component, OnInit } from "@angular/core";
import { ToastService, Toast } from "../../../shared/services/toast.service";
import { FirewallService } from "../../../shared/services/firewall.service";
import { NgForm } from "@angular/forms";

// The component decorator marks this TypeScript class as an Angular component
@Component({
  selector: "app-assurance-snapshots",
  templateUrl: "./assurance-snapshots.component.html",
  styleUrls: ["./assurance-snapshots.component.scss"],
})
export class AssuranceSnapshotsComponent implements OnInit {
  // Initializing the variables used in the component
  firewalls: any[] = [];
  selectedFirewall: any = null;
  ipaddress: string = "";

  // Checkboxes for the component. 'all' will select/deselect all other checkboxes
  checkboxes = {
    all: false,
    arp_table: false,
    content_version: false,
    ip_sec_tunnels: false,
    license: false,
    nics: false,
    routes: false,
    session_stats: false,
  };

  // This function is called when the 'all' checkbox changes. It changes the state of all other checkboxes
  onAllChange(): void {
    let newState = this.checkboxes.all;
    this.checkboxes = {
      all: newState,
      arp_table: newState,
      content_version: newState,
      ip_sec_tunnels: newState,
      license: newState,
      nics: newState,
      routes: newState,
      session_stats: newState,
    };
  }

  // The constructor is called before the component is initialized. Services are injected here
  constructor(
    private firewallService: FirewallService,
    private toastService: ToastService
  ) {}

  // ngOnInit is a lifecycle hook. It is called after the component is initialized.
  ngOnInit(): void {
    // Fetching the firewall data from the service and storing it in 'firewalls'
    this.firewallService.fetchFirewallData().subscribe((data: any[]) => {
      this.firewalls = data;
    });
  }

  // This function checks if any checkbox (except 'all') is selected
  public isAnyCheckboxSelected(): boolean {
    const { all, ...rest } = this.checkboxes;
    return Object.values(rest).includes(true);
  }

  // This function returns a list of the names of the selected checkboxes
  public getSelectedCheckboxes(): string[] {
    const { all, ...rest } = this.checkboxes;
    return Object.entries(rest)
      .filter(([key, value]) => value)
      .map(([key]) => key);
  }

  // This function checks if the form is valid: if a firewall is selected and at least one checkbox is checked
  isFormValid(): boolean {
    return this.selectedFirewall && this.isAnyCheckboxSelected();
  }

  // This function is called when the form is submitted
  onSubmitForm(form: NgForm): void {
    if (!this.selectedFirewall) {
      console.error("No firewall selected");
      return;
    }
    if (!this.isAnyCheckboxSelected()) {
      console.error("No checkboxes selected");
      return;
    }

    // Convert selected checkboxes to a comma-separated string
    const selectedCheckboxes = this.getSelectedCheckboxes().join(",");

    // Prepare the job details
    const jobDetails = {
      hostname: this.selectedFirewall.hostname,
      api_key: this.selectedFirewall.api_token,
      operation_type: "state_snapshot",
      action: selectedCheckboxes,
    };

    console.log("jobDetails:", jobDetails);

    // Call the service function with the job details
    this.firewallService
      .assessmentSnapshot(jobDetails)
      .subscribe((response) => {
        console.log(response);
        const taskUrl = `#/jobs/details/${response.task_id}`;
        const anchor = `<a href="${taskUrl}" target="_blank" class="toast-link">Job Details</a>`;
        const toast: Toast = {
          title: "Job submitted successfully",
          message: `${response.message}. ${anchor}`,
          color: "secondary",
          autohide: true,
          delay: 5000,
          closeButton: true,
        };
        this.toastService.show(toast); // Show the success message
      });
  }
}
