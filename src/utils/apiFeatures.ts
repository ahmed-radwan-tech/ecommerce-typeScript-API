class ApiFeatures {
  mongooseQuery: any;
  queryString: any;
  paginationResult: any;
  constructor(mongooseQuery: any, queryString: any) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "limit", "sort", "fields", "keyword"];
    excludeFields.forEach((el) => delete queryObj[el]);
    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = (this.queryString.sort as string).split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }
  selectFields() {
    if (this.queryString.fields) {
      const fields = (this.queryString.fields as string).split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }
  search() {
    if (this.queryString.keyword) {
      const query: any = {};
      query.$or = [
        { title: { $regex: this.queryString.keyword, $options: "i" } },
        { description: { $regex: this.queryString.keyword, $options: "i" } },
      ];
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
  paginate(countDocuments: any) {
    const page =
      Number(this.queryString.page) || Number(process.env.DEFAULT_PAGE);
    const limit =
      Number(this.queryString.limit) || Number(process.env.DEFAULT_LIMIT);
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    //pagination result
    const pagination: any = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);
    //pagination.next
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    //pagination.previous
    if (skip > 0) {
      pagination.previous = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}

export default ApiFeatures;
