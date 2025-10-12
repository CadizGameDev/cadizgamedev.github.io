'use client';

import {ReactNode, useEffect, useState} from 'react';
import {ProjectCards} from './ProjectCards';
import {HiFilter} from 'react-icons/hi';
import {ProjectData} from '@/src/data/ProjectDataTypes';
import ProjectModal from './ProjectModal';
import {Types} from './ProjectFilter';
import {projectType} from '../projectType';
import {_ButtonGroup} from './ProjectToggle';
import {Button, Drawer, DrawerHeader, DrawerItems} from 'flowbite-react';
import {TrademarkNotice} from './TrademarkNotice';

let visibleHiddenProject: boolean = false;
const filterStack: Set<string> = new Set<string>();
const output: Array<ProjectData> = [];

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
  projectsData: Array<ProjectData>;
}): ReactNode {
  const [projectsData, setProjectsData] = useState<Array<ProjectData>>([]);
  const [projectData, setProjectData] = useState<ProjectData>();

  const [openModalStatus, setOpenModal] = useState(false);
  const [openFilterSidebar, setOpenFilterSidebar] = useState(false);
  useEffect(() => {
    if (output.length === 0 || locale !== props.locale) {
      locale = props.locale;
      setProjectsData(
        props.projectsData
          .sort(e => e.category)
          .filter(
            e => !e.inDevelopment || (e.inDevelopment && visibleHiddenProject),
          ),
      );
    } else {
      if (projectsData.length === 0) {
        setProjectsData(props.projectsData);
      }
    }
  }, [projectsData.length, props.locale, props.projectsData]);

  function ProjectCardBuilder(projectTypeFilter: {
    [id: string]: projectType;
  }): void {
    setProjectsData(
      output
        .filter(
          e => !e.inDevelopment || (e.inDevelopment && visibleHiddenProject),
        )
        .filter(e => {
          return (
            (e.category === 0 && projectTypeFilter['Tool'].activated) ||
            (e.category === 1 && projectTypeFilter['Game'].activated) ||
            (e.category === 2 && projectTypeFilter['GameTool'].activated)
          );
        })
        // .filter(project =>
        //   [...filterStack].every(fs => project.genres.includes(fs)),
        // )
        .toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .toSorted(
          (a, b) =>
            projectTypeFilter[a.category].id - projectTypeFilter[b.category].id,
        ),
    );
  }

  function OpenProjectModal(id: string) {
    setProjectData(output.find(e => e.title === id));
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
