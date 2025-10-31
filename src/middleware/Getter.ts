import fs from 'fs';
import path from 'path';
import {ProjectData, ProjectDataCasted} from '../data/ProjectDataTypes';

export interface projects {
  [id: number]: Array<ProjectData>;
}

const prefixMedia = '/media/';

const internalMediaFunction = (id: string, image: string): string =>
  image.length
    ? !image.startsWith('http')
      ? `${prefixMedia}/${id}/${image}`
      : image
    : '';

export async function getProjects() {
  const dataDir = path.join(process.cwd(), 'data', 'projects');
  const filenames = fs.readdirSync(dataDir);

  const project = filenames.map(filename => {
    const filePath = path.join(dataDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as ProjectData as ProjectDataCasted;
  });

  project.forEach(e => {
    e.dateCasted = new Date(e.date);
    e.boxArt = internalMediaFunction(e.id, e.boxArt);
    e.screenshots = e.screenshots.map(screenshot =>
      internalMediaFunction(e.id, screenshot),
    );
  });

  return project;
}
