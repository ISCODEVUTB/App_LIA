const express = require("express");
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validar-campos');
const router = express.Router();
const {getStaff,createStaff,updateStaff,deleteStaff,findStaff, assignProject} = require("../controllers/staff");


/**
 * @swagger
 * /api/staff:
 *  get:
 *    summary: return all staff
 *    tags: [Staff]
 *    responses:
 *      200:
 *        description: all staff
 *        content:
 *             application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Staff'
 */
router.get("/staff", getStaff);

/**
 * @swagger
 * components:
 *  schemas:
 *    Staff:
 *       type: object
 *       properties:
 *           name:
 *               type: string
 *               description: name
 *           lastName:
 *               type: string
 *               description: lastname
 *           area:
 *               type: string
 *               description: area
 *           projectId:
 *               type: string
 *               description: id of project
 *           roleId:
 *               type: string
 *               description: id of role
 *       required:
 *           - name
 *           - lastName
 *           - position
 *       example:
 *           name: Alberto
 *           lastName: Nuñez
 *           area: Ingenieria biomedica
 *           projectId: 634b796315ba7eeac1ee69
 *           roleId: 3512123fs5543 
 */             

/**
 * @swagger
 * /api/staff:
 *  post:
 *    summary: create a new staff
 *    tags: [Staff]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Staff'
 *    responses:
 *      200:
 *        description: new staff created!
 */
router.post('/staff',
            [
                check('name','El nombre es obligatorio').not().isEmpty(),
                check('lastName','El apellido es obligatorio').not().isEmpty(),
                check('area','El area es obligatorio').not().isEmpty(),
                validarCampos
            ],        
            createStaff);


/**
 * @swagger
 * /api/staff/{id}:
 *  get:
 *    summary: return a staff
 *    tags: [Staff]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the staff id
 *          
 *    responses:
 *      200:
 *        description: staff found!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Staff'
 *      404:
 *        description: Staff not found
 *        
 */     
router.get("/staff/:id",findStaff);


/**
 * @swagger
 * /api/staff/{id}:
 *  put:
 *    summary: update a staff
 *    tags: [Staff]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Staff'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the staff id
 *    responses:
 *      200:
 *        description: staff updated!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Staff'
 *      404:
 *        description: staff not found
 */
router.put("/staff/:id",updateStaff);

/**
 * @swagger
 * /api/staff/{id}:
 *  delete:
 *    summary: delete a staff
 *    tags: [Staff]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the staff id
 *          
 *    responses:
 *      200:
 *        description: staff deleted
 *      404:
 *        description: staff not found
 *        
 */  
router.delete("/staff/:id",deleteStaff);

/**
 * @swagger
 * /api/staff-project/{id}:
 *  put:
 *    summary: assign a project
 *    tags: [Project]
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *             schema:
 *                type: object
 *                properties:
 *                     projectId:
 *                          type: string
 *                          description: the id project
 *                required:
 *                     - projectId
 *                example:
 *                     projectId: 634b796315ba7eeac1ee6909        
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the staff id
 *    responses:
 *      200:
 *        description: assigned project
 *      404:
 *        description: project id or staff id not found
 *        
 */  
router.put("/staff-project/:id",assignProject);


module.exports = router;