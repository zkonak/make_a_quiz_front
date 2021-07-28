import api from './api';

const userResponseService = {
    
    
    add: async(userResponse)=> {
       
       
        return await api.post('/userresponse',userResponse);
   
    },

    getOne: async(userQuizId,questionId)=> {
       
       
        return await api.get('/userresponse/'+userQuizId+'/'+questionId);
   
    }




};
export default userResponseService;