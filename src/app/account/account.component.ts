import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { account } from '../models/account';
import { client } from '../models/client';
import { AccountService } from '../services/account.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  listData: any;
  public account: account = new account;

  constructor(
    public accountService: AccountService,
    public clientService: ClientService
  ){}

  formData: FormGroup = new FormGroup({
    id: new FormControl(null),
    nroAccount: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    typeAccount: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    status: new FormControl(true, [Validators.required]),
    initBalance: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required, Validators.maxLength(20)]),

  });


  ngOnInit() {
    this.listAccount(); 
   }

   listAccount(){    
    this.accountService.getAcccountAll().subscribe((res) => {
      this.listData = res;
    });
    this.formData.reset();
   }

  onGuardar(opc: number){    
    this.account.nroAccount = this.formData.get('nroAccount')?.value;
    this.account.typeAccount = this.formData.get('typeAccount')?.value;
    this.account.status = this.formData.get('status')?.value;
    this.account.initBalance = this.formData.get('initBalance')?.value;


    this.clientService.getClientbyIdent(this.formData.get('client')?.value).subscribe((res) =>{

      this.account.client = res;

      if (opc == 1){
        this.accountService.inserData(this.account).subscribe((res) =>{
          this.listAccount();          
        });
      }
  
      if (opc == 2){
        this.account.id = this.formData.get('id')?.value;
        this.accountService.editData(this.account, this.account.id).subscribe((res) =>{
          this.listAccount();
        });
      }
    }, error => {
      alert(error);
    } 
    );    

  }

  onEditar(row :any){
    this.formData.get('id')?.setValue(row.id);
    this.formData.get('nroAccount')?.setValue(row.nroAccount);
    this.formData.get('typeAccount')?.setValue(row.typeAccount);
    this.formData.get('status')?.setValue(row.status);
    this.formData.get('initBalance')?.setValue(row.initBalance);
    this.formData.get('client')?.setValue(row.client.identificacion);
  }

}
