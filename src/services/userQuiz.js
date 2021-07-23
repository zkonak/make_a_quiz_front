import api from './api';

const quizService = {
     getAll: async () => {
       

         return await api.get('/quiz/');
     },
    
    addQuiz: async(title,userid,active,fontcolor,scoremin,timelimit,questions)=> {
        const quiz = {title,userid,active,fontcolor,scoremin,timelimit};
       
        return await api.post('/quiz',quiz);
   
    }

//     updatePlace: async(user_id,city_id,name,description,rooms ,bathrooms,max_guests,price_by_night,available,placeId)=> {
//         const place = {user_id,placeId,city_id,name,description,rooms ,bathrooms,max_guests,price_by_night,available};
// console.log(place)
//         return await api.patch('/places/'+ placeId,place);
   
//     }


};
export default quizService;