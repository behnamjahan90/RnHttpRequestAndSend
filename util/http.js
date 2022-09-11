import axios from "axios";

const BACKEND_URL = 'https://rn-behnam-test-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
    const response= await axios.post(
            BACKEND_URL+'/expenses.json',
            expenseData
        );
    const id = response.data.name; // firebase use name as id. because of this, we use it as id.

    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL+'/expenses.json');
    const expenses = [];
    for(const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };

        expenses.push(expenseObj);
    }
    return expenses;
}

export async function updateExpense(id,expenseData) {
    const updatedItem = await axios.put(BACKEND_URL+`/exoenses/${id}.json`,expenseData);
    return updatedItem;
}

export async function deleteExpense(id) {
    const deletedItem = await axios.delete(BACKEND_URL+`/exoenses/${id}.json`);
    return deletedItem;
}