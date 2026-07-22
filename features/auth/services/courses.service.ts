import { MessageResponse } from "../types/auth.types";
import axiosInstance from "./axios.instance";

import {
  LearningPathResponse,
  LessonResponse,
  LearningPathStatusResponse,
  CourseLessonResponse,
  singleLessonResponse,
} from "@/features/auth/types/courses.type";

export const getLearningPath = async (): Promise<LearningPathResponse> => {
  const response =
    await axiosInstance.get<LearningPathResponse>("/learning-path/me");
  return response.data;
};

export const getLearningPathStatus = async (): Promise<LearningPathStatusResponse> => {
  const response =
    await axiosInstance.get<LearningPathStatusResponse>("/learning-path/generation-status");
  return response.data;
};

export const getLesson = async (id: string): Promise<singleLessonResponse> => {
  const response = await axiosInstance.get<singleLessonResponse>(
    `/lessons/${id}`,
  );
  return response.data;
};

export const postCompletedLesson = async (
  id: string,
): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(
    `/lessons/${id}/complete`,
  );
  return response.data;
};

export const getLessons = async (
  courseID: string,
): Promise<CourseLessonResponse> => {
  const response = await axiosInstance.get<CourseLessonResponse>(
    `/courses/${courseID}/lessons`,
  );
  return response.data;
};
