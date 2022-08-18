import type { NextPage } from "next";
import Head from "next/head";
import NoteList from "../components/note-list/note-list";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Note App</title>
        <meta name="description" content="Sample note app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoteList />
    </>
  );
};

export default Home;
