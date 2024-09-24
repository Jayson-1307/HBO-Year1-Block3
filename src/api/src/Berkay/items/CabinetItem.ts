import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { EntranceRoomKeyItemAlias } from "./KeyItem";

export const CabinetItemAlias: string = "cabinet";

let examined: boolean = false; 

export class CabinetItem extends Item implements Examine, Interact {
    public constructor() {
        super(CabinetItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Cabinet";
    }

    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult([
            " The weathered cabinet stands sturdy, its wood aged but rich with history. Brass handles gleam faintly against the patina of time.",
        ]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (examined) {
            if (!playerSession.pickedUpEntranceKey) {
                playerSession.inventory.push(EntranceRoomKeyItemAlias);
                playerSession.pickedUpEntranceKey = true;
                return new TextActionResult([
                    "You looked in the old cabinet and found a key. It's in a surprisingly good state.",
                ]);
            } else {
                return new TextActionResult(["The key you found was the only thing worth mentioning in here."]);
            }
        }
        return new TextActionResult(["You should examine the cabinet first to know if it's safe."]);
    }}
