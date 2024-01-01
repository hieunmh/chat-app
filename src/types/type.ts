import { Database } from "./supabaseType";

export type UserType = Database['public']['Tables']['users']['Row'];