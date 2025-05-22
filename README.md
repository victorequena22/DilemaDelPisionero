## Reglas
#### 1. Se pueden repetir los prisionero
#### 2. No se pueden porcentajes directos mas si calculados en vase a algun parametro
#### 3. Se puede solicitar al complise o interrogador su respuesta y validar en consecuencia.
#### 4. Se puede revisar el historal propio, del complice y/o interrogador para tomar la decicion.

# Prisioneros Entregados
### [31027740 Alaina Medina](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/AlainaMedina.ts)
Este prisionero funciona de la siguiente manera:
  - Si lo traicionan dos veces seguidas, activa un modo de traición automática.
  - Si su cómplice ha traicionado al menos 2 veces en total y el prisionero 
  - No ha traicionado más de 3 veces, también traiciona.
  - Si ya traiciono 3 veces, vuelve a cooperar.
  - Si cooperan, se "resetea" y da otra oportunidad.

### [31737593 Andres Alavarado](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/AndresAlavarado.ts)
es un prisionero estratégico, adaptable y cíclico, que toma decisiones basadas en:
  - Su número de ronda actual.
  - El historial de decisiones de su cómplice.

### [31795086 Angel Marquez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/AngelMarquez.ts)
Este prisionero alterna su estrategia basado en si fue traicionado en la última ronda
  - Si en la última interacción el cómplice cooperó, coopera esta ronda
  - Si en la última interacción el cómplice traicionó, alterna entre cooperar y traicionar

### [32467803 Caire Montilla](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/CaireMontilla.ts)
Este prisionero copia la última acción de su cómplice. 

### [32195275 Fausto Garcia](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/FaustoGarcia.ts)
Este prisionero clasifica a su cómplice en 5 tipos según su historial de acciones:
  - Primera interacción: Siempre coopera.
  - Si el cómplice es cooperador (nunca traiciona): Sigue cooperando.
  - Si es traidor (siempre traiciona): Traiciona siempre.
  - Si es aleatorio (sin patrón claro): Copia su última jugada.
  - Si es vengativo (responde traición con traición): Solo traiciona si el cómplice ha traicionado más de 2 veces que él.
  - Si es adaptativo (sin patrón definido): Traiciona solo si el cómplice ha traicionado más del 60% de las veces.

$\color{red}{\textrm{No se permiten \% directos en el codigo}}$
$\color{red}{\textrm{Los atributos para ser privados deben comenzar con #}}$

### [31800428 Fernando Hernandez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/FernandoHernandez.ts)
Este presionero le pregunta a su complice que va a responer, luego de eso revisara el historial del complice, en el caso que el historial del complice y su respuesta sean la misma este prisionero se decidira quedar callado en el caso de que sean distintas traicionara igualmente si le falta alguno de los dos datos sea la respuesta del complice o su historial. 


### [32527670 Frankie Sanchez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/FrankieSanchez.ts)
Este prisionero coopera la primera ronda, si el complice lo traciona el coopera por 2 rondas y si el complice coopera e traiciona por 2 rondas 

$\color{red}{\textrm{Los atributos para ser privados deben comenzar con #}}$

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

### [31987430 Hercules ??????](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/HugeisyCordero.ts)
Hercules coopera inicialmente. Una vez suficiente informacion es recolectada, se coloca en un estado de discernimiento ante sus contrincantes, de los cuales obtendra informacion sobre sus otros contrincantes, comparandola a la manera en que se han comportado cuando estan con el. Finalmente, en base a estos datos el otorgara una respuesta a la confesion actual acorde a como el complice ha actuado con otros. Los casos son:
+Si otros dicen que el complice los ha traicionado mas veces que cooperado, se verifica si ellos mismos le han cooperado a Hercules mas veces que traicionado:
    -Si han cooperado mas veces que traicionado con Hercules, se considera traicionar al complice
    -Si han traicionado mas veces que cooperado con Hercules, se considera cooperar con el complice
+Si otros dicen que el complice les ha cooperado mas veces que traicionado, se verifica si ellos mismos le han traicionado a Hercules mas veces que cooperado:
    -Si han cooperado mas veces que traicionado con Hercules, se considera en cooperar con el complice
    -Si han traicionado mas veces que cooperado con Hercules, se considera traicionar al complice

Finalmente, se suman estos datos de cada contrincante anterior para tomar una decision unanime.
$\color{red}{\textrm{Falto el apellido}}$

### [29754399 Hugeisy Cordero](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/HugeisyCordero.ts)
- Primera jugada: Decisión aleatoria 
- Si el cómplice traiciona: Responde con traición 
- Si el cómplice coopera: Mantiene su última decisión
- Si el cómplice coopera dos veces seguidas: Perdona la traición

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
Prisionero oportunista de rachas: Coopera la primera vez.
  - Si el cómplice ha cooperado 3 veces seguidas, traiciona para aprovechar la
  - confianza.
  - Si el cómplice ha traicionado 2 veces seguidas, coopera para
  - romper la racha.
  - En cualquier otro caso, copia la última jugada del cómplice.

### [31885162 Leanmar Gonzalez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LeanmarGonzalez.ts)
Este prisionero comienza cooperando, pero si es traicionado 3 veces seguidas, se vuelve vengativo para siempre LeanmarGonzalez 
$\color{orange}{\textrm{Tienes suerte Alaina Medina cambio su Prisionero los suficiente para pasar el de usted}}$

### [30803750 Luis Cordero](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LuisCordero.ts)
Este prisionero tiene ciertas reglas para cooperar en la primera ronda siempre coopera apartir de la segunda ronda ve el historial del Complice y coopera Si y Solo Si  el Complice Coopero y el numero de la ronda es Par y Si el Complice traiciona  y el numero de la ronda es impar en los demas casos Traicionara

### [29624120 Luisenny Alvarez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LuisennyAlvarez.ts)
Esta prisionera esta obsecionada con la mediana estadistica del historial de su complice, si el numero de decisiones del complice es longitud impar 2k+1, ella va a tomar la decision correspondiente a la posicion k+1 del compañero que divida el historial en dos porciones de igual longitud, si es par, y la desicion k y k+1 son iguales, toma esa decision, de ser diferentes, la somete al azar, de igual manera procede de esta forma si el complice no posee historial alguno.

### [13267720 Luis Hernandez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LuisHernandez.ts)
El presente prisionero es extremadamente supersticioso, solo va a cooperar si el numero de letras del nombre de su complice sigue la serie de Fibonacci, o si el numero de veces que su complice ha colaborado es mayor o igual que 1, sigue la serie de Fibonacci y a su vez es mayor al numero de veces que el confiesa.

### [31926235 Luis Perez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/LuisPerez.ts)
Cooperar inicialmente, solo recordar las 2 últimas interacciones, si en alguna de esas 2 últimas veces fue traicionado, confesar y si en ambas últimas veces el cómplice cooperó, seguir cooperando y listo

### [31367742 Marielbys Rodriguez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/MarielbysRodriguez.ts)
Este prisionero copia la última acción de su cómplice.

### [32163215 Nelson Doubuto](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/NelsonDoubuto.ts)
Este prisionero sigue una estrategia cíclica en ronda par coopera (no confiesa) y en ronda impar confiesa.

### [30560368 Ronny Perez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/RonnyPerez.ts)
-  Estrategia: Coopera la primera vez.
-  Coopera dos veces si el cómplice coopera.
-  Traiciona dos veces si el cómplice traiciona.
-  Cada 5 jugadas, el ciclo se reinicia y vuelve a empezar.

### [31147462 Ronny Silva](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/RonnySilva.ts)
Ronny Silva "Paranoico Selectivo" Programacion I Seccion 01 CI: 31147462. Este prisionero tiene una estrategia compleja:
- Primera jugada: Siempre coopera (gana confianza inicial).
- Análisis de patrones:
  - Si el cómplice ha confesado 3 veces seguidas en cualquier momento del historial, entra en modo "paranoia máxima" y siempre confiesa.
  - Si no, usa un sistema de pesos:
    - Cada true (confesión) del cómplice vale 2 puntos.
    - Cada false (cooperación) vale -1 punto.
    - Si la suma total es > 3, confiesa.
    - Si es < 0, coopera.
    - En otro caso, decide aleatoriamente pero con 70% de probabilidad de cooperar.

$\color{red}{\textrm{No se permiten \% directos en el codigo}}$
$\color{red}{\textrm{Los atributos para ser privados deben comenzar con #}}$
$\color{red}{\textrm{Debido a que la paranoia total se hace de manera general cumplida la condicion pasa a se un traido por defecto.}}$


### [31118236 Salomon Parra](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/SalomonParra.ts)
Esta estrategia conocida como "Pavlov" o "Gana-Quédate, Pierde-Cambia". En esencia, simula cómo un prisionero decide si confesar (traicionar) o cooperar (llamar) con su cómplice en una serie de interacciones repetidas.
La lógica principal de este Prisionero se encuentra en el método confesar():
  - Primera Interacción: Si es la primera vez que este Prisionero interactúa con un cómplice específico, siempre coopera (no confiesa). Es un inicio amistoso para ver cómo reacciona el otro. 
  - Interacciones Posteriores (Gana-Quédate, Pierde-Cambia):
  - Para las rondas siguientes, el Prisionero evalúa el resultado de la ronda anterior: 
  - Si el resultado de la ronda anterior fue "favorable" para él, entonces repite la misma decisión que tomó en esa ronda. Esto es el "Gana-Quédate". 
  - Si el resultado de la ronda anterior fue "desfavorable" para él, entonces cambia su decisión respecto a la ronda anterior. Si antes cooperó, ahora traiciona; Si antes traicionó, ahora coopera. Esto es el "Pierde-Cambia".


### [31926589 Santiago Sanchez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/SantiagoSanchez.ts)
Sigue un ciclo fijo de 3 rondas que determina si coopera o confiesa. La decisión se basa solo en la historia de interacciones con su cómplice, pero sigue una estrategia no reactiva, más bien planeada.
  - Primera ronda (coopera)
  - Segunda Ronda (Coopera si el complice tambien coopero la ronda anterior y si el complice traicionó, el confiesa.) 
  - Tercera ronda (siempre confiesa sin importar que hizo el complice)

### [32023260 Sara Ramos](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/SaraRamos.ts)
Observa primero la interacciones para tomar una decision, evalua los comportamientos del complice para ver que estrategia usar, si hay muchas confesiones cambia la estrategia y si el complice no ha  confesado coopera.

### [32314946 Sara Vasquez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/SaraVasquez.ts)
Tit For Tat con Perdón Condicional
  - Esta prisionera sigue la estrategia "Tit For Tat" (ojo por ojo): coopera siempre hasta que el cómplice traicione.
  - Si el cómplice traiciona, entra en modo castigo y solo perdona si el cómplice coopera dos veces seguidas.
  - Esto permite romper ciclos de venganza y fomentar la cooperación a largo plazo, ya que el cómplice puede notar que, aunque traicione, puede ser perdonado si demuestra un cambio consistente en su comportamiento.
  - Si el cómplice coopera, ella siempre coopera.
  - Esta estrategia busca equilibrar la reciprocidad con la posibilidad de reconciliación, diferenciándose de un Tit For Tat puro y de cualquier otro prisionero del conjunto.

### [31643528 Yaralys Gimenez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/YaralysGimenez.ts)
este prisionero analiza la ultima respuesta de su complice y la de el mismo si son lo mismo el prisionero copera en caso contrario el prisionero traiciona

# Rechazados


### [31596746 Angel Rodriguez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/Rechazados/AngelRodriguez.ts)
$\color{red}{\textrm{Copia de Caire Montilla}}$

### [31535826 Jaiker Perez](https://github.com/victorequena22/DilemaDelPisionero/blob/main/Prisioneros/Rechazados/JaikerPerez.ts)
$\color{red}{\textrm{Todos los participantes tienen mas de 5 caracteres lo que lo haceun copia de traidor}}$