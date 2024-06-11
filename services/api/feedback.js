import axiosInstance, { endpoints } from '../../utils/axios';

const feedbackApi = {
  createFeedback: async(eventData) => {
    const { data } = await axiosInstance.post(endpoints.feedback.new, eventData);
    return data.result;
  },
  getFeedback: async(bookingId) => {
    const { data } = await axiosInstance.get(`${endpoints.feedback.detail}?bookingId=${bookingId}`);
    return data.result;
  }
}

export default feedbackApi;