# Royal Academy School Management System

A comprehensive school management system built with React, TypeScript, and Supabase. This system includes features for admissions, teacher management, student records, and more.

## Features

### 🎓 Admissions Management
- Interactive admissions process with step-by-step application forms
- Real-time admission status toggle (ON/OFF)
- Contact admissions form with copy functionality for phone/email
- Performance optimized admissions page

### 👨‍🏫 Principal Dashboard
- Full administrative control panel
- Teacher management system
- Content management for all school pages
- Real-time data synchronization across ports
- Contact forms management with copy buttons

### 📚 Academic Management
- Course management system
- Yearly book recommendations
- Exam routine scheduling
- Top scorers showcase

### 🎨 Modern UI/UX
- Responsive design for all device sizes
- Animated transitions with Framer Motion
- Dark/light theme support
- Performance optimized components

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS, Shadcn UI
- **State Management**: React Hooks
- **Animations**: Framer Motion
- **Database**: Supabase (Real-time database)
- **Icons**: Lucide React
- **Routing**: React Router v6

## Key Components

### Pages
- `/` - Home page
- `/admissions` - Admissions process and forms
- `/principal-dashboard` - Administrative dashboard
- `/about` - School information
- `/academics` - Academic programs
- `/courses` - Course catalog
- `/yearly-book` - Book recommendations
- `/exam-routine` - Examination schedules
- `/facilities` - Campus facilities
- `/gallery` - Photo gallery
- `/top-scorers` - Academic achievements
- `/events` - School events

### Components
- Navigation and Footer
- Teacher and Student dashboards
- Content management systems
- Real-time data viewers

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd royal-academy-school
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Recent Enhancements

- ✅ Styled Apply Now buttons with gold font and sky blue border
- ✅ Added contact admissions form with name, class (1-12), phone, email
- ✅ Implemented copy buttons for phone and email in contact forms
- ✅ Real-time synchronization across different browser ports
- ✅ Removed general "Contact" link from navigation (preserving admissions contact)
- ✅ Performance optimizations for admissions page

## Project Structure

```
src/
├── components/          # Reusable UI components
├── lib/                 # Utility functions and Supabase integration
├── pages/               # Page components
├── assets/              # Images and static assets
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Supabase Integration

The system uses Supabase for:
- Real-time data synchronization
- User authentication
- Database storage
- Content management

All data is automatically synchronized across different browser tabs and devices.

## Performance Features

- Optimized scroll handling
- Throttled event listeners
- Efficient component rendering
- Lazy loading where appropriate
- Minimal console logging in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is proprietary to Royal Academy and should not be distributed without permission.

## Support

For support, contact the development team or create an issue in the repository.