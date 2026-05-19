-- Arizona Wine Experience backend schema draft.
-- Intended target: Supabase Postgres + Supabase Auth.

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text not null unique,
    display_name text,
    created_at timestamptz not null default now()
);

create table public.wineries (
    id text primary key,
    name text not null,
    region text not null,
    specialties text[] not null default '{}',
    description text not null,
    created_at timestamptz not null default now()
);

create table public.experiences (
    id text primary key,
    title text not null,
    region text not null,
    type text not null check (type in ('tour', 'tasting', 'pairing', 'event')),
    duration_hours numeric(4, 2) not null,
    price_per_person integer not null check (price_per_person >= 0),
    capacity integer not null check (capacity > 0),
    created_at timestamptz not null default now()
);

create table public.pairings (
    id text primary key,
    wine text not null,
    food text not null,
    region text not null,
    notes text not null,
    created_at timestamptz not null default now()
);

create table public.booking_requests (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete set null,
    experience_id text not null references public.experiences(id),
    guest_email text not null,
    party_size integer not null check (party_size > 0),
    requested_date date not null,
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined')),
    created_at timestamptz not null default now()
);

create table public.favorites (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    item_type text not null check (item_type in ('winery', 'experience', 'pairing')),
    item_id text not null,
    notes text not null default '',
    created_at timestamptz not null default now(),
    unique (user_id, item_type, item_id)
);

create table public.course_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    module_id text not null,
    score integer not null check (score between 0 and 100),
    completed boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, module_id)
);

alter table public.profiles enable row level security;
alter table public.booking_requests enable row level security;
alter table public.favorites enable row level security;
alter table public.course_progress enable row level security;

create policy "Profiles are readable by owner"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Profiles are writable by owner"
    on public.profiles for update
    using (auth.uid() = id);

create policy "Users can read own booking requests"
    on public.booking_requests for select
    using (auth.uid() = user_id);

create policy "Anyone can create booking requests"
    on public.booking_requests for insert
    with check (user_id is null or auth.uid() = user_id);

create policy "Users can manage own favorites"
    on public.favorites for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can manage own course progress"
    on public.course_progress for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
