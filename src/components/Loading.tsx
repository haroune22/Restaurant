
import React from "react";

const Loading = () => {


  return (
    <>
      <style jsx global>{`
        .loading-bar {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 110px;
          height: 110px;
          background: transparent;
          border: 3px solid #000; /* Change border color to black */
          border-radius: 50%;
          text-align: center;
          line-height: 111px;
          font-family: sans-serif;
          font-size: 15px;
          color: #000; /* Change font color to black */
          letter-spacing: 3px;
          text-transform: uppercase;
          text-shadow: 0 0 20px #000; /* Change text shadow color to black */
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .loading-bar:before {
          content: "";
          position: absolute;
          top: -3px;
          left: -3px;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top: 5px solid #000; /* Change border top color to black */
          border-right: 5px solid #000; /* Change border right color to black */
          border-radius: 50%;
          animation: animateC 2s linear infinite;
        }

        @keyframes animateC {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes animate {
          0% {
            transform: rotate(45deg);
          }

          100% {
            transform: rotate(405deg);
          }
        }
      `}
      </style>

      <div className="loading-bar">Loading....</div>
    </>
  );
};


export default Loading;
