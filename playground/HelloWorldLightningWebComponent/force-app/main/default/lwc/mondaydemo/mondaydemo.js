// partnerGreeting.js
   import {LightningElement, track} from 'lwc';
   import { loadScript } from 'lightning/platformResourceLoader';
   import WELCOME_GREETING from '@salesforce/resourceUrl/mferesource'; // Ensure this matches your static resource name

   export default class PartnerGreeting extends LightningElement {
       @track partnerName = 'Guest'; // Default value

       connectedCallback() {
           loadScript(this, WELCOME_GREETING + "/resource/welcome-greeting.bundle.js")
               .then(() => {
                   this.renderLitComponent();
               })
               .catch(error => {
                   console.error('Error loading Lit component', error);
               });
       }

       handleInputChange(event) {
           this.partnerName = event.target.value; // Update partnerName with input value
           this.renderLitComponent(); // Re-render the Lit component with the new value
       }

       renderLitComponent() {
           const container = this.template.querySelector('.lit-container');
           if (container) {
               // Create an instance of the Lit component
               const litComponent = document.createElement('welcome-greeting');
               litComponent.partnerName = this.partnerName; // Pass the partnerName
               container.innerHTML = ''; // Clear previous content
               container.appendChild(litComponent); // Append the Lit component
           }
       }
   }