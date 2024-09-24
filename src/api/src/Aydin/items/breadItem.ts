import { Consume, ConsumeActionAlias } from "../actions/ConsumeAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const breadItemAlias: string = "bread";

export class breadItem extends Item implements Examine, Consume {
public constructor() {
    super(breadItemAlias, ExamineActionAlias, ConsumeActionAlias);
}
    
public consume(currentHP: number): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();

    if (currentHP >= 10) {
        return new TextActionResult(["Your health is already at maximum."]);
    }

    const newHP: number = Math.min(currentHP + 2, 10);
    playerSession.currentHP = newHP;

    return new TextActionResult([
        `You consumed the bread and restored some health. Your current HP is now ${newHP}.`,
    ]);
}

public name(): string {
    return "Bread";
}

public examine(): ActionResult | undefined {
   return new TextActionResult(["A loaf of bread", 
   "You can gain 2 health by consuming it."]);
}

public interact(): ActionResult | undefined {

        return new TextActionResult(["A piece of bread that is soft and warm to the touch. It looks delicious."]);
    }
}