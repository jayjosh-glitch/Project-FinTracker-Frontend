import { useEffect, useState } from "react";
import {getExpenses,addExpense,deleteExpense,updateExpense,filterExpenses} from "../../services/Expenseservice";

export const useFetchExpenses = () => {

  const [expenseList, setExpenseList] = useState([]);
  const [exloading, setExloading] = useState(false);

  useEffect(() => {
    const fetchExpense = async () => {
      setExloading(true);
      try {
        const data = await getExpenses();
        setExpenseList(data);
      }finally {
        setExloading(false);
      }
    };
    fetchExpense();
  }, []);

  const addExpenses = async (formData) => {
    setExloading(true);
    try {
      const data = await addExpense(formData);
      setExpenseList(prev => [...prev, data]);
      return data;
    } 
    finally {
      setExloading(false);
    }
  };

  const updateExpenses = async (id, formData) => {
    setExloading(true);
    try {
      const data = await updateExpense(id, formData);
      setExpenseList(prev =>
        prev.map(exp => (exp.id === data.id ? data : exp))
      );
      return data;
    } finally {
      setExloading(false);
    }
  };

  const deleteExpenses = async (id) => {
    setExloading(true);
    try {
      await deleteExpense(id);
      setExpenseList(prev => prev.filter(exp => exp.id !== id));
    } finally {
      setExloading(false);
    }
  };

  const filterExpense = async (month, year) => {
    setExloading(true);
    try {
      const data = await filterExpenses(month, year);
      return data;
    } finally {
      setExloading(false);
    }
  };

  return {expenseList, exloading,addExpenses,updateExpenses,deleteExpenses,filterExpense};
};