import { IUserInfo } from "@/types/ProfileTypes";

export const getUserInfo = () => {
    try{
        const userINFO  = JSON.parse(localStorage.getItem("userInfo") ||  "") as IUserInfo;
        return userINFO;
    }catch{
        return {
            token : null,
            _id : "",
            email : null,
            name : null,
            enrolledCourses : null
        }
    }
    
}

export const addUserEnrolledCourse = (courseID : string) => {
    const userInfo = getUserInfo();
    if(!userInfo.enrolledCourses?.includes(courseID)){
      userInfo.enrolledCourses?.push(courseID);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
}

export const removeUserInfo = () => {
    localStorage.removeItem("userInfo");
}