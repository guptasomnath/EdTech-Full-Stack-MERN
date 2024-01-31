import { API_BASE_URL } from "@/config/constant";
import { RequestMethodType } from "doquery";

export const createCourseUrl = (pageNumber = 1, catName?: string, searchText? : string | null, filterQuery = {}) => {
    const url = new URLSearchParams();
    let reqMethod : RequestMethodType = "GET";

    let apiEndPoint = "/courses";
    if(searchText){
      url.set("q", searchText);
      apiEndPoint = "/search";
    }
    if(Object.keys(filterQuery).length !== 0){
      apiEndPoint = "/filter";
      reqMethod = "POST";
    }
    
    const limit = 6;

    url.set("limit", `${limit}`);
    url.set("skip", `${(pageNumber - 1) * limit}`);
    url.set("fields", "title thumbnail duration categoryName createdAt price");
    if (catName && catName !== "All Courses") {
      url.set("category", catName);
    }

    return {
      url : `${API_BASE_URL}/course${apiEndPoint}?${url.toString()}`,
      reqMethod : reqMethod
    }
};