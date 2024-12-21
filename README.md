# Frontend Template (React + TypeScript + Vite)

This project serves as a template for building scalable and maintainable frontend applications using **React**, **TypeScript**, and **Vite**.  

> *"Try and fail, but don't fail to try."* – John Quincy Adams  

The directory structure is not standardized—it varies depending on the project and personal preferences. The primary goal is to keep the file organization manageable. Ultimately, the build process transforms all files into static assets for deployment, so the structure itself doesn’t directly affect the end result.  
Feel free to experiment! If the current setup doesn’t work well, we can always adapt and improve.  

---

## **Directory Structure**

The directory is organized for clarity and maintainability. Here's a high-level overview with short descriptions of each folder and file:  

```
├── public/                 # Public assets served directly by the server
├── src/                    # Main source code for the application
│   ├── assets/             # Static assets like images, icons...
│   ├── components/         # Reusable UI components organized by feature/module
│   │   ├── @activity/
│   │   ├── @authentication/
│   │   ├── @blacklist/
│   │   ├── @check-in/
│   │   ├── @participant/
│   │   ├── @student/
│   │   ├── @student-affairs/
│   │   ├── @training-point/
│   │   └── common/
│   │       ├── @authorization/
│   │       └── @layout/
│   │           ├── AppContent/
│   │           │   └── index.tsx
│   │           ├── AppHeader/
│   │           │   └── index.tsx
│   │           ├── AppSider/
│   │           │   └── index.tsx
│   │           ├── Layout/
│   │           │   └── index.tsx
│   │           └── index.tsx
│   │
│   ├── constants/          # Application constants like paths and permissions, ...
│   │   ├── authorization.ts
│   │   └── path.ts
│   │
│   ├── fonts/
│   │   ├── Roboto-Black.woff2
│   │   ├── Roboto-Bold.woff2
│   │   ├── Roboto-Light.woff2
│   │   ├── Roboto-Medium.woff2
│   │   ├── Roboto-Regular.woff2
│   │   └── Roboto-Thin.woff2
│   │
│   ├── hooks/              # Custom React hooks for reusable logic
│   ├── screens/            # Feature-based screens or pages
│   │   ├── @activity/
│   │   │   ├── ActivityCheckinScreen.tsx
│   │   │   ├── ActivityCreateScreen.tsx
│   │   │   ├── ActivityDetailScreen.tsx
│   │   │   ├── ActivityEditScreen.tsx
│   │   │   ├── ActivityListScreen.tsx
│   │   │   └── ActivityParticipantScreen.tsx
│   │   ├── @authentication/
│   │   │   ├── ChangePasswordScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RecoveryAccountScreen.tsx
│   │   ├── @blacklist/
│   │   │   ├── BlacklistDetailScreen.tsx
│   │   │   ├── BlacklistEditScreen.tsx
│   │   │   └── BlacklistListScreen.tsx
│   │   ├── @student/
│   │   │   ├── StudentDetailScreen.tsx
│   │   │   └── StudentListScreen.tsx
│   │   ├── @student-affairs/
│   │   │   ├── StudentAffairsDetailScreen.tsx
│   │   │   └── StudentAffairsListScreen.tsx
│   │   └── @training-point/
│   │       └── TrainingPointListScreen.tsx
│   │
│   ├── services/           # API interaction and business logic
│   ├── stores/             # Application state management
│   ├── utils/              # General-purpose utility functions
│   ├── App.tsx             # Root component of the app
│   ├── global.css          # Global styles
│   ├── main.tsx            # Application entry point
│   └── vite-env.d.ts       # TypeScript environment declarations
│
├── .env                    # Environment configuration
├── .gitignore              # Ignored files in Git
├── eslint.config.js
├── index.html              # Main HTML template
├── package-lock.json
├── package.json            # Project dependencies and scripts
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json             # Define paths when deploy on vercel
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