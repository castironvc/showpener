import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useState, useContext } from "react";
import styles from "../../styles/Home.module.css";
import { AppContext, DispatchContext } from "../../context/StateContext";
import tickets from "../../testdata/events.json";
const Home: NextPage = () => {
  const { state } = useContext(AppContext);

  const { dispatch } = useContext(DispatchContext);
  const router = useRouter();

  const { status, data: session } = useSession();
  const fetchData = async () => {
    const events = await fetch("/api/tm/getallevents", {
      method: "GET",
    });

    const result = await events.json();

    return result;
  };
  console.log(status);
  const handleClick = async (e: any) => {
    e.preventDefault();
    const events = await fetchData();
    console.log(events);
  };

  const parseTicketData = async (e: any) => {
    e.preventDefault();
    tickets.map((ticket) => {
      if (ticket._embedded && ticket._embedded.events.length > 0) {
        console.log(ticket._embedded.events);
      }
    });
  };

  return (
    <div className={styles.container}>
      {session && status === "authenticated" ? (
        <div className={styles.main}>
          <div className={styles.fieldContainer}>
            <button
              onClick={parseTicketData}
              type="submit"
              className={styles.submitButton}
            >
              <span>Get ticketmaster events</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
