import { useEffect, useState } from "react";
import { getIncomes, addIncome, deleteIncome, updateIncome, filterIncome } from "../../services/Incomeservice";


export const useFetchIncomes = () => {

    const [incomeList, setincomeList] = useState([])
    const [inloading, setinloading] = useState(false)

    useEffect(() => {
        const fetchIncome = async () => {
            setinloading(true);
            try {
                const data = await getIncomes();
                setincomeList(data)
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
        }  finally {
            setinloading(false);
        }
    };

    const updateIncomes = async (formData) => {
        try {
            setinloading(true);
            const data = await updateIncome(formData);
            setincomeList(incomeList.map((income) => (income.id === data.id ? data : income)));
        } finally {
            setinloading(false);
        }
    };

    const deleteIncomes = async (id) => {
        try {
            setinloading(true);
            await deleteIncome(id);
            setincomeList(incomeList.filter((income) => income.id !== id));
        }  finally {
            setinloading(false);
        }
    };

    const filterIncomes = async (month, year) => {
        try {
            setinloading(true)
            const data = await filterIncome(month, year);
            return(data)
        }
        finally {
            setinloading(false);
        }
       
    }

    return { incomeList,  inloading, addIncomes, updateIncomes, deleteIncomes, filterIncomes }
}
