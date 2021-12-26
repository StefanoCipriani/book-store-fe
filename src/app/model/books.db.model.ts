import { Author } from "./author.model";

export class AutoreDb {
  constructor(public nome:string, public cognome: string) {}
}

export class BookDb {
    constructor(public isbn:number, public titolo: string, public autori: AutoreDb[], public editore: string) {}
}
