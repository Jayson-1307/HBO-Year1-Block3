import { Consume, ConsumeActionAlias } from "../actions/ConsumeAction";

import { Item } from "../../base/gameObjects/Item";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";

export const FoodItemAlias: string = "food";

export class FoodItem extends Item implements Consume, Examine {
    public constructor() {
        super(FoodItemAlias, ConsumeActionAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Food";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["examine food"]);
    }

    public consume(currentHP: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (currentHP >= 10) {
            return new TextActionResult(["Your health is already at maximum."]);
        }

        const newHP: number = Math.min(currentHP + 2, 10);
        playerSession.currentHP = newHP;

        return new TextActionResult([
            `You consumed the food and restored some health. Your current HP is now ${newHP}.`,
        ]);
    }
}
