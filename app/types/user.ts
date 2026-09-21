export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: Role; 
  created_at: Date;
  supabase_id?: string; 
}


// Currently not being used if we only use SSO
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}