import { Author } from "./author.model";

export class Book {
    constructor(public id:number, public name: string, public author: Author, public editore: string) {}
}
