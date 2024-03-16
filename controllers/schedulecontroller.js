const Schedule = require('../models/schedule')
const User = require ('../models/user.js')
//create one day schedule
const createOneDaySchedule=async(_userId,_dayName,_details)=>{
    try{
      console.log('controller');
      let Id=await User.findOne({_id:_userId})
      if(Id){
        let scheduleData=await Schedule.create({userId:_userId,dayName:_dayName,details:_details})
        if(scheduleData){
          console.log("the schedule was created successfully ,",scheduleData);
        }else{
          console.log("this schedule was'nt saved");
        }
      }
        }catch(err){
        console.log(err);
    }
}
const getAllDaysforUser=async(_userId)=>{
  try{
    let Id=await User.findOne({_id:_userId})
    if(Id){
      let scheduleData=await Schedule.find({userId:_userId})
      if(scheduleData){
        console.log("get the user schedual,",scheduleData);
        return scheduleData
      }else{
        console.log("this schedule was'nt saved");
      }
    }
      }catch(err){
      console.log(err);
  }
}
const DeleteDay=async (_userId , scheduleId)=>{
  try{
    let Id=await User.findOne({_id:_userId})
    if(Id){
      let scheduleData = await Schedule.deleteOne({_id:scheduleId})
      if (scheduleData) {
        console.log('was deleted successfully');
      }
    }
  }catch(e){
     console.log(e);
  }
}
const updateChecked=async (scheduleId)=>{
  try{
          let scheduleData = await Schedule.updateOne({_id:scheduleId,"details.hour": 22 }
        ,{
          $set: { "details.$.done": true } 
        })
      if (scheduleData) {
        console.log('was update successfully');
      }
    
  }catch(e){
     console.log(e);
  }
}

module.exports={createOneDaySchedule, getAllDaysforUser ,DeleteDay ,updateChecked}