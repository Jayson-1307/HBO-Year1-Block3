import { Interact, InteractionActionAlias } from "../actions/interactAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const HourglassItemAlias: string = "Hourglass";
export let didExamine: boolean;

export class HourGlassItem extends Item implements Examine, Interact{
    public constructor() {
        super(HourglassItemAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    public name(): string {
        return "Hourglass";
    }

    public examine(): ActionResult | undefined {
        didExamine = true;
        return new TextActionResult (["The Hourglass looks like it could be used for someone?"]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!didExamine){
            return new TextActionResult (["First try examine before interact."]);
        }
        if (!playerSession.inventory.includes(HourglassItemAlias)) {
            playerSession.inventory.push(HourglassItemAlias);
            return new TextActionResult(["You picked up an hourglass."]);
        } 
        else {
            return new TextActionResult(["You already got this item"]);
        }
    }
}