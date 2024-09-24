import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { LibraryKeyItemAlias } from "../items/keyItem";

export const OlgaCharacterAlias: string = "olga";
export class OlgaCharacter extends Character implements Examine {
    public constructor() {
        super(OlgaCharacterAlias, ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Olga with her sharp cheekbones and piercing green eyes, exudes an air of quiet strength. Her dark hair is pulled back in a practical bun, revealing a face that has seen its share of life's challenges. Lines etch around her eyes, hinting at a wry smile that can disarm or surprise.",
        ]);
    }

    public images(): string[] {
        return ["olga"];
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.currentCharacter = OlgaCharacterAlias;
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                ["What do you need help with?"],
                [
                    new TalkChoiceAction(2, "I need to get to the next room"),
                    new TalkChoiceAction(3, "How old are you?, 60, 70 or 80?"),
                ]
            );
        }

        if (choiceId === 2) {
            return new TalkActionResult(
                this,
                [
                    "To get to the next room all you need is to solve the riddles I will give you so you can get the key.",
                ],
                [new TalkChoiceAction(5, "riddle 1")]
            );
        }

        if (choiceId === 3) {
            playerSession.currentCharacter = "";
            return new TextActionResult(["Shut up! Or I will show you how old I am!"]);
        }

        if (choiceId === 5) {
            return new TalkActionResult(
                this,
                [
                    "I stand tall and proud, adorned in white, But hold no secrets, hidden from sight.",
                    "I adorn the table, with a starched embrace, But offer no warmth, nor a comfortable space.",
                ],

                [
                    new TalkChoiceAction(8, "A placemat"),
                    new TalkChoiceAction(9, "A napkin holder"),
                    new TalkChoiceAction(10, "A tablecloth"),
                    new TalkChoiceAction(11, "A curtain"),
                ]
            );
        }

        if (choiceId === 10) {
            return new TalkActionResult(
                this,
                ["Correct!", "Kevin: You are smarter than you look."],
                [new TalkChoiceAction(6, "riddle 2")]
            );
        }

        if (choiceId === 11) {
            return new TalkActionResult(
                this,
                ["Wrong Answer!", "Kevin: What a idiot!"],
                [new TalkChoiceAction(5, "riddle 1")]
            );
        }

        if (choiceId === 8) {
            return new TalkActionResult(
                this,
                ["Wrong Answer!", "Kevin: You are not good at this, are you?"],
                [new TalkChoiceAction(5, "riddle 1")]
            );
        }

        if (choiceId === 9) {
            return new TalkActionResult(
                this,
                ["Wrong Answer!", "Kevin: A rat is smarter then you."],
                [new TalkChoiceAction(5, "riddle 1")]
            );
        }

        if (choiceId === 6) {
            return new TalkActionResult(
                this,
                [
                    "I have many branches, but bear no fruit, I offer a perch, for feathered recruits.",
                    "Made of crystal or glass, a shimmering sight, I catch the sunlight, and sparkle quite bright.",
                ],

                [
                    new TalkChoiceAction(12, "A tree sculpture"),
                    new TalkChoiceAction(13, "A bird feeder"),
                    new TalkChoiceAction(14, "A coat rack"),
                    new TalkChoiceAction(15, "A chandelier"),
                ]
            );
        }

        if (choiceId === 12) {
            return new TalkActionResult(
                this,
                ["Wrong Answer!", "Kevin: Wow!, Sigh"],
                [new TalkChoiceAction(6, "riddle 2")]
            );
        }

        if (choiceId === 13) {
            return new TalkActionResult(
                this,
                ["Wrong Answer!", "Kevin: Why do you even try?"],
                [new TalkChoiceAction(6, "riddle 2")]
            );
        }

        if (choiceId === 14) {
            return new TalkActionResult(
                this,
                ["Wrong Answer!", "Kevin: So close, yet so far."],
                [new TalkChoiceAction(6, "riddle 2")]
            );
        }

        if (choiceId === 15) {
            return new TalkActionResult(
                this,
                ["Correct!", "Kevin: Just lucky."],
                [new TalkChoiceAction(7, "riddle 3")]
            );
        }

        if (choiceId === 7) {
            return new TalkActionResult(
                this,
                [
                    "I have many teeth, but cannot bite. I come in sets, but never fight.",
                    "I help you chew, but have no tongue.",
                    "Used in the dining room, all year long. What am I?",
                ],

                [
                    new TalkChoiceAction(16, "A fork"),
                    new TalkChoiceAction(17, "A comb"),
                    new TalkChoiceAction(18, "A rake"),
                    new TalkChoiceAction(19, "A sewing needle"),
                ]
            );
        }

        if (choiceId === 16) {
            if (!playerSession.pickedUpLibraryKey) {
                return new TalkActionResult(
                    this,
                    ["Right Answer!, you earned the key!"],
                    [new TalkChoiceAction(101, "Receive the key")]
                );
            }
        }

        if (choiceId === 17) {
            return new TalkActionResult(
                this,
                ["Wrong Answer!", "Kevin: Oxygen is not reaching your brain."],
                [new TalkChoiceAction(7, "riddle 3")]
            );
        }

        if (choiceId === 18) {
            return new TalkActionResult(
                this,
                ["Wrong Answer!", "Kevin: Just stop and go home."],
                [new TalkChoiceAction(7, "riddle 3")]
            );
        }

        if (choiceId === 19) {
            return new TalkActionResult(
                this,
                ["Wrong Answer!", "Kevin: I bet your mama knows the answer."],
                [new TalkChoiceAction(7, "riddle 3")]
            );
        }

        if (choiceId === 101) {
            playerSession.currentCharacter = "";
            if (!playerSession.pickedUpLibraryKey === true) {
                playerSession.inventory.push(LibraryKeyItemAlias);
                playerSession.pickedUpLibraryKey = true;
                return new TextActionResult(["You received the key."]);
            } else {
                return new TextActionResult(["You already have the key."]);
            }
        }

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Can you help me with something?"),
        ];

        return new TalkActionResult(
            this,
            ["Hello, I am Olga. I am the cook here at Blackwood Manor."],
            choiceActions
        );
    }
    public name(): string {
        return "Olga";
    }
}
