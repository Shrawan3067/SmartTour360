/**
 * Wishlist Service with localStorage persistence
 * Manages user wishlist for destinations
 */

const WISHLIST_STORAGE_KEY = 'st360_wishlist';

export const wishlistService = {
  // Get wishlist from localStorage
  getWishlist: () => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading wishlist from localStorage:', error);
      return [];
    }
  },

  // Add item to wishlist
  addToWishlist: (item) => {
    try {
      const wishlist = wishlistService.getWishlist();
      const exists = wishlist.find(w => w.id === item.id);
      
      if (exists) {
        return { success: false, message: 'Item already in wishlist' };
      }
      
      const newItem = {
        ...item,
        addedAt: new Date().toISOString(),
      };
      
      wishlist.push(newItem);
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      return { success: true, message: 'Added to wishlist' };
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return { success: false, message: 'Failed to add to wishlist' };
    }
  },

  // Remove item from wishlist
  removeFromWishlist: (itemId) => {
    try {
      const wishlist = wishlistService.getWishlist();
      const filtered = wishlist.filter(w => w.id !== itemId);
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(filtered));
      return { success: true, message: 'Removed from wishlist' };
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return { success: false, message: 'Failed to remove from wishlist' };
    }
  },

  // Check if item is in wishlist
  isInWishlist: (itemId) => {
    const wishlist = wishlistService.getWishlist();
    return wishlist.some(w => w.id === itemId);
  },

  // Clear entire wishlist
  clearWishlist: () => {
    try {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
      return { success: true, message: 'Wishlist cleared' };
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      return { success: false, message: 'Failed to clear wishlist' };
    }
  },

  // Get wishlist count
  getWishlistCount: () => {
    return wishlistService.getWishlist().length;
  },
};

export default wishlistService;
