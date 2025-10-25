'use client';

import {ProjectData, ProjectDataCasted} from '@/src/data/ProjectDataTypes';
import {Card} from 'flowbite-react';
// eslint-disable-next-line n/no-extraneous-import
import {motion} from 'framer-motion';
import {ReactNode} from 'react';
//import metaImages from '@/src/metaimages.json';
import Image from 'next/image';

//const prefix = '/img/stacks/';

// interface imageData {
//   stackIcons: {[id: string]: string};
// }

const list = {
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.2, // Stagger children by .3 seconds
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const item = {
  visible: {opacity: 1},
  hidden: {opacity: 0},
};

//const s = metaImages as imageData;

const commonSize = 'h-96';

export function ProjectCards(props: {
  projectdata: ProjectDataCasted[];
  callback: (id: string) => void;
}): ReactNode {
  return (
    <motion.div
      id="projectcardsid"
      initial="hidden"
      className="relative justify-center gap-2 mt-10 flex-wrap flex flex-row"
      animate="visible"
      variants={list}
    >
      {props.projectdata.map(project => (
        <motion.div key={project.id} initial="hidden" variants={item}>
          <Card
            className={commonSize + ' w-60 cursor-pointer'}
            onClick={() => props.callback(project.id)}
            // imgAlt={'Screenshot of' + project.name}
            renderImage={() => (
              <div className={commonSize + ' overflow-hidden'}>
                {/* <div className="absolute max-w-12 max-h-10 flex mt-40 ml-1 ">
                  {project..map(stack => {
                    if (!Object.hasOwn(metaImages.stackIcons, stack)) {
                      return <div key={`${project.id}${stack}`}></div>;
                    }
                    return (
                      <Image
                        key={`${project.id}${stack}`}
                        src={prefix + s.stackIcons[stack]}
                        height={40}
                        width={40}
                        className="block mt-auto mb-auto mr-3"
                        alt={'icon of ' + stack}
                      />
                    );
                  })
                  }
                </div> */}
                <Image
                  key={project.title + 'img'}
                  className="w-full h-full object-cover"
                  src={project.boxArt}
                  width={238}
                  height={188}
                  alt={'Image Of' + project.title}
                ></Image>
              </div>
            )}
          >
            <div className="pb-20">
              <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                {project.title}
              </h5>
              <p className="text-xs font-normal "> ({project.date})</p>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                {project.description}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
