-- Extension untuk UUID dan fungsi random
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- USERS
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  telegram_id text unique not null,
  username text,
  balance bigint default 0,
  today_earn bigint default 0,
  week_earn bigint default 0,
  rank int,
  referral_code text unique,
  referred_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- MINING LOGS
create table if not exists mining_logs (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade,
  amount bigint not null,
  created_at timestamptz default now()
);

-- SPIN LOGS
create table if not exists spin_logs (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade,
  reward bigint not null,
  created_at timestamptz default now()
);

-- TASKS MASTER
create table if not exists tasks (
  id bigserial primary key,
  title text not null,
  description text,
  reward bigint not null,
  type text default 'general', -- social, daily, special
  created_at timestamptz default now()
);

-- TASKS USER
create table if not exists user_tasks (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade,
  task_id bigint references tasks(id) on delete cascade,
  status text default 'pending', -- pending, completed, claimed
  claimed_at timestamptz
);

-- REFERRALS
create table if not exists referrals (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade, -- inviter
  referred_user_id uuid references users(id) on delete cascade, -- invitee
  created_at timestamptz default now()
);

-- STORE
create table if not exists store_items (
  id bigserial primary key,
  name text not null,
  description text,
  price bigint not null,
  available bool default true,
  created_at timestamptz default now()
);

create table if not exists user_store_orders (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade,
  store_item_id bigint references store_items(id) on delete cascade,
  status text default 'pending', -- pending, paid, delivered
  created_at timestamptz default now()
);

-- LEADERBOARD
drop materialized view if exists leaderboard;
create materialized view leaderboard as
select 
  u.id,
  u.username,
  u.balance,
  rank() over (order by u.balance desc) as rank
from users u;

-- INDEXES
create index if not exists idx_users_tg on users(telegram_id);
create index if not exists idx_mining_logs_user on mining_logs(user_id);
create index if not exists idx_spin_logs_user on spin_logs(user_id);
create index if not exists idx_user_tasks_user on user_tasks(user_id);
create index if not exists idx_referrals_user on referrals(user_id);
create index if not exists idx_referrals_referred on referrals(referred_user_id);
