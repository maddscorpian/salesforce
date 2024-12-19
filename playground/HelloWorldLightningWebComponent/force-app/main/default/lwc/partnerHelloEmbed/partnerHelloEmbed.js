import { LightningElement, track } from 'lwc';

export default class PartnerHelloEmbed extends LightningElement {
    @track partnerName = 'Guest'; // Default value
    litComponentLoaded = false;

    connectedCallback() {
        this.loadMicroFrontend();
    }

    loadMicroFrontend() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/maddscorpian/public-respurces@main/welcome-greeting-embed.bundle.js'; // Replace with your CDN URL
        script.onload = () => {
            this.renderLitComponent();
        };
        script.onerror = (error) => {
            console.error('Error loading Lit component:', error);
        };
        document.body.appendChild(script);
    }

    handleInputChange(event) {
        this.partnerName = event.target.value; // Update partnerName with input value
        this.renderLitComponent(); // Re-render the Lit component with the new value
    }

    // renderLitComponent() {
    //     const container = this.template.querySelector('.lit-container');
    //     if (container) {
    //         // Create an instance of the Lit component
    //         const litComponent = document.createElement('welcome-greeting');
    //         litComponent.setAttribute('partner-name', this.partnerName); // Pass the partnerName
    //         container.innerHTML = ''; // Clear previous content
    //         container.appendChild(litComponent); // Append the Lit component
    //     }
    // }


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