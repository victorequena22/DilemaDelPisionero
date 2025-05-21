import { InterrogadorCallado } from "./Interrogadores/InterrogadorCallado";
import { InterrogadorSimple } from "./Interrogadores/InterrogadorSimple";
import { JuezSimple } from "./Jueces/JuezSimple";
import { NelsonDoubuto } from "./Prisioneros/NelsonDoubuto";
import { Confiable } from "./Prisioneros/Profesor/Confiable";
import { Indeciso } from "./Prisioneros/Profesor/Indeciso";
import { Redentor } from "./Prisioneros/Profesor/Redentor";
import { Traidor } from "./Prisioneros/Profesor/Traidor";
import { Vengador } from "./Prisioneros/Profesor/Vengador";
import { InterrogadorInterface, JuezInterface, PrisioneroInterface } from "./Prototipos/interface";
import { SaraRamos } from "./Prisioneros/SaraRamos";
import { CaireMontilla } from "./Prisioneros/CaireMontilla";
import { JesusFernandez } from "./Prisioneros/JesusFernandez";
import { SantiagoSanchez } from "./Prisioneros/SantiagoSanchez";
import { GabrielMora } from "./Prisioneros/GabrielMora";
import { LuisPerez } from "./Prisioneros/LuisPeres";
import { LuisHernandez } from "./Prisioneros/LuisHernandez";
import { AlainaMedina } from "./Prisioneros/AlainaMedina";
import { GabrielaRodriguez } from "./Prisioneros/GabrielaRodriguez";
import { HellyRamirez } from "./Prisioneros/HellyRamirez";
import { JesusPiña } from "./Prisioneros/JesusPiña";
import { JohnValles } from "./Prisioneros/JohnValles";
import { FernandoHernandez } from "./Prisioneros/FernandoHernandez";
import { KisbelMontes } from "./Prisioneros/KisbelMontes";
import LeanmarGonzalez from "./Prisioneros/LeanmarGonzalez";
import { LuisennyAlvarez } from "./Prisioneros/LuisennyAlvarez";
import { SalomonParra } from "./Prisioneros/SalomonParra";
import { SaraVasquez } from "./Prisioneros/SaraVasquez";


class Juego {
    #casos: PrisioneroInterface[];
    #interrogadores: InterrogadorInterface[];
    #jueces: JuezInterface[];
    constructor() {
        this.#casos = [
            // new Traidor(),
            // new Confiable(),
            // new Vengador(),
            // new Redentor(),
            // new Indeciso(),
            //Estudiantes
            new AlainaMedina(),
            new CaireMontilla(),
            new FernandoHernandez(),
            new GabrielaRodriguez(),
            new GabrielMora(),
            new HellyRamirez(),
            new JesusFernandez(),
            new JesusPiña(),
            new JohnValles(),
            new KisbelMontes(),
            new LeanmarGonzalez(),
            new LuisennyAlvarez(),
            new LuisPerez(),
            new LuisHernandez(),
            new NelsonDoubuto(),
            new SalomonParra(),
            new SantiagoSanchez(),
            new SaraRamos(),
            new SaraVasquez()
        ];
        this.#interrogadores = [
            new InterrogadorSimple()
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
        for (let i = 0; i < 100; i++) {
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