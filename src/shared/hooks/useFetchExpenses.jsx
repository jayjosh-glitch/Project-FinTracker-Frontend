import { useEffect, useState } from "react";
import { getExpenses, addExpense, deleteExpense, updateExpense, filterExpenses } from "../../services/Expenseservice";

export const useFetchExpenses = () => {

    const [expenseList, setexpenselist] = useState([])
    const [exerror, setexerror] = useState(false)
    const [exloading, setexloading] = useState(false)
    const [filteredListE, setfilteredListE] = useState([])

    useEffect(() => {
        const fetchExpense = async () => {
            setexloading(true);
            try {
                const data = await getExpenses();
                setexpenselist(data)
            }
            catch (err) {
                setexerror(err.message)
            }
            finally {
                setexloading(false);
            }
        }
        fetchExpense();
    }, [])

    const addExpenses = async (formData) => {
        try {
            setexloading(true);
            const data = await addExpense(formData);
            setexpenselist([...expenseList, data]);
        } catch (err) {
            setexerror(err.message);
        } finally {
            setexloading(false);
            setexerror(false);
        }
    };

    const updateExpenses = async (id, formData) => {
        try {
            setexloading(true);
            const data = await updateExpense(id, formData);
            setexpenselist(expenseList.map((expense) => (expense.id === data.id ? data : expense)));
        } catch (err) {
            setexerror(err.message);
        } finally {
            setexloading(false);
            setexerror(false);
        }
    };

    const deleteExpenses = async (id) => {
        try {
            setexloading(true);
            await deleteExpense(id);
            setexpenselist(expenseList.filter((expense) => expense.id !== id));
        } catch (err) {
            setexerror(err.message);
        } finally {
            setexloading(false);
            setexerror(false);
        }
    };

    const filterExpense = async (month, year) => {
        try {
            setexloading(true)
            const data = await filterExpenses(month, year);
            setfilteredListE(data)
        }
        catch (err) {
            setexerror(err.message)
        }
        finally {
            setexloading(false);
        }
        
    }

    return { expenseList, exerror, exloading, addExpenses, updateExpenses, deleteExpenses, filterExpense, filteredListE }
}
