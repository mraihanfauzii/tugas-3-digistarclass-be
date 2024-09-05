const express = require("express");
const userHandler = require('../handlers/user_handler');
const roleHandler = require('../handlers/role_handler');
const orderHandler = require('../handlers/order_handler');
const jwtAuth = require('../middlewares/jwt');
const { authenticatePassportJwt } = require('../middlewares/passport-jwt');

// Create a router
const router = express.Router();

// User routes
router.post("/user/login", userHandler.login);
router.post("/user/register", userHandler.register);
router.get("/user", userHandler.getList);
router.get("/user/:id", userHandler.getOneByUserId);
router.put("/user/:id", userHandler.updateOne);
router.delete("/user/:id", userHandler.deleteOne); // Added delete user

// Role routes
router.post("/role", roleHandler.create);
router.get("/role", roleHandler.getList);
router.get("/role/:id", roleHandler.getOneByRoleId);  // Added get role by ID
router.put("/role/:id", roleHandler.updateOne);  // Added update role by ID
router.delete("/role/:id", roleHandler.deleteOne);  // Added delete role by ID

// Order routes
router.post("/order", jwtAuth, orderHandler.create);
router.get("/order", authenticatePassportJwt(), orderHandler.getList);
router.get("/order/:id", authenticatePassportJwt(), orderHandler.getOneByOrderId);
router.get("/order/:id", authenticatePassportJwt(), orderHandler.getOneByOrderId);  // Added get order by ID
router.put("/order/:id", authenticatePassportJwt(), orderHandler.updateOne);  // Added update order by ID
router.delete("/order/:id", authenticatePassportJwt(), orderHandler.deleteOne);  // Added delete order by ID

module.exports = router;