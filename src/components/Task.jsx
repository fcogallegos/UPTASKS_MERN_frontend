import { dateFormat } from "../helpers/dateFormat";

const Task = ({ task }) => {

    const { name, description, priority, status, deliveryDate, _id } = task;

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="mb-1 text-xl">{name}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
                <p className="mb-1 text-xl">{ dateFormat(deliveryDate) }</p>
                <p className="mb-1 text-gray-600">Priority: {priority}</p>
            </div>

            <div className="flex gap-2">
                <button
                    className="bg-indigo-600 px-4 py-3
                               text-white uppercase font-bold
                               text-sm rounded-lg"
                >Edit</button>

                { status ? (
                     <button
                     className="bg-sky-600 px-4 py-3
                                text-white uppercase font-bold
                                text-sm rounded-lg"
                    >Complete</button>
                ):(
                    <button
                    className="bg-gray-600 px-4 py-3
                                text-white uppercase font-bold
                                text-sm rounded-lg"
                >Incomplete</button>
                ) }

                <button
                    className="bg-red-600 px-4 py-3
                                text-white uppercase font-bold
                                text-sm rounded-lg"
                >Delete</button>
            </div>
        </div>
    )
}

export default Task