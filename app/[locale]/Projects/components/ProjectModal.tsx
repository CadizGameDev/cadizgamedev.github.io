import {NameAndUrl, ProjectDataCasted} from '@/src/data/ProjectDataTypes';
import {Carousel, Modal, ModalBody, ModalHeader} from 'flowbite-react';
import {YouTubeEmbed} from '@next/third-parties/google';
import Image from 'next/image';
import metaImages from '@/src/metaimages.json';
import '../../../oldcss.css';

interface imageData {
  stackIcons: {[id: string]: string};
  storeIcons: {[id: string]: string};
}

const prefix = '/img/stores/';

function NamesAndUrlMapping(x: NameAndUrl, index: number, array: Array<NameAndUrl>)
{
  //this is bad
  return (
    <div key={x.name} className="flex">
      <a href={x.url}>{x.name}</a>
      {array.length > 1 && index !== array.length - 1 ? (
        <div className="mr-1">,</div>
      ) : (
        <></>
      )}
    </div>
  );
}


export default function ProjectModal(props: {
  openModalStatus: boolean;
  closeCallback: () => void;
  projectData: ProjectDataCasted | undefined;
}) {
  const s = (metaImages as imageData).storeIcons;
  if (!props.projectData) {
    return <></>;
  }
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
              {props.projectData.ytvideoid ? (
                <YouTubeEmbed videoid={props.projectData.ytvideoid} />
              ) : (
                <></>
              )}
              <div className="pt-4 flex">
                <p className="mr-1">Team: </p>
                <div className="flex">
                  {props.projectData?.team.map(NamesAndUrlMapping)}
                </div>
                
              </div>
              <div className="flex">
              {props.projectData.publishers !== undefined ?
                <>
                <p className="mr-1">Publishers: </p>
                <div className="flex">
                  {props.projectData?.publishers.map(NamesAndUrlMapping)}
                </div>
                  </> :
                  <></>
              }
              </div>              
              <p>Date: {props.projectData?.date}</p>
              <div>
                <p>Description:</p>
                <p>{props.projectData?.description}</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {props.projectData?.stores.map(e => (
                <a key={e.name} className='p-5' href={e.url}>
                  {e.name && s && s[e.name] ? (
                    <Image
                      src={prefix + s[e.name]}
                      height={150}
                      width={150}
                      alt={''}
                    ></Image>
                  ) : (
                    <>{e.name}</>
                  )}
                </a>
              ))}
            </div>
            <div className="pt-32">
              {props.projectData?.screenshots &&
              props.projectData?.screenshots.length !== 0 ? (
                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                  <Carousel>
                    {props.projectData.screenshots?.map(
                      (screenshots, index) => (
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
                      ),
                    )}
                  </Carousel>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
