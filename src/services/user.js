import api from './api';

const userService = {
    addUser: async (firstname,lastname,username,email,password,confimed) => {
        const user = {firstname,lastname,username,email,password,confimed};
        console.log('add user')
        return await api.post('/user', user);
    },
    login: async (email,password) => {
        const user = {email,password};

        return await api.post('/user/login', user);
    },

     getOne: async (userId) => {
        

        return await api.get('/user/'+userId);
    },

};

export default userService;