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
