import * as Yup from 'yup';
import {
  insertDoctorOnDB,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorByID,
} from '../Services/doctorServices';
import {
  generatePasswordHashed,
  verifyPassword,
  getCurrentDoctorPassword,
} from '../Services/passwordServices';

const doctorController = {
  store: async (request, response) => {
    // mudança para testar mergeaaaaaaaaaaaa
    const { body } = request;

    const doctorSchema = Yup.object().shape({
      name: Yup.string().required().min(),
      email: Yup.string().email().required().min(6),
      password: Yup.string().required().min(6),
    });

    if (!(await doctorSchema.isValid(body))) {
      return response.status(401).json({ Error: 'Validation errors' });
    }

    const passwordHashed = generatePasswordHashed(body.password);
    const data = {
      name: body.name,
      email: body.email,
      password: passwordHashed,
    };

    try {
      await insertDoctorOnDB({ ...data });

      return response
        .status(201)
        .json({ message: 'you have been successfully registered!' });
    } catch (err) {
      return response.status(400).json(err);
    }
  },

  index: async (request, response) => {
    try {
      const doctors = await getDoctors();

      return response.status(200).json(doctors);
    } catch (err) {
      return response.status(400).json(err);
    }
  },

  update: async (request, response) => {
    const { id, name, oldPassword, newPassword } = request.body;
    const passwordHashed = generatePasswordHashed(newPassword);

    const currentDoctorPassword = await getCurrentDoctorPassword(id);
    const { password } = currentDoctorPassword;

    if (!verifyPassword(oldPassword, password)) {
      return response
        .status(400)
        .json({ message: 'your old password does not match' });
    }

    try {
      await updateDoctor(id, name, passwordHashed);

      return response.json({ id, name, password: passwordHashed });
    } catch (err) {
      return response.status(400).json(err);
    }
  },

  delete: async (request, response) => {
    const { id } = request.params;
    const doctor = await getDoctorByID(id);

    if (doctor.id !== id) {
      return response
        .status(401)
        .json({ message: 'operation not permitted !' });
    }

    try {
      await deleteDoctor(id);

      return response
        .status(200)
        .json({ message: 'Doctor deleted sucessfully' });
    } catch (error) {
      return response.status(400).json(error);
    }
  },
};

export default doctorController;
