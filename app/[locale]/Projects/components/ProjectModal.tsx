import {ProjectData, ProjectDataCasted} from '@/src/data/ProjectDataTypes';
import {Carousel, Modal, ModalBody, ModalHeader} from 'flowbite-react';
import Image from 'next/image';
import metaImages from '@/src/metaimages.json';
import '../../../oldcss.css';

interface imageData {
  stackIcons: {[id: string]: string};
  storeIcons: {[id: string]: string};
}

const prefix = '/img/stores/';

export default function ProjectModal(props: {
  openModalStatus: boolean;
  closeCallback: () => void;
  projectData: ProjectDataCasted | undefined;
}) {
  const s = (metaImages as imageData).storeIcons;
  return (
    <>
      <Modal
        show={props.openModalStatus}
        size="3xl"
        onClose={props.closeCallback}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-10">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {props.projectData?.title}
            </h3>
            <div>
              {props.projectData?.date}
              {props.projectData?.description}
            </div>
            <div>
              {props.projectData?.stores.map(e => (
                <a key={e.name} href={e.url}>
                  {e.name &&
                  metaImages.storeIcons &&
                  Object.hasOwn(metaImages.stackIcons, e.name) ? (
                    <Image src={prefix + s[e.name]} alt={''}></Image>
                  ) : (
                    <>{e.name}</>
                  )}
                </a>
              ))}
            </div>
            {props.projectData?.screenshots &&
            props.projectData?.screenshots.length !== 0 ? (
              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                  {props.projectData.screenshots?.map((screenshots, index) => (
                    <Image
                      width={512}
                      height={288}
                      key={props?.projectData?.id + 'screenshot' + index}
                      alt={
                        'Screenshot ' +
                        index +
                        'of Project' +
                        props?.projectData?.title
                      }
                      src={screenshots}
                    />
                  ))}
                </Carousel>
              </div>
            ) : (
              ''
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
