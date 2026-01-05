// import { InterrogadorCallado } from "./Interrogadores/InterrogadorCallado";
import { InterrogadorSimple } from "./Interrogadores/InterrogadorSimple";
import { JuezSimple } from "./Jueces/JuezSimple";
import { Prisionero } from "./Prototipos/Prisionero";
import { Interrogador } from "./Prototipos/Interrogador";
import { Juez } from "./Prototipos/Juez";

import { Honesto } from "./Prisioneros/Profesor/Honesto";
import { Confiable } from "./Prisioneros/Profesor/Confiable";
import { Vengador } from "./Prisioneros/Profesor/Vengador";
import { Redentor } from "./Prisioneros/Profesor/Redentor";
import { Indeciso } from "./Prisioneros/Profesor/Indeciso";
import chalk from "chalk";
class Juego {
    #casos: Prisionero[] = [
        new Honesto(),
        new Confiable(),
        new Vengador(),
        new Redentor(),
        new Indeciso(),
    ];
    #interrogadores: Interrogador[] = [
        new InterrogadorSimple()
    ];
    #jueces: Juez[] = [
        new JuezSimple()
    ];
    ronda() {
        const pendientes = this.#casos.map(p => p);
        while (pendientes.length > 0) {
            var prisionero1 = pendientes.pop();
            var prisionero2 = pendientes.pop();
            if (prisionero1 !== undefined && prisionero2 !== undefined) {
                prisionero1.complice = prisionero2;
                prisionero2.complice = prisionero1;
                this.juicio(prisionero1, prisionero2);
            }
        }
    }
    juicio(prisionero1: Prisionero, prisionero2: Prisionero) {
        var interrogador = this.#interrogadores[Math.floor(Math.random() * this.#interrogadores.length)];
        prisionero1.interrogador = interrogador;
        prisionero2.interrogador = interrogador;
        interrogador.interrogatorio(prisionero1, prisionero2);
        var juez = this.#jueces[Math.floor(Math.random() * this.#jueces.length)];
        juez.interrogador = interrogador;
        juez.juicio();
    }
    juego() {
        for (let i = 0; i < 10000; i++) {
            this.randonizar();
            this.ronda();
        }
        console.log(`${chalk.bgYellow('No')}|${chalk.bgGreen(this.tap(" Pts", 6))}|${chalk.bgRed(this.tap(" Nombre y Apellido", 20))}|${chalk.bgBlue("Nota")}`);
        this.#casos
            .sort((p1, p2) => p1.sentencia - p2.sentencia)
            .forEach(this.mostrar)
    }
    mostrar = (p: Prisionero, i: number) => {
        const s = chalk[i < 1 ? 'green' : i > 4 ? 'red' : 'white'](`${this.tap(p.sentencia, 6)}`);
        const n = chalk[i < 1 ? 'green' : i > 3 ? 'red' : 'white'](`${this.tap(p.nombre, 20)}`);
        console.log(`${chalk.yellow(this.tap(i + 1, 2))}|${s}|${n}|${p.nota}`);
    }
    randonizar() {
        const pendientes = this.#casos;
        var j: number, x: Prisionero, i: number;
        for (i = pendientes.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = pendientes[i];
            pendientes[i] = pendientes[j];
            pendientes[j] = x;
        }
    }
    tap = (nombre: string | number, t: number) => {
        var n = nombre + '';
        for (let index = `${nombre}`.length; index < t; index++) {
            n += ' ';
        }
        return n;
    }
}

(new Juego()).juego();