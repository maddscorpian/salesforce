   // welcome-greeting.js
   import { LitElement, html, css, property } from 'lit';

   class WelcomeGreeting extends LitElement {
       @property({ type: String }) partnerName = ''; // Property to receive the partner name

       static styles = css`
           h1 {
               color: blue;
           }
       `;

       render() {
           return html`
               <h1>Welcome, ${this.partnerName}!</h1>
           `;
       }
   }

   customElements.define('welcome-greeting', WelcomeGreeting);