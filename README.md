# Intelligent Query Assistant Web App

A simple web application built with React.js that provides an intelligent query handling interface. Inspired by Gemini, it integrates with the Gemini API to process user queries and display real-time responses with loading animations. It also tracks all previous queries in a sidebar.

## Features

- Interactive UI built using React.js
- Sidebar to display previous queries and responses
- Real-time API integration with Gemini API
- Loading and text animations for better user experience
- Modular and scalable component structure

## Technologies Used

- React.js
- Vite
- Gemini API
- CSS/Styled Components

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Gemini API key

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/somandhir/intelligent-query-assistant.git
   ```

2. Navigate to the project directory:
   ```bash
   cd intelligent-query-assistant
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Environment Setup

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Make sure to add `.env` to your `.gitignore` file to keep your API key secure
3. Replace `your_gemini_api_key_here` with your actual API key

## Project Structure

```
src/
├── components/     # React components (Main, Sidebar, etc.)
├── context/        # Context for global state management
├── config/         # API configuration files
├── assets/         # Additional assets (icons, styles)
public/             # Static assets
index.html          # Main HTML entry
vite.config.js      # Vite configuration
package.json        # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Usage

1. Enter your query in the input field
2. Click send or press Enter
3. View the AI-generated response in real-time
4. Access your query history in the sidebar
5. Click on previous queries to view them again

## Known Limitations

- The app currently does not handle images from API responses and ignores them
- Only the text response from the API is displayed
- Requires active internet connection for API calls

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


- Inspired by Google's Gemini interface
- Built with React.js and Vite for optimal performance
- Thanks to the open-source community for the tools and libraries used
