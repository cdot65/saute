import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription, interval } from "rxjs";
import { Toast, ToastService } from "../../../../shared/services/toast.service";
import { catchError, switchMap } from "rxjs/operators";

import { JobsService } from "../../../../shared/services/jobs.service";
import { PanToPrismaService } from "./pan-to-prisma.service";
import { PanoramaService } from "../../../../shared/services/panorama.service";
import { PrismaService } from "../../../../shared/services/prisma.service";
import { SYNC_TO_PRISMA_SCRIPT } from "./pan-to-prisma-help";
import { of } from "rxjs";

/**
 * PanToPrismaComponent serves as the main interface for the feature that allows
 * an administrator to sync a Panorama configuration to their Prisma Access tenant.
 */
@Component({
    selector: "app-pan-to-prisma",
    templateUrl: "./pan-to-prisma.component.html",
    styleUrls: ["./pan-to-prisma.component.scss"],
})
export class PanToPrismaComponent implements OnInit, OnDestroy {
    // Text for our buttons
    buttonTextPanorama: string = "Select Panorama";
    buttonTextPrisma: string = "Select Prisma Tenant";

    // Form group for the component
    panToPrismaForm: FormGroup | any;

    // List of all and the selected Panorama appliance
    panoramas: any[] = [];

    // List of all and the selected Prisma tenant
    prismaTenants: any[] = [];

    // Help script, with newlines and spaces replaced with HTML tags
    help = SYNC_TO_PRISMA_SCRIPT.replace(/\n/g, "<br/>").replace(
        / /g,
        "&nbsp;"
    );

    // Progress bar
    isLoading: boolean = false;
    progressValue: number = 0;

    // Subscription to the interval that checks for job status
    jobDetails: any;
    jobPollingSubscription: Subscription | undefined;
    jobUrl: string = "";

    // JSON object that holds the job details
    jsonData: string = "";
    jsonDataHighlighted: string = "";
    parsedJsonData: any;

    //  Result text
    isReportVisible: boolean = false;
    result: string = "";

    /**
     * Constructs an instance of the PanToPrismaComponent.
     *
     * @param {FormBuilder} fb - Angular form builder for creating form controls and groups
     * @param {PanoramaService} panoramaService - Panorama API Service
     * @param {PrismaService} prismaService - Prisma API Service
     * @param {PanToPrismaService} panToPrismaService - Executes sync task on backend.
     * @param {ToastService} toastService - Service for displaying toast notifications.
     * @param {ChangeDetectorRef} cdr - Angular service for triggering change detection.
     * @param {JobsService} jobsService - Service for handling job-related API calls.
     */
    constructor(
        private fb: FormBuilder,
        private panoramaService: PanoramaService,
        private panToPrismaService: PanToPrismaService,
        private prismaService: PrismaService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private jobsService: JobsService
    ) {}

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
        this.initializeForm();
        this.panoramaInventory();
        this.prismaInventory();
    }

    /**
     * Initializes the form group for the component with the default values and validators.
     */
    private initializeForm(): void {
        this.panToPrismaForm = this.fb.group({
            panorama: [null, Validators.required],
            prisma: [null, Validators.required],
        });
    }

    /**
     * Fetches the list of available Panorama appliances.
     * If an error occurs during the fetch, log the error and
     * display a toast notification.
     */
    private panoramaInventory(): void {
        this.panoramaService
            .panoramaInventory()
            .pipe(
                catchError((err) => {
                    console.error(err);
                    const toast: Toast = {
                        title: "Error fetching Panorama inventory",
                        message: err.message,
                        color: "danger",
                        autohide: true,
                        delay: 5000,
                        closeButton: true,
                    };
                    this.toastService.show(toast);
                    return of([]);
                })
            )
            .subscribe((panoramas: any[]) => {
                this.panoramas = panoramas;
            });
    }

    /**
     * Fetches the list of available Prisma Access tenants.
     * If an error occurs during the fetch, log the error and
     * display a toast notification.
     */
    private prismaInventory(): void {
        this.prismaService
            .prismaInventory()
            .pipe(
                catchError((err) => {
                    console.error(err);
                    const toast: Toast = {
                        title: "Error fetching Prisma Access inventory",
                        message: err.message,
                        color: "danger",
                        autohide: true,
                        delay: 5000,
                        closeButton: true,
                    };
                    this.toastService.show(toast);
                    return of([]);
                })
            )
            .subscribe((prismaTenants: any[]) => {
                this.prismaTenants = prismaTenants;
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
     * Updates the selected Panorama in the panToPrismaForm and sets the button text.
     *
     * This method is triggered when a user selects a Panorama from the dropdown list.
     * It updates the 'hostname' field in the panToPrismaForm to the selected Panorama's hostname.
     * Additionally, it updates the display text of the Panorama selection button to the hostname of the selected Panorama.
     *
     * @param {any} selectedPanorama - The selected Panorama object containing its properties, including its hostname.
     */
    selectPanorama(selectedPanorama: any): void {
        this.panToPrismaForm
            .get("panorama")
            .setValue(selectedPanorama.hostname);
        this.buttonTextPanorama = selectedPanorama.hostname;
    }

    /**
     * Updates the selected Panorama in the panToPrismaForm and sets the button text.
     *
     * This method is triggered when a user selects a Panorama from the dropdown list.
     * It updates the 'hostname' field in the panToPrismaForm to the selected Panorama's hostname.
     * Additionally, it updates the display text of the Panorama selection button to the hostname of the selected Panorama.
     *
     * @param {any} selectedPrismaTenant - The selected Panorama object containing its properties, including its hostname.
     */
    selectPrismaTenant(selectedPrismaTenant: any): void {
        this.panToPrismaForm
            .get("prisma")
            .setValue(selectedPrismaTenant.tenant_name);
        this.buttonTextPrisma = selectedPrismaTenant.tenant_name;
    }

    /**
     * Checks the validity of the panToPrismaForm.
     *
     * This method verifies that a Panorama and Prisma tenant are selected (`hostname` is not empty)
     *
     * @returns {boolean} - Returns true if the form is valid, otherwise false.
     */
    isFormValid(): boolean {
        const formValues = this.panToPrismaForm.value;
        const isPanoramaSelected = !!formValues.panorama;
        const isPrismaSelected = !!formValues.prisma;

        return isPanoramaSelected && isPrismaSelected;
    }

    /**
     * Handles the form submission for Panorama to Prisma sync task.
     *
     * This method performs the following operations:
     * - Validates the form input.
     * - Constructs the payload required for creating an ARP Assurance task.
     * - Calls the `createArpAssuranceTask` service method to initiate the task.
     * - Displays a toast notification to indicate task submission status.
     * - Initiates polling to monitor the job status.
     * - Updates the job details and progress bar as the job progresses.
     * - Stops polling when the job is completed and displays the job details.
     *
     * @returns {void} Nothing
     */
    onSubmit(): void {
        if (this.panToPrismaForm.valid) {
            // set isLoading to true to display the progress bar
            this.isLoading = true;

            // grab the values of the form
            const formValues = this.panToPrismaForm.value;

            // prepare the payload for the API call
            const payload = {
                panorama: formValues.panorama,
                prisma: formValues.prisma,
            };

            // call the API to create the task
            this.panToPrismaService.sync(payload).subscribe({
                next: (response) => {
                    // debugger
                    console.log(response);

                    // capture the job id from the response
                    const jobId = response.task_id;

                    // construct the job url
                    const taskUrl = `#/jobs/details/${jobId}`;
                    const anchor = `<a href="${taskUrl}" target="_blank" class="toast-link">Job Details</a>`;

                    // display a toast notification
                    const toast: Toast = {
                        title: "Job submitted successfully",
                        message: `${response.message}. ${anchor}`,
                        color: "secondary",
                        autohide: true,
                        delay: 5000,
                        closeButton: true,
                    };
                    this.toastService.show(toast);

                    // update the progress bar
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
                    console.error("Error submitting job:", error);
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
