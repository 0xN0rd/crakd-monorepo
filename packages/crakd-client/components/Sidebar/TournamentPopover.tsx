import React, { FC, useState, useRef } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { openAlert, AlertTypes } from '../../store/alert';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Popover, PopoverContent, ThreeDots } from './style';
import { Button, Modal, Confirm, Spacing } from '../ui';
const TournamentEdit = dynamic(() => import('../Tournament/TournamentEdit'));
import { ThreeDotsIcon } from '../ui/icons';
import { useClickOutside } from '../../utils';
import { Tournament } from '../../constants';

interface TournamentPopoverProps {
    tournament: Tournament;
}

const deleteTournament = async (id: string) => {
    const newTournament = await axios.delete('/tournaments/delete', { data: { id } });
    return newTournament.data;
};

const TournamentPopover: FC<TournamentPopoverProps> = ({ tournament }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const queryClient = useQueryClient();
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    useClickOutside(ref, isOpen, () => {
        setIsOpen(false);
    });

    const { mutateAsync } = useMutation(deleteTournament);

    const removeTournament = async (id: string) => {
        try {
            const deletedTournament = await mutateAsync(id);

            queryClient.setQueryData('tournaments', (existingTournaments: Tournament[]) => {
                return existingTournaments.filter((tournament) => tournament._id !== deletedTournament._id);
            });

            setIsEditModalOpen(false);
            setIsDeleteModalOpen(false);

            if (router.query.name === tournament.name) {
                router.push('/');
            }

            dispatch(
                openAlert({
                    message: 'The tournament has been deleted successfully.',
                    type: AlertTypes.Success,
                })
            );
        } catch (error) {
            dispatch(
                openAlert({
                    message: 'An error occurred while deleting a tournament.',
                    type: AlertTypes.Error,
                })
            );
        }
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
        setIsOpen(false);
    };
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
        setIsOpen(false);
    };
    const closeModal = () => {
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    return (
        <Popover ref={ref}>
            <Modal title="Edit Tournament" isOpen={isEditModalOpen} close={closeModal}>
                <TournamentEdit tournament={tournament} closeModal={closeModal} />
            </Modal>

            <Confirm isOpen={isDeleteModalOpen} close={closeModal} onConfirm={() => removeTournament(tournament._id)} />

            <ThreeDots isOpen={isOpen}>
                <Button ghost onClick={() => setIsOpen(!isOpen)}>
                    <Spacing top="xxs" bottom="xxs" left="xxs" right="xxs">
                        <ThreeDotsIcon />
                    </Spacing>
                </Button>
            </ThreeDots>

            {isOpen && (
                <PopoverContent>
                    <Button onClick={openEditModal} text fullWidth radius="none" size="xs">
                        Edit
                    </Button>

                    <Button text fullWidth radius="none" size="xs" onClick={openDeleteModal}>
                        Delete
                    </Button>
                </PopoverContent>
            )}
        </Popover>
    );
};

export default TournamentPopover;