
# Order Management System

A comprehensive order management application built with modern React technologies, featuring SKU management, order creation, and order tracking capabilities.

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: React Context API with useReducer
- **Form Handling**: React Hook Form with validation
- **Icons**: Lucide React

## ✨ Features

### Core Functionality
- **SKU Management**: Create, read, update, and manage product SKUs
- **Order Creation**: Interactive order form with customer details and item selection
- **Order Management**: View, filter, and update order statuses

### Technical Features
- **Performance Optimizations**: React.memo, useMemo, useCallback for efficient rendering
- **Form Validation**: Comprehensive validation for emails, phones, quantities, and required fields
- **Toast Notifications**: User feedback for all CRUD operations
- **Pagination**: Efficient data handling with customizable page sizes
- **Search & Filter**: Real-time search across SKUs and orders

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd order-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.

## 🏗️ Architecture & Design Decisions

### State Management
**Choice**: React Context API with useReducer
**Rationale**: 
- Sufficient for current application complexity
- No external dependencies required
- Easy to understand and maintain
- Can be easily migrated to Redux if needed

### Component Structure
**Choice**: Atomic design principles with reusable components
**Benefits**:
- High reusability and maintainability
- Consistent UI patterns
- Easy testing and debugging
- Scalable architecture

### Form Handling
**Choice**: React Hook Form
**Benefits**:
- Excellent performance with minimal re-renders
- Built-in validation support
- TypeScript integration
- Reduced boilerplate code

## 🔧 Trade-offs & Assumptions

### Trade-offs Made

1. **Local Storage vs. Real Database**
   - **Trade-off**: Used local storage instead of a backend database
   - **Impact**: Data is not shared between users/devices
   - **Benefit**: No backend infrastructure needed, faster development

2. **Context API vs. Redux**
   - **Trade-off**: Used Context API instead of Redux
   - **Impact**: Less powerful dev tools and middleware
   - **Benefit**: Simpler setup, no additional dependencies

### Assumptions Made

1. **User Base**: Assumed single-user application for demonstration purposes
2. **Data Volume**: Assumed moderate data volumes (hundreds of SKUs/orders)
3. **Browser Support**: Assumed modern browser support (ES2018+)
5. **Permissions**: Assumed all users have full CRUD permissions

## 🧪 Testing Considerations

While not implemented in this demo, the architecture supports easy testing:

- **Unit Tests**: Components are pure and testable
- **Integration Tests**: Context and hooks can be tested in isolation
- **E2E Tests**: Clear data-testid attributes for reliable selectors

## 🚀 Future Enhancements

1. **Backend Integration**: Replace mock API with real backend
2. **Authentication**: Add user authentication and authorization
3. **Real-time Updates**: WebSocket integration for live updates
4. **Advanced Filtering**: More sophisticated search and filter options
5. **Export/Import**: CSV/Excel export functionality
6. **Analytics Dashboard**: Order analytics and reporting
7. **Multi-language Support**: i18n internationalization
8. **PWA Features**: Offline support and push notifications
