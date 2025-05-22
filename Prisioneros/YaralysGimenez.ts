import { Prisionero } from "../Prototipos/Prisionero";
//este prisionero analiza la ultima respuesta de su complice y la de el mismo
// si son lo mismo el prisionero copera en caso contrario el prisionero traiciona
//31.643.528
export class YaralysGimenez extends Prisionero {
    constructor(){
        super();
        this.setNombre('YaralysGimenez')
    }
    confesar(): boolean {
        let respuestaPropia = this.getHistorial(this.getNombre()).slice(-1)[0] || false;
        let respuestaComplice = this.getHistorial(this.getComplice().getNombre()).slice(-1)[0] || true;

        let nuevaRespuesta = respuestaPropia === respuestaComplice ? false : true;
        this.getHistorial(this.getNombre()).push(nuevaRespuesta);

        return nuevaRespuesta === false;
    }
}