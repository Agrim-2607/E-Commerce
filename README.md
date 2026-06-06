# HobbyMart

HobbyMart is a hobby-based e-commerce platform that helps users discover products based on their interests and hobbies. Designed with a premium, Apple-inspired minimalist aesthetic.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS, React Router
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth

## Setup Instructions

### 1. Database Setup
The database uses Supabase. Ensure you have the `hobbies`, `products`, `users`, `user_hobbies`, and `cart` tables created according to the schema.

### 2. Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the server: `npm run dev`

### 3. Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the development server: `npm run dev`

### Google OAuth Configuration (Placeholder/Instructions)
To enable Google OAuth:
1. Go to Google Cloud Console.
2. Create a new project and configure the OAuth consent screen.
3. Create OAuth 2.0 Client IDs. Set the Authorized Redirect URI to your Supabase project's redirect URL (`https://<your-project-id>.supabase.co/auth/v1/callback`).
4. Go to Supabase Dashboard -> Authentication -> Providers -> Google.
5. Enable Google and paste the Client ID and Client Secret obtained from Google Cloud Console.
6. The frontend login page's `Sign In with Google` button will automatically work with Supabase Auth!

## API Documentation
Base URL: `http://localhost:5000/api`

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /hobbies` - List all hobbies
- `POST /hobbies/user` - Save user hobbies
- `GET /hobbies/user/:userId` - Get user hobbies
- `GET /products` - List all products
- `GET /products/hobby/:hobbyId` - Get products by hobby
- `GET /products/:id` - Get product details
- `GET /cart/:userId` - Get user cart
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item quantity
- `DELETE /cart/:id` - Remove cart item
- `DELETE /cart/clear/:userId` - Clear user cart
