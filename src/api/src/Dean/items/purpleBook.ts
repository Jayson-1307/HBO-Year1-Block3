import { Interact, InteractionActionAlias } from "../actions/interactAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const PurpleBookAlias: string = "Purplebook";
export let didExamine: boolean;

export class PurpleBookItem extends Item implements Examine, Interact{
    public constructor() {
        super(PurpleBookAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    public name(): string {
        return "Purplebook";
    }

    public examine(): ActionResult | undefined {
        didExamine = true;
        return new TextActionResult (["The Purplebook looks like there is some information in there."]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!didExamine){
            return new TextActionResult (["First try examine before interact."]);
        }

        if (!playerSession.inventory.includes(PurpleBookAlias)) {
            playerSession.inventory.push(PurpleBookAlias);
            return new TextActionResult(["You picked up a purple book... `reading` In this book there is something about the god Hades and that there is a killer also called Hades?."]);
        } 
        else {
            return new TextActionResult(["Looks like there is only dust inside..."]);
        }
    }
}