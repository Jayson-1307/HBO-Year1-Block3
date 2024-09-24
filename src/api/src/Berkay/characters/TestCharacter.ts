import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { EntranceRoomKeyItemAlias } from "../items/KeyItem";

export const TestCharacterAlias: string = "Test";
export class TestCharacter extends Character implements Examine {
    public constructor() {
        super(TestCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Test";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You examined Test"]);
    }

    public talk(choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (choiceId === 1) {
            return new TextActionResult(["Test greets you back"]);
        } else if (choiceId === 2) {
            return new TextActionResult(["Test waves you goodbye"]);
        } else if (choiceId === 3) {
            playerSession.inventory = [];
            return new TextActionResult(["Test thanks you for the key"]);
        }

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Greet"),
            new TalkChoiceAction(2, "leave"),
        ];

        if (playerSession.inventory.includes(EntranceRoomKeyItemAlias)) {
            choiceActions.push(new TalkChoiceAction(3, "Give the key"));
        }

        return new TalkActionResult(this, ["You talked to Test"], choiceActions);
    }
}
