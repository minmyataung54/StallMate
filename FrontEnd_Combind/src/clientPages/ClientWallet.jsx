import { useNavigate } from "react-router-dom";

const ClientWallet = () => {
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(-1);
  };

  const LEFT_ARROW = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      className="bi bi-arrow-left"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
      />
    </svg>
  );

  const CREDIT_CARD = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      fill="white"
      className="bi bi-credit-card"
      viewBox="0 0 16 16"
    >
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
      <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
    </svg>
  );
  return (
    <div className="container-fluid d-flex flex-column pd-0">
      <div className="container-fluid">
        <div className="row mt-3">
          <i
            className="text-white col-3 align-self-center ms-0 ps-0 "
            onClick={handleBackBtn}
          >
            {LEFT_ARROW}
          </i>
          <div className="col-6">
            <h2 className="text-white fw-bolder mt-2 d-flex justify-content-center">
              Edit Payment
            </h2>
          </div>
        </div>
        <h6 className="text-white ms-3 mt-3">Currently linked</h6>
        <div className="row d-flex mt-2 justify-content-center">
          <div
            className="col-9 d-flex p-1 my-1 align-items-center "
            style={{ backgroundColor: "#01040F", borderRadius: "20px" }}
          >
            <img
              className="m-1"
              src="src/assets/wallet-icon.png"
              alt="wallet-icon"
              style={{ width: "60px", height: "60px" }}
            />
            <span className="text-white">
              <div>
                <h4 className="fw-bolder mb-0">Wallet</h4>
                <p className="my-0 ">Balance $ 3.00</p>
              </div>
            </span>
          </div>

          <div
            className="col-9 d-flex p-1 my-1 align-items-center"
            style={{ backgroundColor: "#01040F", borderRadius: "20px" }}
          >
            <img
              className="m-1"
              src="src/assets/mastercard-icon.png"
              alt="mastercard-icon"
              style={{ width: "60px", height: "60px" }}
            />
            <span className="text-white ms-1 me-3">
              <div>
                <h4 className="fw-bolder mb-0">Master</h4>
                <p className="my-0 ">*********8654</p>
              </div>
            </span>
            <div
              className="text-black border-0 ms-3"
              style={{ backgroundColor: "#92E3A9", borderRadius: "7px" }}
            >
              <div className="m-1 fw-bold" style={{ fontSize: "0.8rem" }}>
                Default
              </div>
            </div>
          </div>
        </div>

        <h6 className="text-white ms-3 mt-3">Add medthod</h6>
        <div className="row d-flex mt-2 justify-content-center">
          <div
            className="col-9 d-flex p-1 my-1 align-items-center "
            style={{ backgroundColor: "#01040F", borderRadius: "20px" }}
          >
            <i className="m-1">{CREDIT_CARD}</i>

            <span className="text-white">
              <div>
                <h4 className="fw-bold ms-3 mb-0">Cards</h4>
              </div>
            </span>
          </div>

          <div
            className="col-9 d-flex p-1 my-1 align-items-center"
            style={{ backgroundColor: "#01040F", borderRadius: "20px" }}
          >
            <img
              className="m-1"
              src="src/assets/kplusimg.png"
              alt="k+-icon"
              style={{ width: "60px", height: "60px" }}
            />
            <span className="text-white ms-3 me-3">
              <div>
                <h4 className="fw-bold mb-0">K-Please</h4>
              </div>
            </span>
          </div>

          <div
            className="col-9 d-flex p-1 my-1 align-items-center"
            style={{ backgroundColor: "#01040F", borderRadius: "20px" }}
          >
            <img
              className="m-1"
              src="src/assets/sbcimg.png"
              alt="scb-icon"
              style={{ width: "60px", height: "60px" }}
            />
            <span className="text-white ms-3 me-3">
              <div>
                <h4 className="fw-bold mb-0">SBC Hard</h4>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientWallet;