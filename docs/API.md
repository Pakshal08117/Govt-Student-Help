# 📡 API Documentation

## Overview

This document describes the API endpoints and data structures used in the Government & Student Help Platform.

## Supabase Integration

### Authentication

#### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword'
});
```

#### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});
```

#### Sign Out
```typescript
const { error } = await supabase.auth.signOut();
```

### Database Tables

#### profiles
```typescript
interface Profile {
  id: string;              // UUID, primary key
  email: string;           // User email
  display_name: string;    // User's full name
  district: string;        // User's district
  taluka: string;          // User's sub-district
  phone?: string;          // Optional phone number
  date_of_birth?: string;  // Optional DOB
  created_at: string;      // Timestamp
  updated_at: string;      // Timestamp
}
```

**Operations:**
```typescript
// Get user profile
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();

// Update profile
const { data, error } = await supabase
  .from('profiles')
  .update({ display_name: 'New Name' })
  .eq('id', userId);
```

#### applications
```typescript
interface Application {
  id: string;                    // UUID, primary key
  user_id: string;               // Foreign key to profiles
  scheme_id: string;             // Scheme identifier
  status: ApplicationStatus;     // Application status
  state: string;                 // State name
  district: string;              // District name
  taluka: string;                // Sub-district name
  application_data: object;      // Form data
  documents: Record<string, string>; // Document URLs
  created_at: string;            // Timestamp
  updated_at: string;            // Timestamp
}

type ApplicationStatus = 
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'documents_required'
  | 'completed';
```

**Operations:**
```typescript
// Create application
const { data, error } = await supabase
  .from('applications')
  .insert({
    user_id: userId,
    scheme_id: 'PM-KISAN',
    status: 'pending',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Pune',
    application_data: formData,
    documents: {}
  });

// Get user applications
const { data, error } = await supabase
  .from('applications')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });

// Update application status
const { data, error } = await supabase
  .from('applications')
  .update({ status: 'approved' })
  .eq('id', applicationId);
```

## Local Data APIs

### Schemes API

#### Get All Schemes
```typescript
import { schemes } from '@/data/schemes';

// Returns array of all schemes
const allSchemes = schemes;
```

#### Search Schemes
```typescript
import { searchSchemes } from '@/data/schemes';

const results = searchSchemes('education', 'Maharashtra');
// Returns schemes matching search term and state
```

#### Filter Schemes
```typescript
import { getSchemesByFilters } from '@/data/schemes';

const filtered = getSchemesByFilters({
  audience: 'student',
  type: 'scholarship',
  state: 'All India',
  category: 'Education'
});
```

#### Get Schemes by State
```typescript
import { getSchemesByState } from '@/data/schemes';

const stateSchemes = getSchemesByState('Maharashtra');
```

### Services API

#### Get All Services
```typescript
import { allServices } from '@/data/services';

const services = allServices;
```

#### Search Services
```typescript
import { searchServices } from '@/data/services';

const results = searchServices('hospital', 'Pune', 'Pune');
```

#### Get Services by Location
```typescript
import { getServicesByDistrictAndTaluka } from '@/data/services';

const services = getServicesByDistrictAndTaluka('Pune', 'Pune');
```

### Locations API

#### Get States
```typescript
import { states } from '@/data/locations';

const allStates = states;
```

#### Get Districts
```typescript
import { getDistrictsForState } from '@/data/locations';

const districts = getDistrictsForState('Maharashtra');
```

#### Get Sub-district Term
```typescript
import { getSubDistrictTerm } from '@/data/locations';

const term = getSubDistrictTerm('Maharashtra');
// Returns: 'Taluka'
```

## AI Service API

### Chat with AI Assistant
```typescript
import { sendMessage } from '@/services/aiService';

const response = await sendMessage(
  'I need help with education',
  'en',
  conversationHistory
);
```

### Get Scheme Recommendations
```typescript
import { getSchemeRecommendations } from '@/services/explainableAI';

const recommendations = getSchemeRecommendations(
  'Need financial help for daughter education',
  'en'
);
```

### Classify Intent
```typescript
import { classifyIntent } from '@/utils/intentClassifier';

const intent = classifyIntent('I want to apply for scholarship');
// Returns: 'scholarship_inquiry'
```

## Voice API

### Speech Recognition
```typescript
// Check browser support
const SpeechRecognition = 
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'hi-IN'; // Hindi
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log('User said:', transcript);
  };

  recognition.start();
}
```

### Text-to-Speech
```typescript
const speak = (text: string, lang: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};

speak('नमस्ते', 'hi');
```

## Error Handling

### Standard Error Response
```typescript
interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: any;
  };
}
```

### Common Error Codes
- `PGRST116`: Row not found
- `23505`: Unique constraint violation
- `42501`: Insufficient privileges
- `23503`: Foreign key violation

### Error Handling Example
```typescript
try {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.log('Profile not found');
    } else {
      console.error('Database error:', error);
    }
  }
} catch (error) {
  console.error('Unexpected error:', error);
}
```

## Rate Limiting

### Supabase Limits
- Free tier: 500 MB database, 2 GB bandwidth
- API requests: No hard limit, but subject to fair use
- Real-time connections: 200 concurrent

### Best Practices
- Implement client-side caching
- Use pagination for large datasets
- Batch operations when possible
- Implement retry logic with exponential backoff

## Security

### Row Level Security (RLS)
All tables have RLS enabled. Users can only:
- Read their own profile
- Create/read their own applications
- Admins have full access (via service role key)

### API Keys
- **Anon Key**: Safe for client-side use, respects RLS
- **Service Role Key**: Full access, server-side only

## Webhooks (Future)

Planned webhook support for:
- Application status changes
- New user registrations
- Document uploads
- Admin actions

## Support

For API questions:
- 📧 Email: api@govhelp.in
- 💬 GitHub Discussions
- 📚 Supabase Documentation: https://supabase.com/docs
