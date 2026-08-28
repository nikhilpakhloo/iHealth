import { useCartStore } from '../useCartStore';
import { Product } from '../../../../core/api/mockData';

const mockProduct1: Product = {
  id: 'p1',
  name: 'Test Product 1',
  price: 100,
  imageUrl: 'https://via.placeholder.com/150',
  category: 'Test Category',
};

const mockProduct2: Product = {
  id: 'p2',
  name: 'Test Product 2',
  price: 200,
  imageUrl: 'https://via.placeholder.com/150',
  category: 'Test Category',
};

describe('useCartStore', () => {
  beforeEach(() => {
    // Clear the cart before each test
    useCartStore.getState().clearCart();
  });

  it('should start with an empty cart', () => {
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().getTotal()).toBe(0);
  });

  it('should add an item to the cart', () => {
    useCartStore.getState().addItem(mockProduct1);
    const items = useCartStore.getState().items;

    expect(items.length).toBe(1);
    expect(items[0].product.id).toBe(mockProduct1.id);
    expect(items[0].quantity).toBe(1);
    expect(useCartStore.getState().getTotal()).toBe(100);
  });

  it('should increment quantity if adding the same item', () => {
    useCartStore.getState().addItem(mockProduct1);
    useCartStore.getState().addItem(mockProduct1);
    const items = useCartStore.getState().items;

    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
    expect(useCartStore.getState().getTotal()).toBe(200);
  });

  it('should update item quantity', () => {
    useCartStore.getState().addItem(mockProduct1);
    useCartStore.getState().updateQuantity(mockProduct1.id, 5);
    const items = useCartStore.getState().items;

    expect(items[0].quantity).toBe(5);
    expect(useCartStore.getState().getTotal()).toBe(500);
  });

  it('should remove an item from the cart', () => {
    useCartStore.getState().addItem(mockProduct1);
    useCartStore.getState().addItem(mockProduct2);

    expect(useCartStore.getState().items.length).toBe(2);

    useCartStore.getState().removeItem(mockProduct1.id);
    const items = useCartStore.getState().items;

    expect(items.length).toBe(1);
    expect(items[0].product.id).toBe(mockProduct2.id);
    expect(useCartStore.getState().getTotal()).toBe(200);
  });

  it('should clear all items', () => {
    useCartStore.getState().addItem(mockProduct1);
    useCartStore.getState().addItem(mockProduct2);

    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items.length).toBe(0);
    expect(useCartStore.getState().getTotal()).toBe(0);
  });
});
