const { response } = require("express");
const Role = require('../models/Role');
const Staff = require('../models/Staff');

const getRoles = async(req,res=response) => {
    const role = await Role.find();
    res.json({
        ok:true,
        role
    });
}

const createRole = async (req,res=response) => {
    const role = new Role(req.body);
    try {
        const roleDB = await role.save();
        res.json({
            ok:true,
            msg:roleDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error'
        });
    }
}

const updateRole = async( req, res = response ) => {
    
    const roleId = req.params.id;
    
    try {

        const role = await Role.findById( roleId );

        if ( !role ) {
            return res.status(404).json({
                ok: false,
                msg: 'Rol no existe por ese id'
            });
        }

        const nuevoRole = {
            ...req.body,
        }

        const roleUpdated = await Role.findByIdAndUpdate( roleId, nuevoRole, { new: true } );

        res.json({
            ok: true,
            Role: roleUpdated
        });

        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Role no existe por ese id'
        });
    }
}

const deleteRole = async (req,res = response) => {
    const roleId = req.params.id;
    try {
        const role = await Role.findById(roleId);
        if(!role){
            return res.status(404).json({
                ok:false,
                msg:'Role con ese id no existe'
            });
        }
        await Role.findByIdAndDelete(roleId);
        
        res.json({
            ok:true,
            msg:'Role eliminado'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error'
        })
    }
}

const findRole = async (req,res = response) => {
    const roleId = req.params.id;
    try {
        const role = await Role.findById( roleId );
        res.json({
            ok: true,
            role
        });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Role no existe por ese id'
        });
    }
}

const assignRole = async (req,res = response) => {
    const staffId = req.params.id;
    const {roleId} = req.body;
    try {
        const staff = await Staff.findById( staffId );
        try {
            const role = await Role.findById( roleId );
            const staffUpdated = await Staff.findByIdAndUpdate( staffId,{
                $push: { role:role}
            });
            res.json({
                ok: true,
                staffUpdated
            });
        } catch (error) {
            console.log(error);
            res.status(404).json({
            ok: false,
            msg: 'Role no existe por ese id'
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
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    findRole,
    assignRole
}