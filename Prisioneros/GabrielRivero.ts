//INFORMACIÓN DEL ALUMNO
//---------------------------------------------------------------------
 //Nombre: Gabriel David Rivero Gonzalez 
 //C.I: 32.631.523
// Minimal local Prisionero base class to satisfy missing module "../Prototipos/Prisionero"

export class Prisionero {
    nombre: string = "";
    nota: number = 0;
    historial: boolean[] = [];
    complice: { nombre: string } = { nombre: "" };

    constructor() {}

    public confesar(): boolean {
        return false;
    }
}

export class GabrielRivero extends Prisionero {
    nota = 0;
    // no sigue las reglas de la guia
    // funciona como vengador por lo que no es valido
    // contadorRondas no se usa para la toma de decisiones
    // no hereda de prisionero Prototipos/Prisionero
    #traicionadoPorExtraño: boolean = false;
    #contadorRondas: number = 0;

    constructor() {
        super();
        this.nombre = "Gabriel Rivero";
    }

    public override confesar(): boolean {
        this.#contadorRondas++;
        const h = this.historial;
        const nombreOponente = this.complice.nombre.toLowerCase();

        // 1. LEALTAD ABSOLUTA AL EQUIPO
        // He cambiado los nombres aquí:
        const equipo = ["Cesar", "Samuel", "Abraham", "Dilan"];
        
        if (equipo.some(e => nombreOponente.includes(e.toLowerCase()))) {
            return false; // Nunca traiciona al equipo
        }

        // 2. LÓGICA DE PROTECCIÓN (Sin azar)
        if (h.length === 0) {
            return false; // Inicia cooperando para probar al extraño
        }

        const ultimaJugadaExtraño = h[h.length - 1];

        // Si el extraño la traiciona UNA vez, se activa el modo "Grim" (Rencor)
        if (ultimaJugadaExtraño === true) {
            this.#traicionadoPorExtraño = true;
        }

        return this.#traicionadoPorExtraño; 
    }
}