export const calculateDuration = (duration : string | undefined) => {
  const secounds = parseInt(duration || "0");
  const hours = Math.floor(secounds / 3600);
  const minutes = Math.floor((secounds % 3600) / 60);
  const remainingSecounds = secounds % 60;

  let returnText : string = "";
  if(hours !== 0){
    returnText += hours + "h ";
  }
  if(minutes !== 0){
    returnText += minutes + "m ";
  }
  if(remainingSecounds !== 0){
    returnText += remainingSecounds + "s";
  }

  return returnText;
}

export const calculatePrice = (price = 1) : string => {
 return price === 0 ? "Free" : `${price} rs`;
}