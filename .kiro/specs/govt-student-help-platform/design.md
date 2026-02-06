# Design Document

## Overview

The Government & Student Help Platform is a full-stack React web application built with TypeScript, Vite, and Supabase. The platform serves as a comprehensive digital gateway for Indian citizens and students to discover, understand, and apply for 40+ government schemes and scholarships across all Indian states and union territories.

### Key Design Principles

1. **Multi-Language First**: All UI components and data support 12 Indian languages with proper font rendering
2. **Mobile-First Responsive**: Tailwind CSS utility-first approach ensures optimal experience across all devices
3. **Real-Time Data**: Supabase provides PostgreSQL database with real-time subscriptions and Row Level Security
4. **AI-Powered Assistance**: Intelligent chatbot with voice recognition in all supported languages
5. **Government-Grade Security**: RLS policies, secure authentication, and data validation
6. **Performance Optimized**: Code splitting, lazy loading, and efficient caching strategies

### Technology Stack Summary

- **Frontend**: React 18.3.1, TypeScript 5.9.3, Vite 5.4.21
- **Styling**: Tailwind CSS 3.4.19, shadcn/ui components (Radix UI primitives)
- **State Management**: React Context API (Auth, Language, EssentialMode)
- **Data Fetching**: TanStack Query (React Query) with caching
- **Backend**: Supabase (PostgreSQL, Auth, Real-time, Storage)
- **Voice**: Web Speech API for recognition and synthesis
- **Routing**: React Router 6.x with future flags
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner toast library

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Application (SPA)                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  Context Providers (Auth, Language, Theme)      │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │  React Router (Client-Side Routing)      │  │  │  │
│  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
│  │  │  │  │  Pages (Index, Schemes, Dashboard)  │  │  │  │  │
│  │  │  │  │  ┌───────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │  Components (UI, Features)    │  │  │  │  │  │
│  │  │  │  │  └───────────────────────────────┘  │  │  │  │  │
│  │  │  │  └─────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database (with RLS)                       │  │
│  │  ├─ profiles (user data)                              │  │
│  │  ├─ schemes (government schemes)                      │  │
│  │  ├─ applications (user applications)                  │  │
│  │  └─ scholarship_queries (AI chat history)            │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Supabase Auth (JWT-based authentication)            │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Supabase Storage (document uploads)                 │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Real-time Subscriptions (application updates)       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ External APIs
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              External Government Data Sources                │
│  ├─ data.gov.in (Open Government Data)                      │
│  ├─ india.gov.in (India Portal)                             │
│  ├─ scholarships.gov.in (National Scholarship Portal)       │
│  └─ Ministry websites (scheme-specific data)                │
└─────────────────────────────────────────────────────────────┘
```

### Context Provider Hierarchy

The application uses React Context API for global state management with a specific provider hierarchy:

```typescript
<HelmetProvider>                    // SEO and meta tags
  <ThemeProvider>                   // Light/Dark theme
    <EssentialModeProvider>         // Professional UI mode
      <LanguageProvider>            // Multi-language support
        <AuthProvider>              // User authentication
          <Router>                  // Client-side routing
            <App />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </EssentialModeProvider>
  </ThemeProvider>
</HelmetProvider>
```

### Data Flow Architecture

1. **User Interaction** → Component triggers action
2. **Component** → Calls service function or hook
3. **Service/Hook** → Makes Supabase API call via TanStack Query
4. **Supabase** → Validates RLS policies, executes query
5. **Response** → Cached by TanStack Query, updates component state
6. **UI Update** → React re-renders with new data

### Authentication Flow

```
User Registration:
1. User submits email/password → Supabase Auth
2. Supabase creates auth.users record
3. Database trigger fires: handle_new_user()
4. Trigger creates profiles record with user_type
5. User receives confirmation email
6. User logs in → JWT token issued
7. Token stored in localStorage
8. AuthContext provides user state to app

User Login:
1. User submits credentials → Supabase Auth
2. Supabase validates credentials
3. JWT token issued and stored
4. AuthContext updates user state
5. Protected routes become accessible
6. User profile loaded from profiles table
```

## Components and Interfaces

### Core Components

#### 1. SiteHeader Component
**Purpose**: Main navigation header with language selector, theme toggle, and user menu

**Key Features**:
- Responsive navigation with mobile hamburger menu
- Language selector dropdown (12 languages)
- Essential Mode toggle
- Theme toggle (light/dark)
- User authentication status display
- Admin panel access for authorized users
- Government notice bar with helpline information

**Props**: None (uses contexts)

**State**:
- `isMobileMenuOpen`: boolean - Mobile menu visibility
- `isAdmin`: boolean - Admin authentication status

#### 2. AIAssistant Component
**Purpose**: Floating AI chatbot with voice and text interaction

**Key Features**:
- Voice recognition using Web Speech API
- Text-to-speech for AI responses
- Multi-language support (12 languages)
- Intelligent response generation based on user queries
- Voice commands for navigation
- Chat history within session
- Mute/unmute toggle for speech

**Props**: None (uses contexts)

**State**:
- `isOpen`: boolean - Chat window visibility
- `messages`: ChatMessage[] - Conversation history
- `inputValue`: string - Current text input
- `isLoading`: boolean - AI response loading state
- `isListening`: boolean - Voice recognition active
- `isMuted`: boolean - Text-to-speech muted

**Interfaces**:
```typescript
interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}
```

#### 3. Schemes Page Component
**Purpose**: Browse and filter government schemes

**Key Features**:
- Advanced filtering (category, state, user type, scheme type)
- Search functionality across name, description, tags
- Multi-language scheme display
- Scheme cards with eligibility and benefits
- Quick action buttons for popular filters
- Emergency helplines section
- Government verification badges

**State**:
- `searchTerm`: string - Search query
- `selectedCategory`: string - Category filter
- `selectedState`: string - State/location filter
- `selectedAudience`: string - User type filter
- `selectedType`: string - Scheme type filter

#### 4. SchemeDetail Page Component
**Purpose**: Display comprehensive scheme information

**Key Features**:
- Multi-language scheme details
- Eligibility criteria display
- Required documents list
- Step-by-step application instructions
- Benefits breakdown
- Official website and helpline links
- Apply button navigation

#### 5. UserDashboard Component
**Purpose**: User profile and application management

**Key Features**:
- Application statistics (total, pending, approved, rejected)
- Recent applications list with status
- Profile editing functionality
- Application tracking
- Recommended schemes based on user type
- Quick actions for common tasks

**State**:
- `activeTab`: string - Current tab (overview, applications, profile, schemes)
- `applications`: Application[] - User's applications
- `profile`: UserProfile - User profile data
- `editingProfile`: boolean - Profile edit mode
- `profileForm`: object - Profile form data

**Interfaces**:
```typescript
interface Application {
  id: string;
  scheme_id: string;
  status: string;
  district: string;
  state: string;
  created_at: string;
  updated_at: string;
  application_data: any;
  documents: Record<string, string>;
}

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  state: string;
  district: string;
  user_type: 'student' | 'citizen' | 'scheme_applicant';
  phone?: string;
  date_of_birth?: string;
  created_at: string;
}
```

#### 6. AdminPanel Component
**Purpose**: Admin interface for application management

**Key Features**:
- Application list with filtering
- Status update functionality (approve, reject, under review)
- Application details view
- Total application count
- Recent applications display

**Authentication**: Session-based admin authentication using environment variables

### Context Providers

#### 1. AuthContext
**Purpose**: Manage user authentication state

**Provided Values**:
```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{success: boolean; error?: string}>;
  clearError: () => void;
}
```

**Implementation Details**:
- Uses Supabase Auth for authentication
- Listens to auth state changes
- Stores session in localStorage
- Provides error handling for auth operations

#### 2. LanguageContext
**Purpose**: Manage multi-language support

**Provided Values**:
```typescript
interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  getLanguageName: () => string;
  getAllLanguages: () => Array<{code: Lang, name: string, nativeName: string}>;
}

type Lang = "en" | "hi" | "mr" | "bn" | "ta" | "te" | "gu" | "kn" | "ml" | "pa" | "or" | "as";
```

**Implementation Details**:
- Stores language preference in localStorage
- Provides translation function `t(key)`
- Supports 12 Indian languages
- Includes comprehensive translation dictionaries for each language

#### 3. EssentialModeContext
**Purpose**: Toggle professional government-grade UI

**Provided Values**:
```typescript
interface EssentialModeContextType {
  isEssentialMode: boolean;
  toggleEssentialMode: () => void;
}
```

**Implementation Details**:
- Stores preference in localStorage
- Applies professional color scheme and layout
- Maintains all functionality in both modes

### Service Layer

#### 1. AI Service (aiService.ts)
**Purpose**: Generate intelligent responses for chatbot

**Key Functions**:
```typescript
function generateCachedResponse(message: string, lang: string): string
function handleSpecificQuery(query: string, lang: string): Promise<string>
```

**Response Categories**:
- Scholarships and education
- Medical and health assistance
- Financial help and loans
- Agriculture and farming
- Document guidance (birth certificate, ration card, income certificate)
- Navigation commands
- Platform features

**Implementation**:
- Pattern matching on user input
- Multi-language response templates
- Context-aware suggestions
- Helpline information

#### 2. Supabase Client (integrations/supabase/client.ts)
**Purpose**: Configure Supabase connection

**Configuration**:
```typescript
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### Utility Functions

#### 1. cn() Helper (lib/utils.ts)
**Purpose**: Merge Tailwind CSS classes with conditional logic

```typescript
function cn(...inputs: ClassValue[]): string
```

**Usage**: Combines `clsx` and `tailwind-merge` for optimal class merging

## Data Models

### Database Schema

#### 1. profiles Table
**Purpose**: Store user profile information

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  username TEXT UNIQUE,
  state TEXT,
  district TEXT,
  user_type TEXT DEFAULT 'citizen' CHECK (user_type IN ('student', 'citizen', 'scheme_applicant')),
  phone TEXT,
  date_of_birth DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**:
- `idx_profiles_state` on `state`
- `idx_profiles_user_type` on `user_type`

**RLS Policies**:
- Users can view their own profile
- Users can update their own profile

#### 2. schemes Table
**Purpose**: Store government scheme information

```sql
CREATE TABLE schemes (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  category TEXT NOT NULL,
  description_en TEXT,
  description_hi TEXT,
  eligibility JSONB DEFAULT '{}',
  benefits JSONB DEFAULT '{}',
  how_to_apply JSONB DEFAULT '[]',
  helpline TEXT,
  website TEXT,
  states TEXT[] DEFAULT ARRAY['All India'],
  target_audience TEXT[] DEFAULT ARRAY['citizen'],
  scheme_type TEXT DEFAULT 'government',
  ministry TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**:
- `idx_schemes_category` on `category`
- `idx_schemes_is_active` on `is_active`
- `idx_schemes_target_audience` GIN index on `target_audience`
- `idx_schemes_states` GIN index on `states`

**RLS Policies**:
- Anyone can view active schemes

#### 3. applications Table
**Purpose**: Store user applications to schemes

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  scheme_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'completed')),
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  documents JSONB DEFAULT '{}',
  user_email TEXT,
  full_name TEXT,
  mobile_number TEXT,
  application_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**:
- `idx_applications_user_id` on `user_id`
- `idx_applications_status` on `status`
- `idx_applications_state` on `state`
- `idx_applications_created_at` on `created_at DESC`

**RLS Policies**:
- Users can view their own applications
- Users can create applications
- Users can update their own applications
- Authenticated users can view all applications (for admin)
- Authenticated users can update applications (for admin)

#### 4. scholarship_queries Table
**Purpose**: Store AI chatbot interactions

```sql
CREATE TABLE scholarship_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  query TEXT NOT NULL,
  response TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Database Triggers

#### 1. handle_new_user()
**Purpose**: Automatically create profile when user signs up

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, state, district, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'state', ''),
    COALESCE(NEW.raw_user_meta_data->>'district', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'citizen')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### 2. update_updated_at_column()
**Purpose**: Automatically update `updated_at` timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Static Data Models

#### 1. Scheme Interface (data/schemes.ts)
```typescript
interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  category: "Student" | "Citizen" | "Welfare" | "Employment" | "Health" | "Agriculture";
  schemeType?: string;
  ministry?: string;
  eligibility: string[] | {
    age?: string;
    income?: string;
    residence?: string;
    category?: string;
    documents?: string[];
  };
  eligibilityHi: string[];
  eligibilityMr: string[];
  documents: string[];
  documentsHi: string[];
  documentsMr: string[];
  applicationProcess: string[];
  applicationProcessHi: string[];
  applicationProcessMr: string[];
  howToApply?: string[];
  benefits: string | string[];
  benefitsHi: string | string[];
  benefitsMr: string | string[];
  website: string;
  helpline: string;
  state: string;
  states?: string[];
  targetAudience?: string[];
  tags: string[];
  isActive: boolean;
  lastUpdated: string;
}
```

#### 2. Helpline Interface
```typescript
interface Helpline {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  number: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  availability: string;
  category: "Emergency" | "Government" | "Health" | "Education" | "General";
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

