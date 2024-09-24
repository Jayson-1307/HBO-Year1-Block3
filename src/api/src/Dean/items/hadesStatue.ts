import { Interact, InteractionActionAlias } from "../actions/interactAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { HourglassItemAlias } from "./hourglass";

export const HadesStatueAlias: string = "HadesStatue";
export let didExamine: boolean;

export class HadesStatueItem extends Item implements Examine, Interact{
    public constructor() {
        super(HadesStatueAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    public name(): string {
        return "HadesStatue";
    }

    public examine(): ActionResult | undefined {
        didExamine = true;
        return new TextActionResult (["The HadesStatue looks like it has been split in 2... and what is this? a number on the back... i cant see if it is a 6 or 9."]);
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