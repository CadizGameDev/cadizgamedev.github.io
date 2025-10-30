import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import Image from 'next/image';
import {routing} from '@/i18n/routing';

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export async function generateMetadata({params}) {
  let {locale} = await params;
  if (typeof locale !== 'string' || !hasLocale(routing.locales, locale)) {
    locale = 'en';
  }

  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('Title'),
  };
}

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default async function Home({params}): Promise<ReactNode> {
  let {locale} = await params;
  if (typeof locale !== 'string' || !hasLocale(routing.locales, locale)) {
    locale = 'en';
  }

  setRequestLocale(locale);
  //const t = await getTranslations('HomePage');
  return (
    <main className="justify-items-center m-5 ">
      <Image
        src="/img/badge.png"
        alt={'Cadiz Game Developers Logo'}
        height={400}
        width={400}
      />
      <iframe src="/newsletter.html" height="600px" width="600px" />
    </main>
  );
}
