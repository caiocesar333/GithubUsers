const app = require('./app');  // Import the Express app from app.js
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});