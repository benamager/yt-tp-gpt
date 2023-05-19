import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "YT-to-GPT",
  description: "Chat about YouTube videos to fact-check them, summarise them and much more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="mx-auto flex max-w-6xl flex-col bg-bg px-4 pt-4 text-text sm:px-8">
        <Provider>
          <Nav />
          <div className="mx-auto max-w-4xl">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
