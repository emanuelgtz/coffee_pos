function validateCreateAccount(form) {
  let error = {};

  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;


  if(!form.employeeName.trim()) {
    error.employeeName = 'Not allow to be empty';
  } else if(!regexName.test(form.employeeName.trim())) {
    error.employeeName = 'characters not allowed';
  } else if(form.employeeName.length < 4) {
    error.employeeName = '+4 characters is required'
  } 

  if(!form.employeeEmail.trim()) {
    error.employeeEmail = 'Not allow to be empty';
  } else if(!regexEmail.test(form.employeeEmail.trim())) {
    error.employeeEmail = 'characters not allowed';
  } 

  if(!form.employeeAge.trim()) {
    error.employeeAge = 'Not allow to be empty';
  } else if(form.employeeAge < 18) {
    error.employeeAge = 'Being +18 is mandatory';
  }
  
  if(!form.employeePassword.trim()) {
    error.employeePassword = 'Not allowed to be empty';
  } else if(form.employeePassword.length < 5) {
    error.employeePassword = '+5 characters are required'
  }

  if(!form.employeeAuthority) {
    error.employeeAuthority = 'Chose one role';
  } 

  return error;
}

export default validateCreateAccount;