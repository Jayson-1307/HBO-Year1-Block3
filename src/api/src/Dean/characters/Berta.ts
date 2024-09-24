import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { combineCodeFragments, decreaseHP, getPlayerSession } from "../../instances";
import { HourglassItemAlias } from "../items/hourglass";
import { PlayerSession } from "../../types";
import { secondHadesStatueAlias } from "../items/secondHadesStatue";
import { thirdCodeFragmentItemAlias } from "../items/thirdCodeFragment";

export const BertaCharacterAlias: string = "Berta";

export class BertaCharacter extends Character implements Examine
{
    public constructor()
    {
        super(BertaCharacterAlias, ExamineActionAlias, TalkActionAlias);
    }

    public name(): string {
        return "Berta";
    }

    public images(): string[] {
        return  ["bertaIMG"];
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult (["It is a old woman"]);    
}

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.currentCharacter = BertaCharacterAlias;
        const choices: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Ethan respectfully listens to Bertha's riddle, showing kindness and interest in her stories. Impressed by his sincerity, Bertha rewards Ethan with the Hades statue for his thoughtful approach."),
            new TalkChoiceAction(2, "If Ethan acts rude or impatient with Bertha's riddle, she disapproves. Despite warning him, she reluctantly gives Ethan the statue. However, touching it harms him, teaching him a lesson about respect.")
        ];
        
        if (playerSession.inventory.includes(HourglassItemAlias))
            if(choiceId === 1){
                playerSession.currentCharacter = "";
                playerSession.inventory.push(secondHadesStatueAlias);
                playerSession.inventory.push(thirdCodeFragmentItemAlias);
                playerSession.thirdCodeFragment = true;
                combineCodeFragments();
                return new TextActionResult(["Good answer, here is the other part of the hades statue... (u now have a code fragment!)"]);
               
            }
            else if(choiceId === 2){
                playerSession.currentCharacter = "";
                decreaseHP(2);
                const currentHP: number = playerSession.currentHP;
                if (playerSession.isAlive){
                    return new TextActionResult(["Wrong answer, Berta just slapped u.", `Your current HP is now ${currentHP}.`]);
                }
                return new TextActionResult(["You died"]);
            }

        if (!playerSession.inventory.includes(HourglassItemAlias)) {
            playerSession.currentCharacter = "";
            return new TextActionResult(["I won't talk to you until you bring me my hourglass."]);
        }
        else {
            return new TalkActionResult(this, ["Thanks for finding my hourglass boy. Here is riddle for you young one.", 
            `"In shadows deep, where secrets dwell,
            A figure stands, both dark and fell.
            A visage grim, a presence bold,
            Yet sought by many, both young and old.
            
            To find this prize, you must beware,
            For choices made, a fate you'll share.
            Seek out Bertha, wise and old,
            Her tale untold, her heart stone-cold.
            
            Upon her shelf, where memories gleam,
            The Hades statue, a coveted dream.
            But heed her words, her twisted song,
            For right or wrong, the choice is strong.
            
            Two paths diverge, before your eyes,
            A truth disguised, a clever guise.
            Choose wisely now, lest you regret,
            For the statue's secret, you'll soon forget.
            
            Ask her kindly, with heart sincere,
            Or challenge her, with words severe.
            The choice you make, will shape your fate,
            As you seek the statue, in shadows gate."`,
    
            "What choice do u make?: "],
            
            choices);
        }
    }
}