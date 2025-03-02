# LeetCode AI Buddy

LeetCode AI Buddy is a Chrome extension designed to assist students in solving LeetCode problems by providing intelligent hints. It leverages the GeminiAI API to analyze the user's code and suggest the next logical step, making the problem-solving process more efficient.

![Description](images/example.png)

## Features
- ✅ **Real-time Hints**: Get AI-generated hints while solving LeetCode problems.
- ✅ **Seamless Integration**: Works on `https://leetcode.com/problems/*` pages.
- ✅ **AI-Powered Suggestions**: Uses GeminiAI's API to provide context-aware guidance.
- ✅ **Lightweight & Fast**: Built with Vite and React for optimal performance.

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/saravanan7-dev/LeetCode-AI-Buddy.git
cd LeetCode-AI-Buddy
```

### 2. Install Dependencies
```sh
yarn install  # or npm install
```

### 3. Add a .env File
Create a `.env` file in the project root and add your Gemini AI API key:
```sh
VITE_GOOGLE_API_KEY=YOUR_API_KEY
```

### 4. Build the Extension
```sh
yarn build  # or npm run build
```

### 5. Load the Extension in Chrome
1. Open **Chrome** and go to `chrome://extensions/`
2. Enable **Developer Mode** (toggle in the top-right corner)
3. Click **Load unpacked** and select the `dist/` folder from the project directory

## Usage
1. Navigate to any LeetCode problem.
2. Click on the **LeetCode AI Buddy** extension icon.
3. Start coding, and the AI will provide hints based on your code!

## Technologies Used
- **React** (Vite-powered)
- **Tailwind CSS** (for styling)
- **GeminiAI API** (for AI-powered hints)

## Contributing
Contributions are welcome! Feel free to fork this repository and submit pull requests.

### Steps to Contribute:
1. **Fork** the repository.
2. Create a **new branch**:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```sh
   git push origin feature-branch
   ```
5. Create a **Pull Request** from your branch to `main`.

## License
This project is licensed under the **MIT License**.

## Contact
For questions or suggestions, reach out via [GitHub Issues](https://github.com/saravanan7-dev/LeetCode-AI-Buddy/issues).

