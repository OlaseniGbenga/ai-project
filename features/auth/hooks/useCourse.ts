import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getLearningPath,
  getLesson,
  postCompletedLesson,
  getLessons,
  getLearningPathStatus,
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
        ? false // Poll every 5 minutes
        : 5 * 60 * 1000; // Stop polling
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
