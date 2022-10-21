const express = require("express");
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validar-campos');
const router = express.Router();
const { isDate } = require('../helpers/isDate');
const {getDonation,createDonation,updateDonation,deleteDonation,findDonation, assignDonation} = require("../controllers/materialDonation");


/**
 * @swagger
 * /material-donation:
 *  get:
 *    summary: return all material donation
 *    tags: [MaterialDonation]
 *    responses:
 *      200:
 *        description: all material donation
 *        content:
 *             application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/MaterialDonation'
 */
router.get("/material-donation", getDonation);

/**
 * @swagger
 * components:
 *  schemas:
 *    MaterialDonation:
 *       type: object
 *       properties:
 *           personName:
 *               type: string
 *               description: donor's name
 *           donationName:
 *               type: string
 *               description: name of material donation
 *           description:
 *               type: string
 *               description: description of the material donation
 *           quantity:
 *               type: number
 *               description: number of objects
 *           date:
 *               type: date
 *               description: current date
 *           projectId:
 *               type: string
 *               description: id of project
 *       required:
 *           - personName
 *           - donationName
 *           - description
 *           - quantity
 *           - date
 *       example:
 *           personName: Alberto
 *           donationName: Computadores
 *           description: Quiero donar dos computadoras al proyecto llamado gestion de proyectos UTB
 *           quantity: 2
 *           date: 1665889805573
 *           projectId: 634b796315ba7eeac1ee69 
 */             

/**
 * @swagger
 * /material-donation:
 *  post:
 *    summary: create a new material donation
 *    tags: [MaterialDonation]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/MaterialDonation'
 *    responses:
 *      200:
 *        description: new material donation created!
 */
router.post('/material-donation',
            [
                check('personName','El nombre del donante es obligatorio').not().isEmpty(),
                check('donationName','El nombre de la donacion es obligatorio').not().isEmpty(),
                check('description','La descripcion de la donacion es obligatoria').not().isEmpty(),
                check('quantity','La cantidad es obligatoria').not().isEmpty(),
                check('date','Fecha es obligatoria').custom(isDate),
                validarCampos
            ],        
            createDonation);


/**
 * @swagger
 * /material-donation/{id}:
 *  get:
 *    summary: return a material donation
 *    tags: [MaterialDonation]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the material donation id
 *          
 *    responses:
 *      200:
 *        description: material donation found!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/MaterialDonation'
 *      404:
 *        description: Material donation not found
 *        
 */     
router.get("/material-donation/:id",findDonation);


/**
 * @swagger
 * /material-donation/{id}:
 *  put:
 *    summary: update a material donation
 *    tags: [MaterialDonation]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/MaterialDonation'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the material donation id
 *    responses:
 *      200:
 *        description: material donation updated!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/MaterialDonation'
 *      404:
 *        description: material donation not found
 */
router.put("/material-donation/:id",updateDonation);

/**
 * @swagger
 * /material-donation/{id}:
 *  delete:
 *    summary: delete a material donation
 *    tags: [MaterialDonation]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the material donation id
 *          
 *    responses:
 *      200:
 *        description: material donation deleted
 *      404:
 *        description: material donation not found
 *        
 */  
router.delete("/material-donation/:id",deleteDonation);

/**
 * @swagger
 * /material-donation/assign/{id}:
 *  put:
 *    summary: assign a material donation to project
 *    tags: [MaterialDonation]
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
 *        description: the material donation id
 *    responses:
 *      200:
 *        description: assigned project
 *      404:
 *        description: project id or material donation id not found
 *        
 */  
router.put("/material-donation/assign/:id",assignDonation);


module.exports = router;