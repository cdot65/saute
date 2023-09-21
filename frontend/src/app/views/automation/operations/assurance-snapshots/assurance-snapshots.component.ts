// Importing Angular, and services required for the component
import { Component, OnInit } from "@angular/core";

import { Firewall } from "../../../../shared/interfaces/firewall.interface";
import { FirewallService } from "../../../../shared/services/firewall.service";
import { NgForm } from "@angular/forms";
import { Toast } from "../../../../shared/interfaces/toast.interface";
import { ToastService } from "../../../../shared/services/toast.service";

// The component decorator marks this TypeScript class as an Angular component
@Component({
  selector: "app-assurance-snapshots",
  templateUrl: "./assurance-snapshots.component.html",
  styleUrls: ["./assurance-snapshots.component.scss"],
})
export class AssuranceSnapshotsComponent implements OnInit {
  firewalls: Firewall[] = [];
  selectedFirewall: Firewall | null = null;
  ipaddress: string = "";

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

  constructor(
    private firewallService: FirewallService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.firewallService.fetchFirewallData().subscribe(
      (data: Firewall[]) => {
        this.firewalls = data;
      },
      (error) => {
        console.error(error);
        // Handle the error appropriately
      }
    );
  }

  public isAnyCheckboxSelected(): boolean {
    const { all, ...rest } = this.checkboxes;
    return Object.values(rest).includes(true);
  }

  public getSelectedCheckboxes(): string[] {
    const { all, ...rest } = this.checkboxes;
    return Object.entries(rest)
      .filter(([key, value]) => value)
      .map(([key]) => key);
  }

  isFormValid(): boolean {
    return this.selectedFirewall !== null && this.isAnyCheckboxSelected();
  }

  onSubmitForm(form: NgForm): void {
    if (!this.selectedFirewall) {
      // Show the error to the user
      this.toastService.show({
        title: "Error",
        message: "No firewall selected",
        color: "danger",
        autohide: true,
        delay: 5000,
        closeButton: true,
      });
      return;
    }

    if (!this.isAnyCheckboxSelected()) {
      // Show the error to the user
      this.toastService.show({
        title: "Error",
        message: "No checkboxes selected",
        color: "danger",
        autohide: true,
        delay: 5000,
        closeButton: true,
      });
      return;
    }

    const selectedCheckboxes = this.getSelectedCheckboxes().join(",");

    const jobDetails = {
      hostname: this.selectedFirewall.hostname,
      api_key: this.selectedFirewall.api_key,
      operation_type: "state_snapshot",
      action: selectedCheckboxes,
    };

    // console.log("jobDetails:", jobDetails);

    this.firewallService.assessmentSnapshot(jobDetails).subscribe(
      (response) => {
        // console.log(response);
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
        this.toastService.show(toast);
      },
      (error) => {
        console.error(error);
        // Handle the error appropriately
      }
    );
  }
}
