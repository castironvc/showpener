import React, { FunctionComponent /* useState */ } from "react";
import { adminUserProps } from "../types/globals";
import Image from "next/image";
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
  );
};

export default Roles;
