import { useState } from 'react';
import {View,StyleSheet,Text, Alert} from 'react-native'
import { GlobalStyles } from '../../constans/styles';

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';

// use textInput parameter for Input Component should be checked by textInput properties in react-native refrence site
// for example https://reactnative.dev/docs/textinput#keyboardtype
function ExpenseForm({onCancel,onSubmit,submitButtonLabel,defaultValues}) {
    const [inputs,setInputs]=useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description.toString() : '',
            isValid: true
        }
    });

    function inputChangeHandler(inputIndentifier,enteredValue){
        setInputs((currInputs) => {
            return {
                ...currInputs,
                [inputIndentifier]: {value: enteredValue, isValid: true}
            };
        });
    }

    function submitHandler() {
        const expensesData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expensesData.amount) && expensesData.amount > 0 ;
        const dataIsValid = expensesData.date.toString() !== 'Invalid Date';//'Invalid Date' is a fix javaScript message when a date is invalid
        const descriptionIsValid = expensesData.description.toString().trim().length > 0;

        if(!amountIsValid || !dataIsValid || !descriptionIsValid) {
            //Alert.alert('Invalid input','Please check your input values');
            setInputs((curinputs)=> {
                return {
                    amount: {value: curinputs.amount.value , isValid: amountIsValid},
                    date: {value: curinputs.date.value , isValid: dataIsValid},
                    description: {value: curinputs.description.value , isValid: descriptionIsValid}
                };
            });
            return;
        }

        onSubmit(expensesData);
    }

    const formIsValid = 
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}> 
            <Text style={styles.titleStyle}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    label='Amount' 
                    style={styles.rowInput}
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                    keyboardType : 'decimal-pad',
                    onChangeText : inputChangeHandler.bind(this,'amount'),
                    value : inputs.amount.value
                }}/>
                <Input 
                    label='Date' 
                    style={styles.rowInput}
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                    placeholder : 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText : inputChangeHandler.bind(this,'date'),
                    value : inputs.date.value
                }}/>
           </View>
           <Input 
                label='Description' 
                invalid={!inputs.description.isValid}
                textInputConfig={{
                multiline: true,
                 //autoCapatalize: 'none'
                //autoCorrect: false //default is true
                onChangeText : inputChangeHandler.bind(this,'description'),
                    value : inputs.description.value

           }}/>
           {formIsValid &&
            (<Text style={styles.textError}>Invalid input values - please check your entered data!</Text>)}
            <View style={styles.buttons}>
                <Button mode='flat' onPress={onCancel}  style={styles.button}>
                Cancel
                </Button>     
                <Button onPress={submitHandler} style={styles.button}>
                {submitButtonLabel}
                </Button> 
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    titleStyle:{
        fontWeight: 'bold',
        fontSize: 30,
        color: GlobalStyles.colors.primary100,
        marginBottom: 10,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textError:{
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
        backgroundColor: GlobalStyles.colors.error50,
        fontSize: 16
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    },
    rowInput: {
        flex: 1
    }
});