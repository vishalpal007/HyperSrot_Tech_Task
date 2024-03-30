import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaUserAlt } from 'react-icons/fa';
import { useAddTaskMutation, useDeleteTaskMutation, useGetTaskQuery, useUpdateTaskMutation } from './redux/taskApi';
import { toast } from 'react-toastify';




const App = () => {


  const [taskData, setTaskData] = useState({})
  const [selected, setSelected] = useState({})
  const [filters, setFilters] = useState({
    assignee: "",
    priority: "",
    startDate: ""
  })

  const [addTask, { isSuccess }] = useAddTaskMutation()
  const [deleteTask, { isSuccess: deleteSuccess }] = useDeleteTaskMutation()
  const [updateTask, { isSuccess: updateSuccess }] = useUpdateTaskMutation()
  const { data } = useGetTaskQuery()

  const [main, setMain] = useState({
    pending: [],
    completed: [],
    inProgress: [],
    deployed: [],
    deferred: []
  });


  const handleChange = e => {
    const { name, value } = e.target
    setTaskData({ ...taskData, [name]: value })
  }



  const handleUpdateChange = e => {
    const { name, value } = e.target
    setSelected({ ...selected, [name]: value })
  }

  const hanldeSubmit = e => {
    addTask(taskData)
  }



  useEffect(() => {
    if (isSuccess) {
      toast.success("Task Added")
    } else if (deleteSuccess) {
      toast.error("Task Deleted")
    } else if (updateSuccess) {
      toast.info("Task Updated")
    }
  }, [isSuccess, deleteSuccess, updateSuccess])


  useEffect(() => {
    if (data && data.length > 0) {
      const filteredData = {
        pending: data.filter(item => {
          return (
            item.status === "Pending" &&
            (!filters.priority || filters.priority === item.priority) &&
            (!filters.assignee || (filters.assignee && item.assignee && item.assignee.toLowerCase().includes(filters.assignee.toLowerCase()))) &&
            (!filters.startDate || item.startDate.includes(filters.startDate))
          )
        }),


        completed: data.filter(item => {
          return (
            item.status === "Completed" &&
            (!filters.priority || filters.priority === item.priority) &&
            (!filters.assignee || (filters.assignee && item.assignee && item.assignee.toLowerCase().includes(filters.assignee.toLowerCase()))) &&
            (!filters.startDate || item.startDate.includes(filters.startDate))
          )
        }),


        inProgress: data.filter(item => {
          return (
            item.status === "In Progress" &&
            (!filters.priority || filters.priority === item.priority) &&
            (!filters.assignee || (filters.assignee && item.assignee && item.assignee.toLowerCase().includes(filters.assignee.toLowerCase()))) &&
            (!filters.startDate || item.startDate.includes(filters.startDate))
          )
        }),


        deployed: data.filter(item => {
          return (
            item.status === "Deployed" &&
            (!filters.priority || filters.priority === item.priority) &&
            (!filters.assignee || (filters.assignee && item.assignee && item.assignee.toLowerCase().includes(filters.assignee.toLowerCase()))) &&
            (!filters.startDate || item.startDate.includes(filters.startDate))
          )
        }),


        deferred: data.filter(item => {
          return (
            item.status === "Deffered" &&
            (!filters.priority || filters.priority === item.priority) &&
            (!filters.assignee || (filters.assignee && item.assignee && item.assignee.toLowerCase().includes(filters.assignee.toLowerCase()))) &&
            (!filters.startDate || item.startDate.includes(filters.startDate))
          )
        }),

      };
      setMain(filteredData);
    }
  }, [data, filters]);


  return (
    <div className='bg-teal-100 min-h-screen'>
      {/* Navbar */}
      <div className='flex justify-between items-center bg-teal-200 p-2 px-10 fixed w-full z-10'>
        <h1 className='text-2xl font-bold text-gray-900'>Task Board</h1>
        <div className='bg-white p-2 rounded-full'>
          <FaUserAlt size={20} />
        </div>
      </div>
      {/* Navbar */}
      <div className='px-10 py-5'>
        <div className='text-end mt-20'>
          <button
            onClick={() => window.my_modal_3.showModal()}
            className='btn btn-primary text-white'>
            Add New Task
          </button>
        </div>
        <div className='lg:flex'>
          {/* Filters */}
          <div className='flex flex-col mb-8 lg:mb-0 lg:w-1/2 lg:pr-4 '>
            <h1 className='text-lg font-semibold mb-2'>Filters By:</h1>
            <div className='flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4'>
              <div className='flex items-center'>
                <input
                  onChange={e => setFilters({ ...filters, assignee: e.target.value })}
                  type='text'
                  placeholder='Assignee Name'
                  className='input input-bordered w-full max-w-xs mr-2'
                />
                <select onChange={e => setFilters({ ...filters, priority: e.target.value })} className='select select-bordered w-full max-w-xs'>
                  <option selected disabled>Priority</option>
                  <option value='P0'>P0</option>
                  <option value='P1'>P1</option>
                  <option value='P2'>P2</option>
                </select>
              </div>
              <div className='flex items-center'>
                <input
                  onChange={e => setFilters({ ...filters, startDate: e.target.value })}
                  type='date'
                  placeholder='Start Date'
                  max={new Date().toISOString().split('T')[0]}
                  className='input input-bordered w-full  mr-2'
                />

              </div>
            </div>
            <div className='flex items-center mt-4'>
              <h1 className='text-lg font-semibold mr-4'>Sort By:</h1>
              <select onChange={e => setFilters({ ...filters, priority: e.target.value })} className='select select-bordered lg:w-32 w-80'>
                <option disabled selected>Priority</option>
                <option value='P0'>P0</option>
                <option value='P1'>P1</option>
                <option value='P2'>P2</option>
              </select>
            </div>
          </div>
          {/* Filters */}

        </div>

        {/* Add Modal */}
        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg mb-3">CREATE A TASK</h3>
            <div className='bg-gray-200 p-5'>
              <div className='my-2 flex items-center'>
                <span className='font-semibold w-24'>Title:</span>
                <input onChange={handleChange} name='title' type="text" className="input input-bordered flex-grow h-8" />
              </div>

              <div className='my-2 flex items-center'>
                <span className='font-semibold w-24'>Description:</span>
                <input onChange={handleChange} name='description' type="text" className="input input-bordered flex-grow h-8" />
              </div>

              <div className='my-2 flex items-center'>
                <span className='font-semibold w-24'>Team:</span>
                <input onChange={handleChange} name='team' type="text" className="input input-bordered flex-grow h-8" />
              </div>

              <div className='my-2 flex items-center'>
                <span className='font-semibold w-24'>Assignees:</span>
                <input onChange={handleChange} name='assignee' type="text" className="input input-bordered flex-grow h-8" />
              </div>

              <div className='my-2 flex items-center'>
                <span className='font-semibold w-24'>Priority:</span>
                <select onChange={handleChange} name='priority' className="select select-bordered flex-grow">
                  <option selected disabled>Select</option>
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                </select>
              </div>
              <div className="text-end">
                <button onClick={hanldeSubmit} className="btn btn-accent text-white">Add Task</button>
              </div>
            </div>
          </form>
        </dialog>

        {/* Add Modal */}


        {/* Edit Modal */}
        <dialog id="my_modal_4" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg mb-3">EDIT A TASK</h3>
            <div className='bg-gray-200 p-5'>
              <div className='my-2 flex items-center'>
                <span className='font-semibold w-24'>Title:</span>
                <input disabled value={selected.title} name='title' type="text" className="input input-bordered flex-grow h-8" />
              </div>

              <div className='my-2 flex items-center'>
                <span className='font-semibold w-24'>Description:</span>
                <input disabled value={selected.description} name='description' type="text" className="input input-bordered flex-grow h-8" />
              </div>

              <div className='my-2 flex items-center'>
                <span className='font-semibold w-24'>Team:</span>
                <input disabled value={selected.team} name='team' type="text" className="input input-bordered flex-grow h-8" />
              </div>

              <div className='my-2 flex items-center'>
                <span className='font-semibold w-24'>Assignees:</span>
                <input disabled value={selected.assignee} name='assignee' type="text" className="input input-bordered flex-grow h-8" />
              </div>

              <div className='mt-5 flex justify-between items-center w-full'>
                <div>
                  <span className='font-semibold w-24'>Priority:</span>
                  <select onChange={handleUpdateChange} value={selected.priority} name='priority' className="select select-bordered flex-grow ">
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                  </select>
                </div>

                <div>
                  <span className='font-semibold w-24'>Status:</span>
                  <select onChange={handleUpdateChange} value={selected.status} name='status' className="select select-bordered flex-grow ">
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Deffered">Deffered</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-end mt-4">
              <button onClick={e => updateTask(selected)} className="btn btn-accent btn-sm text-white">Edit Task</button>
            </div>
          </form>
        </dialog>
        {/* Edit Modal */}


      </div>


      {/* Task Card */}

      <div className='grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-5 px-5 py-4 '>

        <div class="card card-compact w-full bg-base-100 shadow-xl mt-20">
          <h2 class="text-2xl rounded-t-lg p-2 font-bold text-center bg-gray-400 text-white">Pending</h2>
          <div class="card-body overflow-auto h-[530px]">

            {
              main.pending.length === 0
                ? <>
                  <h1 className='text-center text-xl font-semibold flex items-center justify-center h-56'>No Task Found</h1>
                </>
                : <div class="flex flex-col gap-4">
                  {
                    main.pending.map(item => <div class="card card-compact outline outline-gray-200">
                      <div class="card-body">
                        <div class="flex justify-between items-center">
                          <h1 class="text-xl font-bold">{item.title}</h1>
                          <span class="badge badge-primary text-white font-semibold">{item.priority}</span>
                        </div>
                        <hr class="border-2 border-black" />
                        <p className='font-semibold text-gray-700 capitalize text-pretty'>{item.description}</p>

                        <span class="text-xl font-bold">@{item.assignee}</span>
                        <div class="flex justify-end gap-3 items-center">
                          <div className='flex gap-3'>
                            <button onClick={() => { window.my_modal_4.showModal(), setSelected(item) }} className='text-orange-400'><FaEdit /></button>
                            <button onClick={e => deleteTask(item._id)}><FaTrash className='text-red-500' /></button>
                          </div>

                        </div>

                        <button class="btn btn-primary btn-sm text-white">Assign</button>

                      </div>
                    </div>)
                  }
                </div>
            }

          </div>
        </div>



        <div className="card card-compact w-full bg-base-100 shadow-xl mt-20">
          <h2 className="text-2xl rounded-t-lg p-2 font-bold text-center bg-warning text-white">In Progress</h2>
          <div className="card-body overflow-auto h-[530px] ">

            {
              main.inProgress.length === 0
                ? <>
                  <h1 className='text-center text-xl font-semibold flex items-center justify-center h-56'>No Task Found</h1>
                </>
                : <div class="flex flex-col gap-4">
                  {
                    main.inProgress.map(item => <div class="card card-compact outline outline-gray-200">
                      <div class="card-body">
                        <div class="flex justify-between items-center">
                          <h1 class="text-xl font-bold">{item.title}</h1>
                          <span class="badge badge-primary text-white font-semibold">{item.priority}</span>
                        </div>
                        <hr class="border-2 border-black" />
                        <p className='font-semibold text-gray-700 capitalize text-pretty'>{item.description}</p>

                        <h1 class="text-xl font-bold">@{item.assignee}</h1>
                        <div class="flex justify-end gap-3 items-center">
                          <div className='flex gap-3'>
                            <button onClick={() => { window.my_modal_4.showModal(), setSelected(item) }} className='text-orange-400'><FaEdit /></button>
                            <button onClick={e => deleteTask(item._id)}><FaTrash className='text-red-500' /></button>
                          </div>

                        </div>

                        <button class="btn btn-warning btn-sm text-white">In Progress</button>

                      </div>
                    </div>)
                  }
                </div>
            }

          </div>
        </div>


        <div className="card card-compact w-full bg-base-100 shadow-xl mt-20">
          <h2 className="text-2xl rounded-t-lg p-2 font-bold text-center bg-green-500 text-white">Completed</h2>
          <div className="card-body overflow-auto h-[530px] ">

            {
              main.completed.length === 0
                ? <>
                  <h1 className='text-center text-xl font-semibold flex items-center justify-center h-56'>No Task Found</h1>
                </>
                : <div class="flex flex-col gap-4">
                  {
                    main.completed.map(item => <div class="card card-compact outline outline-gray-200">
                      <div class="card-body">
                        <div class="flex justify-between items-center">
                          <h1 class="text-xl font-bold">{item.title}</h1>
                          <span class="badge badge-primary text-white font-semibold">{item.priority}</span>
                        </div>
                        <hr class="border-2 border-black" />
                        <p className='font-semibold text-gray-700 capitalize text-pretty'>{item.description}</p>

                        <h1 class="text-xl font-bold">@{item.assignee}</h1>
                        <div class="flex justify-end gap-3 items-center">
                          <div className='flex gap-3'>
                            <button onClick={() => { window.my_modal_4.showModal(), setSelected(item) }} className='text-orange-400'><FaEdit /></button>
                            {/* <button><FaTrash className='text-red-500' /></button> */}
                          </div>

                        </div>

                        <button class="btn btn-success btn-sm text-white">Completed</button>

                      </div>
                    </div>)
                  }
                </div>
            }

          </div>
        </div>



        <div className="card card-compact w-full bg-base-100 shadow-xl mt-20">
          <h2 className="text-2xl rounded-t-lg p-2 font-bold text-center bg-purple-900 text-white">Deployed</h2>
          <div className="card-body overflow-auto h-[530px] ">

            {
              main.deployed.length === 0
                ? <>
                  <h1 className='text-center text-xl font-semibold flex items-center justify-center h-56'>No Task Found</h1>
                </>
                : <div class="flex flex-col gap-4">
                  {
                    main.deployed.map(item => <div class="card card-compact outline outline-gray-200">
                      <div class="card-body">
                        <div class="flex justify-between items-center">
                          <h1 class="text-xl font-bold">{item.title}</h1>
                          <span class="badge badge-primary text-white font-semibold">{item.priority}</span>
                        </div>
                        <hr class=" border-black" />
                        <p className='font-semibold text-gray-700 capitalize text-pretty'>{item.description}</p>

                        <h1 class="text-xl font-bold">@{item.assignee}</h1>
                        <div class="flex justify-end gap-3 items-center">
                          <div className='flex gap-3'>
                            <button onClick={() => { window.my_modal_4.showModal(), setSelected(item) }} className='text-orange-400'><FaEdit /></button>
                            <button onClick={e => deleteTask(item._id)}><FaTrash className='text-red-500' /></button>
                          </div>
                        </div>

                        <button class="btn bg-purple-900 hover:bg-purple-900 btn-sm text-white">Deployed</button>

                      </div>
                    </div>)
                  }
                </div>
            }

          </div>
        </div>



        <div className="card card-compact w-full bg-base-100 shadow-xl mt-20">
          <h2 className="text-2xl rounded-t-lg p-2 font-bold text-center bg-teal-400 text-white">Deffered</h2>
          <div className="card-body overflow-auto h-[530px] ">

            {
              main.deferred.length === 0
                ? <>
                  <h1 className='text-center text-xl font-semibold flex items-center justify-center h-56'>No Task Found</h1>
                </>
                : <div class="flex flex-col gap-4">
                  {
                    main.deferred.map(item => <div class="card card-compact outline outline-gray-200">
                      <div class="card-body">
                        <div class="flex justify-between items-center">
                          <h1 class="text-xl font-bold">{item.title}</h1>
                          <span class="badge badge-primary text-white font-semibold">{item.priority}</span>
                        </div>
                        <hr class="border-black" />
                        <p className='font-semibold text-gray-700 capitalize text-pretty'>{item.description}</p>

                        <h1 class="text-xl font-bold">@{item.assignee}</h1>
                        <div class="flex justify-end gap-3 items-center">
                          <div className='flex gap-3'>
                            <button onClick={() => { window.my_modal_4.showModal(), setSelected(item) }} className='text-orange-400'><FaEdit /></button>
                            <button onClick={e => deleteTask(item._id)}><FaTrash className='text-red-500' /></button>
                          </div>
                        </div>

                        <button class="btn bg-teal-400 hover:bg-teal-400 btn-sm text-white">Deffered</button>

                      </div>
                    </div>)
                  }
                </div>
            }

          </div>
        </div>


      </div>

      {/* Task Card */}

    </div>
  );
};

export default App;
