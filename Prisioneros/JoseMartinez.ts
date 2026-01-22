import { Prisionero } from "../Prototipos/Prisionero";
/*
  Nombre: Jose Angel Martinez
  Cédula: 31.628.509
  Ing.Telematica Sección 2  

  ESTRATEGIA:   Este prisionero actua basado en su decision de ser leal a su complice (es decir no confiesa) 
                o en cambio si ya ha guardado mucho rencor y traiciona.
  1. Si lo traicionan cuando el era leal, guarda/acumula un punto de rencor y ya no tiene lealtad
  2. Si es un amigo confiable, decide siempre ser leal ya que es una bandera para no traicionar y bajar un punto de rencor 
  3. Si decide que ya no es leal, traiciona, mientras su rencor aumenta, aunque reflexiona para la proxima ser leal de nuevo
  4. Si acumula mucho punto de rencor > 3 traiciona, y se desahoga llevando su rencor a 0 
 */
export class JoseMartinez extends Prisionero{
    nota = 19;
    #lealtad: boolean;
    #rencor: number
    #amigos_confiables: string []

    constructor(){
        super();
        this.nombre = 'Jose Martinez'
        this.#lealtad = true;
        this.#amigos_confiables = ['Diego Bustamante', 'Valeria Hernandez','Jesus Cruz']
        this.#rencor = 0
    }
    confesar(){
        const mi_complice = this.complice.nombre
        const acciones_complice = this.historial

        if(acciones_complice[acciones_complice.length - 1] && this.#lealtad){
            this.#rencor++
            this.#lealtad = false
          
        }
        if(this.#amigos_confiables.includes(mi_complice)){
            this.#rencor--
            return false
        }

          if(!this.#lealtad){
            this.#rencor++
            this.#lealtad = true;
            return true;
         
        }
        if (this.#rencor>3){
            this.#rencor = 0
            return true
        }

        return false

    }

}

