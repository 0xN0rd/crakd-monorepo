import { Entry } from '../../constants';

interface updateCacheProps {
    queryKey: any | any;
    queryClient: any;
    operation: 'create' | 'update';
    entry: Entry;
    notAddingToCurrentTournament?: boolean;
}

export const updateEntriesByUserIdCache = ({
    queryKey,
    queryClient,
    operation,
    entry,
}: updateCacheProps) => {
    if (operation === 'create') {
        queryClient.setQueryData(queryKey, (existingEntries: any) => {
            return {
                ...existingEntries,
                pages: [[entry], ...existingEntries.page],
            };
        });
        return;
    }

    queryClient.setQueryData(queryKey, (existingEntries: any) => {
        return {
            ...existingEntries,
            pages: existingEntries.pages.map((entries: Entry[]) => {
                return entries.map((e: Entry) => {
                    if (e._id === entry._id) {
                        return {
                            ...e,
                            score: entry.score,
                            position: entry.position,
                            tournamentId: entry.tournament._id,
                        };
                    } else {
                        return e;
                    }
                });
            }),
        };
    });
};

export const updateSingleEntry = ({ queryKey, queryClient, entry }: updateCacheProps) => {
    queryClient.setQueryData(queryKey, (existingEntry: any) => {
        return {
            ...existingEntry,
            score: entry.score,
            position: entry.position,
            tournamentId: entry.tournament._id,
        };
    });
};

export const updateEntriesByTournamentName = ({
    queryKey,
    queryClient,
    entry,
    operation,
    notAddingToCurrentTournament,
}: updateCacheProps) => {
    if (notAddingToCurrentTournament && operation === 'create') {
        return;
    }

    if (notAddingToCurrentTournament && operation === 'update') {
        queryClient.setQueryData(queryKey, (existingEntries: any) => {
            return {
                ...existingEntries,
                pages: existingEntries.pages.map((entries: Entry[]) => {
                    return entries.filter((e: Entry) => e._id !== entry._id);
                }),
            };
        });
        return;
    }

    updateEntriesByUserIdCache({ queryKey, queryClient, entry, operation });
};

export const updateCache = ({
    queryKey,
    queryClient,
    operation,
    entry,
    notAddingToCurrentTournament,
}: updateCacheProps) => {
    let key = '';
    if (typeof queryKey === 'string' && queryKey !== 'entriesOther') {
        console.error(`updateCache error: ${queryKey} is an unknown cache key.`);
        return;
    }

    const keys = ['entriesByUserId', 'entriesByTournamentName', 'entry'];
    if (Array.isArray(queryKey) && !keys.includes(queryKey[0])) {
        console.error(`updateCache error: ${queryKey} us an unknown cache key.`);
        return;
    }
    key = typeof queryKey === 'string' ? queryKey : queryKey[0];

    switch (key) {
        case 'entriesOther':
        case 'entriesByUserId':
            updateEntriesByUserIdCache({ queryKey, queryClient, operation, entry });
            break;
        case 'entry':
            updateSingleEntry({ queryKey, queryClient, operation, entry });
            break;
        case 'entriesByTournamentName':
            updateEntriesByTournamentName({ queryKey, queryClient, operation, entry, notAddingToCurrentTournament });
        default:
            break;
    }
};
