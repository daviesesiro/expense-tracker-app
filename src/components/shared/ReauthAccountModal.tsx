import { useGetUserAccounts } from "../../hooks/queries/mono";
import { useState } from "react";
import { Modal } from "./Modal";
import { Account } from "../../pages/Account";
import { MonoReAuthButton } from "./Button";

export const ReauthAccountModal = () => {
  const [accountsRequiresReauth, setAccountsRequiresReauth] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useGetUserAccounts({
    onSuccess: (res) => {
      const requiresReauth = res.data.filter(
        (a: Account) => a.reAuthorize === true
      );
      setAccountsRequiresReauth(requiresReauth);
      if (requiresReauth.length > 0) setShowModal(true);
    },
  });

  return (
    <Modal
      label="Please reauthorize"
      subTitle="This is to make sure your accounts are in sync"
      isOpen={showModal}
      closeModal={() => setShowModal(false)}
    >
      <div className="max-w-lg w-72 divide-y xs:w-[440px]">
        {accountsRequiresReauth.map((a: Account) => (
          <div key={a._id} className="text-black p-3 items-center flex">
            <img src={a.institutionLogo} className="w-8 h-8 mr-2" alt="logo" />
            <p>
              {a.institutionName} - {a.accountNumber}
            </p>
            <MonoReAuthButton
              className="ml-auto btn-blue text-xs p-3"
              accountId={a._id}
            >
              Reauthorize
            </MonoReAuthButton>
          </div>
        ))}
      </div>
    </Modal>
  );
};
