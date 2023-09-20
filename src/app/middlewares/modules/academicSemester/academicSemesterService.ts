import { PrismaClient, AcademicSemester } from '@prisma/client';
import { IGenericResponse } from '../../../../interfaces/common';
import { paginationHelpers } from '../../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../../interfaces/pagination';
import { IAcademicSemesterFilterRequest } from './AcademicSemesterInterface';
const prisma = new PrismaClient();

const insertIntoDB = async (
  academiceSemerterData: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: academiceSemerterData,
  });
  return result;
};
const getAllSemester = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {

  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log("🚀 ~ file: academicSemesterService.ts:22 ~ filterData:", filterData)

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: ['title', 'code', 'year', 'startMonth', 'endMonth'].map((field) => ({
        [field]: {
          contains: searchTerm || '',
          mode: 'insensitive',
        },
      })),
    });
  }
  // const whereConditions: Prisma.AcademicSemesterWhereInput =
  //  andConditions?.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.academicSemester.findMany({
    // where: whereConditions,
    skip,
    take: limit,
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
// const getAllSemester = async (
//     filters: IAcademicSemesterFilterRequest,
//     options: IPaginationOptions
//   ): Promise<IGenericResponse<AcademicSemester[]>> => {
//     const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//     const { searchTerm, ...filterData } = filters;
  
//     const whereConditions = {
//       OR: ['title', 'code', 'year', 'startMonth', 'endMonth'].map((field) => ({
//         [field]: {
//           contains: searchTerm || '', // Handle the case when searchTerm is undefined
//           mode: 'insensitive',
//         },
//       })),
//     };
  
//     const result = await prisma.academicSemester.findMany({
//       where: whereConditions,
//       skip,
//       take: limit,
//     });
  
//     const total = await prisma.academicSemester.count();
  
//     return {
//       meta: {
//         total,
//         page,
//         limit,
//       },
//       data: result,
//     };
//   };

export const AcademicSemesterService = {
  insertIntoDB,
  getAllSemester,
};
