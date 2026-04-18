import axioInstance from "../utils/axioInstance";
import { API_PATHS } from "../utils/apiPaths";

const getDashboardData = async () => {
    try {
        const response = await axioInstance.get(API_PATHS.PROGRESS.GET_DASHBOARD);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch dashboard data' }
    }
};

const progressService = {
    getDashboardData
};

export default progressService;