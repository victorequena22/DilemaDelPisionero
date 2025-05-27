import { Prisionero } from "../../Prototipos/Prisionero";

/* Luisenny Alvarez Programacion I Seccion 01 CI: 29624120. Esta prisionera esta obsecionada 
 con la mediana estadistica del historial de su complice, si el numero de decisiones del complice
 es longitud impar 2k+1, ella va a tomar la decision correspondiente a la posicion k+1 del compañero 
 que divida el historial en dos porciones de igual longitud, si es par, y la desicion k 
 y k+1 son iguales, toma esa decision, de ser diferentes, la somete al azar, de igual manera procede
 de esta forma si el complice no posee historial alguno*/
//CI: 29624120
export class LuisennyAlvarez extends Prisionero {
  /***************************************************************/
  /** se te olvido poner privado el metodo medianaEstadistica    */
  /***************************************************************/
  nota = 13;
  constructor() {
    super()
    this.setNombre("Luisenny Alvarez");
  }
  confesar(): boolean {
    var decision_con: boolean = false;
    var hist_com: boolean[];
    hist_com = this.getHistorial(this.getComplice().getNombre());
    decision_con = this.medianaEstadistica(hist_com);
    return decision_con;
  }
  medianaEstadistica(hist_rev: boolean[]): boolean {
    var decision_coop: boolean = false;
    if (hist_rev.length === 0) {
      return (Math.round(Math.random()) === 1);
    }
    if (hist_rev.length % 2 !== 0 || !(hist_rev[Math.floor(hist_rev.length / 2)] === hist_rev[Math.ceil(hist_rev.length / 2)])) {
      decision_coop = hist_rev[Math.floor(hist_rev.length / 2)];
    } else {
      decision_coop = hist_rev[Math.ceil(hist_rev.length / 2)]
    }
    return decision_coop;
  }
}

