export interface IUserInfo {
    _id: string;
    name: string;
    email: string;
    token: string;
    enrolledCourses: string[]
}

export interface IUserEnrolledCourse {
    _id: string;
    thumbnail: string;
    title: string;
    duration: string;
}

export interface IUserInfoResponse {
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    enrolledCourses: string[],
    coursesDetails: IUserEnrolledCourse[]
}