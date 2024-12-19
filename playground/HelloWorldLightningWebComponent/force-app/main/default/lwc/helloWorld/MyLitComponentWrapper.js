import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import myLitComponentJS from '@salesforce/resourceUrl/welcomeGreeting1';

export default class MyLitComponentWrapper extends LightningElement {
    @track customerName = 'John Doe';  // Variable to pass to Lit component
    litComponentLoaded = false;

    renderedCallback() {
        if (!this.litComponentLoaded) {
            this.litComponentLoaded = true;
            
            // Load the Lit component from Static Resource or CDN
            loadScript(this, myLitComponentJS).then(() => {
                // Create the Lit component dynamically
                const container = this.template.querySelector('.lit-container');
                const litComponent = document.createElement('welcome-greeting');
                
                // Pass the customerName variable to the Lit component
                litComponent.setAttribute('customerName', this.customerName);
                
                container.appendChild(litComponent);
            }).catch(error => {
                console.error('Failed to load the Lit component:', error);
            });
        }
    }
}