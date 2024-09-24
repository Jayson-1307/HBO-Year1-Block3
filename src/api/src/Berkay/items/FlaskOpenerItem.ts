import { Item } from "../../base/gameObjects/Item";

export const FlaskOpenerItemAlias: string = "flaskopener";
export class FlaskOpenerItem extends Item {
    public constructor() {
        super(FlaskOpenerItemAlias);
    }

    public name(): string {
        return "Flask opener";
    }
}
