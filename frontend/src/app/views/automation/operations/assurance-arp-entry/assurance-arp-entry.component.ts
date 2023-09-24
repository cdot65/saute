import { Component, OnInit } from "@angular/core";
import { Toast, ToastService } from "../../../../shared/services/toast.service";

import { FirewallService } from "../../../../shared/services/firewall.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-assurance-arp-entry",
  templateUrl: "./assurance-arp-entry.component.html",
  styleUrls: ["./assurance-arp-entry.component.scss"],
})
export class AssuranceArpEntryComponent implements OnInit {
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
      let hostname: string;

      if (this.selectedFirewall.ipv4_address) {
        hostname = this.selectedFirewall.ipv4_address;
      } else if (this.selectedFirewall.ipv6_address) {
        hostname = this.selectedFirewall.ipv6_address;
      } else {
        hostname = this.selectedFirewall.hostname;
      }

      const jobDetails = {
        hostname: hostname,
        api_key: this.selectedFirewall.api_key,
        operation_type: "readiness_check",
        action: "arp_entry_exist",
        config: { ip: this.ipaddress },
      };

      // console.log("jobDetails:", jobDetails);

      this.firewallService
        .assessmentArpEntry(jobDetails)
        .subscribe((response) => {
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
        });
    } else {
      console.error("Form is invalid");
    }
  }
}
