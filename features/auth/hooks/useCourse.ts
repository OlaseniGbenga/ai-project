
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
  getCourseModules,
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
      return status ? false : 30 * 1000;
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

export const useGetCourseModules = (courseId: string) => {
  return useQuery({
    queryKey: ["course-modules", courseId],
    queryFn: () => getCourseModules(courseId),
    enabled: Boolean(courseId),
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
    enabled: Boolean(lessonID),
  });
};

export const useGetPracTask = (lessonID: string) => {
  return useQuery({
    queryKey: ["PracTask", lessonID],
    queryFn: () => getPracTask(lessonID),
    enabled: Boolean(lessonID),
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
