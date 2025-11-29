# MahaHelp Desk - Maharashtra Government Services Portal

A comprehensive web platform connecting Maharashtra citizens with government schemes, services, and benefits.

## 🌟 Features

### For Citizens
- **Browse Government Schemes** - Access all Maharashtra government schemes (yojanas) with eligibility criteria
- **Real-time Updates** - Live data synchronization with automatic updates every 30 minutes
- **District & Taluka Based Services** - Find services specific to your location
- **Document Helper** - Step-by-step guides to obtain required documents
- **Application Tracking** - Track your application status in real-time with live updates
- **Multilingual Support** - Available in English, Marathi, and Hindi
- **Emergency Helplines** - Quick access to important contact numbers
- **Dark Mode** - Comfortable viewing in any lighting condition
- **Location Services** - Automatic location detection for nearby services
- **Auto-refresh** - Data automatically updates without page reload

### For Government Officials
- **Secure Admin Panel** - Protected login (Username: pakshal, Password: Admin)
- **Real-time Dashboard** - Live application updates with WebSocket connection
- **Document Verification** - Review and verify submitted documents
- **Status Updates** - Update application status with instant sync
- **District-wise Management** - Filter and manage applications by district and taluka
- **Live Statistics** - Real-time metrics and application counts
- **Connection Status** - Visual indicator showing live/offline status

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Mhahelp-desk-main
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Your `.env` file is already configured:
```env
VITE_SUPABASE_URL=https://jazqpsxgsfadvkvhwnkf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Set up Supabase database:
- Go to your Supabase SQL Editor
- Run the migration file: `supabase/migrations/20250129000000_complete_setup.sql`
- This creates all tables, triggers, and policies

5. Run the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

### Admin Access
- **URL**: `/admin`
- **Username**: `pakshal`
- **Password**: `Admin`

## 📊 Database Setup

### Supabase Tables

Create the following tables in your Supabase project:

#### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  display_name TEXT,
  district TEXT,
  taluka TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### applications
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  scheme_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  district TEXT,
  taluka TEXT,
  documents JSONB,
  user_email TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Key Features Explained

### 1. Real-time Data System
- **Live Updates**: WebSocket connection for instant data sync
- **Auto-refresh**: Data updates every 30 minutes automatically
- **Connection Status**: Visual indicator (green = live, red = offline)
- **Last Update Time**: Shows when data was last refreshed
- **Manual Refresh**: Button to force immediate data update
- **Open Data Integration**: Ready to connect with India Open Data Portal APIs

### 2. Government Schemes Browser
- Browse all Maharashtra government schemes
- Real-time scheme updates
- Filter by category (Health, Education, Agriculture, etc.)
- Filter by district
- View eligibility criteria
- See required documents
- Access helpline numbers
- Direct application links
- Live data synchronization

### 2. Document Helper
- Step-by-step guides for obtaining:
  - Aadhar Card
  - Income Certificate
  - Caste Certificate
  - Domicile Certificate
  - And more...
- Required documents list
- Processing time information
- Office locations
- Fees information

### 3. Application System
- Apply for schemes online
- Upload required documents
- Track application status
- Receive notifications
- District and taluka selection

### 4. Admin Panel (Protected)
- **Secure Login**: Username/password authentication
- **Session Management**: Secure admin sessions
- **Real-time Dashboard**: Live application updates
- **WebSocket Connection**: Instant data synchronization
- **View all applications**: With live status updates
- **Filter by status, district, taluka**: Real-time filtering
- **Approve/reject applications**: Instant status updates
- **Document verification**: Live document review
- **Real-time statistics**: Live counts and metrics
- **Connection indicator**: Shows live/offline status
- **Auto-logout**: Secure session management

### 5. Multilingual Support
- English (EN)
- Marathi (मराठी)
- Hindi (हिंदी)
- Easy language switching
- All content translated

## 🗺️ Location Features

- **36 Districts** of Maharashtra
- **Complete Taluka Lists** for each district
- **Location-based Services** - Find services near you
- **Geolocation Support** - Automatic location detection

## 📱 Responsive Design

- Mobile-friendly interface
- Tablet optimized
- Desktop enhanced experience
- Touch-friendly controls

## 🔐 Security

- Supabase Authentication
- Protected routes
- Secure document upload
- Role-based access control
- Data encryption

## 🎨 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (Auth + Database + Realtime)
- **Real-time**: Supabase Realtime (WebSocket)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Theme**: next-themes (Dark/Light mode)
- **Data Sync**: Auto-update service with 30-minute intervals

## 🔄 Real-time Features

### WebSocket Connection
- **Live Updates**: Instant synchronization using Supabase Realtime
- **Auto-reconnect**: Automatic reconnection on connection loss
- **Status Indicator**: Visual feedback (green = live, red = offline)

### Auto-update System
- **Periodic Sync**: Data refreshes every 30 minutes automatically
- **Manual Refresh**: Force immediate update with refresh button
- **Background Sync**: Updates happen without interrupting user
- **Last Update Time**: Shows when data was last synchronized

### Real-time Tables
1. **Applications**: Live application status updates
2. **Schemes**: Real-time scheme additions/updates
3. **Admin Actions**: Instant approval/rejection sync

### Open Data Integration
- **Ready for APIs**: Configured to connect with India Open Data Portal
- **CSV Support**: Can parse and import CSV data
- **JSON Support**: Native JSON data handling
- **Auto-sync**: Scheduled data synchronization from external sources

## 📞 Important Helplines

- **Maharashtra Citizen Helpline**: 1077
- **Women Helpline**: 1091
- **Child Helpline**: 1098
- **Police Emergency**: 100
- **Ambulance**: 108
- **Fire Brigade**: 101

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Maharashtra Government for scheme information
- Supabase for backend infrastructure
- shadcn/ui for UI components

## 📧 Support

For support, email support@mahahelp.in or call 1077.

---

**Built with ❤️ for the people of Maharashtra**
