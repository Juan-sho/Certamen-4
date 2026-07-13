function List({ items, deleteItem, editItem }) {
  return (
    <ul className="item-list"> {/* 👈 Conecta con el CSS */}
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      ))}
    </ul>
  );
}

export default List;