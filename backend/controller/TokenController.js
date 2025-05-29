// import User from "../model/UserModel.js";
// import jwt from "jsonwebtoken";

// export const getAccessToken = async (req, res) => {
//     try {
//         const refreshToken = req.cookies.refreshToken;

//         if (!refreshToken) {
//             const error = new Error("Refresh token tidak ada");
//             error.statusCode = 401;
//             throw error;
//         }

//         const user = await User.findOne({
//             where: { refresh_token: refreshToken },
//         });

//         if (!user.refresh_token) {
//             const error = new Error("Refresh token tidak ada");
//             error.statusCode = 401;
//             throw error;
//         }
//         else {
//             jwt.verify(
//                 refreshToken, 
//                 process.env.REFRESH_TOKEN_SECRET, 
//                 (error, decoded) => {
//                     if (error) {
//                         return res.status(403).json({
//                             status: "Error",
//                             message: "Refresh token tidak valid",
//                         });
//                     }
//                     const userPlain = user.toJSON();

//                     const { password: _, refresh_token: __, ...safeUserData } = userPlain;

//                     const accessToken = jwt.sign(
//                         safeUserData,
//                         process.env.ACCESS_TOKEN_SECRET,
//                         { expiresIn: "30s" }
//                     );

//                     return res.status(200).json({
//                         status: "Success",
//                         message: "Berhasil mendapatkan access token.",
//                         accessToken,
//                     });
//                 }
//             );
//         }
//     } catch (error) {
//         return res.status(error.statusCode || 500).json({
//             status: "Error",
//             message: error.message,
//         });
//     }
// };

import { User } from "../model/UserModel.js";
import jwt from "jsonwebtoken";

export const getAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token tidak ada" });
        }

        const user = await User.findOne({
            where: { refresh_token: refreshToken },
        });

        if (!user) {
            return res.status(403).json({ message: "Refresh token tidak ditemukan di user" });
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(403).json({ message: "Refresh token tidak valid" });

                const { password, refresh_token, ...safeUserData } = user.toJSON();

                const accessToken = jwt.sign(
                    safeUserData,
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "7d" }
                );

                return res.status(200).json({ accessToken });
            }
        );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
