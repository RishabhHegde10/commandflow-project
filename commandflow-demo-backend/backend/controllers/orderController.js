const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: {
          select: {
            username: true,
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { orderId },
      data: { status },
      include: {
        items: true
      }
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Delete order (cascades to items if configured, or just deletes order)
    await prisma.order.delete({
      where: { orderId }
    });

    res.json({ success: true, message: `Order ${orderId} deleted` });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Also create a dummy order seeder for testing
const seedDummyOrder = async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    const product = await prisma.product.findFirst({
      include: { variants: true }
    });
    
    if (!user || !product) {
      return res.status(400).json({ error: 'Need a user and a product to seed an order' });
    }

    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const order = await prisma.order.create({
      data: {
        orderId,
        userId: user.id,
        status: 'pending',
        totalAmount: product.variants[0]?.price || 0,
        items: {
          create: [{
            productId: product.id,
            quantity: 1,
            price: product.variants[0]?.price || 0
          }]
        }
      },
      include: { items: true }
    });

    res.json(order);
  } catch (error) {
    console.error('Error seeding order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  seedDummyOrder
};
