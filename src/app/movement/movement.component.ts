import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { account } from '../models/account';
import { movements } from '../models/movements';
import { AccountService } from '../services/account.service';
import { MovementsServiceService } from '../services/movementsService.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent {

  listData: any;
  public movement: movements = new movements;

  constructor(
    public movementService: MovementsServiceService,
    public accountService: AccountService,
  ){}

  formData: FormGroup = new FormGroup({
    id: new FormControl(null),
    dateMov: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    typeAccount: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    nroAccount: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    typeMove: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    value: new FormControl('', [Validators.required]),
    balance: new FormControl('', [Validators.required]),

  });


  ngOnInit() {
    this.listMovements(); 
   }

   listMovements(){
    
    this.movementService.getMovementAll().subscribe((res) => {
      this.listData = res;
    });
   }

   
  onGuardar(opc: number){    
    this.movement.dateMov = this.formData.get('dateMov')?.value;
    this.movement.typeMove = this.formData.get('typeMove')?.value;
    this.movement.value = this.formData.get('value')?.value;
    this.movement.balance = this.formData.get('balance')?.value;

    let vaccount: account = new account();
    vaccount.nroAccount = this.formData.get('nroAccount')?.value;
    vaccount.typeAccount = this.formData.get('typeAccount')?.value;

    if (opc == 1){

      this.accountService.getAcccountByNroAccount(vaccount.nroAccount).subscribe((res) =>{

        vaccount = res;
        this.movement.account = vaccount;
        this.movementService.inserData(this.movement).subscribe((res) =>{
          this.listMovements();
        },error => {
          alert(error);
        });
      },
      error => {
        alert(error);
      });

      
    }



  }

  onEditar(row :any){
    this.formData.get('id')?.setValue(row.id);
    this.formData.get('dateMov')?.setValue(row.dateMov);
    this.formData.get('typeMove')?.setValue(row.typeMove);
    this.formData.get('value')?.setValue(row.value);
    this.formData.get('balance')?.setValue(row.balance);
    this.formData.get('typeAccount')?.setValue(row.account.typeAccount);
    this.formData.get('nroAccount')?.setValue(row.account.nroAccount);

  }

}
