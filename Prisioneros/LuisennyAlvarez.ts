import { Prisionero } from "../Prototipos/Prisionero";
export class LuisennyAlvarez extends Prisionero {
  /* Luisenny Alvarez Programacion I Seccion 01 CI: 29624120. Esta prisionera esta obsecionada 
   con la mediana estadistica del historial de su complice, si el numero de decisiones del complice
   es longitud impar 2k+1, ella va a tomar la decision correspondiente a la posicion k+1 del compañero 
   que divida el historial en dos porciones de igual longitud, si es par, y la desicion k 
   y k+1 son iguales, toma esa decision, de ser diferentes, la somete al azar, de igual manera procede
   de esta forma si el complice no posee historial alguno*/
   //CI: 29624120
  constructor() {
    super()
    this.setNombre("Luisenny Alvarez");
  }
  confesar(): boolean {
    var decision_con: boolean = false;
    var hist_com: boolean[];
    hist_com = this.getComplice().getHistorial(this.getComplice().getNombre());
    decision_con = this.medianaEstadistica(hist_com);
    return decision_con;
  }
  medianaEstadistica(hist_rev: boolean[]): boolean {
    var decision_coop: boolean = false;
    /************************************************************/
    /** Si estas buscando si el numero es par es decir divisible*/
    /* entre 2 tienes el operador modulo % que te debuelve el   */
    /* resto de la division quedaria tal que                    */
    /* if(hist_rev.length % 2)                                  */
    /* y optendrias el mismo resultado                          */
    /************************************************************/
    /************************************************************/
    /** Math.trunc no es el correcto para usar en este caso     */
    /* el correcto es Math.floor ya que este si puede devolver 0*/
    /************************************************************/
    if (2 * Math.trunc(hist_rev.length / 2) < hist_rev.length) {
      /************************************************************/
      /** si ya validaste que es par no es necesario redondear    */
      /************************************************************/
      decision_coop = hist_rev[Math.trunc(hist_rev.length / 2)];
    } else {
      /************************************************************/
      /** Aqui sabes que es impar por lo que lo corecto seria     */
      /** floor - ceil floor redondea abajo y ciel arriba         */
      /** guarda el resultado de la divicion antes de operar      */
      /************************************************************/
      //Math.floor(hist_rev.length / 2) - Math.ceil(hist_rev.length / 2)
      if (hist_rev[Math.trunc(hist_rev.length / 2) - 1] === hist_rev[Math.trunc(hist_rev.length / 2)]) {
        decision_coop = hist_rev[Math.trunc(hist_rev.length / 2) - 1];
      } else {
        /************************************************************/
        /** Esta seria la primera interaccion ponla al principio    */
        /** con la validacion de hist_rev.length === 0              */
        /** para evitarte tantos if usa el return de cada decicion  */
        /* para que no tengas que anidar dentro del else            */
        /************************************************************/
        decision_coop = (Math.round(Math.random()) === 1);
      }
    }
    return decision_coop;
  }
}
