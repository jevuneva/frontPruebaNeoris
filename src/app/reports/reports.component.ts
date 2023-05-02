import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountService } from '../services/account.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  respon: String = "";
  public pdf! :any;
  element: any;

  constructor(
    public accountService: AccountService,
    public clientService: ClientService
  ){}

  formData: FormGroup = new FormGroup({
    fechaIni: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    fechafin: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    client: new FormControl('', [Validators.required, Validators.maxLength(20)]),

  });

  onAceptar(){

    this.clientService.getClientbyIdent(this.formData.get('client')?.value).subscribe((resp) =>{

      this.accountService.getReportJson(resp.id, 
      this.formData.get('fechaIni')?.value, this.formData.get('fechafin')?.value ).subscribe((res)=>{
        this.respon = JSON.stringify(res);

      });

    },error => {
      alert(error);
    });  
  }

  

  onPDF(){

      this.clientService.getClientbyIdent(this.formData.get('client')?.value).subscribe((resp) =>{
  
        this.accountService.getReportPdf(resp.id, 
          this.formData.get('fechaIni')?.value, this.formData.get('fechafin')?.value ).subscribe((res2)=>{
            this.respon = JSON.stringify(res2);
           // this.pdf = 'data:application/pdf;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(res2) as any).changingThisBreaksApplicationSecurity;
           // this.element = document.getElementById('ifrm') as HTMLElement;
           // this.element.setAttribute("src", this.pdf);
      
          });
  
      },error => {
        alert(error);
      });  
    }

}
