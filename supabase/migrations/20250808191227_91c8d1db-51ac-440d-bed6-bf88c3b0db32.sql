-- Ensure update_updated_at_column exists and safe
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create profiles table (id references auth.users) if not exists
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

alter table public.profiles enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='Users can view their own profile'
  ) then
    create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='Users can insert their own profile'
  ) then
    create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='Users can update their own profile'
  ) then
    create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);
  end if;
end $$;

-- Trigger for updated_at on profiles
create or replace trigger update_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Create activities table for user logs
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  action text not null,
  description text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

alter table public.activities enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='activities' and policyname='Users can view their own activities'
  ) then
    create policy "Users can view their own activities" on public.activities for select using (auth.uid() = user_id);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='activities' and policyname='Users can insert their own activities'
  ) then
    create policy "Users can insert their own activities" on public.activities for insert with check (auth.uid() = user_id);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='activities' and policyname='Users can delete their own activities'
  ) then
    create policy "Users can delete their own activities" on public.activities for delete using (auth.uid() = user_id);
  end if;
end $$;
