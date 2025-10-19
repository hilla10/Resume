import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a'];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes');
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post('/api/resumes/create', { title });

      setAllResumes([...allResumes, data.resume]);
      setTitle('');
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post('/api/ai/upload-resume', {
        title,
        resumeText,
      });
      setResume(null);

      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.put(`/api/resumes/update`, {
        resumeId: editResumeId,
        resumeData: { title },
      });
      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume
        )
      );
      setTitle('');
      setEditResumeId('');
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    setResumeToDelete(resumeId);
    setConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/api/resumes/delete/${resumeToDelete}`);
      setAllResumes(
        allResumes.filter((resume) => resume._id !== resumeToDelete)
      );
      // toast.success(data.message);
      setConfirmationModal(false);
      setResumeToDelete(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className=' max-w-7xl mx-auto px-4 py-8 '>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden '>
          Welcome, Joe Doe
        </p>
        <div className='flex gap-4 '>
          <button
            onClick={() => setShowCreateResume(true)}
            className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500  text-white rounded-full' />
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>
              Create Resume
            </p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className=' size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500  text-white rounded-full' />
            <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>
              Upload Existing
            </p>
          </button>
        </div>

        <hr className='border-slate-300 my-6 sm:w-[305px]' />

        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4 '>
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
                key={resume._id}
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40) `,
                  borderColor: baseColor + '40',
                }}>
                <FilePenLineIcon
                  className='size-7 group-hover:scale-105 transition-all'
                  style={{ color: baseColor }}
                />
                <p
                  className='text-sm group-hover:scale-105 transition-all px-2 text-center '
                  style={{ color: baseColor }}>
                  {resume.title}
                </p>
                <p
                  className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center '
                  style={{ color: baseColor + '90' }}>
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}{' '}
                </p>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className='size-7 p-1.5 hover:bg-white/50 rounded text-red-800 transition-colors'
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors '
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div
              onClick={(e) => e.stopPropagation()}
              className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
              <input
                placeholder='Enter resume title'
                className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600'
                required
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
                Create Resume
              </button>
              <XIcon
                className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle('');
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div
              onClick={(e) => e.stopPropagation()}
              className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Update Resume</h2>
              <input
                placeholder='Enter resume title'
                className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600'
                required
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <label
                  htmlFor='resume-input'
                  className='block text-sm text-slate-700 '>
                  Select resume file (.pdf)
                  <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors '>
                    {resume ? (
                      <p className='text-green-700 '>{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className='size-14 stroke-1 ' />
                        <p>Upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type='file'
                  id='resume-input'
                  className='hidden'
                  accept='.pdf'
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>
              <button
                className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2'
                disabled={isLoading}>
                {isLoading && (
                  <LoaderCircleIcon className='animate-spin size-4 text-white' />
                )}
                {isLoading ? 'Uploading...' : ' Upload Resume'}
              </button>
              <XIcon
                className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle('');
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId('')}
            className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div
              onClick={(e) => e.stopPropagation()}
              className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
              <input
                placeholder='Enter resume title'
                className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600'
                required
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
                Update
              </button>
              <XIcon
                className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
                onClick={() => {
                  setEditResumeId('');
                  setTitle('');
                }}
              />
            </div>
          </form>
        )}

        {confirmationModal && (
          <div className='fixed inset-0 bg-white backdrop-blur bg-opacity-50 z-10 flex items-center justify-center flex-col shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200 mx-auto h-72 mt-10'>
            <div className='flex items-center justify-center p-4 bg-red-100 rounded-full'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75'
                  stroke='#DC2626'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h2 className='text-gray-900 font-semibold mt-4 text-xl'>
              Are you sure?
            </h2>
            <p className='text-sm text-gray-600 mt-2 text-center'>
              Are you sure you want to delete this resume.
              <br />
              cannot be undone.
            </p>
            <div className='flex items-center justify-center gap-4 mt-5 w-full'>
              <button
                onClick={() => {
                  setConfirmation(false);
                  setConfirmationModal(false);
                }}
                type='button'
                className='w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition'>
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                type='button'
                className='w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition'>
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
