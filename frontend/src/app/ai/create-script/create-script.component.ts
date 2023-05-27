import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AiService } from "../../shared/services/ai.service";
import { ToastService } from "../../shared/services/toast.service";

@Component({
  selector: "app-create-script",
  templateUrl: "./create-script.component.html",
  styleUrls: ["./create-script.component.scss"],
})
export class CreateScriptComponent implements OnInit {
  scriptForm: FormGroup | any;
  selectedLanguage: string = "Python";
  selectedTarget: string = "PAN-OS";

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
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.scriptForm = this.fb.group({
      message: ["", Validators.required],
      language: [this.selectedLanguage],
      target: [this.selectedTarget],
    });
  }

  getColor(item: string) {
    return this.colors[item] || "#ABCDEF"; // default color of black
  }

  onSubmit(): void {
    if (this.scriptForm.valid) {
      console.log(this.scriptForm.value);

      const scriptDetails = {
        ...this.scriptForm.value,
        language: this.selectedLanguage,
        target: this.selectedTarget,
      };

      this.AiService.sendScript(scriptDetails).subscribe(
        (response) => {
          console.log(response);
          const toast = {
            title: "Script submitted successfully",
            message: response.message,
            color: "secondary",
            autohide: true,
            delay: 5000,
            closeButton: true,
          };
          this.toastService.show(toast);
        },
        (error) => {
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
        }
      );
    } else {
      console.log("Form is not valid");
    }
  }
}
