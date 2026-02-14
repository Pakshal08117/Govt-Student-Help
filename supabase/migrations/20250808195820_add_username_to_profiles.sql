-- Add username field to profiles table
alter table public.profiles add column if not exists username text unique;

-- Create index for username lookups
create index if not exists idx_profiles_username on public.profiles(username);

-- Add constraint to ensure username is unique and not empty when provided
alter table public.profiles add constraint if not exists unique_username unique (username);
alter table public.profiles add constraint if not exists check_username_not_empty check (username is null or length(trim(username)) > 0);

-- Function to handle new user signup with profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, username)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name'),
    new.raw_user_meta_data->>'username'
  );
  return new;
exception
  when others then
    -- If username constraint fails or username is null, insert without username
    insert into public.profiles (id, email, display_name)
    values (
      new.id, 
      new.email, 
      coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name')
    );
    return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
