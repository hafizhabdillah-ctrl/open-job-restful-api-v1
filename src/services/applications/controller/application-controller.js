import ApplicationRepositories from '../repositories/application-repositories.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
/* eslint-disable camelcase */

export const createApplication = async (req, res, next) => {
  try {
    const { user_id, job_id, status } = req.validated;
    const application = await ApplicationRepositories.createApplication({
      user_id,
      job_id,
      status,
    });

    return response(res, 201, 'Application berhasil ditambahkan', { id: application });

  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const applications = await ApplicationRepositories.getApplications();

    return response(res, 200, 'Application berhasil didapatkan', { applications });

  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await ApplicationRepositories.getApplicationById(id);

    if (!application) {
      throw new NotFoundError('Application tidak ditemukan');
    }

    return response(res, 200, 'Berhasil mendapatkan data application', application);

  } catch (error) {
    next(error);
  }
};

export const getApplicationByJobId = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const applications = await ApplicationRepositories.getApplicationByJobId(jobId);

    return response(res, 200, 'Berhasil mendapatkan data application berdasarkan job id', { applications });

  } catch (error) {
    next(error);
  }
};

export const getApplicationByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const applications = await ApplicationRepositories.getApplicationByUserId(userId);

    return response(res, 200, 'Berhasil mendapatkan data application berdasarkan user id', { applications });

  } catch (error) {
    next(error);
  }
};

export const editApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.validated;
    const application = await ApplicationRepositories.editApplication({ id, status });

    if (!application) {
      throw new NotFoundError('Application tidak ditemukan');
    }

    return response(res, 200, 'Application berhasil diperbarui');

  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedApplication = await ApplicationRepositories.deleteApplication(id);

    if (!deletedApplication) {
      throw new NotFoundError('Application tidak ditemukan');
    }

    return response(res, 200, 'Application berhasil dihapus');

  } catch (error) {
    next(error);
  }
};