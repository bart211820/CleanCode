export class Animator {

  private animatorID;
  private animatorName;
  private animatorLink;
  private animatorImage;

  constructor(private data?) {
    this.animatorID = data.animatorID;
    this.animatorName = data.animatorName;
    this.animatorLink = data.animatorLink;
    this.animatorImage = data.animatorImage;
  }

  public getData() {
    const data = {
      animatorID: this.animatorID,
      animatorName: this.animatorName,
      animatorLink: this.animatorLink,
      animatorImage: this.animatorImage
    };
    return data;
  }

  public getAnimatorID() {
    return this.animatorID;
  }

  public getAnimatorName() {
    return this.animatorName;
  }

  public getAnimatorLink() {
    return this.animatorLink;
  }

  public getAnimatorImage() {
    return this.animatorImage;
  }
}
