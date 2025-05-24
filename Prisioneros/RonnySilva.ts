
/* Ronny Silva "Paranoico Selectivo" Programacion I Seccion 01 CI: 31147462. Este prisionero tiene una estrategia compleja:
 - Primera jugada: Siempre coopera (gana confianza inicial).
 - Análisis de patrones:
   - Si el cómplice ha confesado 3 veces seguidas en cualquier momento del historial, entra en modo "paranoia máxima" y siempre confiesa.
   - Si no, usa un sistema de pesos:
     - Cada true (confesión) del cómplice vale 2 puntos.
     - Cada false (cooperación) vale -1 punto.
     - Si la suma total es > 3, confiesa.
     - Si es < 0, coopera.
     - En otro caso, decide aleatoriamente pero con 70% de probabilidad de cooperar.
 */

import { Prisionero } from "../Prototipos/Prisionero";


//CI: 31147462
export class RonnySilva extends Prisionero {
  /***************************************************************/
  /** Se te olvido poner privados los atributos                  */
  /* No se explica correctamente el comportamiento del codigo    */
  /* Cuendo entra en "paranoia máxima" se convienrte en traidor  */
  /* indiferentemente del complice                               */
  /***************************************************************/
  nota = 11;
  constructor() {
    super();
    this.setNombre("Ronny Silva");
  }

  private primeraJugada: boolean = true;
  private paranoiaMaxima: boolean = false;

  confesar(): boolean {
    var hist_com: boolean[];
    hist_com = this.getHistorial(this.getComplice().getNombre());

    if (this.primeraJugada) {
      // Primera jugada: Siempre coopera
      this.primeraJugada = false;
      return false;
    }

    if (this.paranoiaMaxima) {
      // Modo "paranoia máxima": Siempre confiesa
      return true;
    }

    // Comprobar si el cómplice ha confesado 3 veces seguidas
    for (let i = 0; i < hist_com.length - 2; i++) {
      if (hist_com[i] && hist_com[i + 1] && hist_com[i + 2]) {
        this.paranoiaMaxima = true;
        return true;
      }
    }

    // Sistema de pesos
    let sumaPuntos = 0;
    for (let i = 0; i < hist_com.length; i++) {
      if (hist_com[i]) {
        sumaPuntos += 2; // Cada true (confesión) vale 2 puntos
      } else {
        sumaPuntos -= 1; // Cada false (cooperación) vale -1 punto
      }
    }

    if (sumaPuntos > 3) {
      // Si la suma total es > 3, confiesa
      return true;
    } else if (sumaPuntos < 0) {
      // Si la suma total es < 0, coopera
      return false;
    } else {
      // Decide aleatoriamente con 70% de probabilidad de cooperar
      return Math.random() > 0.7;
    }
  }
}