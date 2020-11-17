package nl.hsleiden.service;

import nl.hsleiden.model.Animator;
import nl.hsleiden.model.Item;
import nl.hsleiden.model.User;
import nl.hsleiden.persistence.AnimatorDAO;
import nl.hsleiden.persistence.ItemDAO;

import javax.inject.Inject;
import java.util.Collection;

public class AnimatorService {

    private final AnimatorDAO dao;

    @Inject
    public AnimatorService(AnimatorDAO dao)
    {
        this.dao = dao;
    }

    public Collection<Animator> getAll()
    {
        return dao.getAllAnimators();
    }

    public Animator getOne(int animatorID){
        return dao.getAnimator(animatorID);
    }

    public void create(Animator animator) {
        dao.createAnimator(animator.getAnimatorName(), animator.getAnimatorLink(), animator.getAnimatorImage());
    }

    public void update(int animatorID, Animator animator)
    {
        // Controleren of deze animator wel bestaat
        Animator oldAnimator = getOne(animatorID);

        dao.updateAnimator(animator.getAnimatorName(), animator.getAnimatorLink(), animator.getAnimatorImage(), animator.getAnimatorID());
    }

    public void delete(int animatorID) { dao.deleteAnimator(animatorID); }
}
