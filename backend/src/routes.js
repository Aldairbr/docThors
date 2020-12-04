import { Router } from 'express';
import doctorController from './Controllers/doctorController';
import scheduleController from './Controllers/scheduleController';

const routes = new Router();

routes.get('/', doctorController.index);
routes.post('/create-doctor', doctorController.store);
routes.put('/update-doctor', doctorController.update);
routes.delete('/delete-doctor/:id', doctorController.delete);

routes.get('/index', scheduleController.index);
routes.post('/create-schedule', scheduleController.store);
routes.delete('/delete-schedule/:id', scheduleController.delete);
routes.put('/update-schedule/:id', scheduleController.update);

export default routes;
