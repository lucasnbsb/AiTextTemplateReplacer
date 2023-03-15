import { Component } from '@angular/core';
import { templates } from "./templates";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public templates = templates;
  public selectedTemplate: string = "";
  public pastedText: string = "";

  public fields: string[] = [];
  public form!: FormGroup;

  constructor() {}

  public parseTemplateMakeForm(template: string) {
    this.selectedTemplate = this.pastedText;
    this.fields = [...new Set(this.selectedTemplate.match(/\[(.*?)\]/g))];
    this.form = new FormGroup({});
    for (let i = 0; i < this.fields.length; i++) {
      const element = this.fields[i];
      this.form.addControl(element, new FormControl(""));
    }
  }

  public updateText(field: string) {
    let tempTemplate = this.pastedText;
    for (let i = 0; i < this.fields.length; i++) {
      let replacement = this.fields[i];
      if (this.form.value[this.fields[i]]) {
        replacement = this.form.value[this.fields[i]];
      }
      tempTemplate = tempTemplate.replaceAll(this.fields[i], replacement);
    }
    this.selectedTemplate = tempTemplate;
  }

  public copyToClipboard() {
    navigator.clipboard.writeText(this.selectedTemplate).then((res) => {
      alert("Copied to clipboard!");
    });
  }

  public resetForm() {
    this.form.reset();
    this.selectedTemplate = this.pastedText;
  }

  public foBack() {
    if (confirm()) {
      this.selectedTemplate = this.pastedText;
    }
  }
}