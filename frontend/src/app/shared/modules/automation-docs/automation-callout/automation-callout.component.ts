import { Component, Input } from "@angular/core";
import packageJson from "../../../../../../package.json";

@Component({
  selector: "app-automation-callout",
  templateUrl: "./automation-callout.component.html",
  styleUrls: ["./automation-callout.component.scss"],
})
export class AutomationCalloutComponent {
  @Input() name: string = "";

  constructor() {}

  private _href: string = "https://coreui.io/angular/docs/";

  get href(): string {
    return this._href;
  }

  @Input()
  set href(value: string) {
    const version = packageJson?.config?.coreui_library_short_version;
    const docsUrl =
      packageJson?.config?.coreui_library_docs_url ??
      "https://coreui.io/angular/";
    // const path: string = version ? `${version}/${value}` : `${value}`;
    const path: string = value;
    this._href = `${docsUrl}${path}`;
  }

  get plural() {
    return this.name?.slice(-1) === "s";
  }
}
