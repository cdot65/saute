import { Component, OnInit } from "@angular/core";
import { ToastService, Toast } from "../../../shared/services/toast.service";
import { FirewallService } from "../../../shared/services/firewall.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-assurance-snapshots",
  templateUrl: "./assurance-snapshots.component.html",
  styleUrls: ["./assurance-snapshots.component.scss"],
})
export class AssuranceSnapshotsComponent implements OnInit {
  firewalls: any[] = [];
  selectedFirewall: any = null;
  ipaddress: string = "";

  // Added checkboxes object
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
    this.firewallService.fetchFirewallData().subscribe((data: any[]) => {
      this.firewalls = data;
    });
  }

  onSubmitForm(form: NgForm): void {
    if (form.valid && this.isAnyCheckboxSelected()) {
      const jobDetails = {
        hostname: this.selectedFirewall.hostname,
        api_key: this.selectedFirewall.api_token,
        operation_type: "state_snapshot",
        action: "snapshot",
        config: { ip: this.ipaddress },
        checkboxes: this.checkboxes,
      };

      console.log("jobDetails:", jobDetails);

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
          this.toastService.show(toast);
        });
    } else {
      console.error("Form is invalid");
    }
  }

  isAnyCheckboxSelected(): boolean {
    const { all, ...rest } = this.checkboxes;
    return Object.values(rest).includes(true);
  }
}
