function validateLogin(form) {
  let error = {};

  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;


  if(!form.employeeEmail.trim()) {
    error.employeeEmail = 'Not allow to be empty';
  } else if(!regexEmail.test(form.employeeEmail.trim())) {
    error.employeeEmail = 'characters not allowed';
  } 
  
  if(!form.employeePassword.trim()) {
    error.employeePassword = 'Not allowed to be empty';
  } else if(form.employeePassword.length < 5) {
    error.employeePassword = '+5 characters are required'
  }

  return error;
}

export default validateLogin;