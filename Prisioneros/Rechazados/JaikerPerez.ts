import { Prisionero } from "../../Prototipos/Prisionero";

// Este prisionero traiciona solamente si su cómplice tiene un nombre con más de 5 caracteres,
// de lo contrario solo cooperará.
// Nombre: Jaiker Pérez
// C.I: 31.535.826
export class JaikerPerez extends Prisionero {
  constructor() {
    super();
    this.setNombre('Jaiker Pérez');
  }

  confesar(): boolean {
    const compliceCheck = this.getComplice()?.getNombre() || "";
    const filtroComplice = compliceCheck.length > 5;
    return filtroComplice;
  }
}