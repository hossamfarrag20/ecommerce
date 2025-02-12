import { Button, Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { modalcontext } from "../../context/Modalprovider";
import { Link } from "react-router-dom";
import { authContext } from "../../context/Authprovider";

export default function MyModal() {
  const { openModal, setOpenModal, descriptionMassege, btncontent } =
    useContext(modalcontext);
  const { userToken } = useContext(authContext);
  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="bg-[rgba(255,255,255,0.4)] z-50"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {descriptionMassege}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {!userToken && <Link to="/login">{btncontent}</Link>}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
