import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";

import { ScriptService } from "src/app/shared/services/script.service";
import packageJson from "../../../../../../package.json";

@Component({
  selector: "app-automation-execute",
  templateUrl: "./automation-execute.component.html",
  styleUrls: ["./automation-execute.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutomationExecuteComponent
  implements OnInit, AfterContentInit, AfterViewInit
{
  activeTab: string = "execute";
  scriptContent: string = "";
  scriptName: string = "pan_to_prisma/app.py";

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private scriptService: ScriptService
  ) {}

  @Input() fragment?: string;

  private _href = "https://coreui.io/angular/docs/";

  get href(): string {
    return this._href;
  }

  @Input()
  set href(value: string) {
    const version = packageJson?.config?.coreui_library_short_version;
    const docsUrl =
      packageJson?.config?.coreui_library_docs_url ??
      "https://coreui.io/angular/";
    this._href = `${docsUrl}${value}`;
  }

  ngOnInit(): void {
    this.fetchScriptContent();
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.markForCheck();
  }

  fetchScriptContent(): void {
    this.scriptService.fetchScriptByName(this.scriptName).subscribe({
      next: (data) => {
        if (data?.file_content) {
          this.scriptContent = data.file_content;
        }
      },
      error: (error) => console.error(error),
    });
  }
}
