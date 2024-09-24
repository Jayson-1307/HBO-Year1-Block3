import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";
import { soupItemAlias } from "./soupItem";

export const diningTableItemAlias: string = "dining-table";
let examined: boolean = false;
export class diningTableItem extends Item implements Examine, Interact {
    public constructor() {
        super(diningTableItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Dining Table";
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (examined) {
            if (!playerSession.pickedUpSoup) {
                playerSession.pickedUpSoup = true;
                playerSession.inventory.push(soupItemAlias);

                return new TextActionResult(["You picked up a bowl of soup."]);
            } else {
                return new TextActionResult(["You already have picked up a bowl of soup."]);
            }
        }
        return new TextActionResult(["Maybe you should examine it first."]);
    }

    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult(["It's a diningtable that is as old as Washington."]);
    }
}
