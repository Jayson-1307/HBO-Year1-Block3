import { Interact, InteractionActionAlias } from "../actions/interactAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { LaboratoryKeyItemAlias } from "./key";
import { PickedUpLadder } from "./ladder";

export const RedBookAlias: string = "RedBook";

export class RedBookItem extends Item implements Examine, Interact{
    public constructor() {
        super(RedBookAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    public name(): string {
        return "RedBook";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult (["The RedBook looks like it could be used for someone?"]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (PickedUpLadder){
            if (!playerSession.inventory.includes(RedBookAlias)) {
                playerSession.inventory.push(RedBookAlias);
                return new TextActionResult(["You picked up a red book, when i picked it up i heard some rumbling in the book..."]);
            } 
            else (!playerSession.inventory.includes(LaboratoryKeyItemAlias)); {
                playerSession.inventory.push(LaboratoryKeyItemAlias);
                playerSession.pickedUpLaboratoryKey = true;
                return new TextActionResult(["You picked up an old rusty key..."]);
            }
        }
        return undefined;
    }
}