import { Interrogador } from "../Prototipos/Interrogador";

export class InterrogadorCallado extends Interrogador {
    constructor() {
        super();
        this.nombre = "Interrogador Callado";
    }
    //overwrite
    getHistorial(_nombre: string) {
        return [];
    }
}