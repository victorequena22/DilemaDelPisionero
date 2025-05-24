// import { InterrogadorCallado } from "./Interrogadores/InterrogadorCallado";
import { styleText } from 'node:util';
import { InterrogadorSimple } from "./Interrogadores/InterrogadorSimple";
import { JuezSimple } from "./Jueces/JuezSimple";
import { NelsonDoubuto } from "./Prisioneros/NelsonDoubuto";
// import { Confiable } from "./Prisioneros/Profesor/Confiable";
// import { Indeciso } from "./Prisioneros/Profesor/Indeciso";
// import { Redentor } from "./Prisioneros/Profesor/Redentor";
// import { Traidor } from "./Prisioneros/Profesor/Traidor";
// import { Vengador } from "./Prisioneros/Profesor/Vengador";
import { InterrogadorInterface, JuezInterface, PrisioneroInterface } from "./Prototipos/interface";
import { SaraRamos } from "./Prisioneros/SaraRamos";
import { CaireMontilla } from "./Prisioneros/CaireMontilla";
import { JesusFernandez } from "./Prisioneros/JesusFernandez";
import { SantiagoSanchez } from "./Prisioneros/SantiagoSanchez";
import { GabrielMora } from "./Prisioneros/GabrielMora";
import { LuisPerez } from "./Prisioneros/LuisPerez.ts";
import { LuisHernandez } from "./Prisioneros/LuisHernandez";
import { AlainaMedina } from "./Prisioneros/AlainaMedina";
import { GabrielaRodriguez } from "./Prisioneros/GabrielaRodriguez";
import { HellyRamirez } from "./Prisioneros/HellyRamirez";
import { JesusPiña } from "./Prisioneros/JesusPiña";
import { JohnValles } from "./Prisioneros/JohnValles";
import { FernandoHernandez } from "./Prisioneros/FernandoHernandez";
import { KisbelMontes } from "./Prisioneros/KisbelMontes";
import { LeanmarGonzalez } from "./Prisioneros/LeanmarGonzalez";
import { LuisennyAlvarez } from "./Prisioneros/LuisennyAlvarez";
import { SalomonParra } from "./Prisioneros/SalomonParra";
import { SaraVasquez } from "./Prisioneros/SaraVasquez";
import { AndresAlavarado } from "./Prisioneros/AndresAlavarado";
import { AngelMarquez } from "./Prisioneros/AngelMarquez";
import { AngelRodriguez } from "./Prisioneros/AngelRodriguez";
import { FaustoGarcia } from "./Prisioneros/FaustoGarcia";
import { FrankieSanchez } from "./Prisioneros/FrankieSanchez";
import { Hercules } from "./Prisioneros/Hercules";
import { HugeisyCordero } from "./Prisioneros/HugeisyCordero";
import { LuisCordero } from "./Prisioneros/LuisCordero.ts";
import { MarielbysRodriguez } from "./Prisioneros/MarielbysRodriguez.ts";
import { RonnyPerez } from "./Prisioneros/RonnyPerez.ts";
import { RonnySilva } from "./Prisioneros/RonnySilva.ts";
import { YaralysGimenez } from "./Prisioneros/YaralysGimenez.ts";


class Juego {
    #casos: PrisioneroInterface[] = [
        // new Traidor(),
        // new Confiable(),
        // new Vengador(),
        // new Redentor(),
        // new Indeciso(),
        //Estudiantes
        new AlainaMedina(),
        new AndresAlavarado(),
        new AngelMarquez(),
        // new AngelRodriguez(),
        new CaireMontilla(),
        new FaustoGarcia(),
        new FernandoHernandez(),
        new FrankieSanchez(),
        new GabrielaRodriguez(),
        new GabrielMora(),
        new HellyRamirez(),
        new Hercules(),
        new HugeisyCordero(),
        //new JesusFernandez(),
        new JesusPiña(),
        new JohnValles(),
        new KisbelMontes(),
        new LeanmarGonzalez(),
        new LuisCordero(),
        new LuisennyAlvarez(),
        new LuisHernandez(),
        new LuisPerez(),
        new MarielbysRodriguez(),
        new NelsonDoubuto(),
        new RonnyPerez(),
        new RonnySilva(),
        new SalomonParra(),
        new SantiagoSanchez(),
        new SaraRamos(),
        new SaraVasquez(),
        new YaralysGimenez()
    ];
    #interrogadores: InterrogadorInterface[] = [
        new InterrogadorSimple()
    ];
    #jueces: JuezInterface[] = [
        new JuezSimple()
    ];
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
        for (let i = 0; i < 10000; i++) {
            this.randonizar();
            this.ronda();
        }
        console.log(`${styleText('bgYellow', "No")}|${styleText('bgGreen', this.tap(" Pts", 6))}|${styleText('bgRed', this.tap(" Nombre y Apellido", 20))}|${styleText('bgBlue', "Nota")}`);

        this.#casos
            .sort((p1, p2) => p1.getSentencia() - p2.getSentencia())
            .forEach(this.mostrar)
    }
    mostrar = (p: PrisioneroInterface, i: number) => {
        const s = styleText(i < 3 ? 'bgGreen' : i > 25 ? 'bgRed' : 'white', `${this.tap(p.getSentencia(), 6)}`);
        const n = styleText(i < 3 ? 'green' : i > 25 ? 'red' : 'white', `${this.tap(p.getNombre(), 20)}`);
        console.log(`${styleText('yellow', this.tap(i + 1, 2))}|${s}|${n}| ${p.nota}`);
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
    tap = (nombre: string | number, t: number) => {
        var n = nombre + '';
        for (let index = `${nombre}`.length; index < t; index++) {
            n += ' ';
        }
        return n;
    }
}

(new Juego()).juego();