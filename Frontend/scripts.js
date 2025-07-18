 // Form configuration
        const formConfig = {
            sections: [
                {
                    title: "Basic Information",
                    description: "Please provide your basic details",
                    fields: [
                        {
                            "title": "Name",
                            "name": "name",
                            "placeholder": "Enter your name",
                            "type": "text",
                            "validator": "^[a-zA-Z ]{3,}$",
                            "value": "",
                            "required": true,
                            "error": "Name must be at least 3 letters."
                        },
                        {
                            "title": "Email",
                            "name": "email",
                            "placeholder": "you@example.com",
                            "type": "email",
                            "validator": "^[\\w.-]+@[\\w.-]+\\.\\w{2,4}$",
                            "required": true,
                            "value": "",
                            "error": "Invalid email format."
                        },
                        {
                            "title": "Age",
                            "name": "age",
                            "type": "number",
                            "min": "18",
                            "max": "99",
                            "resolution": "1",
                            "required": false,
                            "value": "",
                            "error": "Age must be between 18 and 99."
                        }
                    ]
                },
                {
                    title: "Skills",
                    description: "Select your primary language and technologies",
                    fields: [
                        {
                            "title": "Primary Language",
                            "name": "language",
                            "type": "select",
                            "data": [
                                { "id": "js", "title": "JavaScript" },
                                { "id": "py", "title": "Python" },
                                { "id": "rb", "title": "Ruby" }
                            ],
                            "required": true,
                            "value": "py",
                            "error": "Please select a language."
                        },
                        {
                            "title": "Technologies Known",
                            "name": "tech_stack",
                            "type": "multiselect",
                            "data": [
                                { "id": "react", "title": "React" },
                                { "id": "vue", "title": "Vue" },
                                { "id": "flutter", "title": "Flutter" }
                            ],
                            "required": false,
                            "value": ["react"],
                            "error": "Select at least one technology."
                        }
                    ]
                },
                {
                    title: "Additional Information",
                    description: "Upload your profile picture and education details",
                    fields: [
                        {
                            "title": "Upload Profile Picture",
                            "name": "profile_pic",
                            "type": "file",
                            "data": {
                                "url": "https://upload.example.com/pic",
                                "method": "POST",
                                "headers": {
                                    "Authorization": "Bearer sampleToken"
                                }
                            },
                            "required": true,
                            "error": "Profile picture is required."
                        },
                        {
                            "title": "Education Details",
                            "name": "education",
                            "type": "card",
                            "data": [
                                {
                                    "title": "Institution",
                                    "name": "institution",
                                    "type": "text",
                                    "validator": "^.{3,}$",
                                    "required": true,
                                    "error": "Institution name is required."
                                },
                                {
                                    "title": "Start Year",
                                    "name": "start_year",
                                    "type": "date",
                                    "min": "2000-01-01",
                                    "max": "2025-12-31",
                                    "resolution": "1",
                                    "required": true,
                                    "error": "Enter valid start year."
                                }
                            ],
                            "required": true,
                            "error": "All education fields are mandatory."
                        }
                    ]
                }
            ],
            submitText: "Submit Form",
            submitUrl: "https://api.example.com/submit"
        };

        class DynamicForm {
            constructor(config) {
                this.config = config;
                this.formData = {};
                this.fileData = {};
                this.errors = {};
                this.init();
            }

            init() {
                this.renderForm();
                this.setupEventListeners();
            }

            renderForm() {
                const formContainer = document.getElementById('form-container');
                formContainer.innerHTML = '';

                // Create form element
                const form = document.createElement('form');
                form.id = 'dynamic-form';

                // Render all sections
                this.config.sections.forEach(section => {
                    const sectionDiv = document.createElement('div');
                    sectionDiv.className = 'form-section';

                    // Add section title
                    if (section.title) {
                        const title = document.createElement('h2');
                        title.textContent = section.title;
                        sectionDiv.appendChild(title);
                    }

                    // Add section description
                    if (section.description) {
                        const description = document.createElement('p');
                        description.textContent = section.description;
                        sectionDiv.appendChild(description);
                    }

                    // Render all fields in the section
                    section.fields.forEach(fieldConfig => {
                        const fieldElement = this.renderField(fieldConfig);
                        if (fieldElement) {
                            sectionDiv.appendChild(fieldElement);
                        }
                    });

                    form.appendChild(sectionDiv);
                });

                // Add submit button
                const submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.textContent = this.config.submitText || 'Submit';
                form.appendChild(submitButton);

                formContainer.appendChild(form);
            }

            renderField(fieldConfig) {
                switch (fieldConfig.type) {
                    case 'text':
                    case 'email':
                    case 'number':
                    case 'date':
                        return this.renderInputField(fieldConfig);
                    case 'select':
                        return this.renderSelectField(fieldConfig);
                    case 'multiselect':
                        return this.renderMultiselectField(fieldConfig);
                    case 'file':
                        return this.renderFileField(fieldConfig);
                    case 'card':
                        return this.renderCardField(fieldConfig);
                    default:
                        console.warn(`Unknown field type: ${fieldConfig.type}`);
                        return null;
                }
            }

            renderInputField(fieldConfig) {
                const group = document.createElement('div');
                group.className = 'form-group';

                const label = document.createElement('label');
                label.htmlFor = fieldConfig.name;
                label.textContent = fieldConfig.title;
                if (fieldConfig.required) {
                    label.textContent += ' *';
                }
                group.appendChild(label);

                const input = document.createElement('input');
                input.type = fieldConfig.type;
                input.id = fieldConfig.name;
                input.name = fieldConfig.name;
                
                if (fieldConfig.placeholder) {
                    input.placeholder = fieldConfig.placeholder;
                }
                if (fieldConfig.value) {
                    input.value = fieldConfig.value;
                }
                if (fieldConfig.required) {
                    input.required = fieldConfig.required;
                }
                if (fieldConfig.min) {
                    input.min = fieldConfig.min;
                }
                if (fieldConfig.max) {
                    input.max = fieldConfig.max;
                }
                if (fieldConfig.step) {
                    input.step = fieldConfig.step;
                }
                
                group.appendChild(input);

                if (fieldConfig.validator) {
                    this.setupValidation(input, fieldConfig);
                }

                const errorSpan = document.createElement('span');
                errorSpan.className = 'error';
                errorSpan.id = `${fieldConfig.name}-error`;
                group.appendChild(errorSpan);

                return group;
            }

            renderSelectField(fieldConfig) {
                const group = document.createElement('div');
                group.className = 'form-group';

                const label = document.createElement('label');
                label.htmlFor = fieldConfig.name;
                label.textContent = fieldConfig.title;
                if (fieldConfig.required) {
                    label.textContent += ' *';
                }
                group.appendChild(label);

                const select = document.createElement('select');
                select.id = fieldConfig.name;
                select.name = fieldConfig.name;
                if (fieldConfig.required) {
                    select.required = fieldConfig.required;
                }

                fieldConfig.data.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option.id;
                    opt.textContent = option.title;
                    if (fieldConfig.value === option.id) {
                        opt.selected = true;
                    }
                    select.appendChild(opt);
                });

                group.appendChild(select);

                const errorSpan = document.createElement('span');
                errorSpan.className = 'error';
                errorSpan.id = `${fieldConfig.name}-error`;
                group.appendChild(errorSpan);

                return group;
            }

            renderMultiselectField(fieldConfig) {
                const group = document.createElement('div');
                group.className = 'form-group';

                const label = document.createElement('label');
                label.textContent = fieldConfig.title;
                if (fieldConfig.required) {
                    label.textContent += ' *';
                }
                group.appendChild(label);

                const container = document.createElement('div');
                container.className = 'multiselect-container';

                fieldConfig.data.forEach(option => {
                    const optionDiv = document.createElement('div');
                    optionDiv.className = 'multiselect-option';

                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.id = `${fieldConfig.name}-${option.id}`;
                    input.name = fieldConfig.name;
                    input.value = option.id;
                    
                    // Check if this option is in the default values
                    if (fieldConfig.value && fieldConfig.value.includes(option.id)) {
                        input.checked = true;
                    }

                    const optionLabel = document.createElement('label');
                    optionLabel.htmlFor = `${fieldConfig.name}-${option.id}`;
                    optionLabel.textContent = option.title;

                    optionDiv.appendChild(input);
                    optionDiv.appendChild(optionLabel);
                    container.appendChild(optionDiv);
                });

                group.appendChild(container);

                const errorSpan = document.createElement('span');
                errorSpan.className = 'error';
                errorSpan.id = `${fieldConfig.name}-error`;
                group.appendChild(errorSpan);

                return group;
            }

            renderFileField(fieldConfig) {
                const group = document.createElement('div');
                group.className = 'form-group';

                const label = document.createElement('label');
                label.htmlFor = fieldConfig.name;
                label.textContent = fieldConfig.title;
                if (fieldConfig.required) {
                    label.textContent += ' *';
                }
                group.appendChild(label);

                const input = document.createElement('input');
                input.type = 'file';
                input.id = fieldConfig.name;
                input.name = fieldConfig.name;
                if (fieldConfig.required) {
                    input.required = fieldConfig.required;
                }
                group.appendChild(input);

                const previewDiv = document.createElement('div');
                previewDiv.className = 'file-preview';
                previewDiv.id = `${fieldConfig.name}-preview`;
                group.appendChild(previewDiv);

                const errorSpan = document.createElement('span');
                errorSpan.className = 'error';
                errorSpan.id = `${fieldConfig.name}-error`;
                group.appendChild(errorSpan);

                return group;
            }

            renderCardField(fieldConfig) {
                const card = document.createElement('div');
                card.className = 'card';

                if (fieldConfig.title) {
                    const title = document.createElement('h3');
                    title.className = 'card-title';
                    title.textContent = fieldConfig.title;
                    card.appendChild(title);
                }

                fieldConfig.data.forEach(nestedFieldConfig => {
                    const fieldElement = this.renderField(nestedFieldConfig);
                    if (fieldElement) {
                        card.appendChild(fieldElement);
                    }
                });

                const errorSpan = document.createElement('span');
                errorSpan.className = 'error';
                errorSpan.id = `${fieldConfig.name}-error`;
                card.appendChild(errorSpan);

                return card;
            }

            setupValidation(input, fieldConfig) {
                if (fieldConfig.validator) {
                    input.pattern = fieldConfig.validator;
                }

                input.addEventListener('input', () => {
                    this.validateField(input, fieldConfig);
                });

                input.addEventListener('blur', () => {
                    this.validateField(input, fieldConfig);
                });
            }

            validateField(input, fieldConfig) {
                const errorElement = document.getElementById(`${input.name}-error`);
                let isValid = true;
                let errorMessage = '';

                if (fieldConfig.required && !input.value.trim()) {
                    isValid = false;
                    errorMessage = fieldConfig.error || 'This field is required';
                } else if (input.type === 'email' && !this.validateEmail(input.value)) {
                    isValid = false;
                    errorMessage = fieldConfig.error || 'Please enter a valid email';
                } else if (input.pattern && !new RegExp(input.pattern).test(input.value)) {
                    isValid = false;
                    errorMessage = fieldConfig.error || 'Invalid format';
                } else if (input.min && input.value < input.min) {
                    isValid = false;
                    errorMessage = fieldConfig.error || `Value must be at least ${input.min}`;
                } else if (input.max && input.value > input.max) {
                    isValid = false;
                    errorMessage = fieldConfig.error || `Value must be at most ${input.max}`;
                }

                if (isValid) {
                    input.classList.remove('invalid');
                    errorElement.textContent = '';
                    delete this.errors[input.name];
                } else {
                    input.classList.add('invalid');
                    errorElement.textContent = errorMessage;
                    this.errors[input.name] = errorMessage;
                }

                return isValid;
            }

            validateCard(cardConfig) {
                let isValid = true;
                
                cardConfig.data.forEach(nestedField => {
                    const input = document.querySelector(`[name="${nestedField.name}"]`);
                    if (input && !this.validateField(input, nestedField)) {
                        isValid = false;
                    }
                });

                const cardError = document.getElementById(`${cardConfig.name}-error`);
                if (!isValid) {
                    cardError.textContent = cardConfig.error || 'Please fill all required fields';
                } else {
                    cardError.textContent = '';
                }

                return isValid;
            }

            validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }

            setupEventListeners() {
                const form = document.getElementById('dynamic-form');
                if (!form) return;

                // Handle file input changes
                this.config.sections.forEach(section => {
                    section.fields
                        .filter(field => field.type === 'file')
                        .forEach(fileField => {
                            const input = document.getElementById(fileField.name);
                            if (input) {
                                input.addEventListener('change', (e) => this.handleFileChange(e, fileField));
                            }
                        });
                });

                // Handle form submission
                form.addEventListener('submit', (e) => this.handleSubmit(e));
            }

            handleFileChange(event, fieldConfig) {
                const files = event.target.files;
                const previewDiv = document.getElementById(`${fieldConfig.name}-preview`);
                previewDiv.innerHTML = '';

                if (files.length > 0) {
                    this.fileData[fieldConfig.name] = {
                        files: files,
                        config: fieldConfig
                    };

                    // Display preview for images
                    if (files[0].type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            previewDiv.appendChild(img);
                        };
                        reader.readAsDataURL(files[0]);
                    } else {
                        const fileInfo = document.createElement('p');
                        fileInfo.textContent = `File: ${files[0].name}`;
                        previewDiv.appendChild(fileInfo);
                    }
                } else {
                    delete this.fileData[fieldConfig.name];
                }
            }

            async handleSubmit(event) {
                event.preventDefault();
                const form = event.target;

                // Validate all fields before submission
                let isValid = true;
                this.errors = {};

                this.config.sections.forEach(section => {
                    section.fields.forEach(fieldConfig => {
                        if (fieldConfig.type === 'card') {
                            if (!this.validateCard(fieldConfig)) {
                                isValid = false;
                            }
                        } else if (fieldConfig.type === 'multiselect') {
                            // Multiselect validation
                            const checkboxes = form.querySelectorAll(`input[name="${fieldConfig.name}"]:checked`);
                            if (fieldConfig.required && checkboxes.length === 0) {
                                const errorElement = document.getElementById(`${fieldConfig.name}-error`);
                                errorElement.textContent = fieldConfig.error || 'Please select at least one option';
                                isValid = false;
                                this.errors[fieldConfig.name] = fieldConfig.error;
                            }
                        } else {
                            const input = form.querySelector(`[name="${fieldConfig.name}"]`);
                            if (input && !this.validateField(input, fieldConfig)) {
                                isValid = false;
                            }
                        }
                    });
                });

                if (!isValid) {
                    console.error('Form contains errors', this.errors);
                    return;
                }

                // Collect form data
                this.formData = {};

                this.config.sections.forEach(section => {
                    section.fields.forEach(fieldConfig => {
                        if (fieldConfig.type === 'card') {
                            // Handle card fields
                            const cardData = {};
                            fieldConfig.data.forEach(nestedField => {
                                const input = form.querySelector(`[name="${nestedField.name}"]`);
                                if (input) {
                                    cardData[nestedField.name] = input.value;
                                }
                            });
                            this.formData[fieldConfig.name] = cardData;
                        } else if (fieldConfig.type === 'multiselect') {
                            // Handle multiselect
                            const checkboxes = form.querySelectorAll(`input[name="${fieldConfig.name}"]:checked`);
                            const selectedValues = Array.from(checkboxes).map(cb => cb.value);
                            this.formData[fieldConfig.name] = selectedValues;
                        } else if (fieldConfig.type !== 'file') {
                            // Handle regular fields
                            const input = form.querySelector(`[name="${fieldConfig.name}"]`);
                            if (input) {
                                this.formData[fieldConfig.name] = input.value;
                            }
                        }
                    });
                });

                // Handle file uploads first if any
                if (Object.keys(this.fileData).length > 0) {
                    try {
                        const fileUploadResponses = await this.uploadFiles();
                        // Merge file upload responses with form data
                        Object.assign(this.formData, fileUploadResponses);
                    } catch (error) {
                        console.error('File upload failed:', error);
                        alert('File upload failed. Please try again.');
                        return;
                    }
                }

                // Submit the form data
                try {
                    const response = await fetch(this.config.submitUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(this.formData),
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log('Form submitted successfully:', result);
                        alert('Form submitted successfully!');
                        form.reset();
                    } else {
                        throw new Error('Server responded with an error');
                    }
                } catch (error) {
                    console.error('Form submission failed:', error);
                    alert('Form submission failed. Please try again.');
                }
            }

            async uploadFiles() {
                const uploadResponses = {};
                
                for (const [fieldName, fileInfo] of Object.entries(this.fileData)) {
                    const formData = new FormData();
                    formData.append('file', fileInfo.files[0]);

                    try {
                        const response = await fetch(fileInfo.config.data.url, {
                            method: fileInfo.config.data.method || 'POST',
                            headers: fileInfo.config.data.headers || {},
                            body: formData
                        });

                        if (response.ok) {
                            const result = await response.json();
                            uploadResponses[fieldName] = result.fileUrl || result;
                        } else {
                            throw new Error(`File upload failed for ${fieldName}`);
                        }
                    } catch (error) {
                        console.error(`Error uploading file for ${fieldName}:`, error);
                        throw error;
                    }
                }

                return uploadResponses;
            }
        }

        // Initialize the form when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new DynamicForm(formConfig);
        });