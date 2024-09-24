import { Consume, ConsumeActionAlias } from "../actions/ConsumeAction";
import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const soupItemAlias: string = "soup";

export class soupItem extends Item implements Examine, Interact, Consume{
public constructor() {
    super(soupItemAlias, ExamineActionAlias, InteractionActionAlias, ConsumeActionAlias);
}
    
public name(): string {
    return "soup";
}

public consume(currentHP: number): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();
    
    if (currentHP >= 10) {
         return new TextActionResult(["Your health is already at maximum."]);
    }
    
    const newHP: number = Math.min(currentHP + 3, 10);
    playerSession.currentHP = newHP;
    
    return new TextActionResult([
        `You consumed the soup and restored some health. Your current HP is now ${newHP}.`,
        ]);
    }


public interact(): ActionResult | undefined {
    return new TextActionResult(["You can gain 3 health from the soup by consuming it."]);
}

public examine(): ActionResult | undefined {
   return new TextActionResult(["some soup in a bowl. It looks delicious."]);
}
}