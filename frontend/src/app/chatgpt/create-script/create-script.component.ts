import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ChatGptService } from "../../shared/services/chatgpt.service";
import { Component } from "@angular/core";
import { ToastService } from "../../shared/services/toast.service";

@Component({
  selector: "app-create-script",
  templateUrl: "./create-script.component.html",
  styleUrls: ["./create-script.component.scss"],
})
export class CreateScriptComponent {
  scriptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private chatGptService: ChatGptService,
    private toastService: ToastService
  ) {
    this.scriptForm = this.fb.group({
      message: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.scriptForm.valid) {
      console.log(this.scriptForm.value);

      const scriptDetails = this.scriptForm.value;

      this.chatGptService.sendScript(scriptDetails).subscribe(
        (response) => {
          console.log(response);
          // You might want to create a Toast message here indicating success
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
          // Handle the error appropriately
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
