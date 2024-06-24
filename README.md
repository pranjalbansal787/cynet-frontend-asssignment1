# Cyethack Frontend Assignment 🎨

**Pranjal Bansal**

## Getting Started 🚀

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the project**:
   ```bash
   npm run dev
   ```

## Tech Stack Used 🛠️

- **npm** (Node Package Manager)
- **React.js**
- **React-Redux**
- **Material-UI**
- **js-cookie**
- **react-chartjs-2**
- **react-gauge-chart**

## Functionalities ✨

- **Search Scan by Name** 🔍
- **Proper Implementation of Routes**:
  - `/dashboard`
  - `/list`
  - `/list/details`
- **Components**:
  - `itemList`: Displays a list of scans
  - `itemDetails`: Shows detailed information for each scan via `/list/details` route
- **Item ID Handling**:
  - Each item has a unique `item_id`
  - `item_id` is stored in session storage and not visible in the tab
  - Only one `item_id` is fetched at a time; if the user navigates back to the list, the `item_id` persists in session storage, preventing redundant data fetching
- **Login/Logout Functionality**:
  - Utilizes `js-cookie` for session management
  - On login, a session cookie with the value `active` is created
  - On logout, the cookie is removed
- **Secure Session State Management** 🔐
- **Responsive Design**:
  - Ensures optimal performance on various screen sizes and devices 📱💻

## Directions to Use 📚

1. **Clone the repository** into your local machine:
   ```bash
   git clone https://github.com/pranjalbansal787/cynet-frontend-asssignment1
   cd cynet-frontend-asssignment1
   ```

2. **Run the project**:
   ```bash
   npm run dev
   ```
   The project will run on `localhost:5173`.

3. **Login**:
   - A login page with a navigation bar will appear
   - Use any credentials to login
   - Check the cookies in the inspect element (right-click on the screen). A cookie named `session` with the value `active` indicates that the user is logged in. This is managed using `js-cookie`.

4. **Navigation**:
   - The navigation bar includes options like **Dashboard** and **List**
   - Clicking **Dashboard** changes the route to `localhost:5173/dashboard`
   - Clicking **List** changes the route to `localhost:5173/list`, displaying a list of scans with additional tabs and a search bar (data is currently static)

5. **View Item Details**:
   - Click on any list item to navigate to `localhost:5173/list/details` for detailed information about that scan
   - The details page includes:
     - Number of scans with severities: critical, high, medium, low
     - A risk meter with a risk score
     - A vulnerability breakdown displayed in a bar graph based on severity

## Links 🔗

- **[GitHub Repository](https://github.com/pranjalbansal787/cynet-frontend-asssignment1)**
- **[Live Demo](https://cynet-frontend-asssignment-pranjal-bansal.vercel.app)**
