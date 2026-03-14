import { useEffect, useState } from "react";
import { getIncomes, addIncome, deleteIncome, updateIncome, filterIncome } from "../../services/Incomeservice";


export const useFetchIncomes = () => {

    const [incomeList, setincomeList] = useState([])
    const [inerror, setinerror] = useState(false)
    const [inloading, setinloading] = useState(false)
    const [filteredIListI, setfilteredIListI] = useState([])

    useEffect(() => {
        const fetchIncome = async () => {
            setinloading(true);
            try {
                const data = await getIncomes();
                setincomeList(data)
            }
            catch (err) {
                setinerror(err.message)
            }
            finally {
                setinloading(false);
            }
        }
        fetchIncome();
    }, [])

    const addIncomes = async (formData) => {
        try {
            setinloading(true);
            const data = await addIncome(formData);
            setincomeList([...incomeList, data]);
        } catch (err) {
            setinerror(err.message);
        } finally {
            setinloading(false);
            setinerror(false);
        }
    };

    const updateIncomes = async (formData) => {
        try {
            setinloading(true);
            const data = await updateIncome(formData);
            setincomeList(incomeList.map((income) => (income.id === data.id ? data : income)));
        } catch (err) {
            setinerror(err.message);
        } finally {
            setinloading(false);
            setinerror(false);
        }
    };

    const deleteIncomes = async (id) => {
        try {
            setinloading(true);
            await deleteIncome(id);
            setincomeList(incomeList.filter((income) => income.id !== id));
        } catch (err) {
            setinerror(err.message);
        } finally {
            setinloading(false);
            setinerror(false);
        }
    };

    const filterIncomes = async (month, year) => {
        try {
            setinloading(true)
            const data = await filterIncome(month, year);
            setfilteredIListI(data)
        }
        catch (err) {
            setinloading(err.message)
        }
        finally {
            setinloading(false);
        }
       
    }

    return { incomeList, inerror, inloading, addIncomes, updateIncomes, deleteIncomes, filterIncomes, filteredIListI }
}
