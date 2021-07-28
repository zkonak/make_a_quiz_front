import api from './api';

const choiceService = {
    getChoices: async (questionId) => {
       

        return await api.get('/option/question/'+ questionId);
    },
  
    addChoice: async(questionId,choice,correct,score)=> {
        const choiceData = {questionId,choice,correct,score};
       
        return await api.post('/option',choiceData);
   
    }

//     updatePlace: async(user_id,city_id,name,description,rooms ,bathrooms,max_guests,price_by_night,available,placeId)=> {
//         const place = {user_id,placeId,city_id,name,description,rooms ,bathrooms,max_guests,price_by_night,available};
// console.log(place)
//         return await api.patch('/places/'+ placeId,place);
   
//     }


};
export default choiceService;