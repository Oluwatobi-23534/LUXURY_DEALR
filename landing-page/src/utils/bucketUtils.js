// bucketUtils.js
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateBucket = (bucketItems, item) => {
  // Check if item already exists in the bucket
  const existItem = bucketItems.find((i) => i._id === item._id);

  if (existItem) {
    // Update existing item
    bucketItems = bucketItems.map((i) => (i._id === existItem._id ? item : i));
  } else {
    // Add new item to the bucket
    bucketItems.push(item);
  }

  // Calculate total price
  let totalPrice = addDecimals(
    bucketItems.reduce(
      (acc, item) => acc + (Number(item.price) * Number(item.qty) || 0),
      0
    )
  );

  // Ensure totalPrice is a number
  totalPrice = isNaN(totalPrice) ? 0 : Number(totalPrice);

  // Add item price and total item price to each item in the bucket
  bucketItems = bucketItems.map((bucketItem) => ({
    ...bucketItem,
    itemPrice: Number(bucketItem.price),
    totalItemPrice: Number(bucketItem.price) * Number(bucketItem.qty),
  }));

  return { bucketItems, totalPrice };
};
