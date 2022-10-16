const { response } = require("express");
const Staff = require('../models/Staff');
const Project = require('../models/Project');
const mongoose = require("mongoose");


const getStaff = async(req,res=response) => {
    Staff.find({}, (err,staff)=> {
        Project.populate(staff,{path:"project"}, (err,staff)=>{
            res.status(200).send(staff);
        })
    });
}

const createStaff = async (req,res=response) => {
    const staff = new Staff(req.body);
    try {
        const staffDB = await staff.save();
        res.json({
            ok:true,
            msg:staffDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error'
        });
    }
}

const updateStaff = async( req, res = response ) => {
    
    const staffId = req.params.id;
    
    try {

        const staff = await Staff.findById( staffId );

        if ( !staff ) {
            return res.status(404).json({
                ok: false,
                msg: 'Staff no existe por ese id'
            });
        }

        const nuevoStaff = {
            ...req.body,
        }

        const staffUpdated = await Staff.findByIdAndUpdate( staffId, nuevoStaff, { new: true } );

        res.json({
            ok: true,
            staff: staffUpdated
        });

        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Staff no existe por ese id'
        });
    }
}

const deleteStaff = async (req,res = response) => {
    const staffId = req.params.id;
    try {
        const staff = await Staff.findById(staffId);
        if(!staff){
            return res.status(404).json({
                ok:false,
                msg:'Staff con ese id no existe'
            });
        }
        await Staff.findByIdAndDelete(staffId);
        
        res.json({
            ok:true,
            msg:'Staff eliminado'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error'
        })
    }
}

const findStaff = async (req,res = response) => {
    const staffId = req.params.id;
    try {
        const staff = await Staff.findById( staffId );
        res.json({
            ok: true,
            staff
        });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Staff no existe por ese id'
        });
    }
}

const assignProject = async (req,res = response) => {
    const staffId = req.params.id;
    const {projectId} = req.body;
    try {
        const staff = await Staff.findById( staffId );
        try {
            const project = await Project.findById( projectId );
            const staffUpdated = await Staff.findByIdAndUpdate( staffId,{
                $push: { project:project}
            });
            res.json({
                ok: true,
                staffUpdated
            });
        } catch (error) {
            console.log(error);
            res.status(404).json({
            ok: false,
            msg: 'Project no existe por ese id'
        });
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Staff no existe por ese id'
        });
    }
}

module.exports = {
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    findStaff,
    assignProject
}
