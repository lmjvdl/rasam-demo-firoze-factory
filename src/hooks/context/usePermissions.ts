import { useAuthStore } from "./authStore";

/**
 * A custom hook for handling user permissions with advanced checking capabilities
 * @returns {Object} An object containing:
 *   - permissions: Array of user's permission IDs (as numbers)
 *   - hasPermission: Function to check if user has ALL required permissions (AND logic)
 *   - hasAnyPermission: Function to check if user has ANY of the required permissions (OR logic)
 */
export const usePermissions = () => {
  // Get permissions directly from auth store (already numbers)
  const permissions = useAuthStore(state => state.permissions);
  
  /**
   * Checks if user has the required permission(s)
   * @param {number|number[]} requiredPermissions - Single permission ID or array of IDs
   * @returns {boolean} 
   *   - true if user has ALL permissions when array is provided (AND logic)
   *   - true if user has the permission when single ID is provided
   */
  const hasPermission = (requiredPermissions: number | number[]): boolean => {
    if (Array.isArray(requiredPermissions)) {
      // Check if user has ALL required permissions (AND condition)
      return requiredPermissions.every(perm => permissions.includes(perm));
    }
    // Single permission check
    return permissions.includes(requiredPermissions);
  };

  /**
   * Checks if user has ANY of the required permissions (OR logic)
   * @param {number[]} requiredPermissions - Array of permission IDs to check
   * @returns {boolean} true if user has at least one of the permissions
   */
  const hasAnyPermission = (requiredPermissions: number[]): boolean => {
    return requiredPermissions.some(perm => permissions.includes(perm));
  };

  return { permissions, hasPermission, hasAnyPermission };
};