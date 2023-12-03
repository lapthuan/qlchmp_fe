import requests from "./httpService";

const ServiceBranch = {
    getAllBranch: async () => {
        return requests.get(`/chinhanh`);
    },
    getBranch: async (id) => {
        return requests.get(`/chinhanh/${id}`);
    },
    createBranch: async (body) => {
        return requests.post(`/chinhanh`, body);
    },
    editBranch: async (body) => {
        return requests.put(`/chinhanh`, body);
    },
    deleteBranch: async (id) => {
        return requests.delete(`/chinhanh/${id}`);
    }
}

export default ServiceBranch;