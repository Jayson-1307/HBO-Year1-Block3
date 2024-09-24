import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { OlgaCharacterAlias } from "../characters/OlgaCharacter";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interact, InteractionActionAlias } from "../actions/InteractAction";

export const LibraryKeyItemAlias: string = "library-key";

export class LibraryKeyItem extends Item implements Examine, Interact {
public constructor() {
    super(LibraryKeyItemAlias, ExamineActionAlias, InteractionActionAlias);
}

    
public name(): string {
    return "Key";
}

public examine(): ActionResult | undefined {
   return new TextActionResult([
    "A mysterious Key?.", 
    "I wonder where I can use this.", 
    "Maybe i can ask Olga or Kevin about it."]);
}

public interact(): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();
  
    if (!playerSession.pickedUpLibraryKey) {
      playerSession.pickedUpLibraryKey = true;
  
      // Replace "characterName" with the actual character name
      return new TextActionResult([`You received a key from ${OlgaCharacterAlias}.`]);
    } else {
      return new TextActionResult(["You already have the key.", "You might be able to do something with it."]);
    }
  }
}