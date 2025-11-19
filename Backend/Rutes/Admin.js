const express = require('express');
const {  getadmin, adminregister,adminlogin } = require('../Controller/AdminController');
const authMiddleware = require('../Middleware/Auth');

const AdminRoute = express.Router();


AdminRoute.post('/register', adminregister)
AdminRoute.post('/login', adminlogin)
AdminRoute.get('/', authMiddleware('ADMIN'), getadmin)

module.exports = AdminRoute;