import { client } from "./client";
export class account {
    id!: number;
    nroAccount!: string;
    status!: Boolean;
    typeAccount!: string;
    client!: client;
    initBalance!: number;
}    
