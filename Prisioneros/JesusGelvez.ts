// ============================================================
// DATOS DEL ALUMNO
// Nombre: Jesus Gelvez
// Cédula: [ESCRIBE AQUÍ TU CÉDULA]
// Estrategia: "El Par Impar de la Conciencia"
// ============================================================
// EXPLICACIÓN DETALLADA:
// 
// Esta estrategia NO utiliza el número de ronda, NO depende del oponente,
// NO es cíclica, NO usa porcentajes. Se basa únicamente en el propio historial
// de decisiones del prisionero.
// 
// - Primera ronda: coopera (false).
// - En cada ronda, cuenta cuántas veces ha traicionado (true) en TOTAL.
//   * Si la cantidad de traiciones es PAR → coopera (false)
//   * Si es IMPAR → traiciona (true)
// - Bloqueo de enfriamiento: si en las últimas 3 rondas (excluyendo la actual)
//   hubo exactamente 2 traiciones, se activa un "modo enfriamiento" que
//   FUERZA la cooperación durante la siguiente ronda (solo una).
//   Luego se desbloquea automáticamente.
// 
// ============================================================

import { Prisionero } from "../Prototipos/Prisionero";
/**
    Estrategia: 10
    Codigo      5 El modo enfriamiento esta mal implementado funciona la mayoria de las veces
    bono:       2
    Reglas:    -8
 */
export class JesusGelvez extends Prisionero {
    
    /* Reglas de la clase para variables -1 */
    #rondasJugadas: number = 0;
    /* Reglas de la clase para variables -2 */
    #totalTraiciones: number = 0;          
    /* Reglas de la clase para variables -3 */
    #ultimasDecisiones: boolean[] = [];     
    /* Reglas de la clase para variables -4 */
    #modoEnfriamiento: boolean = false;    
    /* Reglas de la clase para variables -5 */
    #rondasEnfriamientoRestantes: number = 0;

    constructor() {
        super();
        this.nombre = 'Jesus Gelvez';
    }

    
    confesar(): boolean {
        const ronda = this.#rondasJugadas;
        this.#rondasJugadas++;

        
        if (ronda === 0) {
            this.#ultimasDecisiones.push(false);
            return false;
        }

        
        if (this.#modoEnfriamiento) {
            if (this.#rondasEnfriamientoRestantes > 0) {
                this.#rondasEnfriamientoRestantes--;
                if (this.#rondasEnfriamientoRestantes === 0) {
                    this.#modoEnfriamiento = false;
                }
                
                this.#ultimasDecisiones.push(false);
                return false;
            } else {
                this.#modoEnfriamiento = false;
            }
        }

        
        var decision: boolean;
        if (this.#totalTraiciones % 2 === 0) {
            decision = false;   
        } else {
            decision = true;    
        }

        
        if (decision === true) {
            this.#totalTraiciones++;
        }
        this.#ultimasDecisiones.push(decision);

        
    /* Reglas de la clase para variables -7 */
        const historialHastaAntes = this.#ultimasDecisiones.slice(0, -1);
    /* Reglas de la clase para variables -8 */
        const ultimasTres = historialHastaAntes.slice(-3);
        var traicionesUltimasTres = 0;
        for (var i = 0; i < ultimasTres.length; i++) {
            if (ultimasTres[i] === true) traicionesUltimasTres++;
        }

        
        if (traicionesUltimasTres === 2 && !this.#modoEnfriamiento) {
            this.#modoEnfriamiento = true;
            this.#rondasEnfriamientoRestantes = 1;   
        }

        return decision;
    }
}