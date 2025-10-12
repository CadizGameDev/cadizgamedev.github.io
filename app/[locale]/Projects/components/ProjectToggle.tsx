import {Button, ButtonGroup} from 'flowbite-react';
import {projectTypeEnum} from '@/src/projectTypeEnum';
import {projectType} from '../projectType';

function getStatusValue(
  projectTypeFilter: {[id: string]: projectType},
  gameType: projectTypeEnum,
): boolean {
  switch (gameType) {
    case projectTypeEnum.Commercial:
      return projectTypeFilter['Commercial'].activated;
    case projectTypeEnum.GameJam:
      return projectTypeFilter['GameJam'].activated;
    case projectTypeEnum.Others:
      return projectTypeFilter['Others'].activated;
    case projectTypeEnum.GameJamEvents:
      return projectTypeFilter['GameJamEvents'].activated;
  }
}

function setAllToggles(
  projectTypeFilter: {[id: string]: projectType},
  status: boolean,
) {
  projectTypeFilter['Commercial'].activated = status;
  projectTypeFilter['GameJam'].activated = status;
  projectTypeFilter['Others'].activated = status;
  projectTypeFilter['GameJamEvents'].activated = status;
}

function isAllToogleEnable(projectTypeFilter: {
  [id: string]: projectType;
}): Boolean {
  return (
    projectTypeFilter['Commercial'].activated &&
    projectTypeFilter['GameJam'].activated &&
    projectTypeFilter['Others'].activated &&
    projectTypeFilter['GameJamEvents'].activated
  );
}

function ProjectChecker(
  projectTypeFilter: {[id: string]: projectType},
  showHiddenProjects: boolean,
  callback: (
    output: {[id: string]: projectType},
    showHiddenProjects: boolean,
  ) => void,
  gameType: projectTypeEnum,
) {
  if (isAllToogleEnable(projectTypeFilter)) {
    setAllToggles(projectTypeFilter, false);
  }

  projectTypeFilter['Commercial'].activated =
    gameType === projectTypeEnum.Commercial
      ? !projectTypeFilter['Commercial'].activated
      : false;

  projectTypeFilter['GameJam'].activated =
    gameType === projectTypeEnum.GameJam
      ? !projectTypeFilter['GameJam'].activated
      : false;

  projectTypeFilter['Others'].activated =
    gameType === projectTypeEnum.Others
      ? !projectTypeFilter['Others'].activated
      : false;

  if (
    !projectTypeFilter['Commercial'].activated &&
    !projectTypeFilter['GameJam'].activated &&
    !projectTypeFilter['Others'].activated
  ) {
    setAllToggles(projectTypeFilter, true);
  }
  callback(projectTypeFilter, showHiddenProjects);
}

export function _ButtonGroup(props: {
  projectTypeFilter: {[id: string]: projectType};
  showHiddenProjects: boolean;
  callback: (
    output: {[id: string]: projectType},
    showHiddenProjects: boolean,
  ) => void;
}) {
  function setShowHiddenProject(): void {
    props.callback(props.projectTypeFilter, !props.showHiddenProjects);
  }

  return (
    <>
      <div className="inline relative top-4 place-self-center">
        <ButtonGroup outline>
          <Button
            color={
              getStatusValue(
                props.projectTypeFilter,
                projectTypeEnum.Commercial,
              )
                ? 'pink'
                : 'gray'
            }
            onClick={() =>
              ProjectChecker(
                props.projectTypeFilter,
                props.showHiddenProjects,
                props.callback,
                projectTypeEnum.Commercial,
              )
            }
          >
            Commercial
          </Button>
          <Button
            color={
              getStatusValue(props.projectTypeFilter, projectTypeEnum.GameJam)
                ? 'pink'
                : 'gray'
            }
            onClick={() =>
              ProjectChecker(
                props.projectTypeFilter,
                props.showHiddenProjects,
                props.callback,
                projectTypeEnum.GameJam,
              )
            }
          >
            GameJam
          </Button>
          <Button
            color={
              getStatusValue(props.projectTypeFilter, projectTypeEnum.Others)
                ? 'pink'
                : 'gray'
            }
            onClick={() =>
              ProjectChecker(
                props.projectTypeFilter,
                props.showHiddenProjects,
                props.callback,
                projectTypeEnum.Others,
              )
            }
          >
            Others
          </Button>
          <Button
            color={
              getStatusValue(
                props.projectTypeFilter,
                projectTypeEnum.GameJamEvents,
              )
                ? 'pink'
                : 'gray'
            }
            onClick={() =>
              ProjectChecker(
                props.projectTypeFilter,
                props.showHiddenProjects,
                props.callback,
                projectTypeEnum.GameJamEvents,
              )
            }
          >
            Game Jam Events
          </Button>
        </ButtonGroup>
        <ButtonGroup className="pl-5">
          <Button
            color={props.showHiddenProjects ? 'pink' : 'gray'}
            outline={!props.showHiddenProjects}
            className="margin-5"
            onClick={setShowHiddenProject}
          >
            Show all
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}
