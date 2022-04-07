import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/clientAxios';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);

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
            editProject(project);
        } else {
            newProject(project);
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

            //sync up

            //show the alert
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

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject,
                getProject,
                project,
                loading
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