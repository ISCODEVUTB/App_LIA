const { response } = require("express");
const Project = require('../models/Project');


const getProjects = async (req,res=response) => {
    const projects = await Project.find();
    res.json({
        ok:true,
        projects
    });
}

const createProject = async (req,res=response) => {
    const project = new Project(req.body);
    try {
        const projectDB = await project.save();
        res.json({
            ok:true,
            msg:projectDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error'
        });
    }
}

const updateProject = async( req, res = response ) => {
    
    const projectId = req.params.id;
    
    try {

        const project = await Project.findById( projectId );

        if ( !project ) {
            return res.status(404).json({
                ok: false,
                msg: 'Proyecto no existe por ese id'
            });
        }

        const nuevoProject = {
            ...req.body,
        }

        const projectUpdated = await Project.findByIdAndUpdate( projectId, nuevoProject, { new: true } );

        res.json({
            ok: true,
            project: projectUpdated
        });

        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Proyecto no existe por ese id'
        });
    }
}

const deleteProject = async (req,res = response) => {
    const projectId = req.params.id;
    try {
        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({
                ok:false,
                msg:'Proyecto con ese id no existe'
            });
        }
        await Project.findByIdAndDelete(projectId);
        
        res.json({
            ok:true,
            msg:'Proyecto eliminado'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error'
        })
    }
}

const findProject = async (req,res = response) => {
    const projectId = req.params.id;
    try {
        const project = await Project.findById( projectId );
        res.json({
            ok: true,
            project
        });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Proyecto no existe por ese id'
        });
    }
}

module.exports = {
    getProjects,
    deleteProject,
    createProject,
    updateProject,
    findProject
}