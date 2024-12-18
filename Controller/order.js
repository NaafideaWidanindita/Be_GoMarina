const {query} = require("../Database/db");

const addOrder = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image file is required"
    });
  }

  const { produk_data, notes } = req.body;

  if (!produk_data || !notes) {
    return res.status(400).json({
      success: false,
      message: "Produk data and notes are required"
    });
  }

  try {
    const { address_id, role_id } = req.query;

    if (!address_id || !role_id) {
      return res.status(400).json({
        success: false,
        message: "Address ID and Role ID are required"
      });
    }

    const products = JSON.parse(produk_data);
    let total = 0;

    products.forEach(product => {
      total += product.price * product.jumlah;
    });

    const currentTime = new Date();

    const orderResult = await query(
      'INSERT INTO `order` (address_id, role_id, produk_data, total, notes, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        address_id,
        role_id,
        JSON.stringify(products),
        total,
        notes,
        currentTime,
        currentTime
      ]
    );

    const order_id = orderResult.insertId;

    const image = req.file.filename;
    const paymentResult = await query(
      'INSERT INTO payment (order_id, image, `option`, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [
        order_id,
        image,
        'mandiri', // Default option
        'pending', // Default status
        currentTime,
        currentTime
      ]
    );

    res.status(201).json({
      success: true,
      message: "Order and Payment created successfully!",
      data: {
        order: {
          id: order_id,
          address_id,
          role_id,
          produk_data: products,
          total,
          notes,
          createdAt: currentTime,
          updatedAt: currentTime
        },
        payment: {
          id: paymentResult.insertId,
          order_id,
          image,
          option: 'mandiri',
          status: 'pending',
          createdAt: currentTime,
          updatedAt: currentTime
        }
      }
    });
  } catch (error) {
    console.error("Query Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message
    });
  }
};

const getSelectedItems = async (req, res) => {
    try {
      const { selectedItems } = req.query;
  
      if (!selectedItems) {
        return res.status(400).json({
          success: false,
          message: "Selected items are required"
        });
      }

      const items = JSON.parse(selectedItems);

      if (!Array.isArray(items)) {
        return res.status(400).json({
          success: false,
          message: "Selected items should be an array"
        });
      }

      const enhancedItems = await Promise.all(items.map(async (item) => {
        try {
          const cartItemQuery = 'SELECT product_id, jumlah FROM card_item WHERE id = ?';
          const cartItemRows = await query(cartItemQuery, [item.id]);

          if (cartItemRows.length === 0) {
            return null;
          }
  
          const cartItem = cartItemRows[0];
          const productId = cartItem.product_id;

          const productQuery = 'SELECT name, price, image FROM product WHERE id = ?';
          const productRows = await query(productQuery, [productId]);

          if (productRows.length === 0) {
            return null;
          }
  
          const product = productRows[0];

          const imageUrl= product.image ? `http://localhost:5000/product/${product.image}` : ""

          return {
            id: item.id,
            name: product.name,
            jumlah: cartItem.jumlah,
            price: product.price,
            image: imageUrl
          };
        } catch (error) {
          console.error("Error retrieving data:", error.message);
          throw new Error('Error processing item');
        }
      }));

      const validItems = enhancedItems.filter(item => item !== null);

      res.status(200).json({
        success: true,
        message: "Selected items retrieved successfully",
        data: validItems
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Error retrieving selected items",
        error: error.message
      });
    }
};

// const getAllOrders = () => {
// return new Promise((resolve, reject) => {
//     const sql = 'SELECT * FROM orders';
//     db.query(sql, (err, results) => {
//     if (err) {
//         reject(err); 
//     } else {
//         resolve(results); 
//     }
//     });
// });
// };

// const getOrderById = (id) => {
//     return new Promise((resolve, reject) => {
//     const sql = 'SELECT * FROM orders WHERE id = ?';
//     db.query(sql, [id], (err, results) => {
//     if (err) {
//         reject(err);
//     } else {
//         resolve(results[0]);
//     }
//     });
// });
// };

// const deleteOrder = (id) => {
//     return new Promise((resolve, reject) => {
//         const sql = 'DELETE FROM orders WHERE id = ?';
//         db.query(sql, [id], (err, results) => {
//         if (err) {
//             reject(err); 
//         } else {
//             if (results.affectedRows === 0) {
            
//             reject(new Error('order not found'));
//             } else {
//             resolve({ message: 'order deleted successfully' });
//             }
//         }
//         });
//     });
// };

module.exports = {
    addOrder,
    getSelectedItems
    // getAllOrders,
    // getOrderById,
    // // createOrder,
    // deleteOrder,
};