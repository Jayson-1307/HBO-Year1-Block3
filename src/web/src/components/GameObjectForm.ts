/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./CustomInputElement";
import { GameObjectFormResult } from "@shared/GameObjectFormResult"; 
import { addGameObject, getGameObjects, deleteGameObject, UpdateGameObject } from "../services/routeService";
import { gameService } from "../services/gameservice";

/**
 * Nieuw component met een formulier waarin je nieuwe game objecten kan aanmaken, en bestaande kan aanpassen. 
 * Dit word beide verwerkt in een database.
 */
@customElement("gameobject-form")
export class GameObjectForm extends LitElement {

    /**
     * Initialisatie van variabelen die te maken hebben met configuratie en statussen.
     * Deze items moeten mogelijk vanaf buiten het component doorgegeven worden, vandaar dat @property word gebruikt. 
     * @property word hier vooral gebruikt voor commmunicatie en configuratie buiten het component.
     */
    @property() private selection: string = "";
    @property() private selectedType: string = "";
    @property() private success: boolean = false;
    @property() private error: boolean = false;

    /**
     * initialisatie van variabelen voor informatie van gekozen game object.
     * Representeren interne eigenschappen van het component.
     * @state word gebruikt voor eigenschappen die invloed hebben op de interne toestand van het component.
     */
    @state() private gameObjectID: any = "";
    @state() private alias:string = "";
    @state() private name: string = "";
    @state() private description: string = "";
    @state() private type: string = "";
    @state() private price: any = "";
    @state() private hp: any = "";

    /**
     * Haalt de gegevens op die in worden opgestuurd in de functie "onClickEdit"(line 479).
     * De ontvangen gegevens worden gelogd en vervolgens worden de relevante eigenschappen van het huidige object ingesteld.
     * connectedCallback Helpt in dit geval met het ophalen van de gegevens die opgestuurd zijn doormiddel van een addEventListener.
     */
    public connectedCallback() {

        /** 
         * Zorgt ervoor dat de Originele connectedCallback functie eerst word uitgevoerd, voordat mijn toegevoegde functie(s) worden uitgevoerd.
         */
        super.connectedCallback();
        gameService.addEventListener("edit-form", (element: any) => {
            console.log(element);
            const showData: GameObjectFormResult = element.data.entry;
            this.gameObjectID = showData.id;
            this.alias = showData.alias;
            this.name = showData.name;
            this.description = showData.description;
            this.type = showData.type;
            this.price = showData.price;
            this.hp = showData.hp;
            
            switch(this.type) {
                case "Item": 
                    this.selection = "1";
                    this.selectedType = "Item";
                    break;
                case "Room":   
                    this.selection = "2";
                    this.selectedType = "Room";
                    break;
                case "Character":
                    this.selection = "3";
                    this.selectedType = "Character";
                    break;
            }

            console.log(this.gameObjectID, this.alias, this.name, this.description, this.type, this.price, this.hp);
        });

    }

    /**
     * Deze functie kijkt welke optie je hebt gekozen in de selectbox, en geeft voor elke keuze een waarde aan de "SelectedType" variable.
     * @param event Representeerd het HTML element waar deze aan gelinkt staat. In dit geval is dat het select element, waar je het type van het GameObject kan kiezen. 
     */
    private handleTypeChange(event: Event): void {
        event.preventDefault();

        /**event.target wordt gebruikt binnen de handleTypeChange-methode om het geselecteerde 
         element van de combobox te verkrijgen. Door event.target te gebruiken, 
         kunnen we het geselecteerde waarde van de combobox (de waarde van het select-element) krijgen,
         en op basis daarvan het gedrag van de rest van de applicatie aanpassen.
         Dit stelt ons in staat om het weergeven of verbergen van bepaalde velden in het formulier te regelen 
         op basis van de selectie van de gebruiker. */
        this.selection = (event.target as HTMLSelectElement).value;

        switch(this.selection) {

            case "1" :
                this.selectedType = "Item";
                break;

            case "2" :
                this.selectedType = "Room";
                break;

            case "3":
                this.selectedType = "Character";
                break;
        }
        
    }

    /**
     * Deze functie haalt alle ingevulde gegevens op uit het formulier, en maakt ze klaar voor een Insert.
     * Doormiddel van "addGameObject" dat gedefinieerd word in routeService.ts, word de opgehaalde informatie in een INSERT query gezet
       en zo toegevoegd aan de database.
     * @param event Representeerd in dit geval de "add" button in de HTML.
     */
    private async handleButtonClick(event: Event): Promise<void> {
        event.preventDefault();

        //Stelt de waardes in die mee worden gestuurd om gebruikt te worden in de INSERT query.
        const gameObjectFormResult: GameObjectFormResult = {
            alias: this.alias,
            name: this.name,
            description: this.description,
            type: this.selectedType,
            price: this.selection === "1" ? this.price : undefined,
            hp: this.selection === "3" ? this.hp : undefined
        };

        console.log("Form Data:", gameObjectFormResult);

        const success: boolean = await addGameObject(gameObjectFormResult);

        if (success) {
            this.success = true;
            this.error = false;
            console.log("Succesfully Added");
            location.reload();
        } else {
            this.success = false;
            this.error = true;
            console.log("Adding Failed");
        }
        
    }

    /**
     * Deze functie haalt alle ingevulde gegevens op uit het formulier, en maakt ze klaar voor een UPDATE.
     * Doormiddel van "UpdateGameObject" dat gedefinieerd word in routeService.ts, word de opgehaalde informatie in een UPDATE query gezet
       en zo geupdate in de database.
     */
    private async handleUpdateClick() : Promise<void> {
        let success:boolean = false;

        //Stelt de waardes in die mee worden gestuurd om gebruikt te worden in de UPDATE query.
        const gameObjectFormResult: GameObjectFormResult = {
            id: this.gameObjectID,
            alias: this.alias,
            name: this.name,
            description: this.description,
            type: this.selectedType,
            price: this.selection === "1" ? this.price : undefined,
            hp: this.selection === "3" ? this.hp : undefined
        };

        console.log("Form Data:", gameObjectFormResult);
        
        try {
            console.log("Test om te kijken of de code tot zover word uitgevoerd");
            success = await UpdateGameObject(gameObjectFormResult);
            // verder dan dit wilt ie op 1 of andere manier niet uitvoeren, terwijl er niks fout gaat. 
            alert("success");
            if (success) {
                this.success = true;
                this.error = false;
                console.log("Succesfully Updated");
                location.reload(); 
            } else {
                this.success = false;
                this.error = true;
                console.log("Update Failed");
            }
        } catch(error){
            console.log(error);
        }
    }

    /**
     * Hier word de styling voor dit specifieke custom element bepaald 
     */
    public static styles = css`
        * {
            text-align: center;
        }

        .succes {
            color: green;

        }
        .error {
            color: red;
        }

        .form-container {
            max-width: 500px;
            width: 100%;
            margin: 60px auto;
        }

        .form-part {
            margin: 20px 0;
        }

        .form-part label {
            display: block;
            width: 100%;
            margin-bottom: 2.5px;
        }

        .form-part textarea {
            width: 
        }

        button {
            padding: 5px 15px;
            margin-top: 10px;
        }
    `;

    /**
     * Deze functie kijkt voor elk element waar het op word aangesproken, welk element het is en geeft dan de nodige variabelen een waarde.
       Hierdoor kunnen wij zonder queryselector alsnog de waarde van een input field ophalen. 
     * @param event Representeerd het HTML element waar deze functie op word aangeroepen
     */
    private input(event: InputEvent): void {
        const target: HTMLInputElement | HTMLTextAreaElement = event.target as HTMLInputElement | HTMLTextAreaElement;
        const id: string = target.id;
        const value: string = target.value;

        switch (id) {
            case "alias":
                this.alias = value;
                break;
            case "name":
                this.name = value;
                break;
            case "description":
                this.description = value;
                break;
            case "price":
                this.price = parseFloat(value);
                break;
            case "hp":
                this.hp = parseInt(value);
                break;
            default:
                break;
        }
    }

    /**
     * Deze functie maakt een custom HTML element met daarin een formulier, waar je game objecten kunt uploaden naar een database, en je als je een object kiest ook de 
       waarde kan updaten. 
     * @returns Een HTML code voor een custom HTML element die kan worden gebruikt door het gehele project.
     */
    public render(): TemplateResult<1> {
        return html`
            <section class="form-container">
                <h2>Game Object Form</h2>
                ${this.success ? html`<div class="success">Successfully added!</div>` : ""}
                ${this.error ? html`<div class="error">Failed to add. Please check your data.</div>` : ""}
                <form>
                    <custom-input-element label="Alias" type="text" .value=${this.alias} Id="alias" @input=${this.input}></custom-input-element>
                    <custom-input-element label="Name" type="text" Id="name" .value=${this.name} @input=${this.input}></custom-input-element>
                    <div class="form-part">
                        <label for="description">Description:</label>
                        <textarea id="description" name="description" rows="4" .value=${this.description} @input=${this.input}></textarea>
                    </div>
                    <div class="form-part">
                        <label for="type">Type:</label>
                        <select id="type" name="type" @change="${this.handleTypeChange}" .value=${this.selection}>
                            <option value=""></option>
                            <option value="1">Item</option>
                            <option value="2">Room</option>
                            <option value="3">Character</option>
                        </select>
                    </div>  
                    ${this.selection === "1" ? html`                
                    <div id="priceField">
                        <label for="price">Price:</label>
                        <input type="number" id="price" name="price" min="0" step="0.01" .value=${this.price} @input=${this.input}>
                    </div>` : ""}
                    ${this.selection === "3" ? html`
                    <div id="hpField">
                        <label for="hp">HP:</label>
                        <input type="number" id="hp" name="hp" min="0" step="1" .value=${this.hp} @input=${this.input}>
                    </div>` : ""}
                    <button type="button" id="submitButton" @click="${this.handleButtonClick}">Add ${this.selectedType}</button>
                    <button type="button" id="UpdateButtonForm" @click="${this.handleUpdateClick}">Update ${this.selectedType}</button>
                </form>
            </section>
        `;

    }

}

/**
 * Nieuw component om de data uit de database te laten zien. 
 */
@customElement("load-database")
export class loadDatabase extends LitElement {
    @state() private gameObjects:GameObjectFormResult[]=[];

    /**
     * Draaid 1x voordat de render begint, zorgt dat data al aanwezig is voor de render (van de tabel). 
     */
    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        await this.getAllItems();   
    }

    /**
     * Deze functie haalt alle items op, en gebruikt hiervoor "getGameObjects" die is aangemaakt in de file: routeService.ts.
     */
    private async getAllItems():Promise<void>{
        try {
            this.gameObjects = await getGameObjects();
        } catch(error) {
            console.log(error);        
        }
        console.log(this.gameObjects);
    }

    /**
     * Deze functie verwijderd de gekozen game object uit de database, en gebruikt hiervoor "getGameObjects" die is aangemaakt in de file: routeService.ts.
     * @param id Representeerd de id van de gekozen game object
     */
    private async deleteData(id: number | undefined): Promise<void> {
        try {
            const confirmDelete: boolean = confirm("Are you sure you want to delete this object?");

            if (confirmDelete) {
                await deleteGameObject(id);
                location.reload();
                console.log("Deleted succesfully");

            } else {
                console.log("Error while deleting");

            }
        } catch (error) {
            console.log("Failed to delete gameobject data", error);

        }
    }


    /**Hier word de styling voor dit specifieke custom element bepaald */
    public static styles = css`
        .form-block {
            width: fit-content;
            margin: 0 auto;
        }

        h2 {
            width: 1000px;
            text-align: center;
        }

        .tables {
            width: 1000px;
            margin-bottom: 40px;
        }

        .tables td {
            text-align: center;
        }
        
        .tables td, .tables th {
            border: 1px solid black;
        }
    `;

    /**
     * Deze functie maakt een deel van een custom HTML element aan. In deze functie gaat het om een tabel voor de "item" game objects.
     * @returns Een HTML code voor een custom HTML element die kan worden gebruikt door het gehele project.
     */
    public renderItems(): TemplateResult<1> {
        return html `
        <section class="form-block">
            <h2>Items</h2>
            <table id="Item" class="tables">
                <tr>
                    <th>Alias</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th id="itemPrice">Price</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                ${this.gameObjects.map(gameObject => {
                    if (gameObject.type === "Item") {
                        return html`
                        <tr>
                        <td>${gameObject.alias}</td>
                        <td>${gameObject.name}</td>
                        <td>${gameObject.description}</td>
                        <td>${gameObject.type}</td>
                        <td>${gameObject.price ?? ""}</td>
                        <td><button @click=${() => this.onClickEdit(gameObject)} id="editButton">Edit</button></td>
                        <td><button @click=${() => this.deleteData(gameObject.id)} id="deleteButton">Delete</button></td>
                    </tr>
                        `;
                    }
                })}
            </table> 
        </section>
        `;
    }

    /**
     * Deze functie maakt een deel van een custom HTML element aan. In deze functie gaat het om een tabel voor de "character" game objects.
     * @returns Een HTML code voor een custom HTML element die kan worden gebruikt door het gehele project.
     */
    public renderCharacters(): TemplateResult<1> {
        return html `

        <section class="form-block">
            <h2>Characters</h2>
            <table id="Item" class="tables">
                <tr>
                    <th>Alias</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th id="characterId">HP</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                ${this.gameObjects.map(gameObject => {
                    if (gameObject.type === "Character") {
                        return html`
                        <tr>
                        <td>${gameObject.alias}</td>
                        <td>${gameObject.name}</td>
                        <td>${gameObject.description}</td>
                        <td>${gameObject.type}</td>
                        <td>${gameObject.hp ?? ""}</td>
                        <td><button @click=${() => this.onClickEdit(gameObject)} id="editButton">Edit</button></td>
                        <td><button @click=${() => this.deleteData(gameObject.id)} id="deleteButton">Delete</button></td>
                    </tr>
                        `;
                    }
                })}
            </table> 
        </section>

        `;
    }

    /**
     * Deze functie maakt een deel van een custom HTML element aan. In deze functie gaat het om een tabel voor de "room" game objects.
     * @returns Een HTML code voor een custom HTML element die kan worden gebruikt door het gehele project.
     */
    public renderRooms(): TemplateResult<1> {
        return html `
        <section class="form-block">
            <h2>Rooms</h2>
            <table id="Item" class="tables">
                <tr>
                    <th>Alias</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                ${this.gameObjects.map(gameObject => {
                    if (gameObject.type === "Room") {
                        return html`
                        <tr>
                        <td>${gameObject.alias}</td>
                        <td>${gameObject.name}</td>
                        <td>${gameObject.description}</td>
                        <td>${gameObject.type}</td>
                        <td><button @click=${() => this.onClickEdit(gameObject )} id="editButton">Edit</button></td>
                        <td><button @click=${() => this.deleteData(gameObject.id)} id="deleteButton">Delete</button></td>
                    </tr>
                        `;
                    }
                })}
            </table> 
        </section>
        `;
    }

    /**
     * Deze functie haalt de informatie van het gekozen game object op, en stuurt ze naar het formulier zodat het aangepast kan worden. 
     * @param element Representeerd de informatie van het gekozen game object.
     */
    private onClickEdit(element:GameObjectFormResult):void {
        console.log(element);

        try {
            console.log("test");
            gameService.dispatchEvent("edit-form", { 
                entry: element
            });

        } catch (error) {
            console.log("Failed to update gameobject data", error);

        }
    }

    /**
     * HTML die per type object dat in de database zit een tabel laat zien.
     * @returns HTML code die getoond word op de pagina. Het zijn 3 tabellen, met daarin de informatie uit de database. 
     */
    public render(): any  {
        return html`
        <div class="form-container">
            ${this.renderItems()};
            ${this.renderCharacters()};
            ${this.renderRooms()};
        </div>
        `; 
    }
}
