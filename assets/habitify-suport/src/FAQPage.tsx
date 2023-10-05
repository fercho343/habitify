import { t } from 'i18next';
import './FAQPage.css';

export const FAQPage = () => {
  return (
    <div className='box'>


      <div className="faq-container">
      <h1>{t('faq.title')}</h1>
      <div className="faq">
        <div className="faq-question">
          <h3>{t('faq.question1')}</h3>
          <p>{t('faq.answer1')}</p>
        </div>
        <div className="faq-question">
          <h3>{t('faq.question2')}</h3>
          <p>{t('faq.answer2')}</p>
        </div>
        <div className="faq-question">
          <h3>{t('faq.question3')}</h3>
          <p>{t('faq.answer3', { email: 'habitcoach23@gmail.com' })}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

