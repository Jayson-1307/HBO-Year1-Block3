import { Interact, InteractionActionAlias } from "../actions/interactAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const BlueBookAlias: string = "BlueBook";
export let didExamine: boolean;

export class BlueBookItem extends Item implements Examine, Interact{
    public constructor() {
        super(BlueBookAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    public name(): string {
        return "BlueBook";
    }

    public examine(): ActionResult | undefined {
        didExamine = true;
        return new TextActionResult (["The BlueBook looks like it is has been sitting here for a while."]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!didExamine){
            return new TextActionResult (["First try examine before interact."]);
        }
        if (!playerSession.inventory.includes(BlueBookAlias)) {
            playerSession.inventory.push(BlueBookAlias);
            return new TextActionResult(["You picked up a blue book."]);
        } 
        else {
            return new TextActionResult(["Looks like there is only dust inside..."]);
        }
    }
}