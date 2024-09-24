import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { BertaCharacter, BertaCharacterAlias } from "./Dean/characters/Berta";
import { ExampleCharacter, ExampleCharacterAlias } from "./Dean/characters/ExampleCharacter";
import { ExampleItem, ExampleItemAlias } from "./Dean/items/ExampleItem";
import { BlueBookAlias, BlueBookItem } from "./Dean/items/blueBook";
import { HadesStatueAlias, HadesStatueItem } from "./Dean/items/hadesStatue";
import { HourGlassItem, HourglassItemAlias } from "./Dean/items/hourglass";
import { LaboratoryKeyItem, LaboratoryKeyItemAlias } from "./Dean/items/key";
import { LadderAlias, LadderItem } from "./Dean/items/ladder";
import { PurpleBookAlias, PurpleBookItem } from "./Dean/items/purpleBook";
import { RedBookAlias, RedBookItem } from "./Dean/items/redBook";
import { Library, LibraryAlias } from "./Dean/rooms/Library";
import { StartupRoom, StartupRoomAlias } from "./Jayson/rooms/StartupRoom";
import { PlayerSession } from "./types";
import { SmokePipeItem, SmokePipeItemAlias } from "./Dean/items/smokePipe";
import { EdwardCharacter, EdwardCharacterAlias } from "./Jayson/characters/EdwardCharacter";
import { CouchObject, CouchObjectAlias } from "./Jayson/items/Objects/CouchObject";
import { FlashlightItem, FlaslightItemAlias } from "./Jayson/items/roomItems/FlashlightItem";
import { FlowerpotObject, FlowerpotObjectAlias } from "./Jayson/items/Objects/FlowerpotObject";
import { PaintingObject, PaintingObjectAlias } from "./Jayson/items/Objects/PaintingObject";
import { PocketsquareItem, PocketsquareItemAlias } from "./Jayson/items/roomItems/PocketsquareItem";
import { EntranceRoom, entranceRoomAlias } from "./Jayson/rooms/Entrance-room";
import { CarpetObject, CarpetObjectAlias } from "./Jayson/items/Objects/CarpetObject";
import { KnifeItem, KnifeItemAlias } from "./Jayson/items/roomItems/KnifeItem";
import { DiningRoomKeyItem, DiningRoomKeyItemAlias } from "./Jayson/items/roomItems/DiningRoomKeyItem";
import { DrKurtCharacter, DrKurtCharacterAlias } from "./Berkay/characters/DrKurtCharacter";
import { TestCharacter, TestCharacterAlias } from "./Berkay/characters/TestCharacter";
import { CabinetItem, CabinetItemAlias } from "./Berkay/items/CabinetItem";
import { CodeItem, CodeItemAlias } from "./Berkay/items/CodeItem";
import { FlaskItem, FlaskItemAlias } from "./Berkay/items/FlaskItem";
import { FoodItem, FoodItemAlias } from "./Berkay/items/FoodItem";
import { MicroscopeItem, MicroscopeItemAlias } from "./Berkay/items/MicrosopeItem";
import { MixerItem, MixerItemAlias } from "./Berkay/items/MixerItem";
import { Diningroom, DiningroomAlias } from "./Aydin/rooms/diningRoom";
import { breadItem, breadItemAlias } from "./Aydin/items/breadItem";
import { chandelierItem, chandelierItemAlias } from "./Aydin/items/chandelier";
import { ovenItem, ovenItemAlias } from "./Aydin/items/ovenItem";
import { soupItem, soupItemAlias } from "./Aydin/items/soupItem";
import { cutleryItem, cutleryItemAlias } from "./Aydin/items/cutleryItem";
import { OlgaCharacter, OlgaCharacterAlias } from "./Aydin/characters/OlgaCharacter";
import { KevinCharacter, KevinCharacterAlias } from "./Aydin/characters/KevinCharacter";
import { LibraryKeyItem, LibraryKeyItemAlias } from "./Aydin/items/keyItem";
import { getRoomByAlias as getRoomByAliasBerkay } from "./Berkay/instances";
import { EntranceRoomKeyItem, EntranceRoomKeyItemAlias } from "./Berkay/items/KeyItem";
import {
    FirstCodeFragmentItem,
    FirstCodeFragmentItemAlias,
} from "./Jayson/items/roomItems/FirstCodeFragmentItem";
import { ResearchTableItem, ResearchTableItemAlias } from "./Berkay/items/ResearchTableItem";
import { AlbertCharacter, AlbertCharacterAlias } from "./Aydin/characters/AlbertCharacter";
import { XenoniphageFlaskItem, XenoniphageFlaskItemAlias } from "./Aydin/items/XenoniphageItem";
import { SucroseFlaskItem, SucroseFlaskItemAlias } from "./Berkay/items/SucroseFlaskItem";
import { diningTableItem, diningTableItemAlias } from "./Aydin/items/diningTableItem";
import { wineBarItem, wineBarItemAlias } from "./Aydin/items/wineBarItem";
import { portraitItem, portraitItemAlias } from "./Aydin/items/portraitItem";
import { VaultObject, VaultObjectAlias } from "./Jayson/items/Objects/VaultObject";
import { secondCodeFragment, secondCodeFragmentAlias } from "./Aydin/items/secondCodeFragment";
import { VaultRoom, vaultRoomAlias } from "./Jayson/rooms/Vault-room";
import { ThirdCodeFragmentItem, thirdCodeFragmentItemAlias } from "./Dean/items/thirdCodeFragment";
import { completeCodeItem, completeCodeItemAlias } from "./Jayson/items/roomItems/completeCodeItem";
import { EasterEgg, EasterEggAlias } from "./Aydin/items/EasterEgg";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        // general
        currentRoom: "introduction",
        currentCharacter: "",
        inventory: [],
        currentHP: 10,
        isAlive: true,

        // room specific
        pickedUpPocketsquare: false,
        pickedUpFlashlight: false,
        pickedUpKnife: false,
        completedEdwardsRiddle: false,
        pickedUpFlaskOpener: false,
        pickedUpFlask: false,
        pickedUpcutlery: false,
        pickedUpbread: false,
        pickedUpWelshite: false,
        pickedUpPikachurin: false,
        pickedUpMispickel: false,
        interactedFlask: false,
        interactedMixer: false,
        mixerWrong: 0,
        talkedToAlbert: false,
        pickedUpXenoniphage: false,
        pickedUpSucrose: false,
        pickedUpSoup: false,

        // Keys
        pickedUpDiningRoomKey: false,
        pickedUpLibraryKey: false,
        pickedUpLaboratoryKey: false,
        pickedUpEntranceKey: false,

        // Codes
        firstCodeFragment: false,
        secondCodeFragment: false,
        thirdCodeFragment: false,
        pickedUpFourthCodeFragment: false,
        collectedAllCodeFragments: false,

        // game ending
        vaultOpened: false,
        pickedUpFolder: false,
        folderInteractions: 0,
        suicide: false,
        turnedIn: false,
    };
}

export function increaseHP(amount: number): void {
    const playerSession: PlayerSession = getPlayerSession();
    playerSession.currentHP += amount;
    if (playerSession.currentHP >= 10) {
        playerSession.currentHP = 10;
    }
}

export function decreaseHP(amount: number): boolean {
    const playerSession: PlayerSession = getPlayerSession();
    if (playerSession.currentHP > 0) {
        playerSession.currentHP -= amount;
    }
    if (playerSession.currentHP <= 0) {
        console.log("die");
        playerSession.isAlive = false;
        return false;
    }
    return true;
}

// export function returnHpAmount(): any {
//     const playerSession: PlayerSession = getPlayerSession();
//     const currentHP: any = playerSession.currentHP;
//     const hpOutput: any = document.getElementById("hpAmount");

//     if (hpOutput) {
//         hpOutput.textContent = currentHP;
//     }

//     return playerSession.currentHP;
// }

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    const room: Room | undefined = getRoomByAliasBerkay(alias);

    if (room) {
        return room;
    }

    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();
        case LibraryAlias:
            return new Library();
        case entranceRoomAlias:
            return new EntranceRoom();
        case DiningroomAlias:
            return new Diningroom();
        case vaultRoomAlias:
            return new VaultRoom();
    }

    return undefined;
}

/**
 * Function to combine all code fragments into one item
 */
export function combineCodeFragments(): any {
    const playerSession: PlayerSession = getPlayerSession();
    if (
        getPlayerSession().firstCodeFragment &&
        getPlayerSession().secondCodeFragment &&
        getPlayerSession().thirdCodeFragment &&
        getPlayerSession().pickedUpFourthCodeFragment
    ) {
        const firstCodeIndex: number = playerSession.inventory.indexOf(FirstCodeFragmentItemAlias);
        const secondCodeIndex: number = playerSession.inventory.indexOf(secondCodeFragmentAlias);
        const thirdCodeIndex: number = playerSession.inventory.indexOf(thirdCodeFragmentItemAlias);
        const fourthCodeIndex: number = playerSession.inventory.indexOf(CodeItemAlias);
        delete playerSession.inventory[firstCodeIndex];
        delete playerSession.inventory[secondCodeIndex];
        delete playerSession.inventory[thirdCodeIndex];
        delete playerSession.inventory[fourthCodeIndex];

        playerSession.collectedAllCodeFragments = true;
        playerSession.inventory.push(completeCodeItemAlias);
    }
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
export function getGameObjectByAlias(alias: string): GameObject | undefined {
    switch (alias) {
        // Items
        case ExampleItemAlias:
            return new ExampleItem();

        case BlueBookAlias:
            return new BlueBookItem();

        case RedBookAlias:
            return new RedBookItem();

        case PurpleBookAlias:
            return new PurpleBookItem();

        case HadesStatueAlias:
            return new HadesStatueItem();

        case LadderAlias:
            return new LadderItem();

        case HourglassItemAlias:
            return new HourGlassItem();

        case SmokePipeItemAlias:
            return new SmokePipeItem();

        case EasterEggAlias:
            return new EasterEgg();

        case VaultObjectAlias:
            return new VaultObject();

        case FlaslightItemAlias:
            return new FlashlightItem();

        case CouchObjectAlias:
            return new CouchObject();

        case PaintingObjectAlias:
            return new PaintingObject();

        case PocketsquareItemAlias:
            return new PocketsquareItem();

        case FlowerpotObjectAlias:
            return new FlowerpotObject();

        case CabinetItemAlias:
            return new CabinetItem();

        case FlaskItemAlias:
            return new FlaskItem();

        case MicroscopeItemAlias:
            return new MicroscopeItem();

        case SucroseFlaskItemAlias:
            return new SucroseFlaskItem();

        case MixerItemAlias:
            return new MixerItem();

        case CarpetObjectAlias:
            return new CarpetObject();

        case KnifeItemAlias:
            return new KnifeItem();
        
        case VaultObjectAlias:
            return new VaultObject();

        case FoodItemAlias:
            return new FoodItem();

        case breadItemAlias:
            return new breadItem();

        case portraitItemAlias:
            return new portraitItem();

        case chandelierItemAlias:
            return new chandelierItem();

        case ovenItemAlias:
            return new ovenItem();

        case wineBarItemAlias:
            return new wineBarItem();

        case soupItemAlias:
            return new soupItem();

        case diningTableItemAlias:
            return new diningTableItem();

        case cutleryItemAlias:
            return new cutleryItem();
        case ResearchTableItemAlias:
            return new ResearchTableItem();

        case XenoniphageFlaskItemAlias:
            return new XenoniphageFlaskItem();

        // Characters.
        case ExampleCharacterAlias:
            return new ExampleCharacter();

        case EdwardCharacterAlias:
            return new EdwardCharacter();

        case OlgaCharacterAlias:
            return new OlgaCharacter();

        case KevinCharacterAlias:
            return new KevinCharacter();

        case BertaCharacterAlias:
            return new BertaCharacter();

        case DrKurtCharacterAlias:
            return new DrKurtCharacter();

        case TestCharacterAlias:
            return new TestCharacter();

        case AlbertCharacterAlias:
            return new AlbertCharacter();

        // Keys:
        case LibraryKeyItemAlias:
            return new LibraryKeyItem();

        case DiningRoomKeyItemAlias:
            return new DiningRoomKeyItem();

        case LaboratoryKeyItemAlias:
            return new LaboratoryKeyItem();

        case EntranceRoomKeyItemAlias:
            return new EntranceRoomKeyItem();

        // Code Fragments:
        case FirstCodeFragmentItemAlias:
            return new FirstCodeFragmentItem();

        case secondCodeFragmentAlias:
            return new secondCodeFragment();

        case thirdCodeFragmentItemAlias:
            return new ThirdCodeFragmentItem();

        case CodeItemAlias:
            return new CodeItem();

        case completeCodeItemAlias:
            return new completeCodeItem();

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);
}
