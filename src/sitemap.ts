import {getTranslations} from 'next-intl/server';

export interface navbarsites {
  title: string;
  type: 'site';
  url: string;
}

export interface navbarsubSectionSites {
  title: string;
  type: 'section';
  subsection: Array<navbarsites>;
}

export async function SiteMap() {
  const t = await getTranslations('NavBar');

  const ala: Array<navbarsites | navbarsubSectionSites> = [
    {
      title: 'Home',
      type: 'site',
      url: '/',
    },
    {
      title: t('AboutMe'),
      type: 'site',
      url: '/AboutMe',
    },
    {
      title: t('Projects'),
      type: 'site',
      url: '/Projects',
    },
    {
      title: t('Contact'),
      type: 'site',
      url: '/Contact',
    },
  ];
  return ala;
}
