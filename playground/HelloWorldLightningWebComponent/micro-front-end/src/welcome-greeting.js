   // welcome-greeting.js
   import { LitElement, html, css, property } from 'lit';

   class WelcomeGreeting extends LitElement {
       static properties = {
        partnerName: { type: String }
      };// Property to receive the partner name

       static styles = css`
           h1 {
               color: blue;
           }
       `;

       render() {
           return html`
               <h2>Mfeeee eeee eee says</h2>
               <h1>Welcome, ${this.partnerName}!</h1>
           `;
       }
   }

   customElements.define('welcome-greeting', WelcomeGreeting);