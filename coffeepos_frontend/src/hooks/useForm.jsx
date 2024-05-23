import { useState } from "react"

export const useForm = (initialForm = {}, validateForm) => {

  const [formState, setFormState] = useState(initialForm);

  const [error, setError] = useState({});

  const [notValid, setNotValid] = useState(false);

  const [response, setResponse] = useState(null);

  const onResetForm = () => {
    setFormState(initialForm)
    console.log('button reset has been called')
  };
  
  const onInputChange = ({target}) => {

    const {name, value} = target;
    
    console.log(target.value);
    
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onInputBlur = (e) => {
    onInputChange(e);
    setError(validateForm(formState));
  };




  return {
    ...formState,
    formState,
    setResponse,
    onInputChange,
    onResetForm,
    onInputBlur,
    setNotValid,
    error,
    response,
    notValid
  };
};