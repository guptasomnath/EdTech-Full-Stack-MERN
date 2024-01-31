import { getUserInfo } from "./processUserInfo";
import { API_BASE_URL } from "@/config/constant";

const GET_RATTINGS_URL = `${API_BASE_URL}/rating/ratings`;

export const createRatingsUrl = (pageNumber : number, courseID : string) => {
    const { _id } = getUserInfo();

    const limit = 6;

    const url = new URLSearchParams();
    url.set("courseID", courseID);
    url.set("limit", `${limit}`);
    url.set("skip", `${(pageNumber - 1) * limit}`);
    if(_id !== "" || _id){
      url.set("userID", _id);
    }
    return `${GET_RATTINGS_URL}?${url.toString()}`;
}