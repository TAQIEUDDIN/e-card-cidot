-- Run this in your Supabase project's SQL editor (Database > SQL Editor > New query)

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Lock the table down: guests can only INSERT, never read, update, or delete.
-- You will read the wishes yourself from the Supabase Table Editor (as the project owner,
-- which bypasses RLS), so guests can never see each other's messages.
alter table public.wishes enable row level security;

create policy "Anyone can leave a wish"
  on public.wishes
  for insert
  to anon
  with check (
    char_length(name) between 1 and 60
    and char_length(message) between 1 and 500
  );

-- No SELECT / UPDATE / DELETE policy is created for the anon role on purpose —
-- that means guests cannot read, edit, or delete any wish, including their own or others'.
