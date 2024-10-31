import ShoppingListItem from "./ShoppingList";
import "./styles.less";
import api from "api/api";
import { useNavigate } from "react-router-dom";
import AddButton from "components/buttons/AddButton";
import BottomPageFadeout from "components/BottomPageFadeout";
import { fetchShoppingLists } from "storage/redux/slices/shoppingListsSlice";
import store from "storage/redux/store";
import { useAppSelector } from "storage/redux/hooks";

export async function loader(): Promise<null> {
  /**
   * TODO: This loader gets called before the ShoppingList.tsx useEffect that updates the shopping list in component cleanup.
   * Maybe it will get fixed in the meantime, while implementing redux.
   */
  store.dispatch(fetchShoppingLists());
  return null;
}

const ShoppingPage = () => {
  const { shoppingLists } = useAppSelector(state => state.shoppingLists);
  const navigate = useNavigate();

  const handleShoppingListCreate = async () => {
    const name = new Date().toLocaleDateString("pl-PL");
    const shoppingListId = await api.post.createShoppingList(name);
    navigate(`/shopping-lists/${shoppingListId}`);
  };

  return (
    <div className="shopping-page">
      {shoppingLists.map(list => (
        <ShoppingListItem key={list.id} listData={list} />
      ))}
      <BottomPageFadeout />
      <AddButton onClick={handleShoppingListCreate} />
    </div>
  );
};

export default ShoppingPage;
