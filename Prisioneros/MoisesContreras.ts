import { Prisionero } from '../Prototipos/Prisionero';
import { Interrogador } from '../Prototipos/Interrogador';

// Nombre: Moises Contreras
// Cédula: 30.405.571
// Estrategia Principal: Dramático y Confianza Recíproca Condicionada
/**
    Estrategia: 0puntos Dramático y Confianza Recíproca Condicionada que significa?
    Codigo:     5puntos 
    Contiene elementos no vistos en clases y mescla mas de 2 estrategias 
    Explicalas bien y selecciona solo 2 para tu codigo
    Bonos:      3puntos
    Reglas:    -13puntos
 */
export class MoisesContreras extends Prisionero {
    nota = -5;
    // El archivador central para no mezclar las memorias de los alumnos
    /* Reglas de la clase para variables -2 */
    private camerinoRivales: Record<string, any> = {};

    // Elenco de actores protegidos (Tus verdaderos compañeros del torneo)
    /* Reglas de la clase para variables -4 */
    private elencoAliados: string[] = ['Kelvin pacheco', 'Moises Jimenez', 'Fabricio Mordez'];

    constructor() {
        super();
        this.nombre = 'Moises Contreras';
    }

    confesar(interrogador: Interrogador): boolean {
        this.interrogador = interrogador;

        if (!this.complice) return false;

        /* Reglas de la clase para variables -5 */
        const nombreRival = this.complice.nombre;
        /* Reglas de la clase para variables -6 */
        const identidadOponente = this.complice.constructor.name;

        // 1. BONO TRABAJO EN EQUIPO
        if (this.elencoAliados.includes(identidadOponente)) {
            return false; // Lealtad absoluta con tus amigos reales
        }
        /* Reglas de la clase para variables -7 */

        const registrosRival = this.historial;

        // Acto I: Escenario Inicial
        if (!registrosRival || registrosRival.length === 0) {
            return false;
        }

        // CONTROL DE MEMORIA: Si es la primera vez que ves a este alumno, le creas sus variables
        if (this.camerinoRivales[nombreRival] === undefined) {
            this.camerinoRivales[nombreRival] = {
                /* Reglas de la clase para variables -8 */
                actuacionHostil: false, // [BANDERA]
                /* Reglas de la clase para variables -9 */
                desengañosTeatrales: 0, // [CONTADOR]
                /* Reglas de la clase para variables -10 */
                costoEmocionalAños: 0, // [ACUMULADOR]
            };
        }

        // Extraemos las variables específicas de este alumno en concreto
        /* Reglas de la clase para variables -11 */
        const estadoRival = this.camerinoRivales[nombreRival];
        /* Reglas de la clase para variables -12 */
        const ultimaAccionRival = registrosRival[registrosRival.length - 1];

        // 2. ACTUALIZACIÓN DINÁMICA DE MÉTRICAS INDIVIDUALES
        if (ultimaAccionRival === true) {
            estadoRival.desengañosTeatrales++; // <-- [CONTADOR]

            if (registrosRival.length > 1) {
                estadoRival.costoEmocionalAños += 3; // <-- [ACUMULADOR]
            }
        }

        // <-- [PROMEDIO]
        /* Reglas de la clase para variables -13 */
        const promedioHostilidad = estadoRival.desengañosTeatrales / registrosRival.length;

        // Acto II: Control de Máscaras y Disparador de la [BANDERA]
        if (estadoRival.costoEmocionalAños >= 9 || promedioHostilidad > 0.35) {
            estadoRival.actuacionHostil = true; // <-- [BANDERA] se enciende para este rival
        }

        // Condición de Desbloqueo (Redención Escénica)
        if (estadoRival.actuacionHostil && promedioHostilidad < 0.2) {
            estadoRival.actuacionHostil = false; // Se apaga la bandera
            estadoRival.costoEmocionalAños = 0; // Se limpia el acumulador
        }

        // Acto III: Desenlace y Resolución del Turno
        if (estadoRival.actuacionHostil || estadoRival.desengañosTeatrales >= 3) {
            return true; // Confesar (Castigo individual)
        }

        return false; // Negar (Cooperación)
    }
}
