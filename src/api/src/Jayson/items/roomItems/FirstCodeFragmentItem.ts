import { InteractionActionAlias } from "../../../Aydin/actions/InteractAction";
import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { getPlayerSession } from "../../../instances";
import { PlayerSession } from "../../../types";
import { Interact } from "../../actions/InteractAction";
import { entranceRoomAlias } from "../../rooms/Entrance-room";

export const FirstCodeFragmentItemAlias: string = "first-code-fragment";

export class FirstCodeFragmentItem extends Item implements Examine, Interact {
    public constructor() { 
        super(FirstCodeFragmentItemAlias, InteractionActionAlias, ExamineActionAlias);
    }

    public name(): string {
        return "8";
    }
    
    public examine(): ActionResult | undefined {
        const playersession: PlayerSession = getPlayerSession();
        if (playersession.currentRoom === entranceRoomAlias) {
            return new TextActionResult(["A part of the code needed to open. If I remember correctly, I found this one in this room. It is the number '8'."]);
        }
        return new TextActionResult(["A part of the code needed to open. If I remember correctly, I found this one in the entrance room. It is the number '8'."]);
    }
    
    public interact(): ActionResult | undefined {
        throw new Error("Method not implemented.");
    }
}