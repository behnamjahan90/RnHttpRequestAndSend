import {createContext, useReducer} from 'react';

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description,amount,date})=> {},
    setExpenses: (expenses) => {},
    updateExpense: (id, {description,amount,date})=> {},
    deleteExpense: (id)=> {},
});

function expensesReducer (state,action) {
    switch (action.type) {
        case 'Add':
            const id= new Date().toString() + Math.random().toString();
            return [action.payload, ...state];
        case 'Update':
            const updatebExpenseIndex = state.findIndex(
                (expense)=> expense.id === action.payload
            );

            const updatableExpense = state[updatebExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatebExpenseIndex] = updatedItem;

            return updatedExpenses;
        case 'Set':
            const inverted = action.payload.reverse();
            return inverted;
        case 'Delete':
            return state.filter((expense)=> expense.id !== action.payload);
        default:
            return state;
    }
}


function ExpenseContextProvider({children}) {
    const [expensesState, dispatch]=useReducer(expensesReducer,[]);

    function addExpense(expensesData) {
        dispatch({type: 'Add' , payload: expensesData});
    }
    
    function deleteExpense(id) {
        dispatch({type: 'Delete' , payload: id});
    }

    function setExpenses(expenses) {
        dispatch({type: 'Set',payload: expenses})
    }
    
    function updateExpense(id,expensesData) {
        dispatch({type: 'Update' , payload: id, data: expensesData});
    }
    
    const value = {
        expenses: expensesState,
        setExpenses, setExpenses,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense
    }

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
};

export default ExpenseContextProvider;