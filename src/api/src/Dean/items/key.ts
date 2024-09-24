import { Interact, InteractionActionAlias } from "../actions/interactAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const LaboratoryKeyItemAlias: string = "laboratory-Key";

export class LaboratoryKeyItem extends Item implements Examine, Interact{
    public constructor() {
        super(LaboratoryKeyItemAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    public name(): string {
        return "Key";
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult (["The key looks like it could be used on a door..."]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(LaboratoryKeyItemAlias)) {
        playerSession.inventory.push(LaboratoryKeyItemAlias);
        playerSession.pickedUpLaboratoryKey;
        return new TextActionResult(["You picked up an old rusty key."]);
        }  
        return undefined;
    }
}