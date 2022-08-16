import React, { FC, useState, useRef } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Confirm } from '../../ui';
import { ThreeDotsIcon } from '../../ui/icons';
import { useClickOutside } from '../../../utils';
import { Popover, PopoverContent } from './style';
import { openAlert, AlertTypes } from '../../../store/alert';
import { useRouter } from 'next/router';
import { RootState } from '../../../store';
import { UserRole } from '../../../constants';

interface EntryCardPopoverProps {
    entryId: string;
    tournamentId: string;
    queryKey: any;
    openEntryCreate: () => void;
    refetch?: any;
}

const deleteEntry = async ({ id: id }) => {
    const newEntry = await axios.delete('/entries/delete', { data: { id } });
    return newEntry.data;
};

const EntryCardPopover: FC<EntryCardPopoverProps> = ({
    entryId,
    queryKey,
    refetch,
    openEntryCreate,
}) => {
    const authUser = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const ref = useRef(null);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    useClickOutside(ref, isPopoverOpen, () => {
        setIsPopoverOpen(false);
    });

    const { mutateAsync: deleteEntryMutation } = useMutation(deleteEntry);

    const removeEntry = async () => {
        try {
            const deletedEntry = await deleteEntryMutation({ id: entryId });

            if (router.route !== '/entries/[id]') {
                queryClient.setQueryData(queryKey, (existingEntries: any) => {
                    return {
                        ...existingEntries,
                        pages: existingEntries.pages.map((entries) => entries.filter((entry) => entry._id !== deletedEntry._id)),
                    };
                });
            }

            setIsConfirmOpen(false);
            dispatch(
                openAlert({
                    message: 'The entry has been successfully deleted.',
                    type: AlertTypes.Success,
                })
            );
            if (router.route === '/entries/[id]') {
                router.push('/');
            }
        } catch (error) {
            console.log('An error occurred while deleting an entry: ', error);
            dispatch(
                openAlert({
                    message: 'An error occurred while deleting an entry.',
                    type: AlertTypes.Error,
                })
            );
        }
    };

    const onOpenConfirm = () => {
        setIsConfirmOpen(true);
        setIsPopoverOpen(false);
    };

    return (
        <Popover ref={ref}>
            <Confirm
                isOpen={isConfirmOpen}
                close={() => setIsConfirmOpen(false)}
                onConfirm={removeEntry}
                title="Delete the entry permanently?"
            />

            <Button ghost onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                <ThreeDotsIcon width="16" />
            </Button>

            {isPopoverOpen && (
                <PopoverContent>
                    <Button color="text" text fullWidth radius="none" size="xs" onClick={onOpenConfirm}>
                        Delete Entry
                    </Button>
                </PopoverContent>
            )}
        </Popover>
    );
};

export default EntryCardPopover;
