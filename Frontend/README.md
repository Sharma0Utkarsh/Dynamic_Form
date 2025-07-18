Dynamic Form Creator


This project implements a dynamic form creator using HTML, CSS, and JavaScript. It allows for the generation of forms based on a configurable JavaScript object, supporting various input types, validation, and file uploads.

Features
Dynamic Form Generation: Forms are built programmatically based on a formConfig JavaScript object.

Multiple Field Types: Supports text, email, number, date, select (dropdown), multiselect (checkboxes), file upload, and nested "card" fields.

Form Sections: Organize fields into logical sections with titles and descriptions.

Client-Side Validation: Includes basic validation for required fields, email format, regular expressions, and min/max values for numbers and dates.

File Upload Handling: Allows users to upload files with a preview for images.

Configurable Submission: Defines a submission URL and text for the submit button.

Responsive Design: Basic styling is provided to ensure the form is usable on different screen sizes.

Project Structure
index.html: The main HTML file that provides the basic structure and links to the CSS and JavaScript files.

scripts.js: Contains the core JavaScript logic for generating, validating, and submitting the dynamic form.

style.css: Provides the styling for the form elements and overall layout.

How to Use
To run this project locally, follow these steps:

Clone the repository (or download the files):

git clone <repository-url>
cd dynamic-form-creator

(Replace <repository-url> with the actual URL if this were a Git repository.)

Open index.html in your web browser.

The form will be rendered dynamically based on the formConfig object defined in scripts.js.

Customizing the Form
The form's structure and behavior are controlled by the formConfig object in scripts.js. You can modify this object to:

Add/Remove Sections: Define new objects within the sections array.

Add/Remove Fields: Add or remove field objects within the fields array of each section.

Change Field Properties: Adjust title, name, placeholder, type, validator, required, value, min, max, error messages, and data for select/multiselect/file/card types.

Update Submission Details: Modify submitText and submitUrl.


File Uploads
The file field type requires a data object with url, method, and optional headers for the upload API endpoint. The form will attempt to upload files to this endpoint before submitting the main form data.

Form Submission
Upon successful validation and (if applicable) file uploads, the form data is collected into a JSON object and sent via a POST request to the submitUrl defined in formConfig.

Styling
The style.css file provides basic styling. You can modify it to match your application's design system. Key classes include:

.container: Main content wrapper.

.form-section: Styles for each logical section of the form.

.form-group: Styles for individual form fields (label + input/select).

.error: Styles for validation error messages.

.card: Styles for nested card fields.

.file-preview: Styles for displaying file previews.

.multiselect-container, .multiselect-option: Styles for the multiselect checkboxes.

Development Notes
Validation: Client-side validation is implemented, but server-side validation is always recommended for robust applications.

Error Handling: Basic error alerts are used for submission failures. In a production environment, consider more user-friendly error display mechanisms.

API Endpoints: The submitUrl and file upload URLs (file.data.url) in the formConfig are placeholders (https://api.example.com/submit, https://upload.example.com/pic). You will need to replace these with your actual backend API endpoints.
