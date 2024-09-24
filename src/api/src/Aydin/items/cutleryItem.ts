import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const cutleryItemAlias: string = "cutlery";

export class cutleryItem extends Item implements Examine, Interact {
public constructor() {
    super(cutleryItemAlias, ExamineActionAlias, InteractionActionAlias);
}
       
public name(): string {
    return "Cutlery";
}

public examine(): ActionResult | undefined {
   return new TextActionResult(["A piece of cutlery, I wonder what it is used for.", "Hmmm, I think I can use this to eat the soup."]);
}

public interact(): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();

    if (!playerSession.pickedUpcutlery) {
        playerSession.pickedUpcutlery = true;
        playerSession.inventory.push(cutleryItemAlias);

        return new TextActionResult(["You pickup the cutlery."]);
    }

    else  {
        return new TextActionResult(["You already have the cutlery."]);
        }        
    }
}