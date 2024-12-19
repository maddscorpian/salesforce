import { LitElement, html, css } from 'lit';

class WelcomeGreeting extends LitElement {
    static properties = {
        partnerName: { type: String },
        responseData: { type: String },
        imageUrl: { type: String },
        apiBaseUrl: { type: String },
        postId: { type: String }, // New property for Post ID
    };

    constructor() {
        super();
        this.partnerName = '';
        this.responseData = '';
        this.imageUrl = '';
        this.apiBaseUrl = 'https://6aba-49-207-205-227.ngrok-free.app'; // Replace with your API base URL
        this.postId = ''; // Initialize postId
    }

    static styles = css`
        h1 {
            color: blue;
        }
        .container {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .response {
            margin-top: 10px;
            color: green;
        }
        img {
            max-width: 300px;
            margin-top: 10px;
        }
    `;

    updated(changedProperties) {
        if (changedProperties.has('partnerName')) {
            console.log(`Partner name changed to: ${this.partnerName}`);
        }
    }

    render() {
        return html`
            <div class="container">
                <h2>MFE Example</h2>
                <h1>Welcome, ${this.partnerName}!</h1>
    
                <!-- Input for POST -->
                <input type="text" id="input-value" placeholder="Enter value" />
                <input type="text" id="input-id" placeholder="Enter ID" />
                <button @click=${this.handlePostData}>Post Data</button>
    
                <!-- Input for GET -->
                <input type="number" id="get-post-id" placeholder="Enter Post ID" />
                <button @click=${this.handleGetData}>Get Data</button>
                <p class="response">${this.responseData || 'No data available'}</p>
    
                <!-- File Upload -->
                <input type="file" id="file-upload" accept="image/*" @change=${this.handleImageUpload} />
                <button @click=${this.handleDownloadImage}>Download Image</button>
                ${this.imageUrl
                    ? html`<img src="${this.imageUrl}" alt="Uploaded Image" />`
                    : html`<p>No image uploaded yet.</p>`}
            </div>
        `;
    }

    handlePostData() {
        const inputValue = this.renderRoot.getElementById('input-value').value; // Get the input value
        const inputId = this.renderRoot.getElementById('input-id').value; // Get the input ID
        const jsonObject = {
            id: inputId, // Use the input ID
            value: inputValue // Use the input value
        };

        fetch(`${this.apiBaseUrl}/posts`, { // Replace with your API URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonObject),
        })
        .then(response => response.json())
        .then(data => {
            console.log('POST Success:', data);
            alert('Data Posted Successfully!');
        })
        .catch(error => {
            console.error('POST Error:', error);
            alert('Failed to post data. Please try again.');
        });
    }

    handleGetData() {
        const postId = this.renderRoot.getElementById('get-post-id').value; // Get the Post ID from the input field

        if (!postId) {
            alert('Please enter a valid Post ID.');
            return;
        }

        fetch(`${this.apiBaseUrl}/posts/${postId}`) // Replace with your API URL
            .then(response => response.json())
            .then(data => {
                console.log('GET Success:', data);
                this.responseData = JSON.stringify(data);
            })
            .catch(error => {
                console.error('GET Error:', error);
                alert('Failed to fetch data. Please try again.');
            });
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
    }

    handleDownloadImage() {
        if (!this.imageUrl) {
            alert('No image uploaded!');
            return;
        }

        const link = document.createElement('a');
        link.href = this.imageUrl;
        link.download = 'uploaded-image.jpg';
        link.click();
    }
}

customElements.define('welcome-greeting', WelcomeGreeting);