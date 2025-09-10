import { supabase } from "../../supabase/client"
import config from "../config/config";
import { App } from "../models";

const testSupabaseConnection = async () => {
    try {
        const { data, error } = await supabase
            .from('app')
            .select().single();
        if (error) throw error;
        const result: App = data
        const currentDateTime: string = new Date().toLocaleDateString() + new Date().toLocaleTimeString();
        console.log(`Supabase connection status: ${result.id == config.supabseDBAppKey}, ${currentDateTime}`);
    } catch (e) {
        console.error("Supabase connection test error:", e);
    }
}

const onStartIntervalTestSupabaseConnection = () => setInterval(testSupabaseConnection, 24 * 60 * 60 * 1000); // Test every 24 hours

export {
    testSupabaseConnection,
    onStartIntervalTestSupabaseConnection,
}