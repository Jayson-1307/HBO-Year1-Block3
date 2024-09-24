# Expert review sprint 1

# Learning stories

## Abstraction

Abstraction is een concept in het programmeren dat inhoudt dat de complexe implementatie-details van een systeem worden verborgen gehouden en alleen de noodzakelijke functies of functionaliteiten aan de gebruiker worden blootgesteld. Het idee is om de gebruiker alleen de dingen te laten zien die ze nodig hebben en het makkelijker is te begrijpen, zonder dat ze zich zorgen hoeven te maken over hoe het allemaal werkt.

Abstractie in code omvat vaak het definiëren van interfaces, klassen of functies die een vereenvoudigd beeld geven van de onderliggende functionaliteit. Deze abstracties verbergen de complexiteit van hoe dingen intern werken, waardoor gebruikers ermee kunnen communiceren via een eenvoudige en intuïtieve interface.

```typescript 
export abstract class InteractableItem extends Item {
    public constructor(alias: string, examineActionAlias: string) {
        super(alias, examineActionAlias, InteractionActionAlias);
    }

    public abstract interact(): ActionResult | undefined;
}

export class SmokePipeItem extends InteractableItem {
    public constructor() {
        super(SmokePipeItemAlias, ExamineActionAlias);
    }
}

public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(SmokePipeItemAlias)) {
            playerSession.inventory.push(SmokePipeItemAlias);
            return new TextActionResult(["You picked up a SmokePipe."]);
        } else {
            return new TextActionResult(["You already have this item."]);
        }
    }
```
## Encapsulation

Encapsulatie is een belangrijk idee in programmeren dat draait om het verbergen van de binnenkant van een object en alleen de nodige details bloot te stellen om ermee te communiceren. Het is als het hebben van een doos waarin je spullen bewaart. Anderen kunnen alleen de buitenkant van de doos zien en weten niet wat erin zit, maar ze kunnen wel de speciale manieren gebruiken die je hebt ingesteld om met de spullen in de doos om te gaan. Dit helpt om de code netjes en georganiseerd te houden, en voorkomt dat anderen per ongeluk dingen veranderen die ze niet zouden moeten veranderen. Dit word bereikt om public, private en protected te gebruiken.

```typescript

public consume(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const alive: boolean = decreaseHP(10);
        if (!playerSession.inventory.includes(SmokePipeItemAlias)) {
            return new TextActionResult(["Try to pick up the pipe first. "]);
        }
        else {
            if (alive){
                return new TextActionResult(["You take a puff from the SmokePipe... u took damage."]);
            }
            else {
                return new TextActionResult(["You just died"]);
            } 
        }
    }

protected setCurrentRoom(room: string): void {
    this.currentRoom = room;
}

private addToInventory(item: string): void {
        this.inventory.push(item);
}
```

## Inheritance

Inheritance is een concept waarbij een nieuwe klasse (ook wel een subklasse) alle eigenschappen en methoden erft van een bestaande klasse (ook wel een superklasse genoemd). Dit betekent dat de subklasse de mogelijkheid heeft om de eigenschappen en methoden van de superklasse te gebruiken en ook nieuwe eigenschappen en methoden kan toevoegen of bestaande kan overschrijven. Hierdoor kunnen programmeurs efficiënter code schrijven door hergebruik van code.

```typescript
export const LaboratoryKeyItemAlias: string = "laboratory-Key";

export class LaboratoryKeyItem extends Item implements Examine, Interact{
    public constructor() {
        super(LaboratoryKeyItemAlias, ExamineActionAlias, InteractionActionAlias);
    }
}
```

De klasse LaboratoryKeyItem breidt de klasse Item uit door extends te gebruiken, waardoor het alle kenmerken en methoden van Item erft. Dit maakt het gemakkelijk om code te hergebruiken.

## Polymorfism

polymorfism helpt om de methode-naam te gebruiken in verschillende klassen, waarbij elke klasse zijn eigen specifieke implementatie van die methode heeft. Dit stelt ons in staat om code te schrijven die flexibel en uitbreidbaar is, omdat we dezelfde methode kunnen aanroepen en verschillende resultaten kunnen verwachten op basis van het type object dat wordt gebruikt.

```typescript
class ExamineAction {
    static handle(gameObject: GameObject): ActionResult | undefined {
    }
}

class TalkAction {
    static handle(gameObject: GameObject): ActionResult | undefined {
    }
}
```

de methoden hebben de zelfde naam (handle) in verschillende klassen (ExamineAction en TalkAction) maar hebben ze verschillend gedrag die word vertoond op basis van het type van het gameObject dat wordt doorgegeven. 

## Abstracte classes

Een abstracte klasse is een klasse die niet kan worden geïnstantieerd en die bedoeld is om als basis te dienen voor andere klassen.

```typescript
export abstract class GameObject {
    abstract interact(): void;
}

class Item extends GameObject {
    interact(): void {
    }
}

class Character extends GameObject {
    interact(): void {
    }
}

const item = new Item();
const character = new Character();

item.interact(); 
character.interact(); 
```

In dit voorbeeld is GameObject een abstracte klasse met een abstracte methode interact(). De Item- en Character-klassen erven van GameObject en implementeren de interact()-methode op hun eigen manier. Omdat GameObject abstract is, kan het niet rechtstreeks worden geïnstantieerd, maar het kan als basis dienen voor andere klassen die van hetzelfde type zijn.

## Static functie/variable

Een static variabele en een static functie zijn beide gekoppeld aan de klasse zelf in plaats van aan individuele instanties van die klasse. Dit betekent dat je ze kunt gebruiken zonder een specifiek object van de klasse te hoeven maken.

Statis variabelen: Deze variabelen zijn gedeeld over alle instanties van de klasse. Ze worden gedeclareerd met static en kunnen worden gebruikt door de klasse zelf of door instanties van de klasse.

Statis methoden: Deze methoden zijn gekoppeld aan de klasse zelf en kunnen worden aangeroepen zonder een instantie van de klasse te maken. Ze worden gedeclareerd met static.

```typescript
lass MyClass {
    static staticVariable: number = 10;

    static staticMethod(): void {
        console.log("This is a static method.");
    }

    nonStaticMethod(): void {
        console.log("This is a non-static method.");
    }
}

// Gebruik van statische variabele en methode
console.log(MyClass.staticVariable); // Output: 10
MyClass.staticMethod(); // Output: This is a static method.

// Je kunt geen niet-statische methoden aanroepen zonder een instantie van de klasse te maken
// const instance = new MyClass();
// instance.nonStaticMethod(); // Dit zou werken als je een instantie hebt
```

In dit voorbeeld is staticVariable een statische variabele en staticMethod is een statische methode. Je kunt ze direct vanaf de klasse gebruiken, zonder een instantie van de klasse te maken.

## Interfaces

 interface in TypeScript definieert een contract voor objecten. Het specificeert welke eigenschappen en methoden een object moet hebben, maar het bevat zelf geen implementatie van die eigenschappen en methoden.

 ```typescript

 // Hier maken we gebruik van een interface in playersession.
 export interface PlayerSession {
    currentRoom: string;
    inventory: string[];
    currentHP: number;
    pickedUpFlashlight: boolean;
    //etc
 }

// Hier kijkt hij of hij aan het contract voldoet.
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "introduction",
        pickedUpCode: false,
        inventory: [],
        currentHP: 10,
        pickedUpPocketsquare: false,
        // etc
    }
}
 ```

## Generics

 Generics in TypeScript stellen om flexibele, herbruikbare functies en klassen te maken die met verschillende datatypen kunnen werken.

```typescript
// Generieke functie om een ​​array om te keren
function reverseArray<T>(array: T[]): T[] {
    return array.reverse();
}

// Voorbeeldgebruik
const numbers: number[] = [1, 2, 3, 4, 5];
const reversedNumbers = reverseArray(numbers);
console.log(reversedNumbers); // Output: [5, 4, 3, 2, 1]

const strings: string[] = ["apple", "banana", "orange"];
const reversedStrings = reverseArray(strings);
console.log(reversedStrings); // Output: ["orange", "banana", "apple"]
```

Door array type T te gebruiken kunnen we zowel number en strings omzetten zonder de functie opnieuw hoeven te schrijven voor elk type. Dit maakt code flexibel en herbuikbaar.

## UML

![libraryUML](/docs/pdf/libraryUML.jpg)

