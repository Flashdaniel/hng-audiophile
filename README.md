# Audiophile E-Commerce Platform

A modern, full-stack e-commerce application for audio equipment built with Next.js and Convex. Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.

## 🎯 Features

- **Product Catalog**: Browse and explore premium audio products (Headphones, Speakers, Earphones)
- **Shopping Cart**: Add products to cart with localStorage persistence
- **Checkout System**: Complete checkout flow with customer and shipping information
- **Order Management**: Create and view order confirmations with detailed order information
- **Email Notifications**: Optional SendGrid integration for order confirmation emails
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, elegant interface with smooth animations and transitions

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.0.1](https://nextjs.org/) with App Router
- **React**: 19.2.0
- **Backend**: [Convex](https://www.convex.dev/) - Real-time backend as a service
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email Service**: SendGrid (optional)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- A [Convex](https://www.convex.dev/) account (for backend services)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd audiophile
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Convex

1. Create a new Convex project at [convex.dev](https://www.convex.dev/)
2. Initialize Convex in your project:

```bash
npx convex dev
```

3. Copy the Convex URL provided and add it to your environment variables (see below)

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

# Optional: SendGrid configuration for email notifications
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM=no-reply@audiophile.example
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
audiophile/
├── app/                    # Next.js App Router pages
│   ├── checkout/          # Checkout page
│   ├── order/[id]/        # Order confirmation page
│   ├── ConvexClientProvider.js  # Convex client setup
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components (Button, Card)
│   ├── Navbar.jsx        # Navigation component
│   └── Product.jsx       # Product card component
├── convex/               # Convex backend functions
│   ├── cart.js          # Cart mutations and queries
│   └── orders.js        # Order creation and retrieval
├── lib/                  # Utility functions
│   └── utils.js         # Helper utilities
├── public/               # Static assets
│   ├── fonts/           # Custom fonts (Manrope)
│   └── *.png            # Product and hero images
└── package.json         # Project dependencies and scripts
```

## 🎮 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 🛒 Application Flow

1. **Home Page**: Browse products (Headphones, Speakers, Earphones)
2. **Add to Cart**: Click "SHOP" on any product to add it to your cart
3. **Checkout**: Navigate to `/checkout` to review cart and enter customer/shipping details
4. **Order Confirmation**: After placing an order, view confirmation at `/order/[id]`
5. **Email Notification**: (Optional) Receive order confirmation email via SendGrid

## 💡 Key Features Explained

### Shopping Cart
- Cart items are stored in browser localStorage
- Supports quantity management
- Persists across page refreshes

### Order Management
- Orders are stored in Convex database
- Each order includes:
  - Customer information (name, email, phone)
  - Shipping address
  - Order items with quantities and prices
  - Calculated totals (subtotal, shipping, taxes, total)
  - Order status and timestamp

### Email Integration
- Optional SendGrid integration for order confirmations
- Automatically sends HTML email with order details
- Gracefully handles email failures without breaking order creation

## 🎨 Styling

The project uses Tailwind CSS with custom configuration:
- Custom color palette (dark theme with orange accents)
- Custom fonts (Manrope family)
- Responsive breakpoints
- Smooth transitions and hover effects

## 🔧 Configuration Files

- `next.config.mjs` - Next.js configuration
- `components.json` - UI component configuration
- `jsconfig.json` - JavaScript path aliases
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration

## 📝 Notes

- The cart currently uses localStorage (client-side). For production, consider implementing server-side cart management.
- SendGrid email integration is optional. Orders will be created successfully even without SendGrid configuration.
- Product prices are hardcoded in the `Product` component. Consider moving to a database or configuration file for better maintainability.

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_CONVEX_URL` - Your Convex deployment URL
- `SENDGRID_API_KEY` - (Optional) SendGrid API key for emails
- `SENDGRID_FROM` - (Optional) Sender email address

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built for HNG Internship Stage 3
- Design inspired by modern e-commerce best practices
- Powered by Next.js and Convex
