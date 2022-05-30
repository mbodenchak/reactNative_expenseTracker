import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  // const [fetchedExpenses, setFetchedExpenses] = useState([]);
  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      //created getexpenses because cannot make useEffect into an async
      try {
        const expenses = await fetchExpense();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch Expenses!");
      }
      setIsLoading(false);
      // setFetchedExpenses(expenses);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }
  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    // const recentExpenses = fetchedExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
