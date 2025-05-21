
## Reglas
#### 1. Se pueden repetir los prisionero
#### 2. No se pueden porcentajes directos mas si calculados en vase a algun parametro
#### 3. Se puede solicitar al complise o interrogador su respuesta y validar el en consecuencia.
#### 4. Se puede revisar el historal propio, del complice y/o interrogador para tomar la decicion.


# Prisioneros Entregados

### [31027740 Alaina Medina](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/GabrielaRodriguez.ts)
- Este prisionero funciona de la siguiente manera:
- Si lo traicionan dos veces seguidas, activa un modo de traición automática.
- Si su cómplice ha traicionado al menos 2 veces en total y el prisionero 
- No ha traicionado más de 3 veces, también traiciona.
- Si ya traiciono 3 veces, vuelve a cooperar.
- Si cooperan, se "resetea" y da otra oportunidad.
### [32467803 Caire Montilla](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/CaireMontilla.ts)
Este prisionero copia la última acción de su cómplice. 
### [31800428 Fernando Hernandez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/FernandoHernandez.ts)
Este presionero le pregunta a su complice que va a responer, luego de eso revisara el historial del complice, en el caso que el historial del complice y su respuesta sean la misma este prisionero se decidira quedar callado en el caso de que sean distintas traicionara igualmente si le falta alguno de los dos datos sea la respuesta del complice o su historial. 
### [31925657 Gabriela Rodríguez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/GabrielaRodriguez.ts)
Esta estrategia analiza las últimas tres acciones del cómplice y clasifica su alma estratégica en cuatro tipos:
- bondad (coopera seguido),
- egoísmo (traiciona seguido) 
- caos (mezcla impredecible) 
-  miedo (indefinido)
Según esa clasificación, adapta su respuesta para maximizar su beneficio, rompiendo patrones predecibles.
### [32623667 Gabriel Mora](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/GabrielMora.ts)
Este prisionero traiciona solamente si su complice contiene en su nombre la letra "a", de lo contrario solo cooperará
### [31759361 Helly Ramirez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/HellyRamirez.ts)
 - Coopera la primera vez.
 - Si el cómplice alterna entre traicionar y cooperar en las últimas 4 rondas (es decir, nunca repite la misma acción dos veces seguidas), HellyRamirez traiciona para castigar la indecisión.
 - Si el cómplice coopera 2 veces seguidas después de una traición,HellyRamirez coopera para premiar el cambio positivo.
 - Si el cómplice traiciona 3 veces seguidas, HellyRamirez traiciona 2 veces seguidas y luego vuelve a observar.
 - Por defecto, HellyRamirez coopera, buscando fomentar la cooperación pero castigando la indecisión y la traición excesiva.
### [33091874 Jesus Fernandez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/JesusFernandez.ts)
Este prsionero va tomando la deciciones de si confezar o no comparando la cantidad de veces que a sido traicionado y cunatas veces no a  traicionado.
### [31836101 Jesus Piña](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/JesusPiña.ts)
Prisionero estratega adaptativo: observa el historial completo de su cómplice. Coopera la primera vez.
- Si el cómplice lo traicionó en la ronda anterior, él traiciona la siguiente vez. 
- Si el cómplice ha cooperado más veces que traicionado, coopera. Si ha traicionado más veces, traiciona.
- Si hay empate, copia la última jugada del cómplice. Busca minimizar su condena adaptándose al rival..
### [31131987 John Valles](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/JohnValles.ts)
 Estrategia única de John Valles:
 - Coopera siempre en la primera ronda.
 - Alterna entre cooperar y traicionar en la segunda y tercera ronda.
 - A partir de la cuarta ronda:
 - Coopera si el cómplice ha cooperado más veces.
 - Traiciona si el cómplice ha traicionado más veces.
 - Si hay empate, analiza el historial propio para decidir.
 - Si el historial propio también está empatado, decide de forma aleatoria.
### [31371373 Kisbel Montes](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LeanmarGonzalez.ts)
- Prisionero oportunista de rachas: Coopera la primera vez.
- Si el cómplice ha cooperado 3 veces seguidas, traiciona para aprovechar la
- confianza.
- Si el cómplice ha traicionado 2 veces seguidas, coopera para
- romper la racha.
- En cualquier otro caso, copia la última jugada del cómplice.
### [31885162 Leanmar Gonzalez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LeanmarGonzalez.ts)
Este prisionero comienza cooperando, pero si es traicionado 3 veces seguidas, se vuelve vengativo para siempre 
##### $\color{red}{\textrm{Se parece demasiado al de Alaina Medina como para pasarlo por valido}}$
### [29624120 Luisenny Alvarez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LuisennyAlvarez.ts)
Esta prisionera esta obsecionada con la mediana estadistica del historial de su complice, si el numero de decisiones del complice es longitud impar 2k+1, ella va a tomar la decision correspondiente a la posicion k+1 del compañero que divida el historial en dos porciones de igual longitud, si es par, y la desicion k y k+1 son iguales, toma esa decision, de ser diferentes, la somete al azar, de igual manera procede de esta forma si el complice no posee historial alguno.
### [13267720 Luis Hernandez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LuisHernandez.ts)
El presente prisionero es extremadamente supersticioso, solo va a cooperar si el numero de letras del nombre de su complice sigue la serie de Fibonacci, o si el numero de veces que su complice ha colaborado es mayor o igual que 1, sigue la serie de Fibonacci y a su vez es mayor al numero de veces que el confiesa.
### [31926235 Luis Perez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LuisPerez.ts)
Cooperar inicialmente, solo recordar las 2 últimas interacciones, si en alguna de esas 2 últimas veces fue traicionado, confesar y si en ambas últimas veces el cómplice cooperó, seguir cooperando y listo
### [32163215 Nelson Doubuto](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/NelsonDoubuto.ts)
Este prisionero sigue una estrategia cíclica en ronda par coopera (no confiesa) y en ronda impar confiesa.
### [31118236 Salomon Parra](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/NelsonDoubuto.ts)
- Esta estrategia conocida como "Pavlov" o "Gana-Quédate, Pierde-Cambia". En esencia, simula cómo un prisionero decide si confesar (traicionar) o cooperar (llamar) con su cómplice en una serie de interacciones repetidas.
- La lógica principal de este Prisionero se encuentra en el método confesar():
- Primera Interacción: // Si es la primera vez que este Prisionero interactúa con un cómplice específico, siempre coopera (no confiesa). Es un inicio amistoso para ver cómo reacciona el otro. 
- Interacciones Posteriores (Gana-Quédate, Pierde-Cambia):
- Para las rondas siguientes, el Prisionero evalúa el resultado de la ronda anterior: 
- Si el resultado de la ronda anterior fue "favorable" para él, entonces repite la misma decisión que tomó en esa ronda. Esto es el "Gana-Quédate". 
- Si el resultado de la ronda anterior fue "desfavorable" para él, entonces cambia su decisión respecto a la ronda anterior. Si antes cooperó, ahora traiciona; Si antes traicionó, ahora coopera. Esto es el "Pierde-Cambia".

### [31926589 Santiago Sanchez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/SantiagoSanchez.ts)
Sigue un ciclo fijo de 3 rondas que determina si coopera o confiesa. La decisión se basa solo en la historia de interacciones con su cómplice, pero sigue una estrategia no reactiva, más bien planeada.
- Primera ronda (coopera)
-  Segunda Ronda (Coopera si el complice tambien coopero la ronda anterior y si el complice traicionó, el confiesa.) 
-  y Tercera ronda (siempre confiesa sin importar que hizo el complice)
### [32023260 Sara Ramos](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/SaraRamos.ts)
Observa primero la interacciones para tomar una decision, evalua los comportamientos del complice para ver que estrategia usar, si hay muchas confesiones cambia la estrategia y si el complice no ha  confesado coopera.
