import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { queryCourse, getCourse, getUsersCourse, enrollCourse, filterCourse, getFilters, storeCourse} from "../controllers/courses.controller";
const courseRoute = Router();

courseRoute
.get('/courses', queryCourse)
.get('/course/:courseID', getCourse)
.get('/usercourse', isAuthenticated, getUsersCourse)
.get('/search', queryCourse)
.get('/filters', getFilters)
.post('/filter', filterCourse)
.post('/enroll', enrollCourse)
.post('/store', storeCourse)

export default courseRoute;