/* eslint-disable import/prefer-default-export */
import connection from '../Database/connection';

export const insertDoctorOnDB = async (data) => {
  const { name, email, password } = data;

  return connection('doctors').insert({
    name,
    email,
    password,
  });
};

export const getDoctors = async () => {
  const users = connection('doctors')
    .join('schedules', 'schedules.doctor_id', 'doctors.id')
    .select(
      'doctors.id',
      'doctors.name',
      'schedules.schedule_date',
      'schedules.scheduled_time'
    );
  // .where({ scheduled_time: 0 });

  return users;
};

export const updateDoctor = async (id, name, newPassword) => {
  const users = connection('doctors')
    .update({
      name,
      password: newPassword,
      updated_at: new Date(),
    })
    .where({ id });

  return users;
};

export const deleteDoctor = async (id) => {
  const deletedDoctor = connection('doctors').delete().where({ id });

  return deletedDoctor;
};

export const getDoctorByID = async (id) => {
  const doctor = connection('doctors').where({ id }).select('doctors.id');

  return doctor;
};
