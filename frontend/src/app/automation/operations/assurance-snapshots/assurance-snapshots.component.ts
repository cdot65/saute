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
    if (form.valid) {
      const jobDetails = {
        hostname: this.selectedFirewall.hostname,
        api_key: this.selectedFirewall.api_token,
        operation_type: "state_snapshot",
        action: "snapshot",
        config: { ip: this.ipaddress },
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
}
