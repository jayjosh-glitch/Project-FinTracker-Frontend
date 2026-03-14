import React, { useEffect, useState } from 'react'
import { expenseYear, incomeYear, monthFYData, categoryData } from '../../domain/dashBoardData.js'
import { useFetchExpenses } from '../../shared/hooks/useFetchExpenses'
import { useFetchIncomes } from '../../shared/hooks/temp.jsx';
import Navbar from '../../shared/components/Navbar'
import MonthlyFinanceChart from '../dashboard/MonthlyFinanceChart'
import ExpensePieChart from '../dashboard/ExpensePieChart'
import '../dashboard/dashboard.css';

const Dashboard = () => {

    const { expenseList } = useFetchExpenses();
    const { incomeList } = useFetchIncomes();
    const [monthlyData, setmonthlyData] = useState([])
    const [expenseCategory, setexpenseCategory] = useState([])

    useEffect(() => {
        const fetchData = () => {
            if (expenseList.length === 0 || incomeList.length === 0) {
                console.log("Loading data...")
                return;
            } else {
                const filteredExpenseList = expenseYear(expenseList);
                const filteredIncomeList = incomeYear(incomeList);
                const monthFYDataList = monthFYData(expenseList, incomeList);
                const categoryMonthlydata = categoryData(expenseList)
                console.log(filteredExpenseList);
                console.log(filteredIncomeList);
                console.log(monthFYDataList);
                console.log(categoryMonthlydata)
                setmonthlyData(monthFYDataList)
                setexpenseCategory(categoryMonthlydata)
            }
        }
        fetchData()
    }, [expenseList, incomeList])


    return (
        <>
            <Navbar />
            <div className='dashboard-container'>
                <h2>Financial Overview</h2>
                <div className="chart-card">
                    <h2>Yearly Chart</h2>
                    <MonthlyFinanceChart monthlyData={monthlyData} />
                </div>
                <div className="chart-card">
                    <h3>Expense Breakdown</h3>
                    <ExpensePieChart expenseCategory={expenseCategory} />
                </div>
            </div>
        </>

    )
}

export default Dashboard