# Badminton Court Booking System

A full-stack booking platform for a sports facility, allowing users to book courts, rent equipment, and hire coaches with dynamic pricing and conflict resolution.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React, Vite, CSS Modules
- **Architecture**: REST API, MVC Pattern

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (Running locally or via Atlas connection string)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment:
   - Create a `.env` file in `backend/` (see `.env.example` if available, or use the following):
     ```env
     PORT=5001
     MONGO_URI=mongodb://localhost:27017/badminton-court
     ```
4. Seed the Database:
   - Populates initial courts, equipment, coaches, and pricing rules.
   ```bash
   npm run seed
   ```
5. Start the Server:
   ```bash
   npm run dev
   ```
   Server will start on `http://localhost:5001`.

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Development Server:
   ```bash
   npm run dev
   ```
4. Open the application:
   - Visit `http://localhost:5173` (or the port shown in terminal).

## Design & Approach (Write-up)

### Database Design
I implemented a robust, normalized schema using MongoDB/Mongoose to ensure data integrity and flexibility.
- **Bookings Collection**: The central entity. It stores the `courtId`, `userId`, `date`, `timeRange`, and a list of `equipment`. Crucially, it includes a **Pricing Snapshot** (`basePrice`, `modifiers`, `totalPrice`) at the time of booking. This ensures that future changes to pricing rules do not affect historical booking records.
- **Resources**: `Courts`, `Coaches`, and `Equipment` are stored in separate collections. This modularity allows the Admin to easily add new resources without schema changes. `Equipment` tracks total inventory to prevent over-booking.
- **PricingRules**: Instead of hardcoding logic (e.g., `if (isWeekend)`), I created a `PricingRule` model. Each rule defines a `condition` (e.g., `days: ['sat', 'sun']`, `startTime: '18:00'`) and a `modifier` (`+10%`, `+100 INR`). This makes the system highly configurable.

### Pricing Engine
The pricing logic is separated into a dedicated `pricing.service.js`. It follows a **Rules Engine** pattern:
1.  **Base Calculation**: Determines the base cost (`Court Rate * Hours`).
2.  **Rule Stacking**: The engine fetches all active `PricingRules` from the database.
3.  **Condition Evaluation**: It iterates through rules, checking if the booking context (Time, Day, Attributes) matches the rule conditions.
4.  **Modifier Application**: If a rule applies, the modifier value is calculated (either a flat fee or percentage) and added to the total.
This approach satisfies the requirement for "stackable" rules (e.g., Peak Hour + Weekend + Premium Court) and allows Admins to create new pricing strategies without touching the code.

### Concurrency & Atomicity
To fulfill the requirement of atomic bookings and preventing double-booking:
- I used **MongoDB Transactions** (`startTransaction`) within the Booking Service.
- The transaction steps are:
    1.  **Lock & Check**: Re-validates availability for ALL requested resources (Court, Coach, Equipment quantities) within the transaction scope.
    2.  **Create**: Inserts the Booking document.
    3.  **Commit**: If all checks pass, the transaction commits. If any resource is unavailable, it aborts, ensuring the database never reaches an inconsistent state.

## Assumptions
- **Authentication**: A mock authentication middleware is used (`req.user = mockedUser`). In a production app, this would be replaced by JWT/Session auth.
- **Time Slots**: The system currently validates start/end times but creates bookings in arbitrary ranges. The frontend suggests hourly slots for better UX.
- **Currency**: All prices are stored as numbers and assumed to be in **INR (₹)** as per the recent update.
- **Equipment**: Equipment is rented per-booking duration (not per-hour) based on the provided rule implementation, but the engine supports extending this logic.

## Features Implemented
- ✅ **Multi-Resource Booking**: Book Court + Coach + Equipment in one go.
- ✅ **Dynamic Pricing**: Peak hours, Weekends, and Premium courts increase the price automatically.
- ✅ **Admin Panel**: Web interface to manage Courts, Rules, and Equipment availability.
- ✅ **Real-time Availability**: Frontend checks stock/slots before confirming.
- ✅ **Conflict Resolution**: Backend prevents double booking of courts or coaches.
