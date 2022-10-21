const { response } = require("express");
const MaterialDonation = require('../models/MaterialDonation');
const Project = require('../models/Project');
const mongoose = require("mongoose");


const getDonation = async(req,res=response) => {
    MaterialDonation.find({}, (err,MaterialDonation)=> {
        Project.populate(MaterialDonation,{path:"project"}, (err,MaterialDonation)=>{
            res.status(200).send(MaterialDonation);
        })
    });
}

const createDonation = async (req,res=response) => {
    const donation = new MaterialDonation(req.body);
    try {
        const donationDB = await donation.save();
        res.json({
            ok:true,
            msg:donationDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error'
        });
    }
}

const updateDonation = async( req, res = response ) => {
    
    const donationId = req.params.id;
    
    try {

        const donation = await MaterialDonation.findById( donationId );

        if ( !donation ) {
            return res.status(404).json({
                ok: false,
                msg: 'Donacion no existe por ese id'
            });
        }

        const nuevoDonation = {
            ...req.body,
        }

        const donationUpdated = await MaterialDonation.findByIdAndUpdate( donationId, nuevoDonation, { new: true } );

        res.json({
            ok: true,
            MaterialDonation: donationUpdated
        });

        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Donacion no existe por ese id'
        });
    }
}

const deleteDonation = async (req,res = response) => {
    const donationId = req.params.id;
    try {
        const donation = await MaterialDonation.findById(donationId);
        if(!donation){
            return res.status(404).json({
                ok:false,
                msg:'Donacion con ese id no existe'
            });
        }
        await MaterialDonation.findByIdAndDelete(donationId);
        
        res.json({
            ok:true,
            msg:'Donacion eliminada'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error'
        })
    }
}

const findDonation = async (req,res = response) => {
    const donationId = req.params.id;
    try {
        const donation = await MaterialDonation.findById( donationId );
        res.json({
            ok: true,
            donation
        });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Donacion no existe por ese id'
        });
    }
}

const assignDonation = async (req,res = response) => {
    const donationId = req.params.id;
    const {projectId} = req.body;
    try {
        const donation = await MaterialDonation.findById( donationId );
        try {
            const project = await Project.findById( projectId );
            const donationUpdated = await MaterialDonation.findByIdAndUpdate( donationId,{
                $push: { project:project}
            });
            res.json({
                ok: true,
                donationUpdated
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
            msg: 'Donacion no existe por ese id'
        });
    }
}

module.exports = {
    getDonation,
    createDonation,
    updateDonation,
    deleteDonation,
    findDonation,
    assignDonation
}