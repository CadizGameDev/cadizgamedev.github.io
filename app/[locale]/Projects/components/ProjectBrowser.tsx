'use client';

import {ReactNode, useEffect, useState} from 'react';
import {ProjectCards} from './ProjectCards';
import {HiFilter} from 'react-icons/hi';
import {Cat, ProjectDataCasted} from '@/src/data/ProjectDataTypes';
import ProjectModal from './ProjectModal';
import {Types} from './ProjectFilter';
import {projectType} from '../projectType';
import {_ButtonGroup} from './ProjectToggle';
import {Button, Drawer, DrawerHeader, DrawerItems} from 'flowbite-react';
import {TrademarkNotice} from './TrademarkNotice';
import {projectTypeEnum} from '@/src/projectTypeEnum';

let visibleHiddenProject: boolean = false;
const filterStack: Set<string> = new Set<string>();

const projectCatTypes =
  [
    { "enum": projectTypeEnum.Commercial, "idName": "Commercial", "DisplayName": "Commercial" },
    { "enum": projectTypeEnum.GameJam, "idName": "GameJam", "DisplayName": "GameJam" },
    { "enum": projectTypeEnum.Others, "idName": "Others", "DisplayName": "Others" },
    { "enum": projectTypeEnum.GameJamEvents, "idName": "GameJamEvents", "DisplayName": "GameJamEvents" }
  ]

let projectTypeFilter: {
  [id: string]: projectType;
} = {
  Commercial: {
    activated: true,
    id: 0,
  },
  GameJam: {
    activated: true,
    id: 1,
  },
  Others: {
    activated: true,
    id: 2,
  },
  GameJamEvents: {
    activated: true,
    id: 3,
  },
};

let locale = '';

export default function ProjectBrowser(props: {
  locale: string;
  projectsData: Array<ProjectDataCasted>;
}): ReactNode {
  const [projectsData, setProjectsData] = useState<Array<ProjectDataCasted>>([]);
  const [projectData, setProjectData] = useState<ProjectDataCasted>();

  const [openModalStatus, setOpenModal] = useState(false);
  const [openFilterSidebar, setOpenFilterSidebar] = useState(false);
  useEffect(() => {
      locale = props.locale;
      setProjectsData(
        props.projectsData
          .sort(e => e.category)
          .filter(
            e => !e.inDevelopment || (e.inDevelopment && visibleHiddenProject),
          ),
      );
  }, [props.locale, props.projectsData]);

  function ProjectCardBuilder(projectTypeFilter: {
    [id: string]: projectType;
  }): void {
    setProjectsData(
      props.projectsData
        .filter(
          e => !e.inDevelopment || (e.inDevelopment && visibleHiddenProject),
        )
        .filter(e => {
          return (
            (e.category === Cat.Commercial && projectTypeFilter['Commercial'].activated) ||
            (e.category === Cat.GameJam && projectTypeFilter['GameJam'].activated) ||
            (e.category === Cat.Other && projectTypeFilter['Others'].activated) ||
            (e.category === Cat.GameJamEvents && projectTypeFilter['GameJamEvents'].activated)
          );
        })
        // .filter(project =>
        //   [...filterStack].every(fs => project.genres.includes(fs)),
        // )
        //.toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .toSorted(
          (a, b) =>
             b.category - a.category 
        ).toSorted(
          (a, b) =>
            a.dateCasted.getTime() - b.dateCasted.getTime()
        ),
    );
  }

  function OpenProjectModal(id: string) {
    setProjectData(projectsData.find(e => e.id === id));
    setOpenModal(true);
  }

  function ChangedFilter(e: string) {
    filterStack.has(e) ? filterStack.delete(e) : filterStack.add(e);
    ProjectCardBuilder(projectTypeFilter);
  }

  function ToggleChanged(
    output: {[id: string]: projectType},
    setValue: boolean,
  ) {
    projectTypeFilter = output;
    visibleHiddenProject = setValue;
    ProjectCardBuilder(projectTypeFilter);
  }

  return (
    <>
      <div className="flex flex-col">
        <_ButtonGroup
          projectCatTypes={projectCatTypes}
          projectTypeFilter={projectTypeFilter}
          showHiddenProjects={visibleHiddenProject}
          callback={ToggleChanged}
        />
        <div className="flex flex-row">
          <Drawer
            className="lg:invisible"
            open={openFilterSidebar}
            onClose={() => setOpenFilterSidebar(false)}
          >
            <DrawerHeader title="Filter Drawer" />
            <DrawerItems>
              <Types
                projectsData={projectsData}
                _filterStack={filterStack}
                callback={ChangedFilter}
              />
            </DrawerItems>
          </Drawer>
          <Types
            className="hidden lg:block"
            projectsData={projectsData}
            _filterStack={filterStack}
            callback={ChangedFilter}
          />
          <ProjectCards
            callback={OpenProjectModal}
            projectdata={projectsData}
          />
        </div>
        <ProjectModal
          projectData={projectData}
          openModalStatus={openModalStatus}
          closeCallback={() => setOpenModal(false)}
        />
        <div className="visible lg:invisible fixed bottom-10 right-10">
          <Button
            onClick={() => {
              setOpenFilterSidebar(true);
            }}
          >
            <HiFilter className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <TrademarkNotice />
    </>
  );
}
