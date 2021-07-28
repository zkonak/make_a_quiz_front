import api from './api';

const questionService = {
    getQuestions: async (quizId) => {
       

        return await api.get('/question/quiz/'+ quizId);
    },
  
    addQuestion: async(quizId,question,score)=> {
        const newquestion = {quizId,question,score};
       
        return await api.post('/question',newquestion);
   
    }

//     updatePlace: async(user_id,city_id,name,description,rooms ,bathrooms,max_guests,price_by_night,available,placeId)=> {
//         const place = {user_id,placeId,city_id,name,description,rooms ,bathrooms,max_guests,price_by_night,available};
// console.log(place)
//         return await api.patch('/places/'+ placeId,place);
   
//     }


};
export default questionService;