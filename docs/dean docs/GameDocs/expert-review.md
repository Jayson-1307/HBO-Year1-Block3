# Documentatie Learning Stories
## Beschrijf per Learning Story: Als student wil ik leren hoe ik de OO-principes abstraction, encapsulation en inheritance toepas in mijn code.
 
#### Wat heb je geleerd?
Beschrijf kort de belangrijkste dingen die je beheerst op het gebied van de learning story.

ik heb geleerd wat de OO-principes abstraction, encapsulation en inheritance zijn en hoe ik deze kan toepassen in mijn code, abstraction houdt in dat je de complexiteit van een object verbergt en alleen de benodigde informatie laat zien, encapsulation houdt in dat je de data van een object verbergt en alleen toegankelijk maakt via de methodes van het object, inheritance houdt in dat je een nieuwe klasse kan maken die de eigenschappen van een bestaande klasse overneemt. ik heb dit allemaal toegepast in mijn code. abstraction heb ik toegepast bij mijn examine functie, encapsulation heb ik toegepast bij mijn TextActionResult van mijn characters, inheratance heb ik toegepast bij de characters die ik heb gemaakt voor het spel.

#### geef code snippets/modellen/ontwerpdocumenten van je beste voorbeeld
```typescript
abstraction 

/**
 * Constant alias for the character name "Olga".
 */
export const OlgaCharacterAlias: string = "olga";

// Interface defining a character with conversation capabilities
/**
 * Interface representing a character that can engage in conversations.
 */
interface Conversational {
  /**
   * Method to initiate a conversation with the character.
   * 
   * @param {number | undefined} choiceId (Optional) An identifier for a specific conversation choice the player makes.
   * @returns {ActionResult | undefined} (Optional) An object containing the conversation outcome and available choices for the player.
   */
  talk(choiceId?: number | undefined): ActionResult | undefined;
}

/**
 * Class representing the Olga character, extending the base Character class and implementing the Examine and Conversational interfaces.
 */
export class OlgaCharacter extends Character implements Examine, Conversational {

  public constructor() {
    super(OlgaCharacterAlias);
  }

  // ... existing implementation for examine()

  /**
   * Method to handle conversation with Olga.
   * 
   * @param {number | undefined} choiceId (Optional) An identifier for a specific conversation choice the player makes.
   * @returns {TalkActionResult | undefined} (Optional) An object containing the conversation outcome, available choices, and potentially more information depending on the implementation.
   */
  public talk(choiceId?: number | undefined): TalkActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();

    // ... conversation logic based on choiceId

    const choiceActions: TalkChoiceAction[] = [
      new TalkChoiceAction(1, "Can you help me with something?"),
      new TalkChoiceAction(2, "How old are you?")
    ];

    if (playerSession.inventory.includes(cutleryItemAlias)) {
      choiceActions.push(new TalkChoiceAction(3, "give the cutlery to Olga"));
    }

    return new TalkActionResult(this, ["Hello, I am Olga. I am the cook here at Blackwood Manor."], choiceActions);
  }
}


```

```typescript
encapsulation

export class OlgaCharacter extends Character implements Examine {

  public constructor() {
    super(OlgaCharacterAlias);
  }

  /**
   * Method to handle conversation with Olga.
   * 
   * @param {number | undefined} choiceId (Optional) An identifier for a specific conversation choice the player makes.
   *   Used to determine the conversation flow based on the player's selection.
   * @returns {ActionResult | undefined} (Optional) An object containing the conversation outcome, available choices, and potentially more information depending on the implementation.
   *   If no conversation logic applies to the provided choiceId, the method might return undefined.
   */
  public talk(choiceId?: number | undefined): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();

    // ... conversation logic based on choiceId

    const choiceActions: TalkChoiceAction[] = [
      new TalkChoiceAction(1, "Can you help me with something?"),
      new TalkChoiceAction(2, "How old are you?")
    ];

    if (playerSession.inventory.includes(cutleryItemAlias)) {
      choiceActions.push(new TalkChoiceAction(3, "give the cutlery to Olga"));
    }

    return new TalkActionResult(this, ["Hello, I am Olga. I am the cook here at Blackwood Manor."], choiceActions);
  }
}


```

```typescript
inheritance

export class OlgaCharacter extends Character implements Examine {

  /**
   * Constructor for the OlgaCharacter class.
   * 
   * Inherits from the base Character class and implements the Examine interface.
   * 
   */
  public constructor() {
    super(OlgaCharacterAlias);
  }
}


```

#### Hoe en waar heb je de learning story toegepast in jullie project?

ik heb de learning story toegepast in bijvoorbeeld de characters die ik heb gemaakt voor het spel. zoals je ziet hierboven heb ik de abstraction, encapsulation en inheritance toegepast in de code van de characters.

#### geef aan in welke user story/stories je het hebt toegepast

- [Als game developer wil ik dat de karakters in de kamer een riddles geeft en de andere commentaar.](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/seezoopuuqii86/-/issues/46)

#### geef uitleg waarvoor precies je de learning story hebt toegepast in je code/model

In dit project moest gebruikt gemaakt worden van OOP, ik heb dit toegepast bij characters en Items en bij het maken van mijn room. ( zie hiervoor code)

 
#### Hoe heb je de learning story geleerd?

ik heb dit onder de knie gekregen door middel van een tutorial video op youtube. 

Fonteijn, L (28-02-2024) Een room toevoegen. [video](https://www.youtube.com/watch?v=JJNVuOKvl04&list=PLvltGXy557e5f9x7XoWDbfsRp6zTjJjBU&index=4).
geraadpleegd op 04-03-2024 dit heeft mij geholpen om De OO-principes abstraction, encapsulation en inheritance toe te passen in mijn code.

licht toe hoe je e.e.a. onder de knie hebt gekregen (workshops, courses, websites, uitleg van studenten/docenten etc.)
verwijs naar websites volgens APA en zorg dat de link hierin werkt









# Documentatie Learning Stories
## Beschrijf per Learning Story: Als student wil ik leren hoe ik static functies en variabelen gebruik in mijn code
 
#### Wat heb je geleerd?

ik heb geleerd dat het de waarde bewaart van de functie waarin het is gedeclareerd. in Typescript heeft elke variabele een eigen instance.



#### geef code snippets/modellen/ontwerpdocumenten van je beste voorbeeld
```typescript
Static

/**
 * Handles interaction with a game object based on its implemented interfaces.
 * 
 * @param {GameObject} gameObject The game object to interact with.
 * @returns {ActionResult | undefined} An object containing the outcome of the interaction, or undefined if the gameObject doesn't implement a relevant interface.
 */
public static handle(gameObject: GameObject): ActionResult | undefined {
  if (implementsInterface(gameObject, ExamineActionAlias)) {
    return castTo<Examine>(gameObject).examine();
  }

  return undefined; // No relevant interface found
}

```



#### Hoe en waar heb je de learning story toegepast in jullie project?

Ik heb de learning story toegepast voor de examine functie van de objecten in de kamer die je kan onderzoeken. zoals je ziet hierboven heb ik de static functie toegepast in de code van de examine functie. 

#### geef aan in welke user story/stories je het hebt toegepast



#### geef uitleg waarvoor precies je de learning story hebt toegepast in je code/model

ik heb static gebruikt zodat de variabele altijd hetzelfde blijft en niet veranderd kan worden. En zodat ze altijd zichtbaar zijn.

 
#### Hoe heb je de learning story geleerd?

ik heb dit onder de knie gekregen door middel van een tutorial video op youtube. 

Fonteijn, L (28-02-2024) Een Character toevoegen. [video](https://www.youtube.com/watch?v=agJ5CDDsHEc&list=PLvltGXy557e5f9x7XoWDbfsRp6zTjJjBU&index=6).
geraadpleegd op 04-03-2024 dit heeft mij geholpen om De OO-principes polymorfisme toe te passen in mijn code.

licht toe hoe je e.e.a. onder de knie hebt gekregen (workshops, courses, websites, uitleg van studenten/docenten etc.)
verwijs naar websites volgens APA en zorg dat de link hierin werkt









# Documentatie Learning Stories
## Beschrijf per Learning Story: Als student wil ik leren hoe ik het OO-principe polymorfisme toepas in mijn code
 
#### Wat heb je geleerd?

ik weet dat polymorfisme wordt bereikt door het implementeren van interfaces en het gebruik van abstracte methoden. Bijvoorbeeld, de Examine interface stelt een contract op voor objecten die deze implementeren om een examine() methode te hebben. Dit betekent dat elk object dat de Examine interface implementeert, een examine() methode moet hebben. ik heb dit toegepast in mijn code.



#### geef code snippets/modellen/ontwerpdocumenten van je beste voorbeeld
```typescript
polymorfisme

export class CutleryItem extends Item implements Examine, Pickup {

  /**
   * Constructor for the CutleryItem class.
   * 
   * Inherits from the base Item class and implements the Examine and Pickup interfaces.
   * 
   * @param {string} alias (Optional) Unique identifier for the cutlery item within the game.
   *   Defaults to the value of the `cutleryItemAlias` constant (assumed to be defined elsewhere).
   * @param {string} examineActionAlias (Optional) Unique identifier for the examine action associated with the cutlery item.
   *   Defaults to the value of the `ExamineActionAlias` constant (assumed to be defined elsewhere).
   * @param {string} pickupActionAlias (Optional) Unique identifier for the pickup action associated with the cutlery item.
   *   Defaults to the value of the `PickupActionAlias` constant (assumed to be defined elsewhere).
   */
  public constructor(
    alias: string = cutleryItemAlias,
    examineActionAlias: string = ExamineActionAlias,
    pickupActionAlias: string = PickupActionAlias,
  ) {
    super(alias, examineActionAlias, pickupActionAlias);
  }

  /**
   * Returns the display name of the cutlery item.
   * 
   * @returns {string} The name of the cutlery item, in this case "Cutlery".
   */
  public name(): string {
    return "Cutlery";
  }

  /**
   * Provides a description of the cutlery item when examined.
   * 
   * @returns {TextActionResult | undefined} An object containing text descriptions for examining the cutlery item.
   *   The first description is a general observation, and the second suggests a potential use.
   */
  public examine(): TextActionResult | undefined {
    return new TextActionResult([
      "A piece of cutlery, I wonder what it is used for.",
      "Hmmm, I think I can use this to eat the soup.",
    ]);
  }
}

```



#### Hoe en waar heb je de learning story toegepast in jullie project?

ik heb de learning story toegepast in bijvoorbeeld de items die ik heb gemaakt voor het spel. zoals je ziet hierboven heb ik de polymorfisme toegepast in de code van de items. Elke Item kan je examine en sommige kan je opppaken 

#### geef aan in welke user story/stories je het hebt toegepast

- [Als game developer wil ik items toevoegen aan mijn kamer, zodat je dingen kan doen in de dining room.](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/seezoopuuqii86/-/issues/47)

#### geef uitleg waarvoor precies je de learning story hebt toegepast in je code/model

In dit project moest gebruikt gemaakt worden van OOP, ik heb dit toegepast bij characters en Items en bij het maken van mijn room. ( zie hiervoor code)

 
#### Hoe heb je de learning story geleerd?

ik heb dit onder de knie gekregen door middel van een tutorial video op youtube. 

Fonteijn, L (28-02-2024) Een Item toevoegen. 
[video](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/2023-2024/out-d-se-gd/blok-3/seezoopuuqii86/-/issues/47).
geraadpleegd op 04-03-2024 dit heeft mij geholpen om De OO-principes polymorfisme toe te passen in mijn code.

licht toe hoe je e.e.a. onder de knie hebt gekregen (workshops, courses, websites, uitleg van studenten/docenten etc.)
verwijs naar websites volgens APA en zorg dat de link hierin werkt






