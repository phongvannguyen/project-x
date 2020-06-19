export class ProductListingModel {
  public userId: number;
  public _id: string;
  public category: string;
  public productName: string;
  public price: number;
  public description: string;
  public images: string[];
  public transactionType: string;
  public archiveDate: Date;
  public lastUpdate: Date;
  public status: string;
  public viewCount: number;
  public saveCount: number;
}
