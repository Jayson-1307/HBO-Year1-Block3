import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";
import { XenoniphageFlaskItemAlias } from "./XenoniphageItem";

export const wineBarItemAlias: string = "wine-bar";
let examined: boolean = false;
export class wineBarItem extends Item implements Examine, Interact {
    public constructor() {
        super(wineBarItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Wine Bar";
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (examined) {
            if (!playerSession.pickedUpXenoniphage) {
                playerSession.pickedUpXenoniphage = true;
                playerSession.inventory.push(XenoniphageFlaskItemAlias);

                return new TextActionResult(["You pickup the flasked filled with xenonipgahe."]);
            } else {
                return new TextActionResult(["You already have the flasked filled with xenonipgahe."]);
            }
        }
        return new TextActionResult(["Maybe you should examine it first."]);
    }

    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult([
            "A bar with a variety of wines.",
            "I wonder if I can pour myself a glass.",
            "There is a flask with something written on it.",
        ]);
    }
}
