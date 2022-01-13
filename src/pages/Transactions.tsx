import { TransactionsList } from "../components/shared/TransactionsList";
import { withAuthRoute } from "../components/shared/withRoute";

const Transactions = () => {
  return (
    <div className="p-4 md:p-12">
      <TransactionsList key="transactions-page-list" title="Transactions" />
    </div>
  );
};

export default withAuthRoute(Transactions);
