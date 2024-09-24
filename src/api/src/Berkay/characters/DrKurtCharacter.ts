import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { decreaseHP, getPlayerSession } from "../../instances";
import { FlaskOpenerItemAlias } from "../items/FlaskOpenerItem";
import { PlayerSession } from "../../types";
import { SucroseFlaskItemAlias } from "../items/SucroseFlaskItem";

export const DrKurtCharacterAlias: string = "Dr. Kurt";
export class DrKurtCharacter extends Character implements Examine {
    public constructor() {
        super(DrKurtCharacterAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Dr. Kurt";
    }

    public images(): string[] {
        return ["DrKurt"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Dr. Kurt, the aged professor, occupies a peculiar corner of the ancient laboratory with a curious posture. Leaning slightly, his demeanor hints at a lifetime of scholarly pursuit and eccentric wisdom.",
        ]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.currentCharacter = DrKurtCharacterAlias;
        if (choiceId === 1) {
            playerSession.currentCharacter = "";
            return new TextActionResult(["Greetings! Welcome to my laboratory."]);
        }

        if (choiceId === 2) {
            playerSession.currentCharacter = "";
            return new TextActionResult([
                "Ah, you're curious about the wonders of my laboratory! It's a place where knowledge and experimentation collide.",
            ]);
        }

        if (choiceId === 3) {
            playerSession.inventory.push(FlaskOpenerItemAlias);
            playerSession.pickedUpFlaskOpener = true;
            return new TextActionResult([
                "Oh I see, you want to open that old flask I made? sure go ahead, but be careful that fluid may be dangerous. (obtained flaskopener)",
            ]);
        }

        if (choiceId === 4) {
            if (playerSession.pickedUpPikachurin && !playerSession.pickedUpXenoniphage) {
                return new TalkActionResult(
                    this,
                    [
                        "You want to use that old thing to make an item for you? Sure just say the items and ill put them in for you",
                    ],
                    [
                        new TalkChoiceAction(11, "Pikachurin"),
                        new TalkChoiceAction(12, "Mispickel"),
                        new TalkChoiceAction(13, "Welshite"),
                    ]
                );
            } else if (playerSession.pickedUpXenoniphage && playerSession.pickedUpPikachurin) {
                return new TalkActionResult(
                    this,
                    [
                        "You want to use that old thing to make an item for you? Sure just say the items and ill put them in for you",
                    ],
                    [
                        new TalkChoiceAction(21, "Pikachurin"),
                        new TalkChoiceAction(22, "Mispickel"),
                        new TalkChoiceAction(23, "Welshite"),
                        new TalkChoiceAction(24, "Xenoniphage"),
                    ]
                );
            } else {
                playerSession.currentCharacter = "";
                return new TextActionResult([
                    "You don't have any ingredients we can mix. Come back when you find some",
                ]);
            }
        }

        if (choiceId === 11) {
            return new TalkActionResult(
                this,
                ["Now choose the other item to mix it with"],

                [new TalkChoiceAction(100, "Mispickel"), new TalkChoiceAction(100, "Welshite")]
            );
        }

        if (choiceId === 12) {
            return new TalkActionResult(
                this,
                ["Now choose the other item to mix it with"],

                [new TalkChoiceAction(100, "Pikachurin"), new TalkChoiceAction(100, "Welshite")]
            );
        }

        if (choiceId === 13) {
            return new TalkActionResult(
                this,
                ["Now choose the other item to mix it with"],

                [new TalkChoiceAction(100, "Pikachurin"), new TalkChoiceAction(100, "Mispickel")]
            );
        }

        if (choiceId === 21) {
            return new TalkActionResult(
                this,
                ["Now choose the other item to mix it with"],

                [
                    new TalkChoiceAction(100, "Pikachurin"),
                    new TalkChoiceAction(100, "Welshite"),
                    new TalkChoiceAction(101, "Xenoniphage"),
                ]
            );
        }

        if (choiceId === 22) {
            return new TalkActionResult(
                this,
                ["Now choose the other item to mix it with"],

                [
                    new TalkChoiceAction(100, "Pikachurin"),
                    new TalkChoiceAction(100, "Welshite"),
                    new TalkChoiceAction(100, "Xenoniphage"),
                ]
            );
        }

        if (choiceId === 23) {
            return new TalkActionResult(
                this,
                ["Now choose the other item to mix it with"],

                [
                    new TalkChoiceAction(100, "Mispickel"),
                    new TalkChoiceAction(100, "Welshite"),
                    new TalkChoiceAction(100, "Xenoniphage"),
                ]
            );
        }

        if (choiceId === 24) {
            return new TalkActionResult(
                this,
                ["Now choose the other item to mix it with"],

                [
                    new TalkChoiceAction(101, "Pikachurin"),
                    new TalkChoiceAction(100, "Mispickel"),
                    new TalkChoiceAction(100, "Welshite"),
                ]
            );
        }

        if (choiceId === 100) {
            playerSession.currentCharacter = "";
            if (playerSession.mixerWrong <= 2 && !playerSession.pickedUpXenoniphage) {
                playerSession.mixerWrong += 1;
                decreaseHP(1);
                const currentHP: number = playerSession.currentHP;

                if (playerSession.isAlive) {
                    playerSession.currentCharacter = "";
                    return new TextActionResult([
                        `You drink it to test the taste, it was awful! I don't think you made the right combination. you took 1 damage and your current hp is now ${currentHP}`,
                    ]);
                }

                return new TextActionResult(["You died."]);
            } else if (!playerSession.pickedUpXenoniphage && playerSession.isAlive) {
                playerSession.mixerWrong += 1;
                return new TextActionResult([
                    "Hmm it seems you don't have all the flasks necessary for the recipe. Maybe I have left one in the dining room? ",
                ]);
            } else if (!playerSession.talkedToAlbert && playerSession.isAlive) {
                return new TextActionResult([
                    "Maybe you have to talk to the npc in the dining room called Albert",
                ]);
            } else if (!playerSession.isAlive) {
                return new TextActionResult(["You died"]);
            } else {
                return new TextActionResult([
                    "You have all the materials needed to make the recipe. Albert in the dining room tells you the recipe maybe ask him?",
                ]);
            }
        }

        if (choiceId === 101) {
            playerSession.currentCharacter = "";
            playerSession.inventory.push(SucroseFlaskItemAlias);
            playerSession.pickedUpSucrose = true;
            return new TextActionResult([
                "You made the right recipe good job! Give the item to Albert in the dining room. obtained sucrose flask",
            ]);
        }

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Greet"),
            new TalkChoiceAction(2, "Ask about the lab"),
        ];

        if (!playerSession.pickedUpFlaskOpener && playerSession.interactedFlask) {
            choiceActions.push(new TalkChoiceAction(3, "Ask about the flask"));
        }

        if (playerSession.interactedMixer) {
            choiceActions.push(new TalkChoiceAction(4, "Ask about the mixer"));
        }

        return new TalkActionResult(this, ["You're talking to Dr. Kurt"], choiceActions);
    }
}
