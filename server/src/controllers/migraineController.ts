import { Request, Response } from 'express';
import Migraine from '../models/Migraine';

export const getAllMigraines = async (req: Request, res: Response) => {
  try {
    const migraines = await Migraine.find().populate('type');
    res.json(migraines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching migraines', error });
  }
};

export const addMigraine = async (req: Request, res: Response) => {
  try {
    const newMigraine = new Migraine(req.body);
    const savedMigraine = await newMigraine.save();
    res.status(201).json(savedMigraine);
  } catch (error) {
    res.status(400).json({ message: 'Error adding migraine', error });
  }
};

export const deleteMigraine = async (req: Request, res: Response) => {
  try {
    await Migraine.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting migraine', error });
  }
};

export const updateMigraine = async (req: Request, res: Response) => {
  try {
    const updatedMigraine = await Migraine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedMigraine);
  } catch (error) {
    res.status(400).json({ message: 'Error updating migraine', error });
  }
};
