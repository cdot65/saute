import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription, interval } from "rxjs";

import { ARP_ASSURANCE_SCRIPT } from "../../../../shared/constants/arp-assurance-help";
import { AutomationService } from "../../../../shared/services/automation.service";
import { DomSanitizer } from "@angular/platform-browser";
import { FirewallService } from "../../../../shared/services/firewall.service";
import { JobsService } from "../../../../shared/services/jobs.service";
import { ToastService } from "../../../../shared/services/toast.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-assurance-arp",
  templateUrl: "./assurance-arp.component.html",
  styleUrls: ["./assurance-arp.component.scss"],
})
/**
 * AssuranceArpComponent is an Angular component for executing an ARP Assurance
 * Task.
 */
export class AssuranceArpComponent implements OnInit, OnDestroy {
  buttonTextFirewall: string = "Select Firewall";
  arpAssuranceForm: FormGroup | any;
  firewalls: any[] = [];
  help = ARP_ASSURANCE_SCRIPT.replace(/\n/g, "<br/>").replace(/ /g, "&nbsp;");
  isLoading: boolean = false;
  isReportVisible: boolean = false;
  jobDetails: any;
  jobPollingSubscription: Subscription | undefined;
  jobUrl: string = "";
  jsonData: string = "";
  jsonDataHighlighted: string = "";
  parsedJsonData: any;
  result: string = "";
  progressValue: number = 0;

  /**
   *
   * @param fb
   * @param AutomationService
   * @param toastService
   * @param sanitizer
   * @param cdr
   * @param firewallService
   * @param jobsService
   */
  constructor(
    private fb: FormBuilder,
    private AutomationService: AutomationService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private firewallService: FirewallService,
    private jobsService: JobsService
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.arpAssuranceForm = this.fb.group({
      message: ["", Validators.required],
      hostname: ["", Validators.required],
    });
    this.fetchFirewallData();
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.jobPollingSubscription) {
      this.jobPollingSubscription.unsubscribe();
    }
  }

  /**
   * Fetches all hostname data from the backend API.
   */
  fetchFirewallData(): void {
    this.firewallService
      .fetchFirewallData()
      .pipe(
        catchError((error) => {
          console.error("Error fetching firewalls:", error);
          return of([]);
        })
      )
      .subscribe((firewalls: any[]) => {
        this.firewalls = firewalls;
        // console.log(this.firewalls);
      });
  }

  /**
   * Update form value and button text after a hostname is selected from the dropdown.
   *
   * @param {string} name - The name of the firewall.
   * @returns {Observable<boolean>} - An observable stream indicating the existence of the firewall.
   */
  selectFirewall(selectedFirewall: any): void {
    this.arpAssuranceForm.get("hostname").setValue(selectedFirewall.hostname);
    this.buttonTextFirewall = selectedFirewall.hostname;
    // console.log(this.arpAssuranceForm.get("hostname").value);
  }

  /**
   * Execute
   */
  onSubmit(): void {
    if (this.arpAssuranceForm.valid) {
      this.isLoading = true;

      const formValues = this.arpAssuranceForm.value;

      Object.assign(formValues, {
        operation_type: "readiness_check",
        action: "arp_entry_exist",
        config: { ip: this.arpAssuranceForm.value.message },
      });

      console.log(formValues);

      this.AutomationService.createArpAssuranceTask(formValues).subscribe({
        next: (response) => {
          // console.log(response);
          const jobId = response.task_id; // capture the job ID from the response
          const taskUrl = `#/jobs/details/${jobId}`;
          const anchor = `<a href="${taskUrl}" target="_blank" class="toast-link">Job Details</a>`;
          const toast = {
            title: "ARP Assurance task submitted successfully",
            message: `${response.message}. ${anchor}`,
            color: "secondary",
            autohide: true,
            delay: 2500,
            closeButton: true,
          };
          this.toastService.show(toast);
          this.progressValue = 10;

          // Poll for job updates every 5 seconds
          this.jobPollingSubscription = interval(5000)
            .pipe(switchMap(() => this.jobsService.getJobDetails(jobId)))
            .subscribe({
              next: (jobDetails) => {
                // Update the job details
                this.jobDetails = jobDetails;
                this.progressValue = 35;
                this.isReportVisible = true;

                // If the job is done (i.e., json_data is present), stop polling and update code editor
                if (jobDetails.json_data) {
                  this.jobPollingSubscription?.unsubscribe();
                  this.cdr.detectChanges();
                  this.jsonData = jobDetails.json_data;
                  this.jsonData = JSON.stringify(jobDetails.json_data);
                  this.parsedJsonData = JSON.parse(this.jsonData);
                  this.jobUrl = taskUrl;
                  this.progressValue = 100;
                  this.isLoading = false;
                }
              },
              error: (error) => {
                console.error("Error while polling job updates:", error);
              },
            });
        },
        error: (error) => {
          console.error(error);
          const toast = {
            title: "Error",
            message: "There was an error submitting the request",
            color: "danger",
            autohide: true,
            delay: 5000,
            closeButton: true,
          };
          this.toastService.show(toast);
        },
      });
    } else {
      console.log("Form is not valid");
    }
  }
}
