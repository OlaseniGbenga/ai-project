import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getLearningPath,
  getLesson,
  postCompletedLesson,
  getLessons,
  getLearningPathStatus,
  getQuizs,
  postQuizs,
  getPracTask,
  postPracTask,
} from "@/features/auth/services/courses.service";

export const useGetLearningPath = () => {
  return useQuery({
    queryKey: ["learning-path"],
    queryFn: getLearningPath,
  });
};

export const useGetLearningPathStatus = () => {
  return useQuery({
    queryKey: ["learning-path-status"],
    queryFn: getLearningPathStatus,
    refetchInterval: (query) => {
      const status = query.state.data?.data.isReady;

      return status
        ? false // Poll every 30 seconds
        : 30 * 1000; // Stop polling
    },
  });
};

export const useGetLesson = (id: string) => {
  return useQuery({
    queryKey: ["lesson", id],
    queryFn: () => getLesson(id),
    enabled: Boolean(id),
  });
};

export const useGetLessons = (courseID: string) => {
  return useQuery({
    queryKey: ["lessons", courseID],
    queryFn: () => getLessons(courseID),
    enabled: Boolean(courseID),
  });
};

export const usePostCompletedLesson = (id: string) => {
  return useMutation({
    mutationFn: () => postCompletedLesson(id),
  });
};

export const useGetQuizs = (lessonID: string) => {
  return useQuery({
    queryKey: ["lessons-Quiz", lessonID],
    queryFn: () => getQuizs(lessonID),
  });
};

export const useGetPracTask = (lessonID: string) => {
  return useQuery({
    queryKey: ["PracTask", lessonID],
    queryFn: () => getPracTask(lessonID),
  });
};

export const usePostSubmitQuiz = (id: string) => {
  return useMutation({
    mutationFn: (payload: unknown) => postQuizs(id, payload),
  });
};

export const usePostPracTask = (taskID: string) => {
  return useMutation({
    mutationFn: () => postPracTask(taskID),
  });
};
