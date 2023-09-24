import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Subscription, interval } from "rxjs";

import { AutomationService } from "../../../../shared/services/automation.service";
import { FirewallService } from "../../../../shared/services/firewall.service";
import { JobsService } from "../../../../shared/services/jobs.service";
import { SNAPSHOT_ASSURANCE_SCRIPT } from "../../../../shared/constants/snapshot-assurance-help";
import { ToastService } from "../../../../shared/services/toast.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-assurance-snapshot",
  templateUrl: "./assurance-snapshot.component.html",
  styleUrls: ["./assurance-snapshot.component.scss"],
})
/**
 * AssuranceSnapshotComponent is an Angular component for executing an SNAPSHOT Assurance
 * Task.
 */
export class AssuranceSnapshotComponent implements OnInit, OnDestroy {
  buttonTextFirewall: string = "Select Firewall";
  firewalls: any[] = [];
  help = SNAPSHOT_ASSURANCE_SCRIPT.replace(/\n/g, "<br/>").replace(
    / /g,
    "&nbsp;"
  );
  isLoading: boolean = false;
  isReportVisible: boolean = false;
  jobDetails: any;
  jobPollingSubscription: Subscription | undefined;
  jobUrl: string = "";
  jsonData: string = "";
  jsonDataHighlighted: string = "";
  parsedJsonData: any;
  progressValue: number = 0;
  snapshotForm: FormGroup | any;

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
    private cdr: ChangeDetectorRef,
    private firewallService: FirewallService,
    private jobsService: JobsService
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    // Initialize the form group
    this.snapshotForm = this.fb.group({
      hostname: ["", Validators.required],
      buttonSnapshotGroup: this.fb.group({
        all: [false],
        arp_table: [false],
        content_version: [false],
        ip_sec_tunnels: [false],
        license: [false],
        nics: [false],
        routes: [false],
        session_stats: [false],
      }),
    });

    // Listen for changes on the "All" checkbox
    this.snapshotForm
      .get("buttonSnapshotGroup.all")
      .valueChanges.subscribe((value: any) => {
        const buttonGroup = this.snapshotForm.get("buttonSnapshotGroup");
        if (value) {
          // If "All" is checked, check all other boxes and disable them
          buttonGroup.get("all").enable({ emitEvent: false }); // Disable event emission
          buttonGroup.patchValue(
            {
              arp_table: true,
              content_version: true,
              ip_sec_tunnels: true,
              license: true,
              nics: true,
              routes: true,
              session_stats: true,
            },
            { emitEvent: false }
          ); // Adding { emitEvent: false } prevents new events from being emitted
        } else {
          // If "All" is unchecked, uncheck all other boxes and enable them
          buttonGroup.enable({ emitEvent: false }); // Disable event emission
          buttonGroup.patchValue(
            {
              arp_table: false,
              content_version: false,
              ip_sec_tunnels: false,
              license: false,
              nics: false,
              routes: false,
              session_stats: false,
            },
            { emitEvent: false }
          ); // Adding { emitEvent: false } prevents new events from being emitted
        }
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
    this.snapshotForm.get("hostname").setValue(selectedFirewall.hostname);
    this.buttonTextFirewall = selectedFirewall.hostname;
    // console.log(this.snapshotForm.get("hostname").value);
  }

  isFormValid(): boolean {
    const formValues = this.snapshotForm.value;
    const isFirewallSelected = !!formValues.hostname;
    const isAnyOptionSelected = Object.values(
      formValues.buttonSnapshotGroup
    ).includes(true);

    return isFirewallSelected && isAnyOptionSelected;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  /**
   * Execute
   */
  onSubmit(): void {
    if (this.snapshotForm.valid) {
      this.isLoading = true;

      const formValues = this.snapshotForm.value;

      // Prepare the payload
      const payload = {
        hostname: formValues.hostname,
        types: formValues.buttonSnapshotGroup,
      };

      console.log(payload);

      this.AutomationService.createSnapshotAssuranceTask(payload).subscribe({
        next: (response) => {
          // console.log(response);
          const jobId = response.task_id; // capture the job ID from the response
          const taskUrl = `#/jobs/details/${jobId}`;
          const anchor = `<a href="${taskUrl}" target="_blank" class="toast-link">Job Details</a>`;
          const toast = {
            title: "SNAPSHOT Assurance task submitted successfully",
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
