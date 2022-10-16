const express = require("express");
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validar-campos');
const router = express.Router();
const {getRoles,createRole,updateRole,deleteRole,findRole, assignRole} = require("../controllers/role");


/**
 * @swagger
 * /api/role:
 *  get:
 *    summary: return all roles
 *    tags: [Role]
 *    responses:
 *      200:
 *        description: all roles
 *        content:
 *             application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Role'
 */
router.get("/role", getRoles);

/**
 * @swagger
 * components:
 *  schemas:
 *    Role:
 *       type: object
 *       properties:
 *           name:
 *               type: string
 *               description: name of role
 *           description:
 *               type: string
 *               description: the description of role
 *       required:
 *           - name
 *           - description
 *       example:
 *           name: Verificador de proyectos
 *           description: Se encarga de revisar los proyectos.
 */

/**
 * @swagger
 * /api/role:
 *  post:
 *    summary: create a new role
 *    tags: [Role]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Role'
 *    responses:
 *      200:
 *        description: new role created!
 */
router.post('/role',
            [
                check('name','El role debe tener un nombre').not().isEmpty(),
                check('description','El role debe tener una descripcion').not().isEmpty(),
                validarCampos
            ],        
            createRole);




/**
 * @swagger
 * /api/role/{id}:
 *  get:
 *    summary: return a role
 *    tags: [Role]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the role id
 *          
 *    responses:
 *      200:
 *        description: role found!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Role'
 *      404:
 *        description: role not found
 *        
 */     
router.get("/role/:id",findRole);


/**
 * @swagger
 * /api/role/{id}:
 *  put:
 *    summary: update a role
 *    tags: [Role]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Role'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the role id
 *    responses:
 *      200:
 *        description: role updated!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Role'
 *      404:
 *        description: role not found
 */
router.put("/role/:id",updateRole);

/**
 * @swagger
 * /api/role/{id}:
 *  delete:
 *    summary: delete a role
 *    tags: [Role]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the role id
 *          
 *    responses:
 *      200:
 *        description: role deleted
 *      404:
 *        description: role not found
 *        
 */  
router.delete("/role/:id",deleteRole);


/**
 * @swagger
 * /api/staff-role/{id}:
 *  put:
 *    summary: assign a role
 *    tags: [Role]
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *             schema:
 *                type: object
 *                properties:
 *                     roleId:
 *                          type: string
 *                          description: the id role
 *                required:
 *                     - roleId
 *                example:
 *                     roleId: 634b796315ba7eeac1ee6909        
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the staff id
 *    responses:
 *      200:
 *        description: assigned role
 *      404:
 *        description: role id or staff id not found
 *        
 */  
router.put("/staff-role/:id",assignRole);



module.exports = router;