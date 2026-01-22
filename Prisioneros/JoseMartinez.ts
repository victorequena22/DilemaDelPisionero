import { Prisionero } from "../Prototipos/Prisionero";
/*
  Nombre: Jose Angel Martinez
  Cédula: 31.628.509
  Ing.Telematica Sección 2  

  ESTRATEGIA:   
  1. Si lo traicionan y era leal guarda/acumula rencor 
  2. Si es un amigo es una bandera para no traicionar y bajar rencor 
  3. Traiciona si ya no es leal, su rencor aumenta 
  4. Si guarda mucho rencor > 3 traiciona 
 */
export class JoseMartinez extends Prisionero{
    nota = 18;
    // Falta explicacion del la estrategia
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

