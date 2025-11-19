# AbacusFileFE

## Description
AbacusFileFE is a React-based frontend application designed for managing files. It provides functionalities such as uploading, listing, downloading, and deleting files. The application is styled using Material UI and supports drag-and-drop file uploads via `react-dropzone`. It is integrated with a backend service for file operations.

## Features
- **File Upload**: Upload files using drag-and-drop or manual selection.
- **File Listing**: View a list of uploaded files.
- **File Download**: Download files directly from the list.
- **File Deletion**: Delete files from the list.
- **Environment Configuration**: Uses Vite for environment variable management.

## Technologies Used
- **React**: Frontend framework.
- **Material UI**: UI components and styling.
- **Axios**: HTTP client for API calls.
- **react-dropzone**: Drag-and-drop file upload support.
- **Vite**: Build tool for fast development.

## Setup Instructions

### Prerequisites
- Node.js (>= 20.19.0 or >= 22.12.0)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/benedektothten/AbacusFileFE.git
   ```
2. Navigate to the project directory:
   ```bash
   cd AbacusFileFE/AbacusFileFE
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
To start the development server:
```bash
npm run dev
```

### Build
To build the project for production:
```bash
npm run build
```

### Environment Variables
The application uses environment variables for configuration. Add the following variables to your `.env` file or GitHub secrets:
- `VITE_BACKEND_URL`: The backend API URL.

### Deployment
This project is configured for deployment on Azure Static Web Apps. The deployment workflow is defined in `.github/workflows/azure-static-web-apps-yellow-rock-057c1f703.yml`.

## License
This project is licensed under the MIT License.