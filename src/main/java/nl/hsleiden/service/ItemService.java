package nl.hsleiden.service;

import nl.hsleiden.model.Animator;
import nl.hsleiden.model.Basket;
import nl.hsleiden.model.Item;
import nl.hsleiden.persistence.ItemDAO;

import javax.inject.Inject;
import java.util.Collection;

public class ItemService {

    private final ItemDAO dao;

    @Inject
    public ItemService(ItemDAO dao)
    {
        this.dao = dao;
    }

    public Collection<Item> getAll()
    {
        return dao.getAllItems();
    }

    public Item getOne(int itemID){
        return dao.getItem(itemID);
    }

    public void create(Item item) {
        dao.createItem(item.getItemName(), item.getItemDescription(), item.getItemPrice(), item.getItemImage(), item.getItemType(), item.getItemAnimatorID());
    }

    public void update(int itemID, Item item)
    {
        // Controleren of deze item wel bestaat
        Item oldItem = getOne(itemID);

        dao.updateItem(item.getItemName(), item.getItemDescription(), item.getItemPrice(), item.getItemImage(), item.getItemType(), item.getItemAnimatorID(), item.getItemID());
    }

    public void delete(int itemID) { dao.deleteItem(itemID); }
}
