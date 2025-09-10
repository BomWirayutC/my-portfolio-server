import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import config from '../src/config/config';

export const supabase = createClient<Database>(
    config.supabaseDBUrl ?? "",
    config.supabaseDBKey ?? ""
);