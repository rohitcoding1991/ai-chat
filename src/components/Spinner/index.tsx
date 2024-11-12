import React from "react";

type SpinnerProps = {
  width: string;
  height: string;
  borderWidth: string;
  borderColor: string;
  borderBottomColor: string;
};

const Spinner: React.FC<SpinnerProps> = ({
  width,
  height,
  borderWidth,
  borderBottomColor,
  borderColor,
}) => {
  return (
    <>
      <style>
        {`
          .loader {
            width: ${width};
            height: ${height};
            border: ${borderWidth} solid ${borderColor};
            border-bottom-color:${borderBottomColor};
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
          }

          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <span className="loader"></span>
    </>
  );
};

export default Spinner;
