import type { ProfileData } from "@/types";

export function createProfileService(data: ProfileData) {
  return {
    async getProfile() {
      return data;
    },
    async getProjects() {
      return data.projects;
    },
  };
}
