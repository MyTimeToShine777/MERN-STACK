import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { createCustomAPIError } from "../errors/custom-error.js";

const protectRoute = async(req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //Get token from header
            token = req.headers.authorization.split(" ")[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //Get user from the token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.log(error);
            next(createCustomAPIError("Not Authorized", StatusCodes.UNAUTHORIZED));
        }
    }
    if (!token) {
        next(
            createCustomAPIError("Not Authorized, No Token", StatusCodes.UNAUTHORIZED)
        );
    }
};

export default protectRoute;