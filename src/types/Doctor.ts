export interface Doctor {
  _id: string;
  user_id?: number;
  name: string;
  avatar?: string | null;
  specialty?: string;
  price: string;
  description?: string;
  experience_year?: number;
  created_at?: string;
}

export interface DoctorResponse {
  data: Doctor[];
}
