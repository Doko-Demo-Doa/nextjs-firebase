import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

import { MainLayout } from "../layouts/main-layout";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </MantineProvider>
    </>
  );
}
