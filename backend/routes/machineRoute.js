import express from "express";
import Machine from '../models/machineModel.js';

const router = express.Router();

// Route for Save a new Machine
router.post('/', async (request, response) => {
    try {
        const {
            machineNumber,
            machineName,
            machineType,
            installationDate,
            warrentyInformation,
            Status
        } = request.body;

        if (!machineNumber || !machineName || !machineType || !installationDate || !warrentyInformation || !Status) {
            return response.status(400).send({
                message: 'Please provide all required fields: machineNumber, machineName, machineType, installationDate, warrentyInformation, Status'
            });
        }

        const newMachine = await Machine.create({
            machineNumber,
            machineName,
            machineType,
            installationDate,
            warrentyInformation,
            Status
        });

        return response.status(201).json(newMachine);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating Machine Status by ID
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { Status } = request.body;

        if (!Status) {
            return response.status(400).send({
                message: 'Please provide the updated status.'
            });
        }

        const updatedMachine = await Machine.findByIdAndUpdate(
            id,
            { Status },
            { new: true }
        );

        if (!updatedMachine) {
            return response.status(404).json({ message: 'Machine not found' });
        }

        return response.status(200).json(updatedMachine);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route for getting all Machines
router.get('/', async (request, response) => {
    try {
        const machines = await Machine.find({});
        return response.status(200).json({
            count: machines.length,
            data: machines
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Other routes for getting, updating, and deleting individual machines

export default router;
