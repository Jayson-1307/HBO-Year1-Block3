import { ActionReference, GameObjectReference, GameState } from "@shared/types";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { getState, performAction } from "../services/routeService";

@customElement("game-canvas")
export class GameCanvas extends LitElement {
    public static styles = css`
        .game {
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto 1fr auto;
            grid-column-gap: 0px;
            grid-row-gap: 0px;
        }

        .title {
            text-align: center;
            margin-top: 10px;
            /* color:#4B0082 ; */
            color: #eeebe3;
            font-size: 28px;
            text-shadow: -2px -2px 0 #8b0000, 2px -2px 0 #8b0000, -2px 2px 0 #8b0000, 2px 2px 0 #8b0000; /* White border around the text */
        }

        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            position: relative;
            margin-top: 10px;
        }

        .header img {
            width: 75%;
            height: auto;
            max-height: 450px;
            image-rendering: pixelated;
            /* box-shadow: -1px 0px 10px 0px black; */
        }

        .header img:nth-child(n + 2) {
            position: absolute;
        }

        .content {
            flex-grow: 1;
            overflow: auto;
            margin-top: 10px;
            padding: 5px 10px;
            font-size: 22px;
            border: 1px solid #520000;
            background-color: #0d0d0d;
            border-radius: 10px;
        }

        .content p {
            overflow: hidden;
            margin: 0 0 10px 0;
            opacity: 1; /* Start with text hidden */
        }

        .content p:last-of-type {
            margin: 0;
        }

        .footer {
            border-radius: 10px 10px 0 0;
            /* background-color: #52478b; */
            background-color: #0d0d0d;
            /* border: 1px solid #332c57; */
            border: 1px solid #520000;
            margin-top: 10px;
            display: flex;
            height: 115px;
            /* height: 105px; */
        }

        .footer .buttons {
            display: flex;
            flex-direction: column;
            overflow: auto;
            padding: 10px 10px 0 10px;
        }

        .footer .button {
            /* background-color: #7f6ed7; */
            /* border: 1px solid #332c57; */
            border: 1px solid #a52a2a;
            padding: 5px 10px;
            margin: 0 0 10px 10px;
            text-transform: uppercase;
            cursor: pointer;
            display: inline-block;
            user-select: none;
            font-size: 20px;
            background-color: #8b0000;
        }

        .footer .button:hover {
            background-color: #a52a2a;
            border-color: #a52a2a;
        }

        .footer .button.active,
        .footer .button:hover {
            /* background-color: #332c57; */
            background-color: #a52a2a;
        }

        
    `;

    private roomTitle?: string;
    private roomImages?: string[];
    private contentText?: string[];
    private actionButtons?: ActionReference[];
    private gameObjectButtons?: GameObjectReference[];
    private characterImages?: string[];

    private selectedActionButton?: ActionReference;
    private selectedGameObjectButtons: Set<GameObjectReference> = new Set<GameObjectReference>();

    public connectedCallback(): void {
        super.connectedCallback();

        void this.refreshState();
    }

    private async refreshState(): Promise<void> {
        const state: GameState = await getState();

        this.updateState(state);
    }

    private updateState(state: GameState): void {
        //Reset the component
        this.roomTitle = state.roomTitle;
        this.roomImages = state.roomImages;
        this.contentText = state.text;
        this.actionButtons = state.actions;
        this.gameObjectButtons = state.objects;
        this.characterImages = state.characterImages;

        this.selectedActionButton = undefined;
        this.selectedGameObjectButtons.clear();

        this.requestUpdate();
    }

    private async handleClickAction(button: ActionReference): Promise<void> {
        if (button.needsObject) {
            this.selectedActionButton = button;
            this.selectedGameObjectButtons.clear();

            this.requestUpdate();
        } else {
            const state: any = await performAction(button.alias);

            if (state === undefined) {
                return;
            }

            this.updateState(state);
        }
    }

    private async handleClickObject(button: GameObjectReference): Promise<void> {
        if (!this.selectedActionButton) {
            return;
        }

        this.selectedGameObjectButtons.add(button);

        const state: GameState | undefined = await performAction(
            this.selectedActionButton.alias,
            [...this.selectedGameObjectButtons].map((e) => e.alias)
        );

        if (this.selectedGameObjectButtons.size >= 2) {
            this.selectedActionButton = undefined;
            this.selectedGameObjectButtons.clear();
        }

        this.requestUpdate();

        if (state === undefined) {
            return;
        }

        this.updateState(state);
    }

    protected render(): TemplateResult {
        return html`
            <div class="game">
                ${this.renderTitle()} ${this.renderHeader()} ${this.renderContent()} ${this.renderFooter()}
            </div>
        `;
    }

    private renderTitle(): TemplateResult {
        if (this.roomTitle) {
            return html`<div class="title">${this.roomTitle}</div>`;
        }

        return html`${nothing}`;
    }

    private renderHeader(): TemplateResult {
        if (this.characterImages && this.characterImages.length > 0) {
            return html`
                <div class="header">
                    ${this.characterImages.map((url) => html`<img src="/assets/img/rooms/${url}.png" />`)}
                </div>
            `;
        } else if (this.roomImages && this.roomImages.length > 0) {
            return html`
                <div class="header">
                    ${this.roomImages.map((url) => html`<img src="/assets/img/rooms/${url}.png" />`)}
                </div>
            `;
        }

        return html`${nothing}`;
    }

    private renderContent(): TemplateResult {
        return html`<div class="content">${this.contentText?.map((text) => html`<p>${text}</p>`)}</div>`;
    }

    private renderFooter(): TemplateResult {
        return html`
            <div class="footer">
                <div class="buttons">
                    <div>
                        ${this.actionButtons?.map(
                            (button) => html`<a
                                class="button ${this.selectedActionButton === button ? "active" : ""}"
                                @click=${(): void => void this.handleClickAction(button)}
                                >${button.label}</a
                            >`
                        )}
                    </div>
                    <div>
                        ${this.selectedActionButton
                            ? this.gameObjectButtons?.map(
                                  (button) => html`<a
                                      class="button ${this.selectedGameObjectButtons.has(button)
                                          ? "active"
                                          : ""}"
                                      @click=${(): void => void this.handleClickObject(button)}
                                      >${button.name}</a
                                  >`
                              )
                            : nothing}
                    </div>
                </div>
            </div>
        `;
    }
}
