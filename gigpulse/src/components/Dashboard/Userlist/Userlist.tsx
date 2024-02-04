import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Link } from "react-router-dom";
import fetchUsers from "../../../store/asyncActions/fetchUsers";
import { updateUserStatus } from "../../../store/asyncActions/updateUserStatus";
import { updateUserRole } from "../../../store/asyncActions/updateUserRole";

const statuses = {
  Actif: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Inactif: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

const roles = {
  SuperAdmin: "text-red-700 <bg-red-600></bg-red-600> ring-red-600/20",
  Admin: "text-red-700 bg-red-50 ring-red-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  User: "text-teal-800 bg-yellow-50 ring-yellow-600/20",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function UsersList() {
  const dispatch = useAppDispatch();
  const currentUserRole = useAppSelector(
    (state) => state.user.currentUser.role
  );
  const users = useAppSelector((state) => state.admin.users);
  
  // const [statusUpdated, setStatusUpdated] = useState(false);
  // const [roleUpdated, setRoleUpdated] = useState(false);

  useEffect(() => {
    if (currentUserRole === "Super admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, currentUserRole]);



  const handleToggleStatus = (userId: number, isActive: boolean) => {
    dispatch(updateUserStatus({ userId, isActive }));
      // setStatusUpdated((prevStatus) => !prevStatus);
  };

  const handleToggleRole = (userId: number, currentRole: string) => {
    const newRole = currentRole === "User" ? "Admin" : "User";
    dispatch(updateUserRole({ userId, newRole }));
      // setRoleUpdated((prevRole) => !prevRole);
  };

  return (
    <ul role="list" className="divide-y divide-gray-100 dark:divide-gray-400">
      {users &&
        users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-secondary">
                  {user.name}
                </p>
                <p
                  className={classNames(
                    user.isActive ? statuses["Actif"] : statuses["Inactif"],
                    "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {user.isActive ? "Actif" : "Inactif"}
                </p>
                <p
                  className={classNames(
                    user.role ? roles["Admin"] : roles["User"],
                    "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {user.role === "Super admin"
                    ? "Super admin"
                    : user.role === "Admin"
                    ? "Admin"
                    : "User"}
                </p>
              </div>
              {user.createdAt && (
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="truncate">Inscription le : {user.createdAt}</p>
                </div>
              )}
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">
                  <span className="sr-only">Ouvrir les options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 text-center shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/gigs/user/${user.id}`}
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Voir le profil
                          <span className="sr-only">, {user.id}</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() =>
                            handleToggleStatus(user.id, !user.isActive)
                          }
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-6 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          {user.isActive ? "Désactiver" : "Activer"}
                          <span className="sr-only">, {user.name}</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleToggleRole(user.id, user.role)}
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Changer de rôle
                          <span className="sr-only">, {user.name}</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
    </ul>
  );
}
