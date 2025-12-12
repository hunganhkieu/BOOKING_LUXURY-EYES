export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  gender?: string;
  identityCard?: string;
  email?: string;
  phone?: string;
  address?: string;
  relation: "self" | "family";
}
