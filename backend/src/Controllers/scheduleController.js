/* eslint-disable camelcase */
import * as Yup from 'yup';
import {
  insertScheduleOnDB,
  deleteSchedule,
  updateSchedule,
  getSchedules,
} from '../Services/scheduleServices';

const scheduleController = {
  store: async (request, response) => {
    const { body } = request;

    const scheduleSchema = Yup.object().shape({
      doctor_id: Yup.number().required(),
      schedule_date: Yup.date().required(),
      scheduled_time: Yup.boolean().required(),
    });

    if (!(await scheduleSchema.isValid(body))) {
      return response.status(401).json({ Error: 'Validation errors' });
    }

    const data = {
      doctor_id: body.doctor_id,
      schedule_date: body.schedule_date,
      scheduled_time: body.scheduled_time,
    };

    try {
      await insertScheduleOnDB({ ...data });

      return response
        .status(201)
        .json({ message: 'schedule added sucessfull' });
    } catch (error) {
      return response.status(400).json({ ...error });
    }
  },

  update: async (request, response) => {
    const { id } = request.params;
    const { schedule_date, scheduled_time } = request.body;

    try {
      await updateSchedule(id, schedule_date, scheduled_time);

      return response
        .status(200)
        .json({ message: 'scheduled time updated sucessfully' });
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  index: async (request, response) => {
    try {
      const schedules = await getSchedules();
      return response.status(200).json(schedules);
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  delete: async (request, response) => {
    const { id } = request.params;
    try {
      await deleteSchedule(id);

      return response.status(200).json({ message: 'schedule removed!' });
    } catch (error) {
      return response.status(400).json({ error });
    }
  },
};

export default scheduleController;
