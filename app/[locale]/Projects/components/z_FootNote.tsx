import {getTranslations} from 'next-intl/server';

export async function FootNote() {
  const t = await getTranslations('projects.foot');
  return (
    <div className="my-10 justify-center text-xs text-center">
      {t('doyouwanttobehere')}
      <a
        className="linkurl"
        href="https://github.com/CadizGameDev/CadizGameDevData"
      >
        {' ' + t('here')}
      </a>
    </div>
  );
}
