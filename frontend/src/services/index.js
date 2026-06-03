import api from './api';

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};

// Complaint services
export const complaintService = {
  createComplaint: (formData) => api.post('/complaints', formData),
  getUserComplaints: () => api.get('/complaints'),
  getComplaint: (id) => api.get(`/complaints/${id}`),
  updateComplaint: (id, data) => api.put(`/complaints/${id}`, data),
  deleteComplaint: (id) => api.delete(`/complaints/${id}`),
};

// Volunteer services
export const volunteerService = {
  getNearbyComplaints: (area) => api.get('/volunteer/nearby-complaints', { params: { area } }),
  getAssignedComplaints: () => api.get('/volunteer/assigned-complaints'),
  createActivity: (activityData) => api.post('/volunteer/activities', activityData),
  getActivities: () => api.get('/volunteer/activities'),
  updateArea: (area) => api.put('/volunteer/area', { area }),
};

// Admin services
export const adminService = {
  getAllComplaints: (filters) => api.get('/admin/complaints', { params: filters }),
  updateComplaintStatus: (id, data) => api.put(`/admin/complaints/${id}/status`, data),
  assignVolunteer: (id, volunteerId) => api.put(`/admin/complaints/${id}/assign-volunteer`, { volunteerId }),
  getAnalytics: () => api.get('/admin/analytics'),
  getVolunteerActivities: () => api.get('/admin/volunteer-activities'),
  getAllUsers: (role) => api.get('/admin/users', { params: { role } }),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};
