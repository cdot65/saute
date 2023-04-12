import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-panorama-reports',
  templateUrl: './panorama-reports.component.html',
  styleUrls: ['./panorama-reports.component.scss']
})
export class PanoramaReportsComponent implements OnInit {
  exportForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.exportForm = this.formBuilder.group({
      pan_url: ['', Validators.required],
      pan_user: ['', Validators.required],
      pan_pass: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.exportForm.valid) {
      const payload = this.exportForm.value;
      this.http.post('http://localhost:8000/api/v1/report/rules', payload).subscribe((response: any) => {
        console.log(response);
        alert(`Task has been executed. Job ID: ${response.job_id}`);
      });
    }
  }
}
