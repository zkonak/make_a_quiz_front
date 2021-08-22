import api from './api';
import userQuizService from './userQuiz';


function getAverageScore(data){
      let average=0;
      for (let index = 0; index < data.length; index++) {
        average = average+data[index].totalscore;
        
      }
      return average/data.length;
    }
const quizService = {
     getAll: async () => {
       

         return await api.get('/quiz/');
     },
    
    addQuiz: async(title,userId,fontcolor,backgroundcolor,scoremin,questions)=> {
        const quiz = {title,userId,fontcolor,backgroundcolor,scoremin};
       
        return await api.post('/quiz',quiz);
   
    },
     updateQuiz: async(id,title,userId,fontcolor,backgroundcolor,scoremin,questions)=> {
        const quiz = {id,title,userId,fontcolor,backgroundcolor,scoremin};
       
        return await api.put('/quiz/'+id,quiz);
   
    },
    getOne: async(quizId)=> {
       
       
        return await api.get('/quiz/'+quizId);
   
    },
     delete: async(quizId)=> {
       
       
        return await api.delete('/quiz/'+quizId);
   
    },
     
    getByUsername: async()=> {
       
       
            await api.get('/quiz/byuser/'+localStorage.getItem("userId"))
        //    .then( response=>{

        //         response.data.forEach((element) => {
        //         userQuizService.getAll(element.id).then(userQuizResponse=>{
                
        //         if(userQuizResponse.data){
        //         element.average=getAverageScore(userQuizResponse.data);
        //         }else{
        //             element.average=0;
        //         }
        //         element.numerofPlayers=response.data.length;
        //         }).catch(error=>{
        //            console.log(error)
        //         })
        //        return response;
               
        //      })
        // }).catch(err=>{
        //     console.log(err)
        // })
      
           
           
   
    }




};
export default quizService;