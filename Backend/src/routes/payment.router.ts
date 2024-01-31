import { Router } from "express";
import { checkPayment } from "../controllers/payment.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const paymentRoute = Router();

paymentRoute
.get('/check', isAuthenticated, checkPayment)

export default paymentRoute;