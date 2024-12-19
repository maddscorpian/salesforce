import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import myLitComponentJS from '@salesforce/resourceUrl/myLitComponentUMD';

export default class PartnerGreeting extends LightningElement {
    @track partnerName = ''; // Track partner name for binding
    litComponentLoaded = false;
    litComponent;

    renderedCallback() {
        if (!this.litComponentLoaded) {
            this.litComponentLoaded = true;

            loadScript(this, myLitComponentJS + "/output/my-lit-component.bundle.js")
                .then(() => {
                    const container = this.template.querySelector('.lit-container');
                    this.litComponent = document.createElement('my-lit-component');
                    this.litComponent.setAttribute('partnerName', this.partnerName || 'Partner');
                    container.appendChild(this.litComponent);
                })
                .catch(error => {
                    console.error('Error loading Lit component:', error);
                });
        }
    }

    handleInputChange(event) {
        this.partnerName = event.target.value;
        if (this.litComponent) {
            this.litComponent.setAttribute('partnerName', this.partnerName);
        }
    }
}