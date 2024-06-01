import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import {
  getAllUsers,
  getAllUsersPaginate,
} from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManagerUser = (props) => {
  const LIMIT_PAGE = 2;
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [dataView, setDataView] = useState({});
  const [listUser, setListUser] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // const fetchListUsers = async () => {
  //   let res = await getAllUsers();
  //   if (res.EC === 0) {
  //     setListUser(res.DT);
  //   }
  // };

  const fetchListUsersPaginate = async (page) => {
    let res = await getAllUsersPaginate(page, LIMIT_PAGE);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const handleClickBtnView = (user) => {
    setShowModalViewUser(true);
    setDataView(user);
  };

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersPaginate(1);
  }, []);
  return (
    <>
      <div className="manager-user-container">
        <div className="title">Manage Users</div>
        <div className="users-content">
          <div className="btn-add-new">
            <button
              className="btn btn-primary"
              onClick={() => setShowModalCreateUser(true)}
            >
              <FcPlus />
              Add new user
            </button>
          </div>
          <div className="table-users-container">
            {/* <TableUser
              listUser={listUser}
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleClickBtnView={handleClickBtnView}
              handleClickBtnDelete={handleClickBtnDelete}
            /> */}
            <TableUserPaginate
              listUser={listUser}
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleClickBtnView={handleClickBtnView}
              handleClickBtnDelete={handleClickBtnDelete}
              fetchListUsersPaginate={fetchListUsersPaginate}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageCount={pageCount}
            />
          </div>
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            // fetchListUsers={fetchListUsers}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            fetchListUsersPaginate={fetchListUsersPaginate}
          />
          <ModalUpdateUser
            show={showModalUpdateUser}
            setShow={setShowModalUpdateUser}
            dataUpdate={dataUpdate}
            // fetchListUsers={fetchListUsers}
            resetUpdateData={resetUpdateData}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            fetchListUsersPaginate={fetchListUsersPaginate}
          />
          <ModalViewUser
            show={showModalViewUser}
            setShow={setShowModalViewUser}
            // fetchListUsers={fetchListUsers}
            dataView={dataView}
            resetUpdateData={resetUpdateData}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            fetchListUsersPaginate={fetchListUsersPaginate}
          />
          <ModalDeleteUser
            show={showModalDeleteUser}
            setShow={setShowModalDeleteUser}
            // fetchListUsers={fetchListUsers}
            resetUpdateData={resetUpdateData}
            dataDelete={dataDelete}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            fetchListUsersPaginate={fetchListUsersPaginate}
          />
        </div>
      </div>
    </>
  );
};

export default ManagerUser;
