import api from './api';

const quizService = {
     getAll: async () => {
       

         return await api.get('/quiz/');
     },
    
    addQuiz: async(title,userid,active,fontcolor,scoremin,timelimit,questions)=> {
        const quiz = {title,userid,active,fontcolor,scoremin,timelimit};
       
        return await api.post('/quiz',quiz);
   
    },
    getOne: async(quizId)=> {
       
       
        return await api.get('/quiz/'+quizId);
   
    }




};
export default quizService;