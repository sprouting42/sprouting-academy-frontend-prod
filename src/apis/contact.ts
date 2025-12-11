import { cmsFetch } from "@/utils/ky";

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  message: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  return cmsFetch.post("api/contact", data);
};
