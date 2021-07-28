import api from './api';

const userQuizService = {
     getOne: async (userQuizId) => {
       

         return await api.get('/userquiz/'+userQuizId);
     },
     getAll: async (quizId) => {
       

         return await api.get('/userquiz/getAll/'+quizId);
     },
    
    add: async(userQuiz)=> {
       
       
        return await api.post('/userquiz',userQuiz);
   
    },
    
     getByUsername: async (userQuizId) => {
       

         return await api.get('/userquiz/byuser/'+localStorage.getItem("userId"));
     },
     getByQuiz: async (quizId) => {
       

         return await api.get('/userquiz/byquiz/'+quizId);
     },
    
    




};
export default userQuizService;