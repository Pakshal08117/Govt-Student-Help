# Government & Student Help Platform - Design Document

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (Browser)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 18 + TypeScript + Vite                        │  │
│  │  - Components (UI, Pages, Features)                  │  │
│  │  - Context Providers (Auth, Language, EssentialMode) │  │
│  │  - React Router 6 (Navigation)                       │  │
│  │  - TanStack Query (Data Fetching)                    │  │
│  │  - Tailwind CSS + shadcn/ui (Styling)               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    Backend Services Layer                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Supabase (PostgreSQL + Auth + Real-time)           │  │
│  │  - Database Tables (profiles, schemes, applications) │  │
│  │  - Row Level Security (RLS) Policies                │  │
│  │  - Authentication Service                            │  │
│  │  - Real-time Subscriptions                          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  External APIs                                       │  │
│  │  - data.gov.in (Government Data)                    │  │
│  │  - Web Speech API (Voice Recognition/TTS)          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

**Frontend:**
- **Framework**: React 18.3.1 with TypeScript 5.9.3
- **Build Tool**: Vite 5.4.21
- **Styling**: Tailwind CSS 3.4.19 with CSS variables
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router 6.30.3
- **State Management**: React Context API
- **Data Fetching**: TanStack Query 5.90.20
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React 0.462.0
- **Notifications**: Sonner (toast notifications)
- **Theme**: next-themes for dark/light mode

**Backend:**
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + Session Storage (admin)
- **Real-time**: Supabase real-time subscriptions
- **Security**: Row Level Security (RLS) policies

**Voice & AI:**
- **Speech Recognition**: Web Speech API
- **Text-to-Speech**: Web Speech Synthesis
- **NLP**: Custom algorithms for problem analysis

---

## 2. Component Architecture

### 2.1 Directory Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (Radix UI wrappers)
│   ├── AIAssistant.tsx # AI chatbot with voice support
│   ├── SiteHeader.tsx  # Navigation header
│   ├── SiteFooter.tsx  # Footer component
│   ├── AdminLogin.tsx  # Admin authentication
│   └── ...             # Other shared components
├── contexts/           # React Context providers
│   ├── AuthContext.tsx        # User authentication state
│   ├── LanguageContext.tsx    # Multi-language support
│   ├── EssentialModeContext.tsx
│   └── LanguageTranslations.ts
├── pages/              # Route components
│   ├── Index.tsx       # Homepage
│   ├── Schemes.tsx     # Schemes listing
│   ├── SchemeDetail.tsx
│   ├── UserDashboard.tsx
│   ├── AdminPanel.tsx
│   ├── Auth.tsx        # Authentication page
│   └── ...
├── data/               # Static data and configurations
│   ├── schemes.ts      # Government schemes database
│   ├── locations.ts    # Indian states and districts
│   └── services.ts     # Government services data
├── services/           # Business logic and API calls
│   ├── aiService.ts    # AI chatbot intelligence
│   └── explainableAI.ts
├── hooks/              # Custom React hooks
│   ├── useProfile.ts
│   └── useGovernmentData.ts
├── lib/                # Utility functions
│   ├── utils.ts        # cn() helper for className merging
│   └── auth.ts
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
└── main.tsx            # Application entry point
```

### 2.2 Context Providers

**Provider Hierarchy (in App.tsx):**
1. HelmetProvider (SEO)
2. ThemeProvider (dark/light mode)
3. EssentialModeProvider
4. LanguageProvider (12 Indian languages)
5. AuthProvider (user authentication)
6. Router

**AuthContext:**
- Manages user authentication state
- Provides login, logout, signup functions
- Handles session management with Supabase Auth
- Exposes current user and loading state

**LanguageContext:**
- Manages current language selection
- Provides translations for all UI elements
- Supports 12 Indian languages
- Persists language preference in localStorage

**EssentialModeContext:**
- Manages Essential Mode toggle state
- Persists preference in localStorage
- Provides boolean flag for conditional styling

---

## 3. Data Model

### 3.1 Database Schema

**profiles table:**
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  state TEXT,
  district TEXT,
  date_of_birth DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**schemes table:**
```sql
CREATE TABLE schemes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  eligibility TEXT,
  benefits TEXT,
  documents TEXT,
  official_url TEXT,
  state TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**applications table:**
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  scheme_id UUID REFERENCES schemes(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  applied_date TIMESTAMP DEFAULT NOW(),
  reviewed_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**scholarship_queries table:**
```sql
CREATE TABLE scholarship_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  query TEXT NOT NULL,
  response TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**government_data_cache table:**
```sql
CREATE TABLE government_data_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,
  data JSONB,
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3.2 Row Level Security (RLS) Policies

**profiles table:**
- Users can read their own profile
- Users can update their own profile
- Admins can read all profiles

**applications table:**
- Users can read their own applications
- Users can create applications
- Admins can read and update all applications

**schemes table:**
- Public read access for all users
- Only admins can create/update/delete schemes

**scholarship_queries table:**
- Users can read their own queries
- Users can create queries
- Admins can read all queries

---

## 4. Feature Design

### 4.1 Multi-Language Support

**Implementation:**
- Language translations stored in `LanguageTranslations.ts`
- LanguageContext provides `t()` function for translations
- Language selector in SiteHeader component
- Font families: Poppins (default), Noto Sans Devanagari (Hindi)

**Supported Languages:**
```typescript
type Language = 'en' | 'hi' | 'mr' | 'bn' | 'te' | 'ta' | 'gu' | 'kn' | 'ml' | 'pa' | 'or' | 'as';
```

**Translation Structure:**
```typescript
interface Translations {
  [key: string]: {
    [language in Language]: string;
  };
}
```

### 4.2 AI Assistant with Voice

**Components:**
- `AIAssistant.tsx`: Main chatbot UI
- `ExplainableAIChat.tsx`: Enhanced AI with transparency
- `aiService.ts`: AI logic and scheme matching
- `explainableAI.ts`: Explainable AI service

**Voice Features:**
- Speech Recognition using Web Speech API
- Text-to-Speech using Web Speech Synthesis
- Language-specific voice selection
- Voice command processing

**AI Logic:**
1. User submits query (text or voice)
2. System analyzes query for keywords and intent
3. Matches query to relevant schemes
4. Generates response with scheme recommendations
5. Stores query in database for analytics
6. Provides voice response if enabled

### 4.3 User Authentication

**User Flow:**
1. User visits Auth page
2. Chooses Sign Up or Sign In tab
3. Enters email and password
4. Supabase Auth handles authentication
5. On success, redirected to dashboard
6. Session maintained via Supabase client

**Admin Flow:**
1. Admin visits Auth page or /admin
2. Clicks Admin tab
3. Enters credentials from environment variables
4. Session stored in sessionStorage
5. Redirected to AdminPanel
6. Protected by ProtectedRoute component

### 4.4 Scheme Discovery

**Schemes Page:**
- Grid/list view of all schemes
- Category filters (Healthcare, Agriculture, Housing, etc.)
- State filters (All India, Maharashtra, Karnataka, etc.)
- Search functionality
- Pagination or infinite scroll

**Scheme Detail Page:**
- Full scheme information
- Eligibility checker
- Required documents list
- Application process steps
- Link to official government portal
- Apply button (redirects to official site)

### 4.5 Application Management

**User Dashboard:**
- Profile information display
- Application history table
- Application status badges (Pending, Approved, Rejected)
- Filter and search applications
- View application details

**Admin Panel:**
- Statistics dashboard (users, applications, today's activity)
- User management table
- Application management table
- Approve/Reject/Review actions
- Delete functionality
- Real-time data updates

### 4.6 Essential Mode

**Implementation:**
- EssentialModeContext provides `isEssentialMode` boolean
- Toggle button in SiteHeader
- Conditional Tailwind classes based on mode

**Essential Mode Styles:**
- White background instead of gradients
- Borders instead of shadows
- System fonts instead of custom fonts
- No animations or transitions
- High contrast for readability
- Professional government-grade appearance

---

## 5. API Design

### 5.1 Supabase Client Configuration

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 5.2 Data Fetching Patterns

**Using TanStack Query:**
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['schemes'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('schemes')
      .select('*');
    if (error) throw error;
    return data;
  }
});
```

**Real-time Subscriptions:**
```typescript
useEffect(() => {
  const subscription = supabase
    .channel('applications')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'applications' },
      (payload) => {
        // Handle real-time updates
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### 5.3 Government Data Integration

**Data Sources:**
- data.gov.in API for scheme datasets
- Cached in `government_data_cache` table
- Updated periodically via background jobs

**Cache Strategy:**
- Check cache first
- If cache expired or missing, fetch from API
- Store in cache with timestamp
- Return data to client

---

## 6. UI/UX Design

### 6.1 Design System

**Color Palette:**
- Primary: Deep Blue (#1e40af, #3b82f6)
- Secondary: Green (#16a34a, #22c55e)
- Accent: Saffron/Orange (#ea580c, #f97316)
- Background: White, Light Gray
- Text: Dark Gray, Black

**Typography:**
- Font Family: Poppins (English), Noto Sans Devanagari (Hindi)
- Headings: Bold, larger sizes
- Body: Regular, readable sizes
- Responsive font scaling

**Spacing:**
- Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px)
- Padding and margins follow Tailwind defaults
- Responsive spacing adjustments

### 6.2 Component Library

**shadcn/ui Components Used:**
- Button, Card, Input, Select, Textarea
- Dialog, Sheet, Popover, Dropdown Menu
- Table, Badge, Avatar, Skeleton
- Accordion, Tabs, Alert, Toast
- Form components with validation

**Custom Components:**
- AIAssistant: Chatbot interface with voice
- SiteHeader: Navigation with language selector
- SiteFooter: Footer with links and info
- AdminLogin: Admin authentication form
- ProtectedRoute: Route guard for auth

### 6.3 Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile-First Approach:**
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly UI elements
- Optimized for small screens

### 6.4 Accessibility

**WCAG 2.1 AA Compliance:**
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast ratios
- Screen reader compatibility

---

## 7. Security Design

### 7.1 Authentication Security

**User Authentication:**
- Supabase Auth with email/password
- Passwords hashed by Supabase
- Secure session management
- JWT tokens for API requests

**Admin Authentication:**
- Environment-based credentials
- Session storage for admin sessions
- No credentials in code or version control
- Separate admin routes and guards

### 7.2 Data Security

**Row Level Security (RLS):**
- Policies enforce data access rules
- Users can only access their own data
- Admins have elevated permissions
- Automatic enforcement by Supabase

**Input Validation:**
- Client-side validation with Zod
- Server-side validation in RLS policies
- Sanitization of user inputs
- Prevention of SQL injection and XSS

### 7.3 Environment Variables

**Required Variables:**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_secure_password
```

**Security Best Practices:**
- Never commit `.env` file
- Use strong admin passwords
- Rotate credentials regularly
- Use HTTPS in production

---

## 8. Performance Optimization

### 8.1 Code Splitting

**Vite Configuration:**
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor': ['react', 'react-dom', 'react-router-dom'],
        'ui': ['@radix-ui/react-*']
      }
    }
  }
}
```

### 8.2 Lazy Loading

**Route-based Code Splitting:**
```typescript
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const SchemeDetail = lazy(() => import('./pages/SchemeDetail'));
```

**Image Lazy Loading:**
- Native `loading="lazy"` attribute
- Placeholder images during load
- Optimized image formats

### 8.3 Caching Strategy

**TanStack Query Caching:**
- Automatic caching of API responses
- Stale-while-revalidate pattern
- Cache invalidation on mutations

**Government Data Caching:**
- Database-level caching
- Periodic updates from APIs
- Reduced API calls

---

## 9. Testing Strategy

### 9.1 Unit Testing

**Test Files:**
- Co-located with source files (`.test.ts`)
- Example: `explainableAI.test.ts`

**Testing Framework:**
- Vitest (recommended for Vite projects)
- React Testing Library for components
- Jest-compatible API

### 9.2 Integration Testing

**Areas to Test:**
- Authentication flows
- Data fetching and mutations
- Form submissions
- Navigation and routing

### 9.3 End-to-End Testing

**Critical User Flows:**
- User registration and login
- Scheme search and discovery
- Application submission
- Admin panel operations

---

## 10. Deployment

### 10.1 Build Process

**Production Build:**
```bash
npm run build
```

**Output:**
- Optimized bundle in `dist/` directory
- Code splitting applied
- Assets minified and compressed

### 10.2 Hosting

**Recommended Platforms:**
- Vercel (recommended for Vite/React)
- Netlify
- AWS Amplify
- GitHub Pages

**Environment Configuration:**
- Set environment variables in hosting platform
- Configure build command: `npm run build`
- Set output directory: `dist`

### 10.3 Database

**Supabase Setup:**
- Create Supabase project
- Run migrations from `supabase/migrations/`
- Configure RLS policies
- Set up authentication providers

---

## 11. Monitoring and Analytics

### 11.1 Error Tracking

**Recommended Tools:**
- Sentry for error monitoring
- LogRocket for session replay
- Custom error boundaries in React

### 11.2 Usage Analytics

**Metrics to Track:**
- Page views and user sessions
- Scheme searches and views
- Application submissions
- AI chatbot interactions
- Language preferences

### 11.3 Performance Monitoring

**Key Metrics:**
- Page load times
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

---

## 12. Correctness Properties

### 12.1 Authentication Properties

**Property 1.1: User Session Integrity**
- For all authenticated users, the session token must be valid and not expired
- Test: Verify that expired sessions are rejected and users are redirected to login

**Property 1.2: Admin Access Control**
- Only users with valid admin credentials can access admin routes
- Test: Verify that non-admin users cannot access admin panel

### 12.2 Data Integrity Properties

**Property 2.1: Profile Data Consistency**
- For all user profiles, the email must be unique and valid
- Test: Verify that duplicate emails are rejected during registration

**Property 2.2: Application Referential Integrity**
- All applications must reference valid user and scheme IDs
- Test: Verify that applications with invalid references are rejected

### 12.3 Multi-Language Properties

**Property 3.1: Translation Completeness**
- For all UI elements, translations must exist for all 12 supported languages
- Test: Verify that no missing translations cause UI errors

**Property 3.2: Language Persistence**
- User language preference must persist across sessions
- Test: Verify that selected language is restored on page reload

### 12.4 Voice Interaction Properties

**Property 4.1: Speech Recognition Accuracy**
- Voice input must be correctly transcribed for supported languages
- Test: Verify that voice commands are processed accurately

**Property 4.2: Text-to-Speech Functionality**
- AI responses must be spoken in the user's selected language
- Test: Verify that TTS works for all supported languages

### 12.5 Scheme Discovery Properties

**Property 5.1: Search Result Relevance**
- Search results must match the user's query keywords
- Test: Verify that irrelevant schemes are not returned

**Property 5.2: Filter Accuracy**
- Filtered schemes must match all selected filter criteria
- Test: Verify that filters work correctly in combination

### 12.6 Admin Panel Properties

**Property 6.1: Real-time Statistics Accuracy**
- Dashboard statistics must reflect current database state
- Test: Verify that counts match actual database records

**Property 6.2: Application Status Updates**
- Application status changes must be persisted and reflected immediately
- Test: Verify that status updates are saved and displayed correctly

---

## 13. Future Enhancements

### 13.1 Phase 2 Features

**Mobile Application:**
- React Native or Flutter app
- Offline capability for rural areas
- Push notifications for application updates

**Advanced AI:**
- Machine learning for better scheme recommendations
- Personalized suggestions based on user profile
- Chatbot improvements with NLU models

**Enhanced Analytics:**
- Detailed usage reports
- User behavior analysis
- Scheme popularity metrics

### 13.2 Phase 3 Features

**DigiLocker Integration:**
- Fetch documents from DigiLocker
- Verify documents automatically
- Reduce manual document uploads

**Blockchain Verification:**
- Blockchain-based document verification
- Tamper-proof application records
- Transparent audit trails

**Multi-Channel Support:**
- SMS bot for feature phones
- WhatsApp bot for messaging
- USSD for basic phones

---

## 14. Conclusion

This design document provides a comprehensive overview of the Government & Student Help Platform architecture, components, and implementation details. The platform is built with modern web technologies, follows best practices for security and performance, and is designed to serve millions of Indian citizens and students.

The modular architecture allows for easy maintenance and future enhancements, while the use of established frameworks and libraries ensures reliability and community support.
