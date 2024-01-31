import { getAllCategorys, storeCategory } from "../controllers/categorys.controller";
import { Router } from "express";

const categorysRoute = Router();

categorysRoute
.get('/', getAllCategorys)
.get('/store', storeCategory)


export default categorysRoute;