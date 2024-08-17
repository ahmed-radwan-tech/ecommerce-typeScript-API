import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import ApiFeatures from "../utils/apiFeatures";

const isExists = (
  document: any,
  res: Response,
  next: NextFunction,
  content: any
) => {
  if (document) {
    return res.status(200).json({ data: content });
  }
  next(new ApiError("Document not found", 404));
};

const getAll = (Model: any) =>
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    let filterObject = {};
    if (req.params.categoryId) {
      filterObject = { category: req.params.categoryId };
    }
    const documentCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filterObject), req.query)
      .paginate(documentCounts)
      .filter()
      .search()
      .sort()
      .selectFields();

    //execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res.status(200).json({
      results: documents.length,
      paginationResult,
      data: documents,
    });
  });

const createOne = (Model: any) =>
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

const getOne = (Model: any) =>
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;
      const document = await Model.findById(id);
      isExists(document, res, next, document);
    }
  );

const deleteOne = (Model: any) =>
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { id } = req.params;
      const document = await Model.findByIdAndDelete(id);
      isExists(document, res, next, "document deleted successfully");
    }
  );

const updateOne = (Model: any) =>
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      isExists(document, res, next, document);
    }
  );
export { deleteOne, updateOne, createOne, getOne, getAll };
