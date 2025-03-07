


export const checkNumberPhone = (phone: string): boolean => {

  const numberLength = 13
  if (phone.length !== numberLength) {
    return false
  } 

  const isAllNumber = phone.split('').every(char => char >= '0' && char <= '9');
  if (!isAllNumber) {
    return false
  }

  return true;
}