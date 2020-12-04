/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import connection from '../Database/connection';

export const insertScheduleOnDB = async (data) => {
  const { doctor_id, schedule_date, scheduled_time } = data;

  return connection('schedules').insert({
    doctor_id,
    schedule_date,
    scheduled_time,
  });
};

export const deleteSchedule = async (id) => {
  const deletedSchedule = connection('schedules').delete().where({ id });
  return deletedSchedule;
};

export const updateSchedule = async (id, schedule_date, scheduled_time) => {
  return connection('schedules')
    .update({ scheduled_time })
    .where({ doctor_id: id })
    .andWhere({ schedule_date });
};

export const getSchedules = async () => {
  const Schedules = connection('schedules').select('*');
  return Schedules;
};
