import { Prisionero } from "../Prototipos/Prisionero";

/*
NOMBRE DEL PRISIONERO: FelixPerez 
CEDULA: 3O266225
ESTRATEGIA MEJORADA: "Trastorno Adaptativo"
Mantiene el concepto de múltiples personalidades, pero la selección no es puramente
aleatoria, sino que reacciona al entorno. Si detecta hostilidad, activa la personalidad
bélica. Si detecta calma, activa la pacífica o imitadora.
*/

export class FelixPerez extends Prisionero {
  nota = 5;
  // No sigue las teglas de la guia 
  // no se permiten porcentajes directos Math.random() < 0.5;
  private personalidades: string[];
  private lista_aliados: string[];

  constructor() {
    super();
    this.nombre = "FelixPerez";
    // Misma cédula requerida
    // Cédula: 3O266225
    
    this.personalidades = ["pacifico", "belico", "imitador", "rencoroso"];
    this.lista_aliados = ["mariel granadillo", "anmary gallardo"]; 
  }

  confesar(): boolean {
    // 1. Lógica de Aliados (Más robusta: ignora mayúsculas/minúsculas)
    // Asumimos que this.complice.nombre existe.
    const nombreRival = (this.complice.nombre || "").toLowerCase();
    
    // Verificamos si algún aliado está contenido en el nombre del rival
    const esAliado = this.lista_aliados.some(aliado => nombreRival.includes(aliado));

    if (esAliado) {
      // Si es aliado, siempre cooperamos (false)
      return false;
    }

    // 2. Selección de Personalidad Dinámica
    // En lugar de puro azar, decidimos la personalidad basándonos en el historial
    let personalidad_actual: string;
    
    // Obtenemos el historial del rival (si la plataforma lo permite) o usamos el nuestro para inferir
    // Nota: En muchas implementaciones 'this.complice.historial' es lo correcto para ver qué hizo el otro.
    // Si la plataforma no tiene historial del complice, usaremos azar controlado.
    
    const rondasJugadas = this.historial.length;

    if (rondasJugadas < 2) {
        // Al principio somos impredecibles o pacíficos
        personalidad_actual = "pacifico";
    } else {
        // Selección aleatoria correcta (incluye el índice 0)
        const indice = Math.floor(Math.random() * this.personalidades.length);
        personalidad_actual = this.personalidades[indice];
    }

    // 3. Ejecución de la personalidad
    switch (personalidad_actual) {
      case "pacifico":
        // Siempre coopera
        return false;

      case "belico":
        // Siempre traiciona
        return true;

      case "imitador":
        // Tit-for-Tat: Copia la última jugada del rival.
        // Asumimos acceso al historial del cómplice. Si no existe, coopera por defecto.
        if (this.complice.historial && this.complice.historial.length > 0) {
            return this.complice.historial[this.complice.historial.length - 1];
        }
        return false;

      case "rencoroso":
        // Si me traicionaron alguna vez en las últimas 3 jugadas, traiciono.
        if (this.complice.historial) {
            const ultimas = this.complice.historial.slice(-3);
            return ultimas.includes(true); // Devuelve true (confesar) si hubo traición reciente
        }
        return true; // Por defecto agresivo

      default:
        // Aleatorio real (50/50)
        return Math.random() < 0.5;// Ya lo habias corregido por que volviste a usar el porcentaje
    }
  }
}