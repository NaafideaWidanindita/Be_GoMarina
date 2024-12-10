const {query} = require("../Database/db");

const getAllOrders = () => {
return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, results) => {
    if (err) {
        reject(err); 
    } else {
        resolve(results); 
    }
    });
});
};

const getOrderById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM orders WHERE id = ?';
    db.query(sql, [id], (err, results) => {
    if (err) {
        reject(err);
    } else {
        resolve(results[0]);
    }
    });
});
};

const createOrder = (data) => {
    return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO orders SET ?';
    db.query(sql, data, (err, results) => {
    if (err) {
        reject(err);
    } else {
        resolve(results);
    }
    });
});
};

const deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM orders WHERE id = ?';
        db.query(sql, [id], (err, results) => {
        if (err) {
            reject(err); 
        } else {
            if (results.affectedRows === 0) {
            
            reject(new Error('order not found'));
            } else {
            resolve({ message: 'order deleted successfully' });
            }
        }
        });
    });
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder,
};