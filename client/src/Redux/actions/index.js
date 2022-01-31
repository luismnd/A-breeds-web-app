import axios from "axios";

export function getBreeds() {
  return async function(dispatch) {
    var json = await axios.get('http://localhost:3001/dogs');
    return dispatch({
      type: 'GET_BREEDS',
      payload: json.data
    });
  }
  // return function(dispatch) {
  //   return fetch(server + "dogs")
  //     .then(response => response.json())
  //     .then(json => {
  //       dispatch({ type: "GET_ALL_BREEDS", payload: json });
  //     });
  // };
}

export function getTemperaments() {
  return async function(dispatch) {
    var json = await axios.get('http://localhost:3001/temperament');
    return dispatch({
      type: 'GET_TEMPERAMENTS',
      payload: sortByName(json.data)
    });
  }
}

export function applyFilters(arr, temps=[]) {
  if (temps.length===0){
    return {
      type: "APPLY_FILTERS",
      payload: arr
    }
  }
  let filtered = arr;
  let phrase = "(";
  if (temps){
    phrase += "b.temperament.includes(temps[0])";
    for(let i=1; i<temps.length; i++){
      phrase += " && b.temperament.includes('"+temps[i]+"')";
    } phrase += ")";
  } 
  else {phrase = false;}
  filtered = arr?.filter(b=> eval(phrase))
  if(filtered.length===0){
    alert("No breeds found with those filter and search combination")
    return {
      type: "APPLY_FILTERS",
      payload: arr 
    } 
  } 
  else {
    return {
      type: "APPLY_FILTERS",
      payload: filtered
    }
  }
}

export function applyFilterAdded(arr, value){
  let filtered;
  if(value==="Added"){
    filtered=arr.filter(b=>b.hasOwnProperty("dBTag"));
  }
  if(value==="Existent"){
    filtered=arr.filter(b=>!b.hasOwnProperty("dBTag"));
  }
  else if(value==="All"){
    filtered=arr;
  }
  if(filtered.length===0){
    alert("No breeds found with those filter and search combination")
    return {
      type: "APPLY_FILTERS",
      payload: arr 
    }
  }
  return {
    type: "APPLY_FILTERS",
    payload: filtered
  }
}

function sortByName(arr, sortType = "ascending"){
  let sorted = arr.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
  // names must be equal
    return 0;
  });
  if (sortType==="descending"){
    return sorted.reverse()
  }
  return sorted;
}

function sortByWeight(arr, sortType = "ascending"){
  let unWeighted = [];
  let weighted = [];

  for(let i=0; i<arr.length; i++){
    if(isNaN(arr[i].weight)){
      unWeighted.push(arr[i]); 
    } else {weighted.push(arr[i]);};
  }

  let sorted = weighted.sort(function(a, b) {
    return parseInt(a.weight) - parseInt(b.weight);
  });
  sorted = sorted.concat(unWeighted);
  if (sortType==="descending"){
    return sorted.reverse()
  }
  return sorted;
}

export function applySort(arr, sortType = "ascending"){
  let sorted = arr;
  let indications = sortType.split("_");
  let sortBy = indications[0];
  let sortOrder = indications[1];
  if (sortBy==="name"){
    sorted = [].concat(sortByName(arr, sortOrder))
  } else if (sortBy=== "weight"){
    sorted = [].concat(sortByWeight(arr, sortOrder))
  }
  return {
    type: "APPLY_SORT",
    payload: sorted
  }
}

export function createBreed(breedData){
  return async function(dispatch) {
    try {
      var json = await axios.post('http://localhost:3001/dog', breedData);
      alert("Breed created! Name: "+json.data.name);
      getBreeds()(dispatch);
    } catch (error) {
      console.log(error)
    }
  }
}

export function getSearch(search, breeds){
  return async function(dispatch) {
    var json = await axios.get('http://localhost:3001/dogs?name='+search);
    if (json.data.hasOwnProperty("message")){
      alert("No results found!");
    } else {
      const searchBreeds = json.data;
      for (let i=0; i<searchBreeds.length; i++){
        for(let j=0; j<breeds.length; j++){
          if (searchBreeds[i].reference_image_id===breeds[j].reference_image_id){
            searchBreeds[i].image = breeds[j].image;
          }
        }
      }
      return dispatch({
        type: 'GET_SEARCH',
        payload: searchBreeds
      });
    }
  }
}

export function getDetail(id){
  return async function(dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/dogs/'+id);
      if (json.data.hasOwnProperty("message")){
        alert("No results found!");
      }
      else {
        return dispatch({
          type: 'GET_DETAIL',
          payload: json.data
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
}