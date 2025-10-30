import {getTranslations} from 'next-intl/server';
import {ReactNode} from 'react';

export async function Sinopsis(): Promise<Awaited<ReactNode>> {
  const t = await getTranslations('AboutMe.Paragraphs');
  // const t = useTranslations('AboutMe.Paragraphs');

  return (
    <>
      <div className="space-y-2">
        <p>{t('Paragraph1')}</p>
        <p>{t('Paragraph2')}</p>
        <p>{t('Paragraph3')}</p>
        <ul className="ml-5 list-disc">
          <li>
            <p>{t('Paragraph3a')}</p>
          </li>
          <li>
            <p>{t('Paragraph3b')}</p>
          </li>
        </ul>
        <p>{t('Paragraph4')}</p>
        <p>{t('Paragraph5')}</p>
      </div>
    </>
  );
}
