import styles from "../styles/Socials.module.css";
import { useState } from "react";

export const Socials = () => {
  const [toggle, toggleSocials] = useState(false);

  return (
    <>
      <button className={[styles.socialsButton, (toggle ? '' : styles.up)].join(' ')} onClick={() => toggleSocials(!toggle)}>
        {toggle ? (
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414z"
            fill="#000"
          />
        </svg>
        ) : (
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414z"
              fill="#000"
            />
          </svg>
        )}
      </button>
      {toggle ? (
        <div>
          <ul>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
