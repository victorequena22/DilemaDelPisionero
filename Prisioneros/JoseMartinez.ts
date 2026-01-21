import { Prisionero } from "../Prototipos/Prisionero";
import { Interrogador } from "../Prototipos/Interrogador";
/*
  Nombre: Jose Angel Martinez
  Cédula: 31.628.509
  Ing.Telematica Sección 2  

  ESTRATEGIA:   
  1. Empieza cooperando
  2. Responde con lo que el cómplice hizo la última vez
  3. Si el cómplice traiciona, da una segunda chance
  4. Si ha traicionado más de 1 vez en más de 4 rondas
 */
export class JoseMartinez extends Prisionero {
    nota= 11;
    // No sigue las reglas de las guias
    // Estas comparando un contador global(contador_traiciones) con una variable local(historial_del_complice)
    // // La estrategia no es como se explica debido a ⬆️
    private contador_traiciones: number = 0;
    private acumulador_rondas: number = 0;
    private bandera_segunda_chance: boolean = false;
    private mi_historial: boolean[] = [];
    private readonly aliados_confiables: string[] = ['Diego Bustamante', 'Valeria Hernandez',];

    constructor() {
        super();
        this.nombre = 'Jose Martinez';
    }

    confesar(_i: Interrogador): boolean {
        const nombre_del_complice = this.complice.nombre;

        if (this.aliado(nombre_del_complice)) {
            this.mi_historial.push(false);
            return false;
        }
        const historial_del_complice = this.historial;
        this.acumulador_rondas++;

        if (historial_del_complice.length === 0) {
            this.mi_historial.push(false);
            return false;
        }

        this.contador_traiciones = historial_del_complice.filter((accion: boolean) => accion === true).length;
        const ultima_accion_complice = historial_del_complice[historial_del_complice.length - 1];

        if (ultima_accion_complice === true) {
            if (!this.bandera_segunda_chance) {
                this.bandera_segunda_chance = true;
                this.mi_historial.push(false);
                return false;
            } else {
                this.bandera_segunda_chance = false;
                this.mi_historial.push(true);
                return true;
            }
        }
        if (ultima_accion_complice === false) {
            this.bandera_segunda_chance = false;

            if (this.contador_traiciones > 1 && historial_del_complice.length > 4) {
                this.mi_historial.push(true);
                return true;
            }
            this.mi_historial.push(false);
            return false;
        }
        this.mi_historial.push(false);
        return false;
    }
    private aliado(nombre_complice: string): boolean {
        if (!nombre_complice) return false
        return this.aliados_confiables.includes(nombre_complice);
    }
}