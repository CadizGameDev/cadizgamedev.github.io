/* eslint-disable n/no-extraneous-import */
import {FaLinkedin, FaInstagram, FaTwitter, FaDiscord} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import {decrypt, ImportKey} from '../utils/decryptUtils';
import {botChecker} from '../utils/antibot';

import type {JSX} from 'react';

export interface social {
  name: string;
  logo: JSX.Element;
  url: string;
  innerText?: string;
}

const emailEncrypted = 'etXu7Y4L/v85IDGEJxzKXaudIzVLnw==';
function EmailTemplate(email: string): social {
  return {
    name: 'E-mail',
    logo: <MdEmail />,
    url: 'mailto:' + email,
    innerText: email,
  };
}

const arrayRRSS: Array<social> = [
  {
    name: 'Linkedin',
    logo: <FaLinkedin />,
    url: 'https://www.linkedin.com/company/cadizgamedev',
    innerText: '/company/cadizgamedev',
  },
  {
    name: 'Instagram',
    logo: <FaInstagram />,
    url: 'https://www.instagram.com/cadizgamedev/',
    innerText: 'cadizgamedev',
  },
  {
    name: 'Twitter/X',
    logo: <FaTwitter />,
    url: 'https://x.com/CadizGameDev',
    innerText: 'cadizgamedev',
  },
  {
    name: 'Discord',
    logo: <FaDiscord />,
    url: 'https://discord.gg/jENjY6Jnwe',
    innerText: 'cadizgamedev',
  },
];

export function GetSocials(): Promise<Array<social>> {
  return new Promise(accept => {
    if (botChecker()) {
      accept(arrayRRSS);
    }
    void ImportKey().then(e => {
      void decrypt(e, emailEncrypted).then(email => {
        accept(arrayRRSS.toSpliced(0, 0, EmailTemplate(email)));
      });
    });
  });
}
