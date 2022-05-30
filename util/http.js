import axios from "axios";

const firebase = "https://reactnative-expenses-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(firebase + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  //create async function
  const response = await axios.get(firebase + "/expenses.json"); //await get req and store in const response

  const expenses = []; //create expenses array for future return from function

  for (const key in response.data) {
    //for each key retrieved from firebase using the .get request
    const expenseObj = {
      //create obj, which stores the key as an id, amount, date and desc.
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date), //reformat date (which firebase stores as a string) back into a date
      description: response.data[key].description,
    };
    expenses.push(expenseObj); //push object into the array created in ln12
  }
  return expenses; //return expenses array (ln12) with the object pushed in
}

export function updateExpense(id, expenseData) {
  return axios.put(firebase + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return axios.delete(firebase + `/expenses/${id}.json`);
}
