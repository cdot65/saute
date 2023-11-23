/**
 * @file assurance-snapshot.component.ts
 *
 * This file imports the necessary Angular modules, services, and constants
 * required for the AssuranceSnapshotComponent.
 *
 * - `ChangeDetectorRef`: Utility for triggering Angular's change detection
 * - `Component`: Angular's core decorator to define a component
 * - `OnDestroy`: Lifecycle hook that gets called when this component is destroyed
 * - `OnInit`: Lifecycle hook that gets called after data-bound properties are initialized
 * - `FormBuilder`: Angular's utility for building reactive forms
 * - `FormGroup`: Interface that represents a group of form controls
 * - `Validators`: Angular's utility for form validations
 * - `Subscription`: Represents a disposable resource for an Observable execution
 * - `interval`: Observable that emits numbers in sequence on a specified interval
 * - `AutomationService`: Custom service for automation tasks
 * - `FirewallService`: Custom service for firewall-related operations
 * - `JobsService`: Custom service for job-related operations
 * - `SNAPSHOT_ASSURANCE_SCRIPT`: Constant that holds the help script for snapshot assurance
 * - `ToastService`: Custom service for showing toast notifications
 * - `catchError`: RxJS operator for error handling
 * - `of`: RxJS operator to convert arguments to an observable sequence
 * - `switchMap`: RxJS operator to map each value to an observable and flatten it
 */
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription, interval } from "rxjs";

import { AutomationService } from "../../../../shared/services/automation.service";
import { FirewallService } from "../../../../shared/services/firewall.service";
import { JobsService } from "../../../../shared/services/jobs.service";
import { SNAPSHOT_ASSURANCE_SCRIPT } from "../../../../shared/constants/snapshot-assurance-help";
import { ToastService } from "../../../../shared/services/toast.service";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

/**
 * `AssuranceSnapshotComponent` serves as the main interface for the SNAPSHOT Assurance feature.
 * It allows users to select a firewall and execute assurance tasks.
 * The component also provides capabilities for downloading reports in PDF format.
 */
@Component({
    selector: "app-assurance-snapshot",
    templateUrl: "./assurance-snapshot.component.html",
    styleUrls: ["./assurance-snapshot.component.scss"],
})

/**
 * AssuranceSnapshotComponent is an Angular component for executing a SNAPSHOT Assurance Task.
 *
 * @property {string} buttonTextFirewall - Button text for the firewall selection.
 * @property {any[]} firewalls - Array containing firewall data.
 * @property {string} help - Help text generated from a constant, formatted for HTML display.
 * @property {boolean} isLoading - Indicator for whether a loading operation is in progress.
 * @property {boolean} isReportVisible - Indicator for whether the report section is visible.
 * @property {any} jobDetails - Object containing details of the job being processed.
 * @property {Subscription | undefined} jobPollingSubscription - Subscription object for job status polling.
 * @property {string} jobUrl - URL to access the details of the job.
 * @property {string} jsonData - JSON data returned from the job.
 * @property {string} jsonDataHighlighted - JSON data that is highlighted.
 * @property {any} parsedJsonData - Parsed JSON data for manipulation.
 * @property {number} progressValue - Numeric value indicating the progress of a task.
 * @property {FormGroup | any} snapshotForm - FormGroup instance for handling the snapshot form.
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
     * Constructs an instance of the AssuranceSnapshotComponent.
     *
     * @param {FormBuilder} fb - Angular form builder for creating form controls and groups.
     * @param {AutomationService} AutomationService - Service for handling automation-related API calls.
     * @param {ToastService} toastService - Service for displaying toast notifications.
     * @param {ChangeDetectorRef} cdr - Angular service for triggering change detection.
     * @param {FirewallService} firewallService - Service for handling firewall-related API calls.
     * @param {JobsService} jobsService - Service for handling job-related API calls.
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
     * Angular's OnInit lifecycle hook.
     * Initializes the form, subscribes to form changes, and fetches initial firewall data.
     * Calls `initializeForm()` to set up the form controls and their default values.
     * Calls `subscribeToFormChanges()` to manage the form's "All" checkbox behavior.
     * Calls `fetchFirewallData()` to retrieve the list of available firewalls from the backend.
     */
    ngOnInit(): void {
        this.initializeForm();
        this.subscribeToFormChanges();
        this.fetchFirewallData();
    }

    /**
     * Initializes the snapshotForm with default values and validators.
     * Sets up the structure of the form including the buttonSnapshotGroup for various snapshot types.
     */
    private initializeForm(): void {
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
    }

    /**
     * Subscribes to changes on the "All" checkbox within buttonSnapshotGroup.
     * Automatically selects or deselects all other checkboxes based on the state of "All" checkbox.
     */
    private subscribeToFormChanges(): void {
        this.snapshotForm
            .get("buttonSnapshotGroup.all")
            .valueChanges.subscribe((value: any) => {
                const buttonGroup = this.snapshotForm.get(
                    "buttonSnapshotGroup"
                );
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
    }

    /**
     * Fetches the list of available firewalls from the backend API.
     * If an error occurs during the fetch, logs the error and defaults the firewalls array to an empty list.
     */
    private fetchFirewallData(): void {
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
            });
    }

    /**
     * Lifecycle hook that is called when the component is destroyed.
     * Unsubscribes from jobPollingSubscription to prevent memory leaks.
     */
    ngOnDestroy(): void {
        if (this.jobPollingSubscription) {
            this.jobPollingSubscription.unsubscribe();
        }
    }

    /**
     * Updates the selected firewall in the snapshotForm and sets the button text.
     *
     * This method is triggered when a user selects a firewall from the dropdown list.
     * It updates the 'hostname' field in the snapshotForm to the selected firewall's hostname.
     * Additionally, it updates the display text of the firewall selection button to the hostname of the selected firewall.
     *
     * @param {any} selectedFirewall - The selected firewall object containing its properties, including its hostname.
     */
    selectFirewall(selectedFirewall: any): void {
        this.snapshotForm.get("hostname").setValue(selectedFirewall.hostname);
        this.buttonTextFirewall = selectedFirewall.hostname;
    }

    /**
     * Checks the validity of the snapshotForm.
     *
     * This method verifies that a firewall is selected (`hostname` is not empty)
     * and at least one option within `buttonSnapshotGroup` is selected (checked).
     *
     * @returns {boolean} - Returns true if the form is valid, otherwise false.
     */
    isFormValid(): boolean {
        const formValues = this.snapshotForm.value;
        const isFirewallSelected = !!formValues.hostname;
        const isAnyOptionSelected = Object.values(
            formValues.buttonSnapshotGroup
        ).includes(true);

        return isFirewallSelected && isAnyOptionSelected;
    }

    /**
     * Returns an array of a given object's own enumerable property names.
     *
     * This method is particularly useful for Angular templates where you may need to loop through
     * the keys of an object using the *ngFor directive.
     *
     * @param {any} obj - The object whose enumerable own property names are to be returned.
     * @returns {string[]} An array of strings that represent all the enumerable properties of the given object.
     */
    objectKeys(obj: any): string[] {
        return Object.keys(obj);
    }

    /**
     * Handles the form submission to create a Snapshot Assurance task.
     *
     * 1. Validates the snapshotForm.
     * 2. Prepares the payload with hostname and snapshot types.
     * 3. Calls the createSnapshotAssuranceTask API through the AutomationService.
     * 4. Upon successful API response, triggers a toast notification and initiates job polling.
     * 5. Polls for job updates at 5-second intervals and updates the UI accordingly.
     * 6. Stops polling when the job is completed and displays the job details.
     * 7. Handles errors gracefully and displays appropriate toast notifications.
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

            // Call the API
            this.AutomationService.createSnapshotAssuranceTask(
                payload
            ).subscribe({
                next: (response) => {
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
                        .pipe(
                            switchMap(() =>
                                this.jobsService.getJobDetails(jobId)
                            )
                        )
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
                                    this.jsonData = JSON.stringify(
                                        jobDetails.json_data
                                    );
                                    this.parsedJsonData = JSON.parse(
                                        this.jsonData
                                    );
                                    this.jobUrl = taskUrl;
                                    this.progressValue = 100;
                                    this.isLoading = false;
                                }
                            },
                            error: (error) => {
                                console.error(
                                    "Error while polling job updates:",
                                    error
                                );
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
