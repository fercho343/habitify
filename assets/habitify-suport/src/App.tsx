import { t } from "i18next"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { FAQPage } from "./FAQPage"

function App() {

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t('faq.title')}</title>
      </Helmet>
      <FAQPage />
    </HelmetProvider>
  )
}

export default App
