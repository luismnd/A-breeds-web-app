import './Create.css'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTemperaments, createBreed} from '../../Redux/actions'
import { Link } from 'react-router-dom';

export default function Create() {
    const dispatch = useDispatch();
    const initialErrors = {name:"", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"", years:""};

    const [input,setInput] = React.useState({name:"", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"", years:"", temperament:[]});
    const temperaments = useSelector((state) => state.temperaments)

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);
    
    const [errors, setErrors] = React.useState({name:"", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"", years:""});
    const handleInputChange = function(e) {
        setInput({...input, [e.target.name]: e.target.value});
        setErrors(validate({...input,[e.target.name]: e.target.value}));
    }

    const handleTempSelection = function(e) {
        setInput({...input, temperament: Array.from(e.target.selectedOptions, option => option.value)});
    }

    const handleSubmit = function(e) {
        e.preventDefault();
        // if(errors!==initialErrors){
        //   alert("Please correct mentioned errors")
        // } else{
          dispatch(createBreed(input));
          setErrors({name:"", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"", years:""})
          setInput({name:"", minHeight:"", maxHeight:"", minWeight:"", maxWeight:"", years:"", temperament:[]})
        // }
    }
    return (
        <div className="form">
            <Link to="/home">Home</Link>
            <h1>Breeds creation form</h1>
            <form onSubmit = {(e)=>handleSubmit(e)}>
                <label>Name: </label>
                <input name="name" onChange={handleInputChange} value={input.name} placeholder="Your Breed´s name (must be any text)" className={errors.name && 'danger'}/>
                {errors.name && ( <p className="text-danger">{errors.name}</p> )}
                
                <label>Height: </label>
                <input name="minHeight" onChange={handleInputChange} value={input.minHeight} placeholder="Min height (must be a number)" className={errors.minHeight && 'danger'}/>
                {errors.minHeight && ( <p className="danger">{errors.minHeight}</p> )}
                <input name="maxHeight" onChange={handleInputChange} value={input.maxHeight} placeholder="Max height (must be a number)" className={errors.maxHeight && 'danger'}/>
                {errors.maxHeight && ( <p className="danger">{errors.maxHeight}</p> )}
                
                <label>Weight: </label>
                <input name="minWeight" onChange={handleInputChange} value={input.minWeight} placeholder="Min weight (must be a number)" className={errors.minWeight && 'danger'}/>
                {errors.minWeight && ( <p className="danger">{errors.minWeight}</p> )}
                <input name="maxWeight" onChange={handleInputChange} value={input.maxWeight} placeholder="Max weight (must be a number)" className={errors.maxWeight && 'danger'}/>
                {errors.maxWeight && ( <p className="danger">{errors.maxWeight}</p> )}
                
                <label>Years of life: </label>
                <input name="years" onChange={handleInputChange} value={input.years} placeholder="Years of life (must be a number)" className={errors.years && 'danger'}/>
                {errors.years && ( <p className="danger">{errors.years}</p> )}
                <label>Temperaments: </label>
                <select multiple onChange={e => handleTempSelection(e)}>
                {temperaments?.map(t=> <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}


function validate(input) {
  let errors = {};
  const regName = new RegExp(/^[A-Za-z0-9\s]+$/g);
  const regNum = new RegExp(/(?=.*[0-9])/);

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!regName.test(input.name)) {
    errors.name = "Name is invalid";
  }

  if (!input.minHeight) {
    errors.minHeight = "Minimum Height is required";
  } else if (!regNum.test(input.minHeight)) {
    errors.minHeight = "Minimum Height is invalid";
  }

  if (!input.maxHeight) {
    errors.maxHeight = "Maximum Height is required";
  } else if (!regNum.test(input.maxHeight)) {
    errors.maxHeight = "Maximum Height is invalid";
  }

  if (!input.minWeight) {
    errors.minWeight = "Minimum Weight is required";
  } else if (!regNum.test(input.minWeight)) {
    errors.minWeight = "Minimum Weight is invalid";
  }

  if (!input.maxWeight) {
    errors.maxWeight = "Maximum Weight is required";
  } else if (!regNum.test(input.maxWeight)) {
    errors.maxWeight = "Maximum Weight is invalid";
  }

  if (!input.years) {
    errors.years = "Years of life is required";
  } else if (!regNum.test(input.years)) {
    errors.years = "Years of life is invalid";
  }
  
  return errors;
};