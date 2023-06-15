import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

import { CodeModel } from "@ngstack/code-editor";

@Component({
  selector: "app-code-editor-widget",
  templateUrl: "./widgets-code-editor.component.html",
  styleUrls: ["./widgets-code-editor.component.scss"],
})
export class CodeEditorWidgetComponent implements OnChanges {
  @Input() codeObject: any;

  theme = "vs-dark";
  readOnly = false;
  codeModel!: CodeModel;

  options: any = {
    contextmenu: true,
    lineNumbers: true,
    minimap: {
      enabled: true,
    },
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes["codeObject"] && this.codeObject) {
      this.codeModel = {
        language: "typescript",
        uri: "main.ts",
        value: JSON.stringify(this.codeObject, null, 2),
      };
    }
  }

  onCodeChanged(value: string) {
    console.log(value);
  }
}
