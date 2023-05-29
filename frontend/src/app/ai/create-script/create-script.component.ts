import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription, interval } from "rxjs";

import { AiService } from "../../shared/services/ai.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastService } from "../../shared/services/toast.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-create-script",
  templateUrl: "./create-script.component.html",
  styleUrls: ["./create-script.component.scss"],
})
export class CreateScriptComponent implements OnInit, OnDestroy {
  scriptForm: FormGroup | any;
  selectedLanguage: string = "Python";
  selectedTarget: string = "PAN-OS";
  jobDetails: any;
  jobPollingSubscription: Subscription | undefined;
  progressValue: number = 0;
  jsonData: string = "";
  jsonDataHighlighted: string = "";
  scriptStatus: string = "Building Script...";
  items = [1];
  isLoading: boolean = false;

  colors: { [key: string]: string } = {
    Ansible: "#CD0001",
    bash: "#262F33",
    Powershell: "#002253",
    Python: "#F2DD6C",
    Terraform: "#753FB2",
    "PAN-OS": "#FA592C",
    Panorama: "#FA592C",
    "Prisma Access": "#01B5DB",
    "Prisma Cloud": "#01B5DB",
  };

  constructor(
    private fb: FormBuilder,
    private AiService: AiService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.scriptForm = this.fb.group({
      message: ["", Validators.required],
      language: [this.selectedLanguage],
      target: [this.selectedTarget],
    });
  }

  ngOnDestroy(): void {
    if (this.jobPollingSubscription) {
      this.jobPollingSubscription.unsubscribe();
    }
  }

  getColor(item: string) {
    return this.colors[item] || "#ABCDEF"; // default color of black
  }

  onSubmit(): void {
    if (this.scriptForm.valid) {
      console.log(this.scriptForm.value);
      this.isLoading = true;

      const scriptDetails = {
        ...this.scriptForm.value,
        language: this.selectedLanguage,
        target: this.selectedTarget,
      };

      this.AiService.sendScript(scriptDetails).subscribe({
        next: (response) => {
          console.log(response);
          const jobId = response.task_id; // capture the job ID from the response
          const taskUrl = `#/jobs/details/${jobId}`;
          const anchor = `<a href="${taskUrl}" target="_blank" class="toast-link">Job Details</a>`;
          const toast = {
            title: "Script submitted successfully",
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
            .pipe(switchMap(() => this.AiService.getJobDetails(jobId)))
            .subscribe({
              next: (jobDetails) => {
                // Update the job details
                this.jobDetails = jobDetails;
                this.progressValue = 35;

                // If the job is done (i.e., json_data is present), stop polling and update code editor
                if (jobDetails.json_data) {
                  this.jobPollingSubscription?.unsubscribe();
                  this.cdr.detectChanges();
                  this.jsonData = jobDetails.json_data;
                  this.scriptStatus = "Generated Script";
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
            message: "There was an error submitting the script",
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

  getAccordionBodyText(value: string) {
    const textSample = `
      <strong>This is the <mark>#${value}</mark> item accordion body.</strong> It is hidden by
      default, until the collapse plugin adds the appropriate classes that we use to
      style each element. These classes control the overall appearance, as well as
      the showing and hiding via CSS transitions. You can modify any of this with
      custom CSS or overriding our default variables. It&#39;s also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>,
      though the transition does limit overflow.
    `;
    return this.sanitizer.bypassSecurityTrustHtml(textSample);
  }
}
