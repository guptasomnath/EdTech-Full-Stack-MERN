export const nameToAvaterText = (fullName : string | undefined) => {
  const splitName = fullName?.split(" ") || "O E";
  const avaterText1 = splitName?.[0][0].toUpperCase();
  const avaterText2 = splitName?.[splitName.length - 1][0].toUpperCase();
  return avaterText1 + avaterText2;
}