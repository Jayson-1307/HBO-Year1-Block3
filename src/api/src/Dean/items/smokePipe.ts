import { Interact, InteractionActionAlias } from "../actions/interactAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { decreaseHP, getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Consume, ConsumeActionAlias } from "../actions/consumeAction";

export const SmokePipeItemAlias: string = "SmokePipe";
export let didExamine: boolean;
export let didInteract: boolean;

export class SmokePipeItem extends Item implements Examine, Interact, Consume{
    public constructor() {
        super(SmokePipeItemAlias, ExamineActionAlias, InteractionActionAlias, ConsumeActionAlias);
    }
    public consume(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const alive: boolean = decreaseHP(2);
        if (!playerSession.inventory.includes(SmokePipeItemAlias)) {
            return new TextActionResult(["Try to pick up the pipe first. "]);
        }
        else {
            if (alive){
                return new TextActionResult(["You take a puff from the SmokePipe... u took 2 damage."]);
            }
            else {
                return new TextActionResult(["You just died"]);
            } 
        }
    }
    
    
    public name(): string {
        return "SmokePipe";
    }

    public examine(): ActionResult | undefined {
        didExamine = true;
        return new TextActionResult (["This SmokePipe looks like there is some tabacco inside should i smoke it?"]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!didExamine){
            return new TextActionResult (["First try examine before interact."]);
        }
        if (!playerSession.inventory.includes(SmokePipeItemAlias)) {
            playerSession.inventory.push(SmokePipeItemAlias);
            return new TextActionResult(["You picked up an SmokePipe."]);
        }
        else {
            return new TextActionResult(["You want to smoke that bad huh? try consume maybe."]);
        }
    }
}