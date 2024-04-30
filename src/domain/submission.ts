export class paperInfo {
  public submissionId: any;
  public paperLink: any;
  public paperTitle: string | undefined;
  public paperFileList: any[] = [];
  public subjectList: any[] = [];
  public authorList: any[] = [];
  public abstract: string | undefined;
  public submitDate: string | undefined;
  public comments: string | undefined;
  public setSubmissionId(id: any): void {
    this.submissionId = id;
  }
  public setPaperLink(paperLink: any): void {
    this.paperLink = paperLink;
  }
  public setPaperTitle(paperTitle: string): void {
    this.paperTitle = paperTitle;
  }
  public setPaperFileList(paperFileList: []): void {
    this.paperFileList = paperFileList;
  }
  public setSubjectList(subjectList: []): void {
    this.subjectList = subjectList;
  }
  public setAuthorList(authorList: []): void {
    this.authorList = authorList;
  }
  public setAbstract(abstract: string): void {
    this.abstract = abstract;
  }
  public setSubmitDate(submitDate: string): void {
    this.submitDate = submitDate;
  }
  public setComments(comments: string): void {
    this.comments = comments;
  }
}
