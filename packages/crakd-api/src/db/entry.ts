// @ts-nocheck
import Entry from '../models/entry';
import Tournament from '../models/tournament';
import User from '../models/user';

export const entryById = async (id: string): Promise<any> => {
  const entry = await Entry.findById(id);
  return entry;
};

export const getTournamentEntries = async(tournamentId: any): Promise<any> => {
  const entries: any = await Entry.find({ tournament: tournamentId });
  return entries;
};

export const getEntriesByTournamentId = async (tournamentId: any, offset: number, limit: number): Promise<any> => {
  const entries = await Entry.find({ tournament: tournamentId })
    .populate({
      path: 'user',
      select: '-password',
    })
    .populate('tournament')
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: 'desc' });

  return entries.filter((p: any) => p?.user?.banned !== true);
};

export const getEntriesByUserId = async (userId: any, offset: number, limit: number): Promise<any> => {
  const entries = await Entry.find({ user: userId })
    .populate({
      path: 'user',
      select: '-password',
    })
    .populate('tournament')
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: 'desc' });

  return entries; 
};

export const getEntryById = async (id: string): Promise<any> => {
  const entry = await Entry.findById(id)
    .populate({
      path: 'user',
      select: '-password',
    })
    .populate('tournament');
  
  return entry;
};

export const createEntry = async(
  userId: string,
  score: number,
  position: number,
  tournamentId: string
): Promise<any> => {
  const newEntry = await new Entry({
    userId,
    score: score,
    position: position,
    tournament: tournamentId,
  }).save();

  await newEntry.populate('tournament').populate('user').execPopulate();

  await Tournament.findOneAndUpdate({ _id: tournamentId }, { $push: { entries: newEntry._id } });

  return newEntry;
};

export const updateEntry = async(
  entryId: string,
  score: number,
  position: number,
  tournamentId: string
): Promise<any> => {
  const fields = {
    score,
    position,
    tournament: tournamentId,
  };

  const updatedEntry = await Entry.findOneAndUpdate({ _id: entryId }, { ...fields }, { new: true })
    .populate({
      path: 'user',
      select: '-password',
    })
    .populate('tournament');

  return updatedEntry;
};

export const deleteEntry = async (id: string): Promise<any> => {
  const entry = await Entry.findByIdAndRemove(id);

  await Tournament.findOneAndUpdate({ _id: entry.tournament }, { $pull: { entries: entry._id } });
  await User.findOneAndUpdate({ _id: entry.user }, { $pull: { entries: entry._id } });

  return entry;
};

