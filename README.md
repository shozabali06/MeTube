# MeTube

**MeTube** is a learning-oriented project that replicates key features of YouTube. It serves as a platform to explore and solidify skills in React.js, API integration, and modern web development techniques. Built using Vite for fast and optimized development, MeTube fetches video data through the YouTube API.

---

## Features

- **Home Page**: Displays a selection of popular videos.
- **Entertainment Page**: Curated videos for entertainment purposes.
- **Search Feature**: Allows users to search for videos using keywords.
- **Dynamic Routing**: Supports video-specific pages through dynamic route parameters.
- **Real-Time Data**: Video data (titles, thumbnails, view counts, etc.) is fetched from the YouTube API.
- **Progress Bar**: Provides visual feedback during API data fetching using `nprogress`.

---

## Technologies Used

- **Frontend Framework**: React.js (via Vite)
- **API Integration**: YouTube Data API v3
- **Routing**: React Router DOM
- **UI Enhancements**:
  - `moment` for date/time formatting
  - `nprogress` for progress bar implementation
  - Custom CSS for styling
- **Data Handling**: React Hooks (`useState`, `useEffect`)

---

## Prerequisites

Before running the project, ensure you have the following installed:

1. **Node.js** (LTS version recommended)
2. **npm** or **yarn** (comes with Node.js)

You will also need a valid API key from the [YouTube Data API](https://developers.google.com/youtube/registering_an_application).

---

## Installation

1. Clone the repository:
   ```bash
   git clone <https://github.com/shozabali06/MeTube.git>
   cd MeTube
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Add your YouTube API Key:
   - Open `data.js` and replace the `API_KEY` value with your own. Open the `data.js` file and replace the following line:
     ```javascript
     export const API_KEY = "your_api_key_here";
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:{port}
   ```

---

## Usage

1. Browse the homepage to view popular videos.
2. Navigate to different categories such as "Entertainment".
3. Use the search bar in the navigation menu to find specific videos.
4. Click on any video card to navigate to its dedicated page.

---

## Project Structure

```plaintext
src/
├── components/
│   ├── Feed.jsx         # Displays video feed
│   ├── SearchResults.jsx # Handles search functionality
│   └── Navbar.jsx       # Navigation bar
├── data/                # Stores constants like API_KEY
├── App.jsx              # Main app component
├── main.jsx             # Entry point
├── styles/              # CSS files
└── utils/               # Helper functions like view count conversion
```

---

## API Integration

- The project uses the [YouTube Data API v3](https://developers.google.com/youtube/v3) to fetch data.
- API endpoints:
  - **Search API**: Used for fetching videos based on search queries.
  - **Videos API**: Fetches video details such as view count and statistics.

---

## Limitations

- The project is designed for educational purposes and is not a fully functional video streaming platform.
- API quota limits may restrict the number of API calls per day.

---

## Future Enhancements

- Add user authentication.
- Implement a "Watch Later" or "Favorites" feature.
- Improve UI/UX with animations and advanced layouts.
- Support for video playback using an embedded player.

---

## License

This project is created for learning purposes and does not have a formal license.

---

## Acknowledgments

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3) for providing data and guidance.
- Open-source libraries like React, moment.js, and nprogress for making development easier.

Feel free to explore and customize MeTube to enhance your learning journey!
