export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  supabase_id?: string; 
  name: string;
  email: string;
  role_id: number; 
  role?: Role; 
  created_at: Date;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}