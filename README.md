# LobsterLines - Real-Time Wait Times at Red Lobster Locations

## Project Description
Lobster Lines is a dynamic web application that provides real-time wait times at various Red Lobster restaurants. This application is built using React, NextJS, and leverages MapTiler and OpenStreetMaps for interactive mapping features. Backend functionality is handled using Vercel Serverless Functions, interfacing with the Red Lobster API to fetch current wait times.

## Prerequisites
Before setting up the project, ensure you have the following:
- Node.js installed on your system.
- A MapTiler API key (you will need to sign up at [MapTiler](https://www.maptiler.com/) to obtain your own key).

## Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/lobster-lines.git
   cd lobster-lines
2. **Environment Variables:**
Create a `.env.local` file in the root of your project and add the following line:
   ```bash
   NEXT_PUBLIC_MAPTILER_KEY=<Your_MapTiler_API_Key>
4. **Install Dependencies:**
   ```bash
   npm install
## Running the Application

-   **Development Mode:** Run the following command to start the development server:
    `npm run dev` 
    The application will be available at `http://localhost:3000`.
-   **Production Build:** To create a production build, use:
    `npm run build` 
    Then, to start the production server:
    `npm run start` 

## Contributing

Contributions to Lobster Lines are welcome. Please ensure to follow the established code style and conduct thorough testing before submitting any pull requests.

## License

This project is licensed under the Apache License 2.0.

----------

Happy Dining! 🦞