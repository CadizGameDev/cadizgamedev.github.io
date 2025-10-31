import type {Metadata} from 'next';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {NavBar} from '../_components/NavBar';
import {Inter} from 'next/font/google';
import Layout from '../_components/FreezeRouter';
import LocaleSwitcher from '../_components/LocaleSwitcher';
import {pick} from 'lodash';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {SiteMap} from '@/src/sitemap';

const inter = Inter({subsets: ['latin']});

export function generateStaticParams() {
  return routing.locales.map(locale => ({locale}));
}

export const metadata: Metadata = {
  title: 'CadizGameDev',
  description: '',
};

export default async function RootLayout({
  // @ts-expect-error -- TypeScript will validate that only known `params`
  // are used in combination with a given `pathname`. Since the two will
  // always match for the current route, we can skip runtime checks.
  children,
  // @ts-expect-error -- TypeScript will validate that only known `params`
  // are used in combination with a given `pathname`. Since the two will
  // always match for the current route, we can skip runtime checks.
  params,
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({
    locale: typeof locale === 'string' ? locale : undefined,
  });
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider
          messages={pick(messages, ['NavBar', 'Metadata', 'LocaleSwitcher'])}
        >
          <NavBar
            localeSwitcher={<LocaleSwitcher locale={locale} />}
            siteMap={await SiteMap()}
          />
          <Layout>{children}</Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
