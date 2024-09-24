import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { PlayerSession } from "../../types";
import { decreaseHP, getPlayerSession } from "../../instances";

export const ovenItemAlias: string = "oven";
let examined: boolean = false;
export class ovenItem extends Item implements Examine, Interact {
    public constructor() {
        super(ovenItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Oven";
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        decreaseHP(2);
        const currentHP: number = playerSession.currentHP;

        if (playerSession.isAlive) {
            if (examined) {
                if (!playerSession.pickedUpbread) {
                    playerSession.pickedUpbread = true;
                    playerSession.inventory.push("bread");
                    return new TextActionResult([
                        `You took 2 damage from the heat. Your current HP is now ${currentHP}`,
                        "You picked up the bread.",
                    ]);
                }
                return new TextActionResult([
                    "You took 2 damage from the heat.",
                    `Your current HP is now ${currentHP}.`,
                ]);
            }
            return new TextActionResult(["Maybe you should examine it first."]);
        }

        return new TextActionResult(["You died"]);
    }

    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult([
            "In the cavernous kitchen, a black enamel aga stove gleams, its chrome handles reflecting the warmth of the roaring fire within.",
            "The oven is open and two loafs of bread is baking inside.",
        ]);
    }
}
