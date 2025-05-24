import { Prisionero } from "../Prototipos/Prisionero";

//Cooperar inicialmente, solo recordar las 2 últimas interacciones, si en alguna de esas 2 últimas veces fue traicionado, confesar y si en ambas últimas veces el cómplice cooperó, seguir cooperando y listo
//31926235
export class LuisPerez extends Prisionero {
    nota = 15;
    constructor() {
        super();
        this.setNombre('Luis Perez');
    }

    confesar(): boolean {
        const historial = this.getHistorial(this.getComplice().getNombre());
        const ultimasDos = historial.slice(-2);



        if (ultimasDos.length < 1) {
            return false;
        }


        return ultimasDos.some(accion => accion === true);
    }
}