import { account } from "./account";

export class movements {
    id!: number;
    dateMov!: Date;
    typeMove!: string;
    value!: number;
    balance!: number;
    account!: account;

}