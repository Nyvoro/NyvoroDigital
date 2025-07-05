import 'dotenv/config';

export function getEnv(name: string): string {
  if (typeof window !== 'undefined') {
    throw new Error('getEnv should not run in the browser');
  }
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const config = {
  supabaseUrl: getEnv('SUPABASE_URL'),
  supabaseSrvKey: getEnv('SUPABASE_SERVICE_KEY'),
  openaiKey: getEnv('OPENAI_API_KEY'),
};
