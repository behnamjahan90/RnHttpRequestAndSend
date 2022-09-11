import {View,StyleSheet,Text} from 'react-native';

import { GlobalStyles } from '../../constans/styles';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';



function ExpensesOutput({expenses,expensesPeriod,fallbackText}) {
    let content = <Text style={styles.infoTextStyle}>{fallbackText}</Text>

    if(expenses.length > 0){
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <View style={styles.continer}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {content}
        </View>
    );
}

export default ExpensesOutput;

const styles=StyleSheet.create({
    continer:{
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingVertical: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    },
    infoTextStyle: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
});