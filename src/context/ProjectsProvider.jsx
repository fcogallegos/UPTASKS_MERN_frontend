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
    const [task, setTask] = useState({});
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [collaborator, setCollaborator] = useState({});
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);


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

            const { data } = await clientAxios.put(`/projects/${project.id}`, project, config);
            console.log(data);

            //sync up the state
            const projectsUpdated = projects.map(
                projectState => projectState._id === data._id ? data : projectState);

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
            
            setAlert({});
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
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
                projectState => projectState._id !== id);

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
        setModalFormularioTarea(!modalFormularioTarea);
        setTask({});
    }

    const submitTask = async task => {

        if (task?.id) {
            await editTask(task);
        } else {
            await createTask(task);
        }
    }
    const createTask = async task => {
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
            //console.log(data);

            //add the task to state
            const projectUpdated = { ...project };
            projectUpdated.tasks = [...project.tasks, data];

            setProject(projectUpdated);
            setAlert({});
            setModalFormularioTarea(false);

        } catch (error) {
            console.log(error);
        }
    }

    const editTask = async task => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);
            //console.log(data);

            const projectUpdated = { ...project };
            projectUpdated.tasks = projectUpdated.tasks.map(taskState =>
                taskState._id === data._id ? data : taskState)
            setProject(projectUpdated);

            setAlert({});
            setModalFormularioTarea(false);

        } catch (error) {
            console.log(error);
        }
    }

    const handleModalEditTask = task => {
        setTask(task);
        setModalFormularioTarea(true);
    }

    const handleModalDeleteTask = task => {
        setTask(task);
        setModalDeleteTask(!modalDeleteTask);
    }

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
            setAlert({
                msg: data.msg,
                error: false
            });

            const projectUpdated = { ...project };
            projectUpdated.tasks = projectUpdated.tasks.filter(taskState => taskState._id !== task._id);

            setProject(projectUpdated);
            setModalDeleteTask(false);
            setTask({});
            setTimeout(() => {
                setAlert({});
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const submitCollaborator = async email => {
        
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

            const { data } = await clientAxios.post('/projects/collaborators', {email}, config);

            setCollaborator(data);
            setAlert({});
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setLoading(false);
        }
    }

    const addCollaborator = async email => {
        
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post(`/projects/collaborators/${project._id}`, email, config);

            setAlert({
                msg: data.msg,
                error: false
            })
            setCollaborator({});

            setTimeout(() => {
                setAlert({})
            }, 3000);
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleModalDeleteCollaborator = collaborator => {
        setModalDeleteCollaborator(!modalDeleteCollaborator);
        setCollaborator(collaborator);
    }

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post(`/projects/delete-collaborator/${project._id}`, {id: collaborator._id}, config);

            const projectUpdated = { ...project };

            projectUpdated.collaborators = projectUpdated.collaborators.filter( collaboratorState => collaboratorState._id !== collaborator._id );

            setProject(projectUpdated);

            setAlert({
                msg: data.msg,
                error: false
            });

            setCollaborator({});
            setModalDeleteCollaborator(false);

            setTimeout(() => {
                setAlert({})
            }, 3000);

        } catch (error) {
            console.log(error.response);            
        }
    }

    const completeTask = async id => {
        
        try {
            
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post(`/tasks/status/${id}`, {}, config);

            const projectUpdated = { ...project };

            projectUpdated.tasks = projectUpdated.tasks.map(taskState => 
                taskState._id === data._id ? data : taskState);

            setProject(projectUpdated);
            setTask({});
            setAlert({});

            console.log(data);
 
        } catch (error) {
            console.log(error.response);
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
                submitTask,
                handleModalEditTask,
                task,
                modalDeleteTask,
                handleModalDeleteTask,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator,
                handleModalDeleteCollaborator,
                modalDeleteCollaborator,
                deleteCollaborator,
                completeTask
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