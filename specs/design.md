# Design Document: Platform Documentation System

## Overview

The Government & Student Help Platform Documentation System provides a comprehensive architectural blueprint for a modular, scalable, and security-first digital public assistance system. This design transforms the existing functional prototype into a professionally structured, maintainable, and production-ready civic technology platform.

The platform serves as a critical bridge connecting Indian citizens and students with government schemes, scholarships, and welfare services through:
- Multilingual support across 12 Indian languages
- AI-driven intent classification and scheme recommendation
- Secure role-based authentication and data access control
- Real-time application tracking and status management
- Voice-enabled interaction for accessibility

This design document establishes clear architectural patterns, component interfaces, data models, and correctness properties that ensure the platform meets its functional and non-functional requirements while maintaining security, performance, and accessibility standards.

## Architecture

### Layered Architecture

The platform follows a clean layered architecture pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  React Components + TypeScript + Tailwind CSS + shadcn/ui   │
│  - Pages (Index, Schemes, Auth, Dashboard, Admin)           │
│  - UI Components (Header, Footer, Forms, Cards)             │
│  - Theme Management (Light/Dark/Essential Mode)             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   Application Logic Layer                    │
│  Context Providers + Custom Hooks + Service Abstraction      │
│  - AuthContext (User authentication state)                   │
│  - LanguageContext (Multilingual state management)           │
│  - EssentialModeContext (Accessibility preferences)          │
│  - Custom Hooks (useProfile, useGovernmentData)              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    AI Decision Layer                         │
│  Intent Classification + Recommendation Engine + Voice       │
│  - Intent Classifier (Problem → Scheme mapping)              │
│  - Explainable AI (Recommendation reasoning)                 │
│  - Voice Interface (Speech recognition + synthesis)          │
│  - Conversation Management (Context retention)               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                Backend Integration Layer                     │
│  Supabase Client + Government APIs + Data Services           │
│  - Supabase (PostgreSQL + Auth + RLS + Storage)             │
│  - Government Data APIs (data.gov.in, NSP)                   │
│  - Caching Layer (Offline support + Performance)             │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Principles

1. **Separation of Concerns**: Each layer has a single, well-defined responsibility
2. **Dependency Inversion**: Higher layers depend on abstractions, not concrete implementations
3. **Security by Design**: RLS policies enforce data access at the database level
4. **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with AI
5. **Offline-First**: Critical data cached locally for rural connectivity scenarios
6. **Accessibility-First**: WCAG 2.1 AA compliance built into every component

## Components and Interfaces

### Presentation Layer Components

#### Page Components

**Index Page** (`src/pages/Index.tsx`)
- Purpose: Landing page with user type selection and popular schemes
- Props: None (uses context for language and auth state)
- State: User type selection, featured schemes
- Key Features: Hero section, user category cards, metrics display

**Schemes Page** (`src/pages/Schemes.tsx`)
- Purpose: Browse and search government schemes
- Props: None
- State: Search query, filters (category, state, audience), filtered schemes
- Key Features: Search bar, category filters, scheme cards, pagination

**Scheme Detail Page** (`src/pages/SchemeDetail.tsx`)
- Purpose: Display comprehensive scheme information
- Props: `schemeId` (from URL params)
- State: Scheme data, application status
- Key Features: Eligibility checker, document list, application button, helpline info

**Auth Page** (`src/pages/Auth.tsx`)
- Purpose: User authentication (login/signup) and admin login
- Props: None
- State: Active tab (login/signup/admin), form data, loading state
- Key Features: Tabbed interface, form validation, error handling

**User Dashboard** (`src/pages/UserDashboard.tsx`)
- Purpose: User profile and application management
- Props: None (requires authentication)
- State: User profile, applications list, edit mode
- Key Features: Profile editor, application tracker, document uploads

**Admin Panel** (`src/pages/AdminPanel.tsx`)
- Purpose: Administrative oversight and management
- Props: None (requires admin authentication)
- State: Statistics, applications list, users list, filters
- Key Features: Real-time stats, application review, user management, analytics

#### UI Components

**Site Header** (`src/components/SiteHeader.tsx`)
- Purpose: Navigation and global actions
- Props: None
- Features: Logo, navigation links, language selector, theme toggle, auth status

**AI Assistant** (`src/components/AIAssistant.tsx`)
- Purpose: Intelligent chatbot with voice support
- Props: None
- State: Messages, voice recording status, language
- Features: Text chat, voice input/output, intent classification, scheme recommendations

**Explainable AI Chat** (`src/components/ExplainableAIChat.tsx`)
- Purpose: AI assistant with reasoning transparency
- Props: None
- State: Conversation history, recommendations with explanations
- Features: Shows why schemes were recommended, confidence scores

### Application Logic Layer

#### Context Providers

**AuthContext** (`src/contexts/AuthContext.tsx`)
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

**LanguageContext** (`src/contexts/LanguageContext.tsx`)
```typescript
type Lang = "en" | "hi" | "mr" | "bn" | "ta" | "te" | "gu" | "kn" | "ml" | "pa" | "or" | "as";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  getLanguageName: () => string;
  getAllLanguages: () => Array<{code: Lang, name: string, nativeName: string}>;
}
```

**EssentialModeContext** (`src/contexts/EssentialModeContext.tsx`)
```typescript
interface EssentialModeContextType {
  isEssentialMode: boolean;
  toggleEssentialMode: () => void;
}
```

#### Custom Hooks

**useProfile** (`src/hooks/useProfile.ts`)
- Purpose: Manage user profile data
- Returns: `{ profile, loading, error, updateProfile }`
- Features: Automatic sync with Supabase, optimistic updates

**useGovernmentData** (`src/hooks/useGovernmentData.ts`)
- Purpose: Fetch and cache government scheme data
- Returns: `{ schemes, loading, error, refetch }`
- Features: Caching, offline support, automatic refresh

**useScholarshipGuidance** (`src/hooks/useScholarshipGuidance.ts`)
- Purpose: Provide scholarship-specific guidance
- Returns: `{ recommendations, eligibilityCheck, documentList }`
- Features: Personalized recommendations based on user profile

### AI Decision Layer

#### Intent Classification

**Intent Classifier** (`src/utils/intentClassifier.ts`)
```typescript
type Intent = 
  | 'scholarship_inquiry'
  | 'medical_help'
  | 'financial_assistance'
  | 'agriculture_support'
  | 'document_help'
  | 'navigation'
  | 'general_inquiry';

function classifyIntent(message: string, lang: string): Intent;
```

**Classification Logic**:
- Keyword matching with language-specific dictionaries
- Context-aware classification using conversation history
- Confidence scoring for ambiguous queries
- Fallback to general inquiry for unrecognized patterns

#### Recommendation Engine

**Explainable AI Service** (`src/services/explainableAI.ts`)
```typescript
interface SchemeRecommendation {
  scheme: Scheme;
  relevanceScore: number;
  reasoning: string[];
  matchedCriteria: string[];
}

function getSchemeRecommendations(
  userQuery: string,
  userProfile?: Profile,
  lang: string = 'en'
): SchemeRecommendation[];
```

**Recommendation Algorithm**:
1. Extract keywords and intent from user query
2. Match against scheme categories, eligibility, and benefits
3. Score schemes based on relevance (0-100)
4. Filter by user profile (location, category, income if available)
5. Generate human-readable reasoning for each recommendation
6. Return top 5 schemes with explanations

#### Voice Interface

**Speech Recognition**:
- Uses Web Speech API (`SpeechRecognition`)
- Supports all 12 Indian languages
- Continuous recognition with interim results
- Automatic language detection based on context language

**Text-to-Speech**:
- Uses Web Speech Synthesis API
- Language-specific voice selection
- Adjustable rate (0.9) and pitch (1.0)
- Fallback to English if language voice unavailable

### Backend Integration Layer

#### Supabase Client

**Configuration** (`src/integrations/supabase/client.ts`):
```typescript
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});
```

**Key Features**:
- PKCE flow for enhanced security
- Automatic token refresh
- Session persistence across page reloads
- Error handling with user-friendly messages

#### Government Data Service

**Data Sources**:
- `data.gov.in` API for scheme datasets
- National Scholarship Portal (NSP) for scholarship data
- Ministry-specific APIs for real-time updates
- Local cache for offline access

**Caching Strategy**:
- Schemes data: 24-hour cache
- User profile: Session cache
- Applications: Real-time with optimistic updates
- Static content: Service worker cache

## Data Models

### Database Schema

#### profiles Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  username TEXT UNIQUE,
  state TEXT,
  district TEXT,
  user_type TEXT DEFAULT 'citizen' CHECK (user_type IN ('student', 'citizen', 'scheme_applicant')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**:
- `idx_profiles_state` on `state`
- `idx_profiles_user_type` on `user_type`

**RLS Policies**:
- Users can view their own profile: `auth.uid() = id`
- Users can update their own profile: `auth.uid() = id`

#### schemes Table

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
- Anyone can view active schemes: `is_active = true`

#### applications Table

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
- Users can view their own applications: `auth.uid() = user_id`
- Users can create applications: `auth.uid() = user_id`
- Users can update their own applications: `auth.uid() = user_id`
- Authenticated users can view all applications: `true` (for admin access)
- Authenticated users can update applications: `true` (for admin access)

### TypeScript Interfaces

#### Scheme Interface

```typescript
interface Scheme {
  id: string;
  name_en: string;
  name_hi: string;
  category: string;
  description_en: string;
  description_hi: string;
  eligibility: {
    residence?: string;
    category?: string;
    income?: string;
    age?: string;
    marks?: string;
    documents?: string[];
  };
  benefits: {
    en: string[];
    hi: string[];
  };
  how_to_apply: string[];
  helpline: string;
  website: string;
  states: string[];
  target_audience: ('student' | 'citizen' | 'scheme_applicant')[];
  scheme_type: 'government' | 'scholarship' | 'welfare' | 'employment';
  ministry: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

#### Application Interface

```typescript
interface Application {
  id: string;
  user_id: string;
  scheme_id: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'completed';
  state: string;
  district: string;
  documents: Record<string, string>; // document_type -> URL
  user_email: string;
  full_name: string;
  mobile_number: string;
  application_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}
```

#### Profile Interface

```typescript
interface Profile {
  id: string;
  email: string;
  display_name: string;
  username?: string;
  state?: string;
  district?: string;
  user_type: 'student' | 'citizen' | 'scheme_applicant';
  created_at: string;
  updated_at: string;
}
```

### Data Relationships

```
auth.users (Supabase Auth)
    ↓ (1:1)
profiles
    ↓ (1:N)
applications
    ↓ (N:1)
schemes
```

**Referential Integrity**:
- `profiles.id` → `auth.users.id` (CASCADE DELETE)
- `applications.user_id` → `profiles.id` (CASCADE DELETE)
- `applications.scheme_id` → `schemes.id` (NO ACTION - schemes are static)

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

