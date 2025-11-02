import {Cat, ProjectDataCasted} from '../data/ProjectDataTypes';

export function ProjectOrderBy(
  array: Array<ProjectDataCasted>,
): Array<ProjectDataCasted> {
  let output: Array<ProjectDataCasted> = [];
  //output.array
  for (let i = 0; i <= Cat.__End; i++) {
    output = output.concat(
      array
        .filter(e => e.category === i)
        .sort((z, x) => z.title.localeCompare(x.title)),
    );
  }
  //.filter(e => e.category)
  //.toSorted((a, b) => a.dateCasted.getTime() - b.dateCasted.getTime());
  return output;
}
