import { Prisionero } from "../Prototipos/Prisionero";
// Este presionero le pregunta a su complice que va a responer, luego de eso revisara el historial del complice, en el caso que el historial del complice y su respuesta sean la misma este prisionero se decidira quedar callado
//en el caso de que sean distintas traicionara igualmente si le falta alguno de los dos datos sea la respuesta del complice o su historial.
//Fernando Hernández
// C.I.31800428

export class FernandoHernandez extends Prisionero {
    constructor(){
        super();
        this.setNombre("Fernando Hernández")
    }
    RespuestaComplice() {
        const complice = this.getComplice();
        const ultimaRespuesta = complice.confesar(complice);
        return ultimaRespuesta;
    }
confesarUltimo() {
    const historial = this.getHistorial(this.getComplice().getNombre());
    return historial.length > 0 ? historial[historial.length - 1] : null;
}
confesar(): boolean {
    if(this.confesarUltimo() === this.RespuestaComplice()){
        return false
    }else if(this.getNombre() === this.getNombre()){
        return false
    }
    else {
    return true}
 }
 
}

