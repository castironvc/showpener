import React, { FunctionComponent /* useState */ } from "react";
import { adminUserProps, adminMessagesProps } from "../types/globals";
import Image from "next/image";
import { useState } from "react";
type RolesProps = {
  allUsers: adminUserProps[];
  getAllUsers: () => void;
  myuser: adminUserProps;
};

const Roles: FunctionComponent<RolesProps> = ({
  allUsers,
  getAllUsers,
  myuser,
}) => {
  /*  const [logoChoice, logoSet] = useState(logo); */

  const [messages, setMessages] = useState<[adminMessagesProps]>();
  const [messageOpen, setmessageOpen] = useState<boolean>(false);
  const getPromoterMessages = async (id: number, role: string) => {
    // turn user into promoter
    const user = await fetch("/api/admin/getpromotermessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, role: role }),
    });

    const result = await user.json();

    if (result.error) {
      //errorRedirect(result.details.message);
      console.log(result.error);
    } else {
      if (myuser && myuser.role === "admin") {
        setMessages(result);
        setmessageOpen(true);
      }
    }
  };

  const makePromoter = async (id: number, role: string) => {
    // turn user into promoter
    const user = await fetch("/api/admin/promoteuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, role: role }),
    });

    const result = await user.json();

    if (result.error) {
      //errorRedirect(result.details.message);
      console.log(result.details.message);
    } else {
      if (myuser && myuser.role === "admin") {
        getAllUsers();
      }
    }
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <p>Manage user roles here:</p>
      <div className="userRow">
        {messageOpen ? (
          <div className="adminMessages">
            <div className="closex" onClick={() => setmessageOpen(false)}>
              X
            </div>
            <div className="innerbox_heading">Promoter messages</div>
            <div className="innerbox_container">
              {messages &&
                messages.map((message, i) => {
                  return (
                    <div key={message.id}>
                      <div className="message_container">{message.message}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : null}
        <div>
          {allUsers &&
            allUsers.map((user, i) => {
              return (
                <div
                  key={user.id}
                  className={`admin-user-row ${
                    i === allUsers.length - 1 && "noborder"
                  }`}
                >
                  {/*          <div>{user.id}</div> */}
                  <div
                    className={`jewel jewel_${
                      user.totalmessages > 0 ? "full" : "empty"
                    }`}
                    role="button"
                    onClick={() => getPromoterMessages(user.id, user.role)}
                  >
                    {user.totalmessages}
                  </div>
                  <div>{user.mobilePhone}</div>
                  <div className="admin-user-row-role">
                    <div id={user.role}>{user.role}</div>
                    {user.role === "admin" ? (
                      <div>
                        <Image
                          src="/images/key.svg"
                          width={30}
                          height={18}
                          className=""
                          alt=""
                        />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    {user.role !== "admin" ? (
                      <button
                        id={user.role}
                        /*          disabled={user.role === "promoter"} */
                        onClick={() =>
                          makePromoter(
                            user.id,
                            user.role === "promoter" ? "standard" : "promoter"
                          )
                        }
                      >
                        {user.role === "promoter" ? "Demote" : "Promote"}
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Roles;
