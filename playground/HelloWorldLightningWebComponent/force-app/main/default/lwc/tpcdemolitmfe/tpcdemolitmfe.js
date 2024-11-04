import {LightningElement, track} from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import WELCOME_GREETING from '@salesforce/resourceUrl/welcomeGreeting'; // Adjust the name as per your static resource

export default class Tpcdemolitmfe extends LightningElement {
    @track partnerUserName = 'madd'; // Default value

    connectedCallback() {
        loadScript(this, WELCOME_GREETING)
            .then(() => {
                // Lit component is loaded
                this.renderLitComponent();
            })
            .catch(error => {
                console.error('Error loading Lit component', error);
            });
    }

    handleInputChange(event) {
        this.partnerUserName = event.target.value;
        this.renderLitComponent(); // Re-render the Lit component with the new value
    }

    renderLitComponent() {
        const container = this.template.querySelector('.lit-container');
        if (container) {
            // Create an instance of the Lit component
            const litComponent = document.createElement('welcome-greeting');
            litComponent.partnerUserName = this.partnerUserName; // Pass the partnerUserName
            container.innerHTML = ''; // Clear previous content
            container.appendChild(litComponent); // Append the Lit component
        }
    }
}