import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { PlayerSession } from "../../types";
import { combineCodeFragments, getPlayerSession } from "../../instances";
import { secondCodeFragmentAlias } from "../items/secondCodeFragment";

export const KevinCharacterAlias: string = "kevin";
export class KevinCharacter extends Character implements Examine {
    public constructor() {
        super(KevinCharacterAlias, ExamineActionAlias);
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Kevin is a tall bastard."]);
    }

    public name(): string {
        return "Kevin";
    }

    public images(): string[] {
        return ["kevin"];
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.currentCharacter = KevinCharacterAlias;
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "Come on, don't be shy! Hit me with a topic, any topic. Unless it's socks. I'm fresh out of sock knowledge today.",
                ],
                [
                    new TalkChoiceAction(5, "what about socks?"),
                    new TalkChoiceAction(
                        6,
                        "Should the government force churches and religious institutions to pay taxes?"
                    ),
                ]
            );
        }

        if (choiceId === 5) {
            return new TalkActionResult(
                this,
                ["I don't want to talk about socks."],
                [
                    new TalkChoiceAction(1, "Let's get philosophical!"),
                    new TalkChoiceAction(2, "You are ugly."),
                    new TalkChoiceAction(3, "Hit me with something thought-provoking."),
                    new TalkChoiceAction(4, "Whats wrong with you?"),
                ]
            );
        }

        if (choiceId === 6) {
            return new TalkActionResult(
                this,
                ["Equal treatment for all, I say. Tax the churches!"],
                [
                    new TalkChoiceAction(1, "Let's get philosophical!"),
                    new TalkChoiceAction(2, "You are ugly."),
                    new TalkChoiceAction(3, "Hit me with something thought-provoking."),
                    new TalkChoiceAction(4, "Whats wrong with you?"),
                ]
            );
        }

        if (choiceId === 2) {
            return new TalkActionResult(
                this,
                ["That is not what your mom said last night!"],
                [
                    new TalkChoiceAction(8, "Thats funny. My mom is dead."),
                    new TalkChoiceAction(9, "Wait till I am done here I will let you scream Daddy!."),
                    new TalkChoiceAction(10, "You are smart, but can you outsmart a bullit."),
                ]
            );
        }

        if (choiceId === 8) {
            return new TalkActionResult(
                this,
                ["That's what happens when you do it with me."],
                [
                    new TalkChoiceAction(1, "Let's get philosophical!"),
                    new TalkChoiceAction(2, "You are ugly."),
                    new TalkChoiceAction(3, "Hit me with something thought-provoking."),
                    new TalkChoiceAction(4, "Whats wrong with you?"),
                ]
            );
        }

        if (choiceId === 9) {
            return new TalkActionResult(
                this,
                ["What a weird fetish, wanting to be called Daddy!"],
                [
                    new TalkChoiceAction(1, "Let's get philosophical!"),
                    new TalkChoiceAction(2, "You are ugly."),
                    new TalkChoiceAction(3, "Hit me with something thought-provoking."),
                    new TalkChoiceAction(4, "Whats wrong with you?"),
                ]
            );
        }

        if (choiceId === 10) {
            return new TalkActionResult(
                this,
                ["You are not worth the bullet."],
                [
                    new TalkChoiceAction(1, "Let's get philosophical!"),
                    new TalkChoiceAction(2, "You are ugly."),
                    new TalkChoiceAction(3, "Hit me with something thought-provoking."),
                    new TalkChoiceAction(4, "Whats wrong with you?"),
                ]
            );
        }

        if (choiceId === 3) {
            return new TalkActionResult(
                this,
                ["If you could choose to be any animal, what animal would you choose to be?"],
                [
                    new TalkChoiceAction(11, "A lion, king of the savannah."),
                    new TalkChoiceAction(12, "A dolphin, they are so smart."),
                    new TalkChoiceAction(13, "A bird, so I can fly."),
                ]
            );
        }

        if (choiceId === 11) {
            return new TalkActionResult(
                this,
                ["You are no king, only a idiot."],
                [
                    new TalkChoiceAction(1, "Let's get philosophical!"),
                    new TalkChoiceAction(2, "You are ugly."),
                    new TalkChoiceAction(3, "Hit me with something thought-provoking."),
                    new TalkChoiceAction(4, "Whats wrong with you?"),
                ]
            );
        }

        if (choiceId === 12) {
            return new TalkActionResult(
                this,
                ["You're as intelligent as a goldfish."],
                [
                    new TalkChoiceAction(1, "Let's get philosophical!"),
                    new TalkChoiceAction(2, "You are ugly."),
                    new TalkChoiceAction(3, "Hit me with something thought-provoking."),
                    new TalkChoiceAction(4, "Whats wrong with you?"),
                ]
            );
        }

        if (choiceId === 13) {
            return new TalkActionResult(
                this,
                ["What?, so you can fall down and die?"],
                [
                    new TalkChoiceAction(1, "Let's get philosophical!"),
                    new TalkChoiceAction(2, "You are ugly."),
                    new TalkChoiceAction(3, "Hit me with something thought-provoking."),
                    new TalkChoiceAction(4, "Whats wrong with you?"),
                ]
            );
        }

        if (choiceId === 4) {
            return new TalkActionResult(
                this,
                [
                    "I had a bad dream last night. Because of it I woke up exhausted.",
                    "The dream was so vivid, it felt like I was really there.",
                    "I can't shake the feeling that it was a premonition of something bad.",
                    "But why do I get a weird sense of deja vu when I think about it?",
                ],
                [new TalkChoiceAction(16, "What was the dream about?")]
            );
        }

        if (choiceId === 16) {
            return new TalkActionResult(
                this,
                [
                    "Somebody killed me and Olga with a knife in the kitchen. It was a nightmare.",
                    "I can't remember the face of the killer, but I remember the knife.",
                    "It was a big knife, with a black handle and a silver blade.",
                    "When I got stabbed, I felt the pain so vividly, it was like I was really dying.",
                ],

                [new TalkChoiceAction(18, "What did the killer look like?")]
            );
        }

        if (choiceId === 18) {
            return new TalkActionResult(
                this,
                [
                    "Hmm, now that you mention it, he looked somewhat like you, everything went so fast I can't remember everything.",
                ],
                [new TalkChoiceAction(19, "It was just a dream, don't worry about it.")]
            );
        }

        if (choiceId === 19) {
            return new TalkActionResult(
                this,
                ["I hope you are right."],
                [
                    new TalkChoiceAction(
                        20,
                        "I myself am searching for a killer. Where can i get more information about the manor?"
                    ),
                ]
            );
        }

        if (choiceId === 20) {
            return new TalkActionResult(
                this,
                [
                    "You can check the vault, there is a lot of information about the manor there.",
                    "But be careful, the vault is locked and you need a code to open it.",
                    "Unfortunately, I only know the second part of the code, you need to find the third and fourth part yourself.",
                ],
                [new TalkChoiceAction(21, "Get the second part of the code.")]
            );
        }

        if (choiceId === 21) {
            playerSession.currentCharacter = "";
            if (!playerSession.secondCodeFragment === true) {
                playerSession.inventory.push(secondCodeFragmentAlias);
                playerSession.secondCodeFragment = true;
                combineCodeFragments();
                return new TextActionResult(["You received the secondCodeFragment."]);
            } else {
                return new TextActionResult(["You already have the secondCodeFragment.."]);
            }
        }

        return new TalkActionResult(
            this,
            ["Be quick I have a lot of work to do!"],
            [
                new TalkChoiceAction(1, "Let's get philosophical!"),
                new TalkChoiceAction(2, "You are ugly."),
                new TalkChoiceAction(3, "Hit me with something thought-provoking."),
                new TalkChoiceAction(4, "Whats wrong with you?"),
            ]
        );
    }
}
