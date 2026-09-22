import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900&family=IBM+Plex+Mono:wght@400;500&family=Work+Sans:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#faf8f5" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0f" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          {/* Apply the stored reading typeface before first paint, and pull in
              its webfont only when it is actually the chosen one. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var f=localStorage.getItem('font-pref');if(!f||f==='original')return;document.documentElement.setAttribute('data-font',f);if(f==='reader'){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..500&display=swap';document.head.appendChild(l);}}catch(e){}})();`,
            }}
          />
        </Head>
        <body className="text-gray-900 antialiased dark:text-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
