import {
  ChatWithBot,
  Message,
  ResponseModel,
} from "../../shared/models/gpt-response";
import { Component, OnInit } from "@angular/core";
import { Configuration, OpenAIApi } from "openai";
import { ElementRef, ViewChild } from "@angular/core";
import { cilArrowRight, cilChartPie } from "@coreui/icons";

import { Router } from "@angular/router";
import { WidgetDataService } from "../../shared/services/widget-data.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  @ViewChild("chatBox") private chatContainer!: ElementRef;
  chatConversation: ChatWithBot[] = []; // Array to hold chat conversation
  response!: ResponseModel | undefined; // Response from GPT-4
  promptText = ""; // Text entered by the user
  showTyping = false; // Boolean to show typing animation
  selectedWidget: any; // Currently selected widget
  icons = { cilChartPie, cilArrowRight };

  constructor(
    private widgetDataService: WidgetDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if there is any widget data
    this.widgetDataService.currentData.subscribe((data) => {
      if (data && Object.keys(data).length !== 0) {
        this.selectedWidget = data;
        localStorage.setItem("widgetData", JSON.stringify(data)); // save data to local storage
      } else {
        let savedData = localStorage.getItem("widgetData"); // retrieve saved data
        if (savedData) {
          this.selectedWidget = JSON.parse(savedData);
        } else {
          this.router.navigate(["/dashboard"]);
        }
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  checkResponse() {
    this.pushChatContent(this.promptText, "You", "person");
    this.invokeGPT();
  }

  pushChatContent(content: string, person: string, cssClass: string) {
    const chatToPush: ChatWithBot = {
      person: person,
      response: content,
      cssClass: cssClass,
    };
    this.chatConversation.push(chatToPush);
  }

  getText(data: string) {
    return data.split("\n").filter((f) => f.length > 0);
  }

  async invokeGPT() {
    if (this.promptText.length < 2) return;

    try {
      this.response = undefined;
      let configuration = new Configuration({
        apiKey: environment.envVar.OPENAI_API_KEY,
      });
      let openai = new OpenAIApi(configuration);

      this.showTyping = true;

      let apiResponse = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { role: "system", content: this.selectedWidget.systemPrompt },
          { role: "user", content: this.promptText },
        ],
      });

      this.response = apiResponse.data as ResponseModel;
      this.pushChatContent(
        this.response.choices[0].message.content.trim(),
        this.selectedWidget.name,
        "bot"
      );

      this.showTyping = false;
    } catch (error: any) {
      this.showTyping = false;

      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }
}
