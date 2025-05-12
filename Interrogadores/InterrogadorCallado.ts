import { Interrogador } from "../Prototipos/Interrogador";

export class InterrogadorCallado extends Interrogador {
    constructor() {
        super();
        this.setNombre('InterrogadorCallado')
    }
    //overwrite
    getHistorial(_nombre: string) {
        return [];
    }
}