import Heart from "../../../assets/svg/heart.svg?react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

const Wishlist = () => {
  const navigate = useNavigate();

  const wishlistCount = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  
  return (
    <button
      type="button"
      className={styles.wishlistIcon}
      onClick={() => navigate("/wishlist")}
      aria-label={`Wishlist, ${wishlistCount} item${
        wishlistCount === 1 ? "" : "s"
      }`}
    >
      <Heart className={styles.wishlistSvg} />

      {wishlistCount > 0 && (
        <span className={styles.badge}>
          {wishlistCount}
        </span>
      )}
    </button>
  );
};

export default Wishlist;