import { Prisionero } from "../Prototipos/Prisionero";

 // 32.195.275 Fausto García
 //Este prisionero clasifica a su cómplice en 5 tipos según su historial de acciones:
//Primera interacción: Siempre coopera.
//Si el cómplice es cooperador (nunca traiciona): Sigue cooperando.
//Si es traidor (siempre traiciona): Traiciona siempre.
//Si es aleatorio (sin patrón claro): Copia su última jugada.
//Si es vengativo (responde traición con traición): Solo traiciona si el cómplice ha traicionado más de 2 veces que él.
//Si es adaptativo (sin patrón definido): Traiciona solo si el cómplice ha traicionado más del 60% de las veces.



// 32195275
export class FaustoGarcia extends Prisionero {
    private perfiles: Record<string, {
        tipo: 'cooperador' | 'traidor' | 'aleatorio' | 'vengativo' | 'adaptativo',
        cooperaciones: number,
        traiciones: number,
        ultimasAcciones: boolean[]
    }> = {};

    constructor() {
        super();
        this.setNombre('Fausto García');
    }

    confesar(): boolean {
        const nombreComplice = this.getComplice().getNombre();
        const historial = this.getHistorial(nombreComplice) || [];
        
        // Inicializar perfil si es nuevo
        if (!this.perfiles[nombreComplice]) {
            this.perfiles[nombreComplice] = {
                tipo: 'adaptativo',
                cooperaciones: 0,
                traiciones: 0,
                ultimasAcciones: []
            };
        }

        const perfil = this.perfiles[nombreComplice];
        
        // Actualizar estadísticas
        if (historial.length > 0) {
            const ultimaAccion = historial[historial.length - 1];
            if (ultimaAccion) {
                perfil.traiciones++;
            } else {
                perfil.cooperaciones++;
            }
            
            // Mantener registro de últimas 5 acciones
            perfil.ultimasAcciones = [...perfil.ultimasAcciones, ultimaAccion].slice(-5);
            
            // Determinar tipo de perfil
            perfil.tipo = this.determinarPerfil(perfil);
        }

        // Tomar decisión basada en el perfil
        return this.tomarDecision(perfil, historial);
    }

    private determinarPerfil(perfil: {
        cooperaciones: number,
        traiciones: number,
        ultimasAcciones: boolean[]
    }): 'cooperador' | 'traidor' | 'aleatorio' | 'vengativo' | 'adaptativo' {
        const total = perfil.cooperaciones + perfil.traiciones;
        
        if (total === 0) return 'adaptativo';
        
        // Si siempre coopera
        if (perfil.traiciones === 0) return 'cooperador';
        
        // Si siempre traiciona
        if (perfil.cooperaciones === 0) return 'traidor';
        
        // Si alterna de manera impredecible
        const cambios = perfil.ultimasAcciones.reduce((acc, val, i, arr) => 
            i > 0 && val !== arr[i-1] ? acc + 1 : acc, 0);
            
        if (cambios / perfil.ultimasAcciones.length > 0.6) {
            return 'aleatorio';
        }
        
        // Si responde a traiciones con traiciones
        if (perfil.ultimasAcciones.filter(a => a).length / perfil.ultimasAcciones.length > 0.7) {
            return 'vengativo';
        }
        
        return 'adaptativo';
    }

    private tomarDecision(
        perfil: {
            tipo: 'cooperador' | 'traidor' | 'aleatorio' | 'vengativo' | 'adaptativo',
            cooperaciones: number,
            traiciones: number,
            ultimasAcciones: boolean[]
        },
        historial: boolean[]
    ): boolean {
        switch (perfil.tipo) {
            case 'cooperador':
                // Cooperar con cooperadores consistentes
                return false;
                
            case 'traidor':
                // Traicionar a traidores consistentes
                return true;
                
            case 'aleatorio':
                // Usar estrategia tit-for-tat con aleatorios
                return historial.length > 0 ? historial[historial.length - 1] : false;
                
            case 'vengativo':
                // Ser más cooperativo con vengativos para romper ciclo
                return perfil.traiciones > perfil.cooperaciones + 2;
                
            case 'adaptativo':
            default:
                // Estrategia base: cooperar primero, luego reciprocidad
                if (historial.length === 0) return false;
                const ratio = perfil.traiciones / (perfil.cooperaciones || 1);
                return ratio > 0.6;
        }
    }

    pensar(): string {
        const nombreComplice = this.getComplice().getNombre();
        const perfil = this.perfiles[nombreComplice] || { tipo: 'desconocido' };
        return `Perfil detectado: ${perfil.tipo}. Estrategia: ${this.obtenerNombreEstrategia(perfil.tipo)}`;
    }

    private obtenerNombreEstrategia(tipo: string): string {
        const estrategias: Record<string, string> = {
            'cooperador': 'Cooperación total',
            'traidor': 'Traición defensiva',
            'aleatorio': 'Reciprocidad inmediata',
            'vengativo': 'Cooperación gradual',
            'adaptativo': 'Análisis de ratio',
            'desconocido': 'Cooperación inicial'
        };
        return estrategias[tipo] || 'Adaptativa';
    }
}