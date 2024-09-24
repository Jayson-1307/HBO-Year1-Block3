import { Interact, InteractionActionAlias } from "../actions/interactAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const LadderAlias: string = "Ladder";
export let PickedUpLadder: boolean;
export let didExamine: boolean;

export class LadderItem extends Item implements Examine, Interact{
    public constructor() {
        super(LadderAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    public name(): string {
        return "Ladder";
    }

    public examine(): ActionResult | undefined {
        didExamine = true;
        return new TextActionResult (["Hmm a ladder wonder where it could take me..."]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!didExamine){
            return new TextActionResult (["First try examine before interact."]);
        }
        if (!playerSession.inventory.includes(LadderAlias)) {
        playerSession.inventory.push(LadderAlias);
        PickedUpLadder = true;
        return new TextActionResult(["U found a ladder this could be usefull to find books on the top shelf maybe?"]);
        }  
        return undefined;
    }
}