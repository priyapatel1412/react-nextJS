import React from "react";
import Link from "next/link";
import classes from "./button.module.css";

export default function Button({ link, children, buttonClickHandler }) {
  if (link) {
    return (
      <Link className={classes.btn} href={link}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes.btn} onClick={buttonClickHandler}>
      {children}
    </button>
  );
}
