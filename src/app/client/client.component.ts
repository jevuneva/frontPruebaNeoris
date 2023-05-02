import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { client } from '../models/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  
  listData: any;
  public client: client = new client;

  constructor(
    public clientService: ClientService
  ){}

  formData: FormGroup = new FormGroup({
    id: new FormControl(null),
    identificacion: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    edad: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    status: new FormControl(true, [Validators.required]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),

  });

  ngOnInit() {

    this.listclients();
 
   }

   listclients(){
    
    this.clientService.getClientAll().subscribe((res) => {
      this.listData = res;
    });
   }

   onGuardar(opc: number){
    
    this.client.identificacion = this.formData.get('identificacion')?.value;
    this.client.nombre = this.formData.get('nombre')?.value;
    this.client.edad = this.formData.get('edad')?.value;
    this.client.genero = this.formData.get('genero')?.value;
    this.client.telefono = this.formData.get('telefono')?.value;
    this.client.password = this.formData.get('password')?.value;
    this.client.status = this.formData.get('status')?.value;
    this.client.direccion = this.formData.get('direccion')?.value;

    if (opc == 1){
      this.clientService.inserData(this.client).subscribe((res) =>{
        this.listclients();
      });
    }

    if (opc == 2){
      this.client.id = this.formData.get('id')?.value;
      this.clientService.editData(this.client, this.client.id).subscribe((res) =>{
        this.listclients();
      });
    }


  }

  onEditar(row :any){
    this.formData.get('id')?.setValue(row.id);
    this.formData.get('identificacion')?.setValue(row.identificacion);
    this.formData.get('nombre')?.setValue(row.nombre);
    this.formData.get('edad')?.setValue(row.edad);
    this.formData.get('genero')?.setValue(row.genero);
    this.formData.get('telefono')?.setValue(row.telefono);
    this.formData.get('password')?.setValue(row.password);
    this.formData.get('status')?.setValue(row.status);
    this.formData.get('direccion')?.setValue(row.direccion);

  }

}
