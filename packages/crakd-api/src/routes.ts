import { Request, Response, Router } from 'express';
import passport from 'passport';
import {
    AuthController,
    EntryController,
    SearchController,
    SettingsController,
    TournamentController,
    UserController,
} from './controllers';
import { checkIfAdmin, checkIfSuperAdmin, checkIfUser } from './utils/protectedRoute';
import { withUser } from './utils/withUser';

const router = Router();

router.get('/', (req: Request, res: Response) => res.send('echo'));

/**
 * Authentication
 */
router.get('/auth-user', AuthController.authUser);
router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/email-verify', AuthController.emailVerify);
router.get('/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/google/callback', AuthController.googleCallback);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', AuthController.facebookCallback);

/**
 * Users
 */
router.get('/users/get-users', withUser, UserController.getUsers);
router.get('/users/online-users', withUser, UserController.onlineUsers);
router.get('/users/new-users', withUser, UserController.newUsers);
router.get('/users/:id', UserController.user);
router.delete('/user/ban-user', checkIfSuperAdmin, UserController.banUser);

/**
 * Settings
 */
router.get('/settings', SettingsController.settings);
router.put('/settings/update-user', checkIfUser, SettingsController.updateProfile);
router.get('/settings/users', checkIfSuperAdmin, SettingsController.users);
router.get('/settings/users-total', checkIfSuperAdmin, SettingsController.usersTotal);
router.put('/settings/update-password', checkIfUser, SettingsController.updatePassword);
router.post('/settings/create-user', checkIfSuperAdmin, SettingsController.createUser);

/**
 * Tournaments
 */
router.get('/tournaments', TournamentController.tournaments);
router.get('/tournaments/:name', TournamentController.tournamentByName);
router.get('/tournaments/:format', TournamentController.tournamentsByFormat);
router.get('/tournaments/:duration', TournamentController.tournamentsByDuration);
router.post('/tournaments/create', checkIfAdmin, TournamentController.create);
router.put('/tournaments/update', checkIfAdmin, TournamentController.update);
router.delete('/tournaments/delete', checkIfAdmin, TournamentController.delete);
router.post('/tournaments/reorder', checkIfAdmin, TournamentController.reorder);

/**
 * Entries
 */
router.get('/entries/tournament/:tournamentId', EntryController.entriesByTournamentId);
router.get('/entries/user/:userId', EntryController.entriesByUserId);
router.get('/entries/:id', EntryController.entryById);
router.post('/entries/create', checkIfUser, EntryController.create);
router.put('/entries/update', checkIfUser, EntryController.update);
router.delete('/entries/delete', checkIfUser, EntryController.delete);

/**
 * Search
 */
router.get('/search/all/:searchQuery', withUser, SearchController.search);
router.get('/search/users/:searchQuery', withUser, SearchController.searchUsers);

export default router;
