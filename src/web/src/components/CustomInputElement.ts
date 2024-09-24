import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./CustomInputElement";

@customElement("custom-input-element")
export class CustomInputElement extends LitElement {

    /**
     * Initialisatie van variabelen die te maken hebben met configuratie en statussen.
     * Deze items moeten mogelijk vanaf buiten het component doorgegeven worden, vandaar dat @property word gebruikt. 
     */
    @property() private label: string = "";
    @property() private type: string = "";
    @property() private Id: string = "";
    @property() public value: string = "";

    /**
     * css styling voor de HTML code die in dit component word aangemaakt.
     */
    public static styles = css`
        div {
            margin: 20px 0;
        }

        label {
            display: block;
            width: 100%;
        }

    `;

    /**
     * HTML code voor een div met daarin een label en een input bar. deze zullen gebruikt worden 
     * in GameObjectForm.ts om input elementen in te laden in de form.
     * @returns HTML code voor een blokje met een label en een input.
     */
    public render(): TemplateResult<1> {  
        return html`
                <div>
                    <label for="${this.label}">${this.label}</label>
                    <input type="${this.type}" id="${this.Id}" @input="${this.getInputValue}" value="${this.value}">
                </div>
        `;
    }

    /**
     * Event handler voor het verwerken van inputs van het invoerveld.
     * @param event Het input object.
     */
    private getInputValue(event: Event): void {
        this.requestUpdate();
        this.value = (event.target as HTMLInputElement).value;
    }
}
