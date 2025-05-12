import { InterrogadorCallado } from "./Interrogadores/InterrogadorCallado";
import { InterrogadorSimple } from "./Interrogadores/InterrogadorSimple";
import { JuezSimple } from "./Jueces/JuezSimple";
import { NelsonDoubuto } from "./Prisioneros/NelsonDoubuto";
import { Confiable } from "./Prisioneros/Confiable";
import { Indeciso } from "./Prisioneros/Indeciso";
import { Redentor } from "./Prisioneros/Redentor";
import { Traidor } from "./Prisioneros/Traidor";
import { Vengador } from "./Prisioneros/Vengador";
import { InterrogadorInterface, JuezInterface, PrisioneroInterface } from "./Prototipos/interface";
import { SaraRamos } from "./Prisioneros/SaraRamos";
import { CaireMontilla } from "./Prisioneros/CaireMontilla";
import { JesusFernandez } from "./Prisioneros/JesusFernandez";
import { SantiagoSanchez } from "./Prisioneros/SantiagoSanchez";


class Juego {
    #casos: PrisioneroInterface[];
    #interrogadores: InterrogadorInterface[];
    #jueces: JuezInterface[];
    constructor() {
        this.#casos = [
            new Traidor(),
            new Confiable(),
            new Vengador(),
            new Redentor(),
            new Indeciso(),
            new NelsonDoubuto(),
            new SaraRamos(),
            new CaireMontilla(),
            new JesusFernandez(),
            new SantiagoSanchez()
        ];
        this.#interrogadores = [
            new InterrogadorSimple(),
            new InterrogadorCallado()
        ];
        this.#jueces = [
            new JuezSimple()
        ];
    }
    ronda() {
        const pendientes = this.#casos.map(p => p);
        while (pendientes.length > 0) {
            var prisionero1 = pendientes.pop();
            var prisionero2 = pendientes.pop();
            if (prisionero1 !== undefined && prisionero2 !== undefined) {
                prisionero1.setComplice(prisionero2);
                prisionero2.setComplice(prisionero1);
                this.juicio(prisionero1, prisionero2);
            }
        }
    }
    juicio(prisionero1: PrisioneroInterface, prisionero2: PrisioneroInterface) {
        var interrogador = this.#interrogadores[Math.floor(Math.random() * this.#interrogadores.length)];
        prisionero1.setInterrogador(interrogador);
        prisionero2.setInterrogador(interrogador);
        interrogador.interrogatorio(prisionero1, prisionero2);
        var juez = this.#jueces[Math.floor(Math.random() * this.#jueces.length)];
        juez.setInterrogador(interrogador);
        juez.juicio();
    }
    juego() {
        for (let i = 0; i < 1000; i++) {
            this.randonizar();
            this.ronda();
        }
        this.#casos
            .sort((p1, p2) => p1.getSentencia() - p2.getSentencia())
            .forEach((p, i) => console.log(`${i + 1} ${p.getSentencia()} ${p.getNombre()}`))
    }
    randonizar() {
        const pendientes = this.#casos;
        var j: number, x: PrisioneroInterface, i: number;
        for (i = pendientes.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = pendientes[i];
            pendientes[i] = pendientes[j];
            pendientes[j] = x;
        }
    }
}

(new Juego()).juego();