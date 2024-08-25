
# Calories Dashboard App

This application tracks and displays calorie consumption data in a user-friendly dashboard. Users can submit their calorie intake without needing to log in, with data cached locally on their devices and synced when online.

## Features

- **Calories Dashboard**: Visualize calorie consumption data using a bar chart.
- **Local Data Storage**: User submissions are cached locally using Local Storage or IndexedDB.
- **Automatic Sync**: Cached data is automatically synced with the server when the user is online.
- **No Login Required**: Users can interact with the app without creating an account or logging in.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/calories-dashboard-app.git
   cd calories-dashboard-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your environment variables as needed, e.g., database connection strings.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Usage

1. **Track Calorie Intake**: Users can submit their calorie data, which will be displayed on the dashboard.
2. **Offline Mode**: If the user is offline, their submissions are stored locally and synced when they reconnect.
3. **View Dashboard**: Calorie data is visualized on a bar chart, showing daily intake.

## Technologies

- **Frontend**: React, Next.js, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express (or serverless functions if hosted on Vercel)
- **Storage**: Local Storage, IndexedDB
- **Hosting**: Vercel

## License

This project is licensed under the MIT License.
