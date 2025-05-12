export interface PersonaInterface {
    getNombre: () => string;
    setNombre: (nombre: string) => void;
    getHistorial: (nombre: string) => boolean[];
    setHistorial: (historial: any) => void;
}
export interface PrisioneroInterface extends PersonaInterface {
    getSentencia: () => number;
    setSentencia: (sentencia: number) => void;
    getComplice: () => PrisioneroInterface;
    setComplice: (complice: PrisioneroInterface) => void;
    setInterrogador: (interrogador: InterrogadorInterface) => void;
    confesar: (interrogador: PrisioneroInterface | InterrogadorInterface) => boolean;
    juicio: (condena: number) => void;
}
export interface InterrogadorInterface extends PersonaInterface {
    interrogatorio: (prisionero1: PrisioneroInterface, prisionero2: PrisioneroInterface) => void;
    getPrisionero1: () => PrisioneroInterface;
    getPrisionero2: () => PrisioneroInterface;
    getRespuesta1: () => boolean;
    getRespuesta2: () => boolean;
    setPrisionero1: (prisionero: PrisioneroInterface) => void
    setPrisionero2: (prisionero: PrisioneroInterface) => void
    setRespuesta1: (respuesta: boolean) => void
    setRespuesta2: (respuesta: boolean) => void
}
export interface JuezInterface extends PersonaInterface {
    setInterrogador: (interrogador: InterrogadorInterface) => void;
    juicio: () => void
}
