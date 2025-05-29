// router.get("/token", getAccessToken);

// router.post("/login", login);
// router.delete("/logout", logout);

// router.get("/users", verifyToken, getUsers);
// router.get("/users/:id", verifyToken, getUserById);
// router.post("/users", createUser);
// router.put("/users/:id", verifyToken, updateUser);
// router.delete("/users/:id", verifyToken, deleteUser);

// router.get("/", verifyToken, getNotes);
// router.get("/notes/:id", verifyToken, getNoteById);
// router.post("/add-notes", verifyToken, createNotes);
// router.put("/edit-notes/:id", verifyToken, updateNotes);
// router.delete("/delete-notes/:id", verifyToken, deleteNotes);

// export default router;

import express from "express";
import {
    getUsers, getUserById, updateUser, deleteUser,
    getNotes, getNoteById, createNotes, updateNotes, deleteNotes,
    register, login, logout
} from "../controller/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getAccessToken } from "../controller/TokenController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);

router.get("/token", getAccessToken);

// Notes CRUD
router.get("/notes", verifyToken, getNotes);
router.get("/notes/:id", verifyToken, getNoteById);
router.post("/notes", verifyToken, createNotes);
router.put("/notes/:id", verifyToken, updateNotes);
router.delete("/notes/:id", verifyToken, deleteNotes);

// User CRUD (kecuali register/login)
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;
