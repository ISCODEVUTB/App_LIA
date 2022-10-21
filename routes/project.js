const express = require("express");
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = express.Router();
const {getProjects,createProject,updateProject,deleteProject,findProject} = require("../controllers/project");


/**
 * @swagger
 * /project:
 *  get:
 *    summary: return all projects
 *    tags: [Project]
 *    responses:
 *      200:
 *        description: all project
 *        content:
 *             application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Project'
 */
router.get("/project", getProjects);

/**
 * @swagger
 * components:
 *  schemas:
 *    Project:
 *       type: object
 *       properties:
 *           name:
 *               type: string
 *               description: name of project
 *           description:
 *               type: string
 *               description: the description of project
 *           date:
 *               type: date
 *               description: current date
 *           technicalSkills:
 *               type: string
 *               description: habilities
 *       required:
 *           - name
 *           - description
 *           - date
 *           - technicalSkills
 *       example:
 *           name: Gestion de proyectos UTB
 *           description: Se necesita crear una app para dar solucion a la gestion de los proyectos de la UTB.
 *           date: 1665889805573
 *           technicalSkills: Se necesitan ingenieros en sistemas, ya que será una app.
 */

/**
 * @swagger
 * /project:
 *  post:
 *    summary: create a new project
 *    tags: [Project]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Project'
 *    responses:
 *      200:
 *        description: new project created!
 */
router.post('/project',
            [
                check('name','El proyecto debe tener un nombre').not().isEmpty(),
                check('description','El proyecto debe tener una descripcion').not().isEmpty(),
                check('technicalSkills','Las habilidades necesarias deben ser obligatorias').not().isEmpty(),
                check('date','Fecha es obligatoria').custom(isDate),
                validarCampos
            ],        
            createProject);




/**
 * @swagger
 * /project/{id}:
 *  get:
 *    summary: return a project
 *    tags: [Project]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the project id
 *          
 *    responses:
 *      200:
 *        description: project found!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Project'
 *      404:
 *        description: project not found
 *        
 */     
router.get("/project/:id",findProject);


/**
 * @swagger
 * /project/{id}:
 *  put:
 *    summary: update a project
 *    tags: [Project]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Project'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the project id
 *    responses:
 *      200:
 *        description: project updated!
 *        content:
 *             application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Project'
 *      404:
 *        description: project not found
 */
router.put("/project/:id",updateProject);

/**
 * @swagger
 * /project/{id}:
 *  delete:
 *    summary: delete a project
 *    tags: [Project]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the project id
 *          
 *    responses:
 *      200:
 *        description: project deleted
 *      404:
 *        description: project not found
 *        
 */  
router.delete("/project/:id",deleteProject);

module.exports = router;
