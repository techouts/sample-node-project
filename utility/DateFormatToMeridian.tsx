//  This can be used when Date format is YYYYMMDDHHMM to AM or PM time

 
 export const DateFormatToMeridian =(inputValue:any)=>{
    if(inputValue){
     let slotHours =inputValue?.substring(inputValue.length - 4).slice(0, 2);
     const slotMinutes = inputValue?.substring(inputValue.length - 2);
    let AmOrPm = slotHours >= 12 ? 'PM' : 'AM';
    slotHours = (slotHours % 12) || 12;
    let finalTime =  slotHours + ":" + slotMinutes + " " + AmOrPm; 
    return finalTime
    }
    else{
      return inputValue
    }
  }