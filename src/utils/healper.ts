export const isOnVercelEnv = (): boolean => {
    return process.env.VERCEL === '1';
}