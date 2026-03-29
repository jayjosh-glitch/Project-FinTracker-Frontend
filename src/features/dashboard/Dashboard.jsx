import React, { useEffect, useState } from 'react'
import {  monthFYData, categoryData } from '../../domain/dashBoardData.js'
import { useFetchExpenses } from '../../shared/hooks/useFetchExpenses'
import { useFetchIncomes } from '../../shared/hooks/useFetchIncomes.jsx';
import Navbar from '../../shared/components/Navbar'
import MonthlyFinanceChart from '../dashboard/MonthlyFinanceChart'
import ExpensePieChart from '../dashboard/ExpensePieChart'
import '../dashboard/dashboard.css';
import Sidebar from '../../shared/components/Sidebar.jsx';
import Layout from '../../shared/components/Layout.jsx';

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
                // const filteredExpenseList = expenseYear(expenseList);
                // const filteredIncomeList = incomeYear(incomeList);
                const monthFYDataList = monthFYData(expenseList, incomeList);
                const categoryMonthlydata = categoryData(expenseList)
                // console.log(filteredExpenseList);
                // console.log(filteredIncomeList);
                console.log(monthFYDataList);
                // console.log(categoryMonthlydata)
                setmonthlyData(monthFYDataList)
                setexpenseCategory(categoryMonthlydata)
            }
        }
        fetchData()
    }, [expenseList, incomeList])


    return (
        <>
        <Layout>
             <div className='dashboard-container'>
                <h2>Financial Overview</h2>
                <div className="chart-card">
                    <h2>Yearly Chart</h2>
                    <MonthlyFinanceChart sortedData={monthlyData} />
                </div>
                <div className="chart-card">
                    <h3>Expense Breakdown</h3>
                    <ExpensePieChart expenseCategory={expenseCategory} />
                </div>
            </div>
        </Layout>
        </>

    )
}

export default Dashboard