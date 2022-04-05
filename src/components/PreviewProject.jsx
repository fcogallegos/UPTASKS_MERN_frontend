import { Link } from 'react-router-dom';

const PreviewProject = ({ project }) => {

    const { name, _id, customer } = project;
    //console.log(name);
    return (
        <div className='border-b p-5 flex'>


            <p className='flex-1'>
                { name }

                <span className='text-sm text-gray-500 uppercase'>
                    {''} {customer}
                </span>
            </p>

            <Link
                to={`${_id}`}
                className="text-gray-600 hover:text-gray-800 uppercase
                text-sm font-bold"
            >See Project</Link>
        </div>
    )
}

export default PreviewProject