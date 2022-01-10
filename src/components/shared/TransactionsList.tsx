import {
  useGetUserAccounts,
  useGetUserTransactions,
} from "../../hooks/queries/mono";
import Select from "react-select";
import { Fragment, useRef, useState } from "react";
import bankIcon from "../../assets/bank.svg";
import { Transaction } from "../dashboard/Transaction";
import { SingleValue, Option } from "./ReactSelectComponent";
import { Link } from "react-router-dom";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

export const TransactionsList: React.FC<{
  title: string;
  count?: number;
  mini?: boolean;
}> = ({ title, count, mini }) => {
  const [accountsOpts, setAccountsOpts] = useState([]);
  const [selectAccount, setSelectAccount] = useState();
  const [limit] = useState(mini ? 5 : 10);

  const viewMoreButtonRef = useRef();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetUserTransactions({ limit, account_id: selectAccount || 0 });

  useIntersectionObserver({
    target: viewMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const { isLoading } = useGetUserAccounts({
    onSuccess: (res) => {
      setAccountsOpts(
        ([{ value: "", label: "All", icon: bankIcon }] as any).concat(
          res.data.map((a: any) => ({
            value: a._id,
            label: `${a.institutionName} - ${a.accountNumber}`,
            icon: a.institutionLogo,
          }))
        )
      );
    },
  });

  let viewMore;
  if (mini) {
    viewMore = <Link to="transactions">View More</Link>;
  } else {
    viewMore = (
      <button
        className="flex justify-center"
        ref={viewMoreButtonRef as any}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load Newer"
          : "Nothing more to load"}
      </button>
    );
  }

  if (data?.pages && mini) {
    data.pages = [data.pages[0]];
  }

  return (
    <div className="mb-14">
      <div className="mb-6 flex border-b pb-2 border-gray-200 items-center">
        <h1 className="sm:text-2xl text-lg w-full">{title}</h1>
        <Select
          isLoading={isLoading}
          className="flex-grow max-w-[250px] w-full"
          options={accountsOpts}
          defaultValue={accountsOpts.find((a: any) => a.label === "All")}
          onChange={(e: any) => {
            setSelectAccount(e.value);
          }}
          components={{ Option, SingleValue }}
          placeholder="Select account"
        />
      </div>
      <div className="flex space-y-4 flex-col">
        {data?.pages.map((page) => (
          <Fragment key={page.nextPage}>
            {mini
              ? page?.docs
                  .slice(0, count)
                  .map((t: any) => <Transaction key={t._id} {...t} />)
              : page?.docs.map((t: any) => <Transaction key={t._id} {...t} />)}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-8">{viewMore}</div>
    </div>
  );
};
