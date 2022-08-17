import Tournament from '../models/tournament';

export const getTournaments = async (): Promise<any> => {
  const tournaments = await Tournament.find({}).sort({ order: 1 });
  return tournaments;
};

export const getTournamentByName = async (name: string): Promise<any> => {
  const tournament = await Tournament.findOne({ name });
  return tournament;
};

export const getTournamentsByFormat = async (format: string): Promise<any> => {
  const tournaments = await Tournament.find({ format }).sort({ order: 1 });
  return tournaments;
};

export const getTournamentsByDuration = async (duration: string): Promise<any> => {
  const tournaments = await Tournament.find({ duration }).sort({ order: 1 });
  return tournaments;
};

export const createTournament = async (
  name: string,
  authRequired: boolean,
  order: number,
  format: string,
  duration: string,
  description?: string,
): Promise<any> => {
  const newTournament = await Tournament.create({
    name,
    authRequired,
    order,
    format,
    duration,
    description,
  });
  return newTournament;
};

export const updateTournament = async (
  id: string,
  name: string,
  authRequired: boolean,
  format: string,
  duration: string,
  entries: any[],
  description?: string,
): Promise<any> => {
  const updatedTournament = await Tournament.findOneAndUpdate(
    { _id: id },
    { name, authRequired, description, format, duration, entries },
    { new: true }
  );
  return updatedTournament;
};

export const reorderTournaments = async (sortedTournaments: any) => {
  sortedTournaments.forEach(async (tournament, index) => {
    await Tournament.findOneAndUpdate({ _id: tournament._id }, { order: index }, { new: true });
  });

  return 'success';
};

export const deleteTournament = async (id: string): Promise<any> => {
  const deletedTournament = await Tournament.findByIdAndRemove(id);
  return deletedTournament;
};



