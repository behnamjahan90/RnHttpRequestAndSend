import { useContext, useLayoutEffect, useState } from 'react';
import {View,StyleSheet} from 'react-native';


import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constans/styles';
import { ExpenseContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense,deleteExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';


function ManageExpense({route,navigation}) {
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [error,setError]=useState();
    const expenseCtx=useContext(ExpenseContext);

    const edittedExpenseId = route.params?.expenseId;
    const isEditting = !!edittedExpenseId;

    const selectedExpense = expenseCtx.expenses.find((expense)=>expense.id === edittedExpenseId);

    useLayoutEffect(()=> {
        navigation.setOptions({
            title: isEditting ? 'Edit Expense' : 'Add Expense'
        });
    },[navigation,isEditting]);
 
    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(edittedExpenseId);
            expenseCtx.deleteExpense(edittedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense - please try again later');
            setIsSubmitting(false);
        }
    };

    function cancelHandler() {
        navigation.goBack();
    };

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if(isEditting){
                expenseCtx.updateExpense(edittedExpenseId,expenseData);
                await updateExpense(edittedExpenseId,expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save data - please try again later');
            setIsSubmitting(false);
        }
    };

    function errorHandler() {
        setError(null);
    }

    if(error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    if(isSubmitting) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                submitButtonLabel={isEditting ? 'Update' : 'Add'} 
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />
            {isEditting && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon='trash' 
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTopL: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});