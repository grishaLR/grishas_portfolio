import { Request, Response } from 'express';
import MigraineType from '../models/MigraineType';

export const getAllMigraineTypes = async (req: Request, res: Response) => {
  try {
    const migraineTypes = await MigraineType.find();
    res.json(migraineTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching migraine types', error });
  }
};

export const addMigraineType = async (req: Request, res: Response) => {
  try {
    const newMigraineType = new MigraineType(req.body);
    const savedMigraineType = await newMigraineType.save();
    res.status(201).json(savedMigraineType);
  } catch (error) {
    res.status(400).json({ message: 'Error adding migraine type', error });
  }
};

export const deleteMigraineType = async (req: Request, res: Response) => {
  try {
    await MigraineType.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting migraine type', error });
  }
};
