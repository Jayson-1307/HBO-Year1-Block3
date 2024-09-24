import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { EasterEggAlias } from "../items/EasterEgg";

export const AlbertCharacterAlias: string = "Albert";

export class AlbertCharacter extends Character implements Examine {
    public constructor() {
        super(AlbertCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Albert";
    }

    public images(): string[] {
        return ["albert"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["its a middle aged man that looks a bit like Albert Einstein."]);
    }

    public talk(choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.currentCharacter = AlbertCharacterAlias;
        playerSession.talkedToAlbert = true;
        if (choiceId === 1) {
            if (!playerSession.pickedUpSucrose) {
                playerSession.currentCharacter = "";
                return new TextActionResult([
                    "You don't have it? What a shame. Maybe you can make it for me by mixing 'pikachurin' and 'Xenoniphage' together in the laboratory?",
                ]);
            } else {
                playerSession.currentCharacter = "";
                playerSession.inventory.push(EasterEggAlias);
                return new TextActionResult(["Oh you got it? Wow thanks! You received an easter egg"]);
            }
        }

        if (choiceId === 2) {
            playerSession.currentCharacter = "";
            return new TextActionResult(["You do not wish to communicate any further."]);
        }

        if (choiceId === 3) {
            playerSession.currentCharacter = "";
            return new TextActionResult(["The xenophage is maybe somewhere on the winebar."]);
        }

        if (!playerSession.talkedToAlbert) {
            return new TalkActionResult(
                this,
                ["Hello!"],
                [
                    new TalkChoiceAction(1, "Do you have the stuff i have been looking for?"),
                    new TalkChoiceAction(2, "Bye!"),
                ]
            );
        } else {
            return new TalkActionResult(
                this,
                ["Hello!"],
                [
                    new TalkChoiceAction(1, "Do you have the stuff i have been looking for?"),
                    new TalkChoiceAction(3, "Where is the xenoniphage?"),
                    new TalkChoiceAction(2, "Bye!"),
                ]
            );
        }
    }
}
