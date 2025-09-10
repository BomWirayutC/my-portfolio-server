import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    supabaseDBUrl?: string;
    supabaseDBKey?: string;
    supabseDBAppKey?: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    supabaseDBUrl: process.env.SUPABASE_DB_URL,
    supabaseDBKey: process.env.SUPABASE_DB_KEY,
    supabseDBAppKey: process.env.SUPABASE_DB_APP_KEY,
};

export default config;