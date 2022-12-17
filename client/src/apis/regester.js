import axios from "axios";
import { URL } from "../conf";

export const register = (data) => {
  return axios.post(`${URL}/api/users/`, data);
};

export const login = (data) => {
  return axios.post(`${URL}/api/users/login`, data);
};

export const forgot = (data) => {
  return axios.post(`${URL}/api/users/sendLink`, data);
};

export const newPassword = (data) => {
  return axios.post(`${URL}/api/users/newPassword`, data);
};

export const getUser = (token) => {
  return axios.get(`${URL}/api/users/getAUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (payload, token) => {
  return axios.put(`${URL}/api/users/update`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendImgProfile = (payload, token) => {
  return axios.post(`${URL}/api/files/profile`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getImgProfile = (id) => {
  return axios.get(`${URL}/api/files/${id}`);
};

export const updateImgProfile = (id, data, token) => {
  return axios.put(`${URL}/api/files/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataEducation = (token) => {
  return axios.get(`${URL}/api/skills/eduction/getEduction`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addDataEducation = (data, token) => {
  return axios.post(`${URL}/api/skills/eduction`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataExperience = (token) => {
  return axios.get(`${URL}/api/skills/experience/getExperience`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addDataExperience = (data, token) => {
  return axios.post(`${URL}/api/skills/experience`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataExperienceBYId = (id, token) => {
  return axios.get(`${URL}/api/skills/experience/getExperience/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdateExperienceBYId = (id, token, data) => {
  return axios.put(`${URL}/api/skills/experience/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const DeleteExperienceBYId = (id, token) => {
  return axios.delete(`${URL}/api/skills/experience/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDataEducation = (id, data, token) => {
  return axios.put(`${URL}/api/skills/eduction/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataEducationByID = (id, token) => {
  return axios.get(`${URL}/api/skills/eduction/getEduction/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const DeleteEducationByID = (id, token) => {
  return axios.delete(`${URL}/api/skills/eduction/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const makeJob = (token, data) => {
  return axios.post(`${URL}/api/jobs/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const makeUpdataJob = (id, token, data) => {
  return axios.put(`${URL}/api/jobs/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAJobByComapnyDraft = (id, token) => {
  return axios.get(`${URL}/api/jobs/getAJobByComapnyDraft/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllJobs = (token) => {
  return axios.get(`${URL}/api/users/getAllJobsByadmin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const makeRelesForJob = (id, token) => {
  return axios.get(`${URL}/api/users/updateJob/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAJob = (id, token) => {
  return axios.get(`${URL}/api/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getACompany = (id, token) => {
  return axios.get(`${URL}/api/company/getACompany/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAUserBYCompanyId = (id, token) => {
  return axios.get(`${URL}/api/users/getAUserBYCompanyId/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAJobByComapny = (id, token) => {
  return axios.get(`${URL}/api/jobs/getAJobByComapny/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const DeleteJob = (id) => {
  return axios.delete(`${URL}/api/jobs/${id}`);
};

export const getJobForAll = () => {
  return axios.delete(`${URL}/api/jobs/all/getJobForAll`);
};
