import { supabase } from "../../supabase/client"

const subjects = ["Cat", "Dog", "Developer", "AI"];
const actions = ["runs", "jumps", "codes", "learns"];
const places = ["in the park", "at home", "at work", "online"];

const getRandomMessage = () => {
    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const a = actions[Math.floor(Math.random() * actions.length)];
    const p = places[Math.floor(Math.random() * places.length)];
    return `${s} ${a} ${p}.`;
}

const onDailyInsertData = async () => {
    try {
        const { error } = await supabase
            .from('app_health')
            .insert({ message: getRandomMessage() });
        if (error) throw error;
    } catch (e) {
        console.error("Supabase connection test error:", e);
    }
}

export {
    onDailyInsertData,
}