import { cmsFetch } from "@/utils/ky";

export interface MentorFormData {
  name: string;
  email: string;
  message: string;
}

export const submitMentorForm = async (data: MentorFormData) => {
  return cmsFetch.post("api/mentor-submission", data);
};
