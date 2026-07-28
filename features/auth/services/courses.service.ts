import { MessageResponse } from "../types/auth.types";
import axiosInstance from "./axios.instance";

import {
  LearningPathResponse,
  QuizPost,
  LearningPathStatusResponse,
  CourseLessonResponse,
  singleLessonResponse,
  QuizResponse,
  PracTaskResponse,
  PostPracTaskResponse
} from "@/features/auth/types/courses.type";

export const getLearningPath = async (): Promise<LearningPathResponse> => {
  const response =
    await axiosInstance.get<LearningPathResponse>("/learning-path/me");
  return response.data;
};

export const getLearningPathStatus =
  async (): Promise<LearningPathStatusResponse> => {
    const response = await axiosInstance.get<LearningPathStatusResponse>(
      "/learning-path/generation-status",
    );
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
    `/courses/${courseID}`,
  );
  return response.data;
};

export const getQuizs = async (lessonID: string): Promise<QuizPost> => {
  const response = await axiosInstance.get<QuizPost>(
    `/lessons/${lessonID}/quiz`,
  );
  return response.data;
};

// export const postQuizs = async (
//   quizId: string,
//   payload: unknown,
// ): Promise<QuizResponse> => {
//   const response = await axiosInstance.post<QuizPost>(
//     `/quizzes/${quizId}/submit`,
//     payload,
//   );
//   return response.data;
// };

export const postQuizs = async (
  quizId: string,
  payload: unknown,
): Promise<QuizResponse> => {
  const response = await axiosInstance.post<QuizResponse>(
    `/quizzes/${quizId}/submit`,
    payload,
  );

  return response.data;
};

export const getPracTask = async (
  lessonID: string,
): Promise<PracTaskResponse> => {
  const response = await axiosInstance.get<PracTaskResponse>(
    `practical-tasks/lesson/${lessonID}`,
  );
  return response.data;
};

export const postPracTask = async (
  taskID: string,
): Promise<PostPracTaskResponse> => {
  const response = await axiosInstance.post<PostPracTaskResponse>(
    `practical-tasks/${taskID}/complete`,
  );
  return response.data;
};
