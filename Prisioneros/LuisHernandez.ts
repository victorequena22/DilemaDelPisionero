import { Prisionero } from "../Prototipos/Prisionero";
/*Luis Hernandez Seccion 01 Programacion I, El presente prisionero es extremadamente supersticioso,
solo va a cooperar si el numero de letras del nombre de su complice sigue la serie de Fibonacci, o si el numero de veces que su complice
ha colaborado es mayor o igual que 1, sigue la serie de Fibonacci y a su vez
es mayor al numero de veces que el confiesa*/
//CI: 13267720
export class LuisHernandez extends Prisionero {
    constructor() {
        super()
        this.setNombre("Luis Hernandez");
    }
    confesar(): boolean {
        var nombre_com: number = 0;
        var num_coop: number = 0;
        var num_ncoop: number = 0;
        var coopera_nom: boolean;
        var coopera_num: boolean;
        var coopera_numf: boolean;
        var coopera_com: boolean;
        nombre_com = this.getComplice().getNombre().length;
        num_ncoop = this.getComplice().getHistorial(this.getComplice().getNombre()).filter(confeso => confeso).length;
        num_coop = this.getComplice().getHistorial(this.getComplice().getNombre()).length - num_ncoop;
        coopera_num = this.calTendencia(num_coop);
        coopera_numf = coopera_num && (num_coop > num_ncoop);
        coopera_nom = this.calTendencia(nombre_com);
        coopera_com = coopera_numf || coopera_nom;
        return coopera_com;
    }
    calTendencia(ind_fib: number): boolean {
        var ind_coop: boolean;
        var n1: number = 0;
        var n2: number = 0;
        var sum_fib: number = 0;
        n1 = 0;
        n2 = 1;
        sum_fib = n1 + n2;
        ind_coop = false;
        while (sum_fib <= ind_fib) {
            if (sum_fib === ind_fib) {
                ind_coop = true;
            }
            n1 = n2;
            n2 = sum_fib;
            sum_fib = n1 + n2;
        }
        return ind_coop;
    }
}