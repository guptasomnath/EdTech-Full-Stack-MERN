import { Router } from "express";
import { getRatings, storeRating, updateRating } from "../controllers/ratings.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const ratingsRoute = Router();

ratingsRoute
.get('/ratings', getRatings)
.post('/add', isAuthenticated, storeRating)
.put('/update', isAuthenticated, updateRating)

export default ratingsRoute;