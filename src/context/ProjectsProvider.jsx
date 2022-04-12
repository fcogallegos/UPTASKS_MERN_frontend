import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/clientAxios';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios('/projects', config);
                setProjects(data.projects);

            } catch (error) {
                console.log(error);
            }
        }
        getProjects();
    }, [])

    const showAlert = alert => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({});
        }, 5000);
    }

    const submitProject = async project => {

        if (project.id) {
            await editProject(project);
        } else {
            await newProject(project);
        }
    }

    const editProject = async project => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.put(`/projects/${project.id}`, project ,config);
            console.log(data);

            //sync up the state
            const projectsUpdated = projects.map(
                 projectState => projectState._id === data._id ? data : projectState ); 

            setProjects(projectsUpdated);    
            
            //show the alert
            setAlert({
                msg: 'Project Updated Successfully',
                error: false
            });

            setTimeout(() => {
                setAlert({})
                navigate('/projects');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const newProject = async project => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post('/projects', project, config);
            //console.log(data.projectSaved);

            setProjects([...projects, data.projectSaved]);

            setAlert({
                msg: 'Project created successfully',
                error: false
            });

            setTimeout(() => {
                setAlert({})
                navigate('/projects');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const getProject = async id => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.get(`/projects/${id}`, config);
            setProject(data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const deleteProject = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.delete(`/projects/${id}`, config);
            
            const projectsUpdated = projects.filter(
                projectState => projectState._id !== id ); 
            
                setProjects(projectsUpdated);

            setAlert({
                msg: data.msg,
                error: false
            });

            setTimeout(() => {
                setAlert({})
                navigate('/projects');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalTask = () => {
        setModalFormularioTarea(!modalFormularioTarea)
    }

    const submitTask = async task => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post('/tasks', task, config);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject,
                getProject,
                project,
                loading,
                deleteProject,
                modalFormularioTarea,
                handleModalTask,
                submitTask
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext;