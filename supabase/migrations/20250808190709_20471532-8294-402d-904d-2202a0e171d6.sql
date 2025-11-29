-- Create profiles table for user data
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  display_name text,
  phone text,
  locale text default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Function to auto-update updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for profiles updated_at
drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Create activities table to store user activity logs
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  action text not null,
  description text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Enable RLS on activities
alter table public.activities enable row level security;

-- Policies for activities: users can manage their own activity
create policy "Users can view their own activities"
  on public.activities for select
  using (auth.uid() = user_id);

create policy "Users can insert their own activities"
  on public.activities for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own activities"
  on public.activities for delete
  using (auth.uid() = user_id);
