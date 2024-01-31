import { getUserInfo } from "./processUserInfo"

export const isUserEnrolled = (courseID : string) => {
  const { enrolledCourses } = getUserInfo();
  return enrolledCourses?.includes(courseID)
}