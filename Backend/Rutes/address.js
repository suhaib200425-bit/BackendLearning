const express = require('express');
const { getdefaultaddress, addaddress, getalladdress } = require('../Controller/AddressController');
const authMiddleware = require('../Middleware/Auth');
const AddressRoute = express.Router();

AddressRoute.get('/',authMiddleware('USER'),getdefaultaddress)
AddressRoute.get('/getall',authMiddleware('USER'),getalladdress)
AddressRoute.post('/add',authMiddleware('USER'),addaddress)

module.exports = AddressRoute;