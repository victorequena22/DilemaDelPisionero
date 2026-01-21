import { Prisionero } from "../Prototipos/Prisionero";
//Nombre: Jesús Romero
//Cedula: 32.121.226
//puedes confiar en el hasta que lo traicionas, pero si no lo haces te cubrira las espaldas

export class JesúsRomero extends Prisionero {
    nota = 0;
    // Es igual al vengador 
    constructor () {
        super ();
        this.nombre = "JesúsRomero"; 
    }
    confesar() {
        return this.historial.includes(true)
    }
}