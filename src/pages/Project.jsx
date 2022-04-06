import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';


const Project = () => {

  const params = useParams();
  //console.log(params);

  const { getProject, project, loading } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  //console.log(project);

  const { name } = project;

  return (
    loading ? <div className='animate-spin'>Loading...</div>: (
      <div>
        <h1 className='font-black text-4xl'>{name}</h1>
      </div>
    )
  )
}

export default Project