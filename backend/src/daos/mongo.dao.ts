import { Document, FilterQuery, UpdateQuery } from 'mongoose';

export default class MongoDao<T extends Document> {
  model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(documentToCreate: Partial<T>): Promise<T | undefined> {
    try {
      const createdDocument = await this.model.create(documentToCreate);
      return createdDocument;
    } catch (err) {
      console.log("Error creating document", err);
      return undefined;
    }
  }

  async update(filter: FilterQuery<T>, updateData: UpdateQuery<T>): Promise<T | undefined> {
    try {
      const updatedDocument = await this.model.updateOne(filter, updateData);
      console.log(updatedDocument);
      return updatedDocument;
    } catch (err) {
      console.log("Error updating document", err);
      return undefined;
    }
  }

  async getAll(): Promise<T[] | undefined> {
    try {
      const allDocuments = await this.model.find();
      return allDocuments;
    } catch (err) {
      console.log("Error getting all documents", err);
      return undefined;
    }
  }

  async getById(id: string): Promise<T | undefined> {
    try {
      const document = await this.model.findById(id);
      return document;
    } catch (err) {
      console.log("Error getting document by id", err);
      return undefined;
    }
  }

  async getByFilter(filters: FilterQuery<T>): Promise<T | undefined> {
    try {
      const document = await this.model.findOne(filters);
      return document;
    } catch (err) {
      console.log("Error getting document by filters", err);
      return undefined;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const deletedDocument = await this.model.deleteOne({ _id: id });
      return deletedDocument;
    } catch (err) {
      console.log("Error deleting document", err);
      return undefined;
    }
  }
}
