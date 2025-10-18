import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Resume from '../models/Resume.js';
import mongoose from 'mongoose';

// controller for creating new resume
// POST: /api/resumes/create

export const createResume = async (req, res) => {
  try {
    const { userId } = req;
    const { title } = req.body;

    // create new Resume
    const newResume = await Resume.create({ userId, title });

    //   return success message
    return res
      .status(201)
      .json({ message: 'Resume created successfully.', resume: newResume });
  } catch (error) {
    console.log('Error createResume Controller: ', error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller for deleting a resume
// DELETE: /api/resumes/delete

export const deleteResume = async (req, res) => {
  try {
    const { userId } = req;
    const { resumeId } = req.params;

    // delete resume
    await Resume.findOneAndDelete({ userId, _id: resumeId });

    // return success message
    return res.status(200).json({ message: 'Resume delete successfully.' });
  } catch (error) {
    console.log('Error deleteResume Controller: ', error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller to get resume  by id
// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
  try {
    const { userId } = req;
    const { resumeId } = req.params;

    // delete resume
    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    // return success message
    return res.status(200).json({ resume });
  } catch (error) {
    console.log('Error getResumeById Controller: ', error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller to get resume  by id public
// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // delete resume
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    // return success message
    return res.status(200).json({ resume });
  } catch (error) {
    console.log('Error getPublicResumeById Controller: ', error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller for updating resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) => {
  try {
    const { userId } = req;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;
    let resumeDataCopy;
    if (typeof resumeData === 'string') {
      try {
        resumeDataCopy = JSON.parse(resumeData);
      } catch (err) {
        console.error('Invalid JSON in resumeData:', err);
        resumeDataCopy = {}; // fallback to empty object
      }
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: 'resume.png',
        folder: 'user-resumes',
        transformation: {
          pre:
            'w-300, h-300, fo-face, z-0.75' +
            (removeBackground ? ',e-bgremove' : ''),
        },
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      {
        userId: userId,
        _id: resumeId,
      },
      { $set: resumeDataCopy },
      { new: true }
    );
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }

    return res.status(200).json({ message: 'Saved Successfully.', resume });
  } catch (error) {
    console.log('Error updateResume Controller: ', error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
