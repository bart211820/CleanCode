package nl.hsleiden.model;

public class Animator {
    private int animatorID;
    private String animatorName;
    private String animatorLink;
    private String animatorImage;

    public Animator() {

    }

    public Animator(int animatorID, String animatorName, String animatorLink, String animatorImage) {
        this.animatorID = animatorID;
        this.animatorName = animatorName;
        this.animatorLink = animatorLink;
        this.animatorImage = animatorImage;
    }

    public int getAnimatorID() {
        return animatorID;
    }

    public void setAnimatorID(int animatorID) {
        this.animatorID = animatorID;
    }

    public String getAnimatorName() {
        return animatorName;
    }

    public void setAnimatorName(String animatorName) {
        this.animatorName = animatorName;
    }

    public String getAnimatorLink() {
        return animatorLink;
    }

    public void setAnimatorLink(String animatorLink) {
        this.animatorLink = animatorLink;
    }

    public String getAnimatorImage() {
        return animatorImage;
    }

    public void setAnimatorImage(String animatorImage) {
        this.animatorImage = animatorImage;
    }
}
