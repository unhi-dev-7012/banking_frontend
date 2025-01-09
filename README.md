# Frontend Template (React + TypeScript + Vite)

This project serves as a template for building scalable and maintainable frontend applications using **React**, **TypeScript**, and **Vite**.  
---

## **Directory Structure**

The directory is organized for clarity and maintainability. Here's a high-level overview with short descriptions of each folder and file:  

```
├── public/                 # Public assets served directly by the server
├── src/                    # Main source code for the application
│   ├── assets/             # Static assets like images, icons...
│   ├── components/         # Reusable UI components
│   ├── config/             # Configuration files
│   │   ├── firebase.ts
│   ├── constants/          # Application constants
│   │   ├── authorization.ts
│   │   ├── globalStyle.ts
│   │   ├── paginationParam.ts
│   │   ├── path.ts
│   │   └── tableState.ts
│   ├── features/           # Feature-specific logic and modules
│   │   ├── account/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── customer/
│   │   │   ├── contact/
│   │   │   │   ├── components/
│   │   │   │   ├── reducer/
│   │   │   │   ├── services/
│   │   │   │   ├── contact.state.ts
│   │   │   │   └── contact.type.ts
│   │   │   ├── dashboard/
│   │   │   ├── debt/
│   │   │   ├── notification/
│   │   │   └── transfer_transaction/
│   │   ├── employee/customers/
│   │   └── transactions/
│   ├── fonts/              # Custom fonts
│   ├── hooks/              # Custom React hooks
│   ├── routes/             # Application routes
│   ├── screens/            # Feature-based screens or pages
│   │   ├── admin/
│   │   ├── authentication/
│   │   ├── customer/
│   │   │   ├── DebtListScreen.tsx
│   │   │   ├── DebtSettleScreen.tsx
│   │   │   ├── CustomerDashboardScreen.tsx
│   │   │   └── CustomerHistoryScreen.tsx
│   │   ├── employee/
│   │   │   ├── accounts/
│   │   │   │   ├── AccountListScreen.tsx
│   │   │   │   └── HistoryScreen.tsx
│   ├── services/           # API interaction and business logic
│   │   ├── fetchTableData.ts
│   │   └── getBankAccountWithUser.ts
│   ├── stores/             # Application state management
│   │   └── app.ts
│   ├── utils/              # General-purpose utility functions
│   │   ├── api.ts
│   │   ├── checkRole.ts
│   │   ├── getUserRole.ts
│   │   ├── menuHelper.ts
│   │   └── redactBankAccount.ts
│   ├── App.tsx             # Root component
│   ├── global.css          # Global styles
│   ├── main.tsx            # Entry point
│   └── vite-env.d.ts       # TypeScript environment declarations
│
├── .env                    # Environment variables
├── .env.sample             # Example environment variables
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML template
├── package-lock.json
├── package.json            # Project dependencies
├── README.md               # Project documentation
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json
├── vercel.json             # Vercel deployment configuration
└── vite.config.ts          # Vite configuration
```

Below, each directory and file is explained in detail. Click on each section to expand/collapse the details.

---

<details>
<summary><b>1/ public/</b></summary>

Contains static assets that are directly served.  
- **vite.svg**: Example placeholder image, replaceable with project-specific assets.

</details>

---

<details>
<summary><b>2/ src/</b></summary>

The main source folder. Everything here contributes to the application logic and UI.

<details>
<summary><b>2.1/ components/</b></summary>

Reusable components categorized by feature/module, e.g., authentication, blacklist, etc.  
- Each subfolder corresponds to a feature (e.g., `@activity`, `@authentication`).  
- The **common/** subfolder contains shared components like layouts and authorization helpers.

</details>

<details>
<summary><b>2.2/ constants/</b></summary>

Stores application-wide constants:  
- **authorization.ts**: User roles and permissions.  
- **path.ts**: Centralized route paths for navigation.

</details>

<details>
<summary><b>2.3/ fonts/</b></summary>

Contains custom font files (e.g., Roboto). Ensure consistency in typography across the application.

</details>

<details>
<summary><b>2.4/ helpers/</b></summary>

Utility modules that encapsulate repetitive logic, such as formatting dates or handling API responses.

</details>

<details>
<summary><b>2.5/ hooks/</b></summary>

Custom React hooks for stateful logic shared across components, such as API data fetching or authentication.

</details>

<details>
<summary><b>2.6/ screens/</b></summary>

Feature-based screens or pages grouped by domain. For example:  
- **@activity/**: Screens for activity management like list, details, and create.  
- **@authentication/**: Screens for login, registration, and password management.  

</details>

<details>
<summary><b>2.7/ services/</b></summary>

Manages external API calls and business logic. Each file typically corresponds to a feature or domain.

</details>

<details>
<summary><b>2.8/ stores/</b></summary>

Centralized state management. Uses tools like Redux, Zustand, or Context API.  
- **app.ts**: Global application state (e.g., theme, language preferences).

</details>

<details>
<summary><b>2.9/ utils/</b></summary>

General-purpose utility functions that do not depend on specific modules or components.

</details>

<details>
<summary><b>2.10/ App.tsx</b></summary>

The root component. It defines the main layout, routes, and global providers like themes or state.

</details>

<details>
<summary><b>2.11/ global.css</b></summary>

Defines global styles and resets for the application.

</details>

<details>
<summary><b>2.12/ main.tsx</b></summary>

The entry point for the app. It initializes React and renders the root component.

</details>

</details>

---

<details>
<summary><b>3/ Other Configuration Files</b></summary>

<details>
<summary><b>.env</b></summary>

Holds environment-specific variables like API endpoints or keys.

</details>

<details>
<summary><b>eslint.config.js</b></summary>

Defines coding standards for consistent and error-free code.

</details>

<details>
<summary><b>vite.config.ts</b></summary>

Vite configuration for development and production builds.

</details>

</details>

---

## **How to Use**

1. **Install dependencies**:  
   ```bash
   npm install
   ```

2. **Run the development server**:  
   ```bash
   npm run dev
   ```

3. **Build for production**:  
   ```bash
   npm run build
   ```

4. **Preview the production build**:  
   ```bash
   npm run preview
   ```

---

This project template is a starting point for modern web apps. Its modular structure is designed to make development smoother and easier to maintain. Happy coding! 🎉
