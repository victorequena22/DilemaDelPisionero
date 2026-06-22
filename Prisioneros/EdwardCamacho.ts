import { Prisionero } from '../Prototipos/Prisionero';
import { Interrogador } from '../Prototipos/Interrogador';

// Nombre: Edward Camacho
// Cédula: 31835800
// Estrategia: El Cobarde Calculador (Presión y Pánico)
// - Primera ronda: Se hace el valiente y coopera.
// - Evalúa la presión: Analiza las últimas 3 rondas del rival. Si hay muchas traiciones, el miedo sube.
// - PUNTO DE QUIEBRE: Si el nivel de miedo llega al límite, "entrega el culo" y confiesa para salir libre.
// - Si el miedo es bajo (no entrega el culo), no confiesa y juega a copiar el último movimiento.
// - Si entra en pánico pero el rival empieza a cooperar, recupera la dignidad y se calma.
/** Ya implemento jonny Garcia */

/**
    Estrategia: 6puntos - La estrategia no esta bien explicada y se entiende como algo local cuando en relidad es algo global.
    Codigo:     9puntos - El código es correcto pero no refleja la estrategia correctamente.
    Ajustar el codigo o la estrategia para que sean coherentes entre si.
    Reglas     -9puntos
 */
/** edwardcamacho.ts - El nombre del archivo entregado no concuerda con el nombre del prisionero -1 */
/** Edward_Camacho - No cumple con las reglas de nombre de las clases -2 */
export class EdwardCamacho extends Prisionero {
    nota=6;
    // [ESTADO]: Variables para medir la presión psicológica del prisionero
    /* Reglas de la clase para variables -4 */
    private entregoElCulo: boolean = false;
    /* Reglas de la clase para variables -6 */
    private nivelDeMiedo: number = 0;

    constructor() {
        super();
        this.nombre = 'Edward Camacho';
    }

    confesar(_i: Interrogador): boolean {
        const historial: boolean[] = this.historial; // historial de acciones del rival

        // Primera ronda: Se hace el rudo y coopera (false = no confiesa)
        if (historial.length === 0) {
            return false;
        }

        // Analizamos la agresividad reciente (las últimas 3 rondas)
        /* Reglas de la clase para variables -7 */
        const ultimasRondas: boolean[] = historial.slice(-3);
        /* Reglas de la clase para variables -8 */
        const traicionesRecientes: number = ultimasRondas.filter((accion: boolean) => accion === true).length;

        // --- CÁLCULO DE LA PRESIÓN PSICOLÓGICA ---
        // Si el rival es muy agresivo (2 o más traiciones recientes), el miedo se dispara.
        if (traicionesRecientes >= 2) {
            this.nivelDeMiedo += 2;
        } else if (traicionesRecientes === 0) {
            // Si el rival es pacífico, respira profundo y el miedo baja.
            this.nivelDeMiedo = Math.max(0, this.nivelDeMiedo - 1);
        }

        // --- EL PUNTO DE QUIEBRE ---
        // Si la presión es demasiada (miedo >= 4), cede a la presión.
        if (this.nivelDeMiedo >= 4) {
            this.entregoElCulo = true;
        }

        // Recuperación de dignidad: Si ya había cedido, pero el rival lleva rato siendo buena gente.
        if (this.entregoElCulo && traicionesRecientes === 0) {
            this.entregoElCulo = false;
            this.nivelDeMiedo = 0; // Se resetea el trauma psicológico
        }

        // --- DECISIÓN FINAL ---
        // Aplicando la regla de oro:
        // "Si entrega el culo (por pánico), confiesa para salir libre"
        if (this.entregoElCulo) {
            return true;
        }

        // "Si no lo hace (se mantiene firme), no confiesa"
        // En este estado de calma, simplemente devuelve el mismo golpe que le dieron en la ronda anterior (Tit-for-Tat)
        /* Reglas de la clase para variables -7 */
        const ultimaAccionRival: boolean = historial[historial.length - 1];
        return ultimaAccionRival;
    }
}
